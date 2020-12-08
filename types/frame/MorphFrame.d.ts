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
     * 表情名称 MorphName
     * byte*15(ShiftJIS)
     */
    morphName: string
    /**
     * 关键帧时间 FrameTime
     * uint32_t
     */
    frameTime: number
    /**
     * 程度 Weight
     * float
     */
    weight: number

}