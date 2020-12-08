import { Type, FrameType } from '../const'
export default class WriteBufferStream {
    constructor()

    bufferList: ArrayBuffer[]

    /**
     * 写入数组
     * @param array 
     */
    writeTypedFrameArray(array: FrameType[]): WriteBufferStream


    writeBytes(length?: number): WriteBufferStream

    writeInt(value: number): WriteBufferStream

    writeFloat(value: number): WriteBufferStream

    writeString(text: string, length?: number): WriteBufferStream

    writeByType(value: number, Type: Type, offset?: number, littleEndian?: boolean): WriteBufferStream

    writeArrayByType(value: number[], Type?: Type, offset?: number, littleEndian?: boolean): WriteBufferStream

    getArrayBuffer(): ArrayBuffer
}