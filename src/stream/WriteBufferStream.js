/* eslint-disable no-unused-vars */
import { string2buffer } from '../util'
import { TYPE, VERSION } from '../const'
export default class WriteBufferStream {
  constructor () {
    /**
     * @type { ArrayBuffer[] }
     */
    this.bufferList = []
  }

  /**
   * 写入数组
   * @param {*[]} array TypedFrames
   * @returns {WriteBufferStream}
   */
  writeTypedFrameArray (array) {
    const totalNumber = array.length
    this.writeInt(totalNumber)
    array.forEach(typedFrame => {
      typedFrame.writeBuffer(this)
    })

    return this
  }

  /**
   * 写入指定长度的ArrayBuffer
   * @param {ArrayBuffer} value
   * @param {number} [length] 长度，以传入的arrayBuffer和length最大为准
   * @returns {WriteBufferStream}
   */
  writeBytes (value, length = 0) {
    const buffer = new Uint8Array(Math.max(value.byteLength, length))
    buffer.set(value)
    this.bufferList.push(buffer.buffer)

    return this
  }

  /**
   * 写入uint32_t
   * @param {number} value
   * @returns { WriteBufferStream }
   */
  writeInt (value) {
    return this.writeByType(value, TYPE.uint32_t)
  }

  /**
   * 写入float
   * @param {number} value
   * @returns { WriteBufferStream }
   */
  writeFloat (value) {
    return this.writeByType(value, TYPE.float)
  }

  /**
   * 写入文字 文字默认为Uint8
   * @param {string} [text]
   * @param {number} [length]
   * @returns {WriteBufferStream}
   */
  writeString (text = '', length = 0) {
    const textBuffer = string2buffer(text)
    const buffer = new Uint8Array(length)
    buffer.fill(253, textBuffer.length + 1)
    buffer.set(textBuffer)

    // 只有version是靠0填充的
    if (text === VERSION.V1 || text === VERSION.V2) {
      buffer.fill(0, textBuffer.length)
    }

    this.bufferList.push(buffer.buffer)
    return this
  }

  /**
   * 根据类型自动写入
   * @param { number } value
   * @param { Uint16ArrayConstructor | Uint32ArrayConstructor | Uint8ArrayConstructor | Float32ArrayConstructor | Float64ArrayConstructor } Type
   * @param {number} [offset]
   * @param {boolean} [littleEndian]
   * @returns { WriteBufferStream }
   */
  writeByType (value, Type, offset = 0, littleEndian = true) {
    if (!Type) {
      throw new Error('Type is not define')
    }
    const view = new DataView(new ArrayBuffer(Type.BYTES_PER_ELEMENT), 0)
    const method = `set${Type.name.replace('Array', '')}`
    view[method](offset, value, littleEndian)
    this.bufferList.push(view.buffer)
    return this
  }

  /**
   * 将一个数组写入
   * @param {number[]} value
   * @param { Uint16ArrayConstructor | Uint32ArrayConstructor | Uint8ArrayConstructor | Float32ArrayConstructor | Float64ArrayConstructor } [Type]
   * @param {number} [offset]
   * @param {boolean} [littleEndian]
   * @returns {WriteBufferStream}
   */
  writeArrayByType (value, Type = TYPE.uint32_t, offset = 0, littleEndian = true) {
    if (!Array.isArray(value)) {
      throw new Error('value is not array!')
    }
    value.forEach(number => {
      this.writeByType(number, Type, offset, littleEndian)
    })
    return this
  }

  /**
   * 清除保存的数据流
   */
  getArrayBuffer () {
    /**
     * 拼接
     */
    const totalBytes = this.bufferList.reduce((_totalBytes, buffer) => {
      return _totalBytes + new Uint8Array(buffer).length
    }, 0)

    const result = new Uint8Array(totalBytes)
    let offset = 0

    for (const buffer of this.bufferList) {
      result.set(new Uint8Array(buffer), offset)
      offset += buffer.byteLength
    }

    const buffer = result.buffer

    this.bufferList.splice(0)

    return buffer
  }
}
