import WriteBufferStream from '../stream/WriteBufferStream'
import ReadBufferStream from '../stream/ReadBufferStream'
export default class LightFrame {
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
     * RGB颜色空间 color.rgb
     * float*3
     */
    rgb: [number, number, number]
    /**
     * xyz投射方向 Direction.xyz
     * float*3
     */
    direction: [number, number, number]

}