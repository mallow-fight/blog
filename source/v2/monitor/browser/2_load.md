---
title: 加载
order: 2
type: v2/monitor/browser
---

## DOMContentLoaded

- html文档初始化加载和解析完成，没有等待样式表、图片完成。

## load

- 整个页面已经加载完成了，包括所有独立的资源如：样式表、图片等。

## scripts

**现代浏览器的脚本文件经常比html更大，当浏览器加载html遇到script标签的时候，它会停止解析DOM，这个时候进行一些优化就显得很必要了。**


## defer（推迟）

1. 不会阻塞界面初始化。
2. 在DOM准备好之后，DOMContentLoaded事件之前执行。

## async

1. 完全独立的脚本。
2. 非常适合整合一些第三方脚本（如评论、广告等），双方都不依赖。

## 动态脚本（通过js创建）

1. 默认async为true，即完全独立。
2. 可修改为async为false。

