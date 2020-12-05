/**
 * 内部日语用的翻译器
 */
import { encode, decode } from 'shiftjis'

/**
 * 生成一个Array
 * @param {number} length
 * @param {number} [initValue]
 * @returns {number[]}
 */
export function generateArray (length, initValue = 0) {
  if (!length) {
    throw new Error('length is required')
  }
  return Array.from(new Array(length)).map(() => initValue)
}

/**
 * buffer转string
 * @param {ArrayBuffer} arrayBuffer
 */
export function buffer2string (arrayBuffer) {
  const uint8Array = new Uint8Array(arrayBuffer)

  // 这里因为长度的问题，其实buffer里填充用的，需要过滤掉填充字符
  const emptyFillIndex = uint8Array.indexOf(0)
  const buffer = uint8Array.slice(0, emptyFillIndex === -1 ? undefined : emptyFillIndex)
  const text = decode(buffer)

  return text
}

export function string2buffer (text) {
  return encode(text)
}
