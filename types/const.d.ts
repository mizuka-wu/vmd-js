import BoneFrame from './frame/BoneFrame'
import CameraFrame from './frame/CameraFrame'
import LightFrame from './frame/LightFrame'
import MorphFrame from './frame/MorphFrame'

/**
 * 数据类型
 */
export type Type = Uint16Array | Uint32Array | Uint8Array | Int8Array | Int16Array | Int32Array | Float32Array | Float64Array

export type FrameType = BoneFrame | CameraFrame | LightFrame | MorphFrame