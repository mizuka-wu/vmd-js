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

