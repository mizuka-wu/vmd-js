# Vmd.js

Load and modify your `Mikumikudance vmd` file with `js`!

## Features

The `Vmd` file is a binary file. At present, it can only be edited by the `mikumikudance.exe` on `windows`.

### Only javascript

read `ArrayBuffer` of the file, thanks

* [Official document](http://mikumikudance.wikia.com/wiki/VMD_file_format)
* [[MMD] Use python to parse VMD format to read](https://www.jianshu.com/p/ae312fb53fc3?from=groupmessage&isappinstalled=0)

for the document of reading vmd file

### Timeline

The object returned by vmd.js will add a `timeline` attribute, which can be used to view by `FrameTime`

## Examples

### Installation

```bash
npm i vmd.js
# or
yarn add vmd.js
```

### Import it

```javascript

import Vmd from'vmd.js'

// or

const Vmd = require('vmd')
```

### Create vmd from file

```javascript

fetch('test.vmd')
  .then(res => res.blob())
  .then(blob => blob.arrayBuffer())
  .then(arrayBuffer => new Vmd(arrayBuffer))

```

### Export vmd as arrayBuffer

```javascript

import {saveAs} from'file-saver'
const arrayBuffer = vmd.write()
    const url = URL.createObjectURL(new Blob([arrayBuffer]))
    saveAs(url,'your.vmd')

```

## Some Attribute provided

### VERSION

`V1`, `V2` version string

### BONE_NAME

The list of bone names in Japanese, like `['センター','upper body','头','头', ...]`

### BoneFrame

Bone frame

* boneName
* frameTime
* translation
* rotation
* curveX
* curveY
* curveZ
* curveR

### MorphFrame

Emoticon frame

* morphName
* frameTime
* weight

### CameraFrame

Camera frame

* frameTime
* distance
* position
* rotation
* curve
* viewAngle
* orthographic

### LightFrame

Light frame

* frameTime
* rgb
* direction

## Vmd class

Contains all the data of the `vmd` file

### Variable

* version - version, there is V1 and V2
* modelName - model name, have length limit
* boneFrames - bone key frames
* morphFrames - Emoji key frames
* cameraFrames - camera key frames
* lightFrames - light key frames

* **timeline** - read-only variable, automatically sorted according to the key frame time`{frameTime: number, boneFrames: BoneFrame[], morphFrames: MorphFrame[], cameraFrames: CameraFrame[], lightFrames: LightFrame[]}[]`

### Method

#### write

Regenerate the data into a binary file, you can export this `ArrayBuffer` as a file
