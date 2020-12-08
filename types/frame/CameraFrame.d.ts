import WriteBufferStream from '../stream/WriteBufferStream'
import ReadBufferStream from '../stream/ReadBufferStream'
export default class CameraFrame {
    constructor(stream?: ReadBufferStream)

    /**
     * 将自身数据写入stream
     * @param stream 
     */
    writeBuffer(stream: WriteBufferStream)
    /**
     * 关键帧时间 FrameTime
     * uint32_t
     */
    frameTime: number
    /**
     * 距离 Distance
     * float
     */
    distance: number
    /**
     * x,y,z空间坐标 Position.xyz
     * float*3
     */
    position: [number, number, number]
    /**
     * 旋转角度（弧度制） Rotation.xyz
     * float*3
     */
    rotation: [number, number, number]
    /**
     * 相机曲线 Curve
     * uint8_t*24
     */
    curve: [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number]
    /**
     * 镜头FOV角度 ViewAngle
     * float
     */
    viewAngle: number
    /**
     * Orthographic相机
     * uint8_t
     */
    orthographic: number

}