import { TYPE } from '../const'
import { generateArray } from '../util'
export default class CameraFrame {
  /**
   * @param {import('../stream/ReadBufferStream').default} stream
   */
  constructor (stream) {
    /**
     * 关键帧时间 FrameTime
     * uint32_t
     */
    this.frameTime = 0
    /**
     * 距离 Distance
     * float
     */
    this.distance = 0
    /**
     * x,y,z空间坐标 Position.xyz
     * float*3
     */
    this.position = generateArray(3)
    /**
     * 旋转角度（弧度制） Rotation.xyz
     * float*3
     */
    this.rotation = generateArray(3)
    /**
     * 相机曲线 Curve
     * uint8_t*24
     */
    this.curve = generateArray(24)
    /**
     * 镜头FOV角度 ViewAngle
     * float
     */
    this.viewAngle = 0
    /**
     * Orthographic相机
     * uint8_t
     */
    this.orthographic = 0

    if (stream) {
      this.frameTime = stream.readInt()
      this.distance = stream.readFloat()
      this.position = stream.readArrayByType(3, TYPE.float)
      this.rotation = stream.readArrayByType(3, TYPE.float)
      this.curve = stream.readArrayByType(24, TYPE.uint8_t)
      this.viewAngle = stream.readInt()
      this.orthographic = stream.readInt()
    }
  }

  /**
   * 将本身数据写入stream
   * @param {import('../stream/WriteBufferStream').default} stream
   */
  writeBuffer (stream) {
    if (!stream) {
      throw new Error('no stream!')
    }
    stream.writeInt(this.frameTime)
    stream.writeFloat(this.distance)
    stream.writeArrayByType(this.position, TYPE.float)
    stream.writeArrayByType(this.rotation, TYPE.float)
    stream.writeInt(this.viewAngle)
    stream.writeInt(this.orthographic)
  }
}
