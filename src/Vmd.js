import { MODEL_NAME_LENGTH, VERSION_BUFFER_LENGTH, VERSION } from './const'
import ReadBufferStream from './stream/ReadBufferStream'
import WriteBufferStream from './stream/WriteBufferStream'
import BoneFrame from './frame/BoneFrame'
import CameraFrame from './frame/CameraFrame'
import LightFrame from './frame/LightFrame'
import MorphFrame from './frame/MorphFrame'

export default class Vmd {
  /**
   * @param { ArrayBuffer } [buffer]
   */
  constructor (buffer) {
    /**
     * @type {string} 版本
     */
    this.version = VERSION.V2

    /**
     * @type {string} 当前使用的模型名字
     */
    this.modelName = ''

    /**
     * @type {BoneFrame[]} 骨骼关键帧
     */
    this.boneFrames = [] // 骨骼关键帧
    this.morphFrames = [] // 表情关键帧
    this.cameraFrames = [] // 镜头关键帧
    this.lightFrames = [] // 光线关键帧

    /**
     * 从传入的文件流解析格式，生成配置信息，需要按照顺序读取buffer
     */
    if (buffer) {
      const stream = new ReadBufferStream(buffer)

      this.version = stream.readString(VERSION_BUFFER_LENGTH)

      this.modelName = stream.readString(MODEL_NAME_LENGTH[this.version])
      // 骨骼
      this.boneFrames = stream.readArrayByConstructor(BoneFrame)
      // 表情
      this.morphFrames = stream.readArrayByConstructor(MorphFrame)
      // 摄像机
      this.cameraFrames = stream.readArrayByConstructor(CameraFrame)
      // 光线
      this.lightFrames = stream.readArrayByConstructor(LightFrame)

      stream.close()
    }
  }

  /**
   * 时间线
   */
  get timeline () {
    const maxFrameTime = this.boneFrames.reduce((_maxFrameTime, { frameTime }) => Math.max(_maxFrameTime, frameTime), 0)

    // frame类别的keys
    const frameTypeKeys = Object.keys(this).filter(key => key.includes('Frames'))

    const timeline = []

    for (let frameTime = 0; frameTime < maxFrameTime; frameTime++) {
      /**
       * 生成对应的frame数据，根据frameTime过滤一次
       */
      const frame = frameTypeKeys.reduce((_frame, key) => {
        /**
         * @type { BoneFrame[] | MorphFrame[] | CameraFrame[] | LightFrame[] }
         */
        const typedFrames = this[key]
        _frame[key] = typedFrames.filter((typedFrame) => typedFrame.frameTime === frameTime)
        return _frame
      }, { frameTime })

      timeline.push(frame)
    }

    return timeline
  }

  /**
   * 将内部状态导出
   * @returns {ArrayBuffer}
   */
  write () {
    const stream = new WriteBufferStream()

    stream.writeString(this.version, VERSION_BUFFER_LENGTH)
    stream.writeString(this.modelName, MODEL_NAME_LENGTH[this.version])

    // 骨骼
    stream.writeTypedFrameArray(this.boneFrames)
    // 表情
    stream.writeTypedFrameArray(this.morphFrames)
    // 摄像机
    stream.writeTypedFrameArray(this.cameraFrames)
    // 光线
    stream.writeArrayByType(this.lightFrames)

    const arrayBuffer = stream.getArrayBuffer()
    return arrayBuffer
  }
}
