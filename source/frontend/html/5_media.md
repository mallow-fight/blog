---
title: 多媒体
order: 5
type: html
---

## 多媒体与嵌入

### iframe

#### 基本要素

- allowfullscreen

- frameborder: 默认是1，会在此框架和其他框架之间绘制边框，0:删除边框

- src

- width/height

- 备选内容: 防止不支持iframe的情况

- sandbox: 提高安全性设置

**为了提高速度，在主内容完成加载后，使用js设置iframe的src属性是个好主意,这使得页面可以更快的使用，并减少您的官方页面加载时间（重要的seo指标）**

### 安全隐患

- 只有在必要时嵌入

  - 安全问题

  - 知识产权问题

- 使用https

  - https减少了远程内容在传输过程中被篡改的机会

  - https防止嵌入式内容访问您的父文档中的内容，反之亦然

- 始终使用sandbox属性

  - 沙箱：一个代码可以适当使用或用于测试的容器，但不能对其他代码库造成任何损害称为沙箱

- 配置CSP指令

## 图片

### 注意事项
- 图片存储在和`HTML`页面同路径的`images`文件夹下，利于`SEO`/索引
- 搜索引擎也读取图像的文件名并把他们计入`SEO`，因此给图片取一个描述性的文件名
- 选取相对路径优于绝对路径，绝对路径会使浏览器做更多的工作，例如重新通过`DNS`寻找`ip`地址，所以通常会把`html`和图片放在同一个服务器上

### 备选文本
**内容取决于该图片想要表现的内容**

### 图片尺寸
**使用`html`属性来改变图片大小**
- 尺寸设定的太大了：图片会模糊
- 尺寸设定的太小了：下载图片时会浪费带宽
- 尺寸设定的不对：图片会扭曲

> 如果你需要改变图片尺寸，你应该使用`CSS`而不是`HTML`

### title

**没有空间时可以使用**

### 解说图片

```html
<figure>
  <img src="xxx" />
  <figcaption>a handsome dog.</figcaption>
</figure>
```

### css背景图片

**如果图像对您的内容有意义，则应使用HTML图像。如果图像纯粹是装饰，则应使用CSS背景图片。**

## 视频

### 标签`（<video>）`

1. src: 视频资源

1. controls: 控制视频的组件

1. `<video>`标签内的段落: 后备内容，当浏览器不支持该标签时，会显示出来

### 多格式支持

```html
<video controls>
  <source src="test.mp4" type="video/mp4">
  <source src="test.webm" type="video/webm">
  <p>your brower doesn't support HTML5 video. Here is a 
    <a href="test.xxx">link to the video</a>
  </p>
</video>
```

### 特性

1. width/height：`<audio>`不支持，无视觉部件

1. autoplay：自动播放

1. loop：循环播放

1. muted：默认关闭声音

1. poster：视频播放前显示的图片 `<audio>`不支持，无视觉部件

1. preload：缓冲较大的文件

  `none`: 不缓冲

  `auto`: 页面加载后缓存媒体文件

  `metadata`: 仅缓冲文件的元数据

### 音轨文本

**种类：**

1. subtitle: 翻译字幕

1. captions: 同步翻译对白, 帮助不能听音频的人

1. timed descriptions: 文字转换为音频，用于服务有视觉障碍的人

例：
```html
<video controls>
  <source src="test.mp4" type="video/mp4">
  <source src="test.webm" type="video/webm">
  <track kind="subtitles" src="subtitles_en.vtt" srclang="en">
</video>
```