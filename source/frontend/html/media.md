---
title: 多媒体
order: 8
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

### `<embed>`和`<object>`元素

**用来嵌入多种类型的外部内容的通用嵌入工具**
- java小程序
- Flash
- PDF
- 视频
- SVG
- 图像内容

> 插件是一种对浏览器原生无法读取内容提供访问权限的软件
> 现如今，浏览器已经很强大了，足以满足各种各样的开发需求了，基本上可以摆脱插件了

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

### 矢量图形

- 用处

**拥有较小的文件尺寸，高度可缩放，不会在镜头拉近或放大图像时像素化**

- 定义

**位图：**
**使用像素网格来定义 - 一个位图文件精确的包含了每个像素的位置和它的色彩信息。流行的位图格式：**

- `.bmp`
- `.png`
- `.jpg`
- `.gif`

**矢量图：**
**使用算法来定义 - 一个矢量图文件包含了图形和路径的定义，电脑可以根据这些定义计算出当它们在屏幕上渲染时应该呈现的样子。**
`svg`格式可以让我们创造用于`web`的精彩的矢量图形。

`svg`优点：
- 矢量图像中的文本依然可以访问（利于`seo`）
- `svg`可以很好的适应样式/脚本，因为图像的每个组件都可以通过css或js编写样式
`svg`缺点：
- 容易变得复杂
- 比图像更难创建
- 旧版浏览器不支持`svg`（`ie9+`）

### 将svg添加到桌面
例：`<img src="test.svg" />`

**优点：**
- 快速，熟悉的图像语法与alt属性中提供的内置文本等效
- 可以通过在`<a>`元素嵌套`<img>`,使图像轻松成为超链接

**缺点：**
- 无法使用js操作图像
- 若要使用css控制svg内容，必须在svg代码中包含内联css样式
- 不能用css伪类来重设图像样式

## 自适应图片

### example

```html
<img srcset="elva-fairy-320w.jpg 320w,
             elva-fairy-480w.jpg 480w,
             elva-fairy-800w.jpg 800w"
     sizes="(max-width: 320px) 280px,
            (max-width: 480px) 440px,
            800px"
     src="elva-fairy-800w.jpg" 
     alt="Elva dressed as a fairy" />
```

`srcset`定义了我们允许浏览器选择的图像集，以及每个图像的大小。在每个逗号之前，我们写：
- 一个文件名 (`elva-fairy-480w.jpg`)
- 一个空格

图像的固有宽度（以像素为单位）（`480w`）——注意到这里使用w单位，而不是你预计的`px`。这是图像的真实大小，可以通过检查你电脑上的图片文件找到（例如，在`Mac`上，你可以在`Finder`上选择这个图像，然后按 `Cmd + I` 来显示信息）。
sizes定义了一组媒体条件（例如屏幕宽度）并且指明当某些媒体条件为真时，什么样的图片尺寸是最佳选择—我们在之前已经讨论了一些提示。在这种情况下，在每个逗号之前，我们写：
一个媒体条件（`(max-width:480px)`）——你会在 `CSS` topic中学到更多的。但是现在我们仅仅讨论的是媒体条件描述了屏幕可能处于的状态。在这里，我们说 **当视窗的宽度是480像素或更少**。
当媒体条件为真时，图像将填充的槽的宽度（`440px`）
所以，有了这些属性，浏览器会：

1. 查看设备宽度
1. 检查sizes列表中哪个媒体条件是第一个为真
1. 查看给予该媒体查询的槽大小
1. 加载srcset列表中引用的最接近所选的槽大小的图像

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