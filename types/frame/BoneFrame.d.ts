import WriteBufferStream from '../stream/WriteBufferStream'
import ReadBufferStream from '../stream/ReadBufferStream'
export default class BoneFrame {
    constructor(stream?: ReadBufferStream)

    /**
     * 将自身数据写入stream
     * @param stream 
     */
    writeBuffer(stream: WriteBufferStream)
    /**
     * 骨骼名称 BoneName
     * byte*15(ShiftJIS)
     */
    boneName: string

    /**
     * 关键帧时间 FrameTime
     * uint32_t
     */
    frameTime: number
    /**
     * x,y,z空间坐标 Translation.xyz
     * float*3
     */
    translation: [number, number, number]
    /**
     * 旋转四元数x,y,z,w Rotation.xyzw
     * float*4
     */
    rotation: [number, number, number, number]
    /**
     * 补间曲线x的坐标 XCurve
     * uint8_t*16
     */
    curveX: [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number]
    /**
     * 补间曲线y的坐标 YCurve
     * uint8_t*16
     */
    curveY: [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number]
    /**
     * 补间曲线z的坐标 ZCurve
     * uint8_t*16
     */
    curveZ: [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number]
    /**
     * 补间曲线旋转的坐标 RCurve
     * uint8_t*16
     */
    curveR: [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number]

}