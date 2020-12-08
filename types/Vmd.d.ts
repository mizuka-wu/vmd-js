import BoneFrame from './frame/BoneFrame'
import CameraFrame from './frame/CameraFrame'
import LightFrame from './frame/LightFrame'
import MorphFrame from './frame/MorphFrame'

export type VERSION = {
    V1: 'Vocaloid Motion Data file',
    V2: 'Vocaloid Motion Data 0002'
}

export default class Vmd {
    constructor(buffer: ArrayBuffer)

    version: VERSION[keyof VERSION];

    /**
     * @type {string} 当前使用的模型名字
     */
    modelName: string

    /**
     * 骨骼关键帧
     */
    boneFrames: BoneFrame[]
    /**
     * 表情关键帧
     */
    morphFrames: MorphFrame[]
    /**
     * 镜头关键帧
     */
    cameraFrames: CameraFrame[]
    /**
     * 光线关键帧
     */
    lightFrames: LightFrame[]

    get timeline(): {
        frameTime: number,
        boneFrames: BoneFrame[],
        cameraFrames: CameraFrame[],
        lightFrames: LightFrame[],
        morphFrames: MorphFrame[]
    }[]

    write(): ArrayBuffer
}