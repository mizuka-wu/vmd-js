
export default class MorphFrame {
  /**
   * @param {import('../stream/ReadBufferStream').default} stream
   */
  constructor (stream) {
    /**
     * 表情名称 MorphName
     * byte*15(ShiftJIS)
     */
    this.morphName = ''
    /**
     * 关键帧时间 FrameTime
     * uint32_t
     */
    this.frameTime = 0
    /**
     * 程度 Weight
     * float
     */
    this.weight = 0

    if (stream) {
      this.morphName = stream.readString(15)
      this.frameTime = stream.readInt()
      this.weight = stream.readFloat()
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
    stream.writeString(this.morphName, 15)
    stream.writeInt(this.frameTime)
    stream.writeFloat(this.weight)
  }
}
