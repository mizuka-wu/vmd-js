import { Type, FrameType } from '../const'
export default class ReadBufferStream {
    /**
     * 默认的buffer
     * @param buffer 
     */
    constructor(buffer?: ArrayBuffer)

    /**
     * 读取关键帧数组
     * @param Constructor 
     */
    readArrayByConstructor(Constructor: FrameType): FrameType[]

    /**
     * 读取指定字节的数据
     * @param length
     */
    readBytes(length: number): ArrayBuffer

    /**
     * 读取uint32_t
     */
    readInt(): number

    /**
     * 读取float
     */
    readFloat(): number

    /**
     * 读取指定长度的文字，会自动过滤
     * @param length 
     */
    readString(length: number): string

    /**
     * 根据类型来读取
     * @param Type 
     * @param offset 
     * @param littleEndian 
     */
    readByType(Type: Type, offset?: number, littleEndian?: boolean)

    /**
     * 根据类型来读取多个
     * @param length 
     * @param Type 
     * @param offset 
     * @param littleEndian 
     */
    readArrayByType(length?: number, Type?: Type, offset?: number, littleEndian?: boolean)

    /**
     * 剩余未读字节
     */
    get restBytes(): number

    /**
     * 清空
     */
    close(): void
}