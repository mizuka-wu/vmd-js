# Vmd.js

用`js`加载和修改你的`Mikumikudance vmd`文件！

## 特性

`Vmd`文件是一个二进制文件，目前除了使用各类加载器直接加载读取以外，只能通过`windows`上的`mikumikudance`工具进行编辑然后保存导出

### 纯js解析

根据大佬的文件格式解析文档，对`ArrayBuffer`直接读取二进制流然后解析，感谢

* [官方文档](http://mikumikudance.wikia.com/wiki/VMD_file_format)
* [【MMD】用python解析VMD格式读取](https://www.jianshu.com/p/ae312fb53fc3?from=groupmessage&isappinstalled=0)

### 时间轴

vmd.js返回的对象会添加一个`timeline`属性，可以根据这个来查看`timeLine`

## 例子

### 安装

```bash
npm i vmd.js
# or
yarn add vmd.js
```

### 引入

```javascript

import Vmd from 'vmd.js'

// or

const Vmd = require('vmd')
```

### 从文件创建vmd

```javascript

fetch('test.vmd')
  .then(res => res.blob())
  .then(blob => blob.arrayBuffer())
  .then(arrayBuffer => new Vmd(arrayBuffer))

```

### 将vmd导出为arrayBuffer

```javascript

import { saveAs } from 'file-saver'
const arrayBuffer = vmd.write()
    const url = URL.createObjectURL(new Blob([arrayBuffer]))
    saveAs(url, 'your.vmd')

```

## 提供的一些工具类

### VERSION

`V1`, `V2` 版本的字符串

### BONE_NAME

日语的骨骼名名单 类似于`['センター', '上半身', '首', '頭', ...]`

### BoneFrame

骨骼帧

* boneName
* frameTime
* translation
* rotation
* curveX
* curveY
* curveZ
* curveR

### MorphFrame

表情帧

* morphName
* frameTime
* weight

### CameraFrame

摄影机帧

* frameTime
* distance
* position
* rotation
* curve
* viewAngle
* orthographic

### LightFrame

光线帧

* frameTime
* rgb
* direction

## Vmd类

包含了`vmd`文件的所有数据

### 变量

* version - 版本，有V1 和 V2的区别
* modelName - 模型名字，有长度限制
* boneFrames - 骨骼关键帧
* morphFrames - 表情关键帧
* cameraFrames - 镜头关键帧
* lightFrames - 光线关键帧

* **timeline** - 只读变量，根据关键帧的时间自动排序 `{frameTime: number, boneFrames: BoneFrame[], morphFrames: MorphFrame[], cameraFrames: CameraFrame[], lightFrames: LightFrame[]}[]`

### 方法

#### write

将数据重新生成二进制文件，可以将这个`ArrayBuffer`导出为文件
