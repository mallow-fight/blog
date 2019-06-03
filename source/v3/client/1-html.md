---
title: html
order: 1
type: v3/client
---

## html5

### 语义

**能够让你更恰当地描述你的内容是什么**

#### 字段和提纲

- `<header>`：头部 
- `<nav>`：导航链接
- `<section>`：节、区段
- `<aside>`：侧边栏
- `<article>`：可独立分配或可服用的结构，如论坛帖子、杂志、新闻文章、博客、用户提交的评论、交互式组件
- `<footer>`：脚部
- `<hgroup>`：代表一个段的标题，通常它的内容就是这些标题段

### 连通性

**能够让你和服务器之间通过创新的新技术方法进行通信**

- `web sockets`：允许在页面和服务器之间建立持久连接并通过这种方法来交换非HTML数据

- `server-sent events`：允许服务器向客户端推送事件，而不是仅在响应客户端请求时服务器才能发送数据的传统范式

- `webRTC`：RTC代表即时通信，允许连接到其他人，直接在浏览器中控制视频会议，而不需要一个插件或是外部的应用程序

### 离线 & 存储

**能够让网页在客户端本地存储数据以及更高效地离线运行**

- 离线资源（应用程序缓存）：火狐全面支持HTML5离线资源规范，其他大多数针对离线资源仅提供了某种程度上的支持
>[参考](https://www.zhangxinxu.com/wordpress/2017/07/service-worker-cachestorage-offline-develop/)

- 在线和离线事件：Firefox 3支持WHATWG在线和离线事件，这可以让应用程序和扩展检测是否存在可用的网络连接，以及在连接建立和断开时能感知到

- DOM存储：客户端会话和持久化存储让web应用程序能够在客户端存储结构化数据

- IndexedDB：为了能够在浏览器中存储大量结构化数据，并且能够在这些数据上使用索引进行高性能检索的Web标准

- 选择使用本地文件：对新的 `HTML5` 文件 `API` 的支持已经被添加到 `Gecko` 中，从而使 `Web` 应用程序可以访问由用户选择的本地文件。这包括使用 `type = file` 的 `<input>` 元素的新的 `multiple` 属性针对多文件选择的支持。 还有 `FileReader`。

### 多媒体

**使video和audio成为了在所有web中的一等公民**

- 使用HTML5音视频：`<audio>`和`<video>`元素嵌入并支持新的多媒体操作内容的操作

- Camera：允许使用，操作计算机摄像头，并从中存储图像

- Track & WebVTT：`<track>`元素支持字幕和章节，`WebVTT`是一个文本轨道格式

### 2D/3D 绘图 & 效果

**提供了一个更加分化范围的呈现选择**

- canvas

- WebGL：非常符合OpenGL ES2.0并且可以用在HTML5`<canvas>`元素中的API给web带来了3D图像功能

- SVG：基于XML可以直接嵌入到HTML中的矢量图像格式

### 性能 & 集成

**提供了非常显著的性能优化和更有效的计算机硬件使用**

- web workers：能够把js计算委托给后台线程，通过允许这些活动以防止使交互型事件变得缓慢

- XMLHttpRequest Level 2：允许异步读取页面的某些部分，允许其显示动态内容，根据时间和用户行为而有所不同。这是在Ajax背后的技术

- 即时编译的js引擎：新一代的js引擎功能更强大，性能更杰出

- History：允许对浏览器历史记录进行操作，这对于那些交互地加载新信息的页面尤其有用

- contentEditable属性：把你的网站变成wiki

- 拖放：支持在网站内部和网站之间拖放项目，同时也提供了一个更简单的供扩展和基于Mozilla的应用程序使用的API

- 焦点管理：支持`activeElement`和`hasFocus`属性

- 基于Web的协议处理程序：你现在可以使用`navigator.registerProtocolHandler()`方法把web应用程序注册成一个协议处理程序

- requestAnimationFrame：允许控制动画渲染以获得更优性能

- 全屏：为一个网页或者应用程序控制使用整个屏幕，而不显示浏览器界面

- 指针锁定：允许锁定到内容的指针，这样游戏或者类似的应用程序在指针到达窗口限制时也不会失去焦点

### 设备访问 Device Access

**能够处理各种输入和输出设备**

- camera：允许使用和操作计算机的摄像头，并从中存取照片。

- 触控事件：对用户按下触控屏的事件做出反应的处理程序。

- 使用地理位置定位：让浏览器使用地理位置服务定位用户的位置。

- 检测设备方向：让用户在运行浏览器的设备变更方向时能够得到信息，这可以被用作一种输入设备或者使页面的布局跟屏幕的方向相适应

- 指针锁定：允许锁定到内容的指针，这样游戏或者类似的应用程序在指针到达窗口限制时也不会失去焦点

### 样式设计：创作更加复杂的主题

**CSS已经扩展到能够以一个更加复杂的方法给元素设置样式，这通常被称为CSS3，尽管CSS已经不再是很难触动的规范，并且不同的模块并不全部位于level3：其中一些位于level1而另一些位于level4，覆盖了所有中间的层次**

- 新的背景样式特性：现在可以使用`box-shadow`给逻辑框设置一个阴影，而且可以设置多背景

- 更精美的边框：现在不仅可以使用图像来格式化边框，使用`border-image`和它关联的普通属性，而且可以通过`border-radius`属性来支持圆角边框

- 为你的样式设置动画：使用CSS Transitions以在不同的状态间设置动画，或者使用CSS Animations在页面的某些部分设置动画而不需要一个触发事件，你现在可以在页面中控制移动元素了

- 排版方面的改进：不但可以控制`text-overflow`和`hyphenation`，还可以给它设置一个阴影或者更精细地控制它的`decorations`。感谢新的`@font-face`规则，现在我们可以下载并应用自定义的字体了

- 新的展示性布局：为了提高设计的灵活性，已经有两种新的布局被添加了进来：CSS多栏布局(cloumn)，以及CSS灵活方框布局(flex)

## 知识点

### data

- data-* 全局属性 是一类被称为自定义数据属性的属性，它赋予我们在所有 HTML 元素上嵌入自定义数据属性的能力，并可以通过脚本(一般指JavaScript) 与 HTML 之间进行专有数据的交换。

>[参考](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/data-*)

### url&path

- 绝对路径：完整的访问路径
- 相对路径：相对本身的访问路径
- 文档片段：定位到某个文档id为#xxx的片段

### 元素类型

- 行内：a、span、img、input、select、strong
- 块级：div、ul、li、h1、p
- 空：br、img、hr、input、link、meta、source

## 定义

**HTML 是用超文本标记语言（一套标记标签）来描述网页的一种语言，它不是一种编程语言。**

## HTML5新增内容

> [参考资料](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/HTML5)

**通常，html5、css3和js在一起统称为HTML5**

### 语义

**能够让你更恰当地描述你的内容是什么**

- 字段和提纲
  - `<section>`
  - `<article>`
  - `<nav>`
  - `<header>`
  - `<footer>`
  - `<aside>`
  - `<hgroup>`

- 音频和视频
  - `<audio>`
  - `<video>`

- 表单
  - `required`：强制验证
  - `<input>`：属性`type`的一些新值
  - `<output>`：新的元素

- 语义元素
  - `<mark>`
  - `<figure>`
  - `<figcaption>`
  - `<data>`
  - `<time>`
  - `<output>`
  - `<progress>`
  - `<meter>`
  - `<main>`

- `<iframe>`
  - `sandbox`
  - `seamless`
  - `srcdoc`
  - 通过这些属性，可以精确的控制安全级别以及期望的渲染

- 允许直接嵌入数学公式
  - MathML

### 连通性

**能够让你和服务器之间通过创新的新技术方法进行通信**

- web sockets：允许在页面和服务器之间建立持久连接并通过这种方法来交换非HTML数据

- server-sent events：允许服务器向客户端推送事件，而不是仅在响应客户端请求时服务器才能发送数据的传统范式

- webRTC：RTC代表即时通信，允许连接到其他人，直接在浏览器中控制视频会议，而不需要一个插件或是外部的应用程序

### 离线 & 存储

**能够让网页在客户端本地存储数据以及更高效地离线运行**

- 离线资源（应用程序缓存）：火狐全面支持HTML5离线资源规范，其他大多数针对离线资源仅提供了某种程度上的支持

- 在线和离线事件：Firefox 3支持WHATWG在线和离线事件，这可以让应用程序和扩展检测是否存在可用的网络连接，以及在连接建立和断开时能感知到

- DOM存储：客户端会话和持久化存储让web应用程序能够在客户端存储结构化数据

- IndexedDB：为了能够在浏览器中存储大量结构化数据，并且能够在这些数据上使用索引进行高性能检索的Web标准

- 选择使用本地文件：对新的 `HTML5` 文件 `API` 的支持已经被添加到 `Gecko` 中，从而使 `Web` 应用程序可以访问由用户选择的本地文件。这包括使用 `type = file` 的 `<input>` 元素的新的 `multiple` 属性针对多文件选择的支持。 还有 `FileReader`。

### 多媒体

**使video和audio成为了在所有web中的一等公民**

- 使用HTML5音视频：`<audio>`和`<video>`元素嵌入并支持新的多媒体操作内容的操作

- WebRTC：允许连接到其他人，在浏览器中直接控制视频会议，而不需要一个插件或是外部的应用程序

- Camera：允许使用，操作计算机摄像头，并从中存储图像

- Track & WebVTT：`<track>`元素支持字幕和章节，`WebVTT`是一个文本轨道格式

### 2D/3D 绘图 & 效果

**提供了一个更加分化范围的呈现选择**

- canvas

- WebGL：非常符合OpenGL ES2.0并且可以用在HTML5`<canvas>`元素中的API给web带来了3D图像功能

- SVG：基于XML可以直接嵌入到HTML中的矢量图像格式

### 性能 & 集成

**提供了非常显著的性能优化和更有效的计算机硬件使用**

- web workers：能够把js计算委托给后台线程，通过允许这些活动以防止使交互型事件变得缓慢

- XMLHttpRequest Level 2：允许异步读取页面的某些部分，允许其显示动态内容，根据时间和用户行为而有所不同。这是在Ajax背后的技术

- 即时编译的js引擎：新一代的js引擎功能更强大，性能更杰出

- History：允许对浏览器历史记录进行操作，这对于那些交互地加载新信息的页面尤其有用

- contentEditable属性：把你的网站变成wiki

- 拖放：支持在网站内部和网站之间拖放项目，同时也提供了一个更简单的供扩展和基于Mozilla的应用程序使用的API

- 焦点管理：支持`activeElement`和`hasFocus`属性

- 基于Web的协议处理程序：你现在可以使用`navigator.registerProtocolHandler()`方法把web应用程序注册成一个协议处理程序

- requestAnimationFrame：允许控制动画渲染以获得更优性能

- 全屏：为一个网页或者应用程序控制使用整个屏幕，而不显示浏览器界面

- 指针锁定：允许锁定到内容的指针，这样游戏或者类似的应用程序在指针到达窗口限制时也不会失去焦点

- 在线和离线事件：为了构建一个良好的具有离线功能的web应用程序，你需要知道什么时候你的应用程序确实离线了，顺便提一句，在你的应用程序又再回到在线状态时你也需要知道

### 设备访问 Device Access

**能够处理各种输入和输出设备**

- camera：允许使用和操作计算机的摄像头，并从中存取照片。

- 触控事件：对用户按下触控屏的事件做出反应的处理程序。

- 使用地理位置定位：让浏览器使用地理位置服务定位用户的位置。

- 检测设备方向：让用户在运行浏览器的设备变更方向时能够得到信息，这可以被用作一种输入设备或者使页面的布局跟屏幕的方向相适应

- 指针锁定：允许锁定到内容的指针，这样游戏或者类似的应用程序在指针到达窗口限制时也不会失去焦点

## 样式设计：创作更加复杂的主题

**CSS已经扩展到能够以一个更加复杂的方法给元素设置样式，这通常被称为CSS3，尽管CSS已经不再是很难触动的规范，并且不同的模块并不全部位于level3：其中一些位于level1而另一些位于level4，覆盖了所有中间的层次**

- 新的背景样式特性：现在可以使用`box-shadow`给逻辑框设置一个阴影，而且可以设置多背景

- 更精美的边框：现在不仅可以使用图像来格式化边框，使用`border-image`和它关联的普通属性，而且可以通过`border-radius`属性来支持圆角边框

- 为你的样式设置动画：使用CSS Transitions以在不同的状态间设置动画，或者使用CSS Animations在页面的某些部分设置动画而不需要一个触发事件，你现在可以在页面中控制移动元素了

- 排版方面的改进：不但可以控制`text-overflow`和`hyphenation`，还可以给它设置一个阴影或者更精细地控制它的`decorations`。感谢新的`@font-face`规则，现在我们可以下载并应用自定义的字体了

- 新的展示性布局：为了提高设计的灵活性，已经有两种新的布局被添加了进来：CSS多栏布局(cloumn)，以及CSS灵活方框布局(flex)

## 定义

- 由尖括号包围的关键词，比如 `<html>`

- 通常是成对出现的，比如 `<b>` 和 `</b>`

- 标签对中的第一个标签是开始标签，第二个标签是结束标签

- 开始和结束标签也被称为开放标签和闭合标签

## 结构化网站

- 标题: `<header>`

- 导航栏: `<nav>`

- 主要内容: `<main>`, 具有代表性的内容段落主题可以使用 `<article>`, `<section>`, 和 `<div>` 元素

- 侧栏: `<aside>`; 经常嵌套在 `<main>` 中

- 页脚: `<footer>`

## 没有特定语义

- `span`是一个`行内无语义元素`，你应该仅仅当`无法找到更好的语义元素包含内容`时使用，或者`不想增加特定的含义`

- `div`是一个`块级无语义元素`，你应该仅仅当`找不到更好的块级元素`时使用，或者`不想增加特定的含义`

<p class="tip">`div`用起来非常便利以至于很容易被滥用。因为它们不携带语义值，所以会让你的HTML代码变的混乱。要小心的使用它们，只有当没有更好的语义解决方案才能使用，而且要尽可能把它的使用量降到最低，否则，当你升级和维护你的文档时会非常困难。</p>

## 换行

- `<br>`在一个段落中创建一个换行

- `<hr>`在文档中生成一条水平分割线

## figure(描绘)

```html
<figure>
  <img src="images/dinosaur.jpg"
       alt="The head and torso of a dinosaur skeleton;
            it has a large head with long sharp teeth"
       width="400"
       height="341">
  <figcaption>A T-Rex on display in the Manchester University Museum.</figcaption>
</figure>
```

>如果图像对您的内容里有意义，则应使用HTML图像。 如果图像纯粹是装饰，则应使用CSS背景图片。

## HTML5示例

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>My test page</title>
  </head>
  <body>
    <p>This is my page</p>
  </body>
</html>
```

- `<!DOCTYPE html>`：最短的有效的文档声明

- `<html>`：包裹了整个完整的页面，是一个**根元素**

- `<head>`：一个容器，它包含了所有你想包含在HTML页面中但不想在HTML页面中显示的内容。这些内容包括你想在搜索结果中出现的关键字和页面描述，CSS样式，字符集声明等

- `<meta charset="utf-8">`：设置文档使用`utf-8`字符集编码，`utf-8`字符集包含了人类大部分的文字，使用它能避免很多问题

- `<title>`：设置页面标题，出现在浏览器标签上，当你`标记/收藏`页面时它可用来描述页面

- `<body>`：包含了你访问页面时所有显示在页面上的内容，文本，图片，音频，游戏等

## 元素

### 组成

- 开始标签，例：`<p>`

- 结束标签，例：`</p>`

- 内容：`开始标签` + `结束标签`之间的`文本` + `嵌套元素`

- 元素：`开始标签` + `内容` + `结束标签` 组成的整个元素

### 嵌套

**元素可以放置在其它元素中**

### 种类

#### 块级元素

- 每个块级元素独占一行

- 元素的`height`、`width`、`line-height`、`margin-top`、`margin-bottom`都可设置

- 元素宽度在不设置的情况下，是它本身父容器的100%，除非设定一个宽度

#### 内联元素

- 和其他元素都在一行上

- 元素的`height`、`width`、`margin-top`、`margin-bottom`都不可设置

- 元素的宽度就是它包含的文字或图片的宽度，不可改变

- 多个内联元素的宽度超过行宽时，会自动换行

#### 内联块状元素

- 和其他元素都在一行上

- 元素的`height`、`width`、`line-height`、`margin-top`、`margin-bottom`都可设置

- 多个内联块状元素的宽度超过行宽时，会自动换行

#### 空元素

- 开始标签和结束标签之间内容和嵌套元素不生效的元素，例：

  - `<img>`

  - `<input>`

### 属性

**标准结构：一个空格 + 属性名 + `=` + 带双引号的属性值**

### 布尔属性

**可以设置布尔值的属性，例：`<button disabled>`，如果不设置属性值，默认是`true`**

### 包围属性的引号

**可以不写，可以单引号，也可以双引号，但是强烈建议使用双引号，单引号留给脚本文件，这是业界默认标准**

## 统一资源定位器(URL)与路径(path)

### 指向相同目录
```html
<a href="contacts.html">contacts page</a>
```

### 指向子目录
```html
<a href="projects/child.html">go to child</a>
```

### 指向上级目录
```html
<a href="../parent/parent.html">go to parent</a>
```

### 文档片段
```html
<!-- 当前页面跳转到指定元素 -->
<a href="#test"> go to test</a>
<p id="test">this is test</p>

<!-- 跳转到不同页面的指定元素 -->
<a href="test.html#test">
<!-- test.html -->
<p id="test">this is test.html #test</p>
```

### 绝对链接

**访问文件的完整链接，可以是服务器上的路径，也可以是本地路径。**

> 绝对URL总是指向相同的位置，不管它在哪里使用。
> 一般可以省略`index.html`，这是访问一个链接的默认文件名。

### 相对链接

**相对于当前文件的路径，一般较短，推荐使用。**

### 总结
- 用清晰的链接措辞

- 尽可能使用相对链接

- 链接到非html资源时，留下清晰的指示

- 在下载链接时使用下载属性

- 当您链接到要下载的资源而不是在浏览器中打开时，您可以使用下载属性来提供一个默认的保存文件名。下面是一个下载链接到`Firefox 39 Windows`版本的示例：
```html
<a href="https://download.mozilla.org/?product=firefox-39.0-SSL&os=win&lang=en-US"
   download="firefox-39-installer.exe">
  Download Firefox 39 for Windows
</a>
```

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

## 页面测试以及排错

### 测试网站
- [w3c](https://validator.w3.org/)

### 测试工具
- 根据谷歌开发者工具提供的功能排查

### 测试方法

- 单元测试（测试逻辑）

- 集成测试（测试渲染状况）

### 自动化测试

**`Selenium`是最流行的浏览器自动化测试工具。最易使用的方法是使用基于`Selenium`的`WebDriver API`，它通过调用浏览器接口实现自动化，执行诸如“打开网页”、“移动网页上的元素”、“点击链接”、“查看链接是否打开URL”等。对于运行自动化测试来说是一个十分理想的方法。**

### vconsole

**适用于移动端的调试以及查看日志工具**

>[仓库地址](https://github.com/Tencent/vConsole)

## H5新增内容
[H5新增内容](./define.html)

## 行内元素有哪些？块级元素有哪些？空（void）元素有哪些？
1. 行内元素：a、b、span、img、input、select、strong

1. 块级元素：div、ul、ol、li、dl、dt、dd、h1、h2、h3、h4、p

1. 空元素：br、hr、img、input、link、meta、area、base、col、command、embed、keygen、param、source、track、wbr

## 如何实现浏览器多个标签页之间的通信？
- WebSocket
- SharedWorker
- 调用localstorage、cookies等本地储存方式
  - localstorage在另一个上下文里被添加、修改或删除时，会触发一个事件，通过监听事件，控制它的值来进行页面信息通信（注意：Safari在无痕模式下设置localstorage值时会抛出QuotaExceedError的异常）
  - 触发事件仅限于同域名
  ```js
  window.addEventListener('storage', function (event) {
    console.log(event.key, event.newValue);
  });
  ```

## webSocket如何兼容低版本浏览器？
- Adobe Flash Socket
- ActiveX HTMLFile（IE）
- 基于multipart编码发送的XHR
- 基于长轮询的XHR

## 页面可见性可以有哪些用途？
通过visibilityState的值检测当前页面是否可见，以及打开网页的时间等，在页面被切换到后台其他进程的时候，自动暂停音乐或视频的播放。

## Doctype作用？标准模式和兼容模式各有什么区别？
1. `<!DOCTYPE>`声明位于HTML文档的第一行，处于`<html>`标签之前。告知浏览器的解析器用什么文档标准来解析这个文档。DOCTYPE不存在或格式不正确会导致文档以兼容模式呈现。
1. 标准模式的排版和JS运作模式都是以该浏览器支持的最高标准运行。在兼容模式中，页面以宽松的向后兼容的方式显示，模拟老式浏览器的行为以防止站点无法工作。

## 什么是SGML？什么是DTD？
- SGML：标准通用标记语言（Standard Generalized Markup Language，SGML）是现时常用的超文本格式的最高层次标准，是可以定义标记语言的元语言，甚至可以定义不必采用< >的常规方式。由于它的复杂，因而难以普及。

- DTD：概念缘于SGML，每一份SGML文件，均应有相对应的DTD。对XML文件而言，DTD并非特别需要，well-formed XML就不需要有DTD。DTD有四个组成如下：
  - 元素（Elements）
  - 属性（Attribute）
  - 实体（Entities）
  - 注释（Comments）

## H5为什么只需要写<!DOCTYPE HTML>?
- H5不基于SGML，因此不需要对DTD进行引用，但是需要doctype来规范浏览器的行为（让浏览器按照它们应该的方式来运行）
- H4.01基于SGML，所以需要对DTD进行引用，才能告知浏览器文档所使用的文档类型

## 页面导入样式时，使用link和@import有什么区别？
1. link属于XHTML标签，除了加载CSS外，还能用于定义RSS，定义rel连接属性等作用，而@import是CSS提供的，只能用于加载CSS

1. 页面被加载时，link会同时被加载，而@import引用的CSS会等到页面被加载完再加载

1. import是CSS2.1提出的，值在IE5以上才能被识别，而link是XHTML标签，无兼容问题

1. link支持使用js控制DOM去改变样式，而@import不支持

## 介绍一下你对浏览器内核的理解？
**主要分为两个部分：**
1. 渲染引擎：负责取得页面的内容（HTML、XML、图像等）、整理讯息（加入CSS），以及计算网页的显示方式，然后会输出至显示器

1. JS引擎：解析和执行js来实现网页的动态效果

1. 最开始渲染引擎和JS引擎并没有明确区分，后来JS引擎越来越独立，内核就倾向于指渲染引擎

## 常见的浏览器内核有哪些？
1. Trident内核：IE、MaxThon、TT、The World、360、搜狗浏览器。[又称MSHTML]

1. Gecko内核：Netscape6及以上版本、FF、MozillaSuite/SeaMonkey等。

1. Presto内核：Opera7及以上。[Opera内核原为：Presto，现为：Blink]

1. WebKit内核：Safari、Chrome等。[Chrome: Blink(WebKit的分支)]

## H5有哪些新特性？移除了哪些元素？如何处理H5新标签的浏览器兼容问题？如何区分HTML和H5？
- H5现在已经不是SGML的子集，主要是关于图像、位置、存储、多任务等功能的增加。
  - 绘画canvas
  - video、audio
  - localStorage、sessionStorage
  - 语意化：article、footer、header、nav、section
  - 表单控件：calendar、date、time、email、url、search
  - 新的技术：webworker、websocket、Geolocation

- 移除的元素
  - 纯表现的元素：basefont、big、center、font、s、strike、tt、u
  - 对可用性产生负面影响的元素：frame、frameset、noframes

- 如何支持H5新标签
  - IE8/IE7/IE6支持通过document.createElement方法产生的标签，可以利用这一特性让这些浏览器支持HTML5标签，浏览器支持新标签后，还需要添加标签默认的样式，当然也可以直接使用成熟的框架，比如html5shim：
  ```html
  <!-- [if it IE 9]>
  <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
  <![endIf]-->
  ```

- 如何区分H5：DOCTYPE声明、新增的结构元素、功能元素

## 简述一下你对HTML语义化的理解？
**用正确的标签做正确的事，html语义化让页面的内容结构化，结构更清晰，便于浏览器、搜索引擎解析。即使在没有样式的情况下也以一种文档格式显示，并且是容易阅读的。搜索引擎的爬虫也依赖于HTML标记来确定上下文和各个关键字的权重，利于SEO。使阅读源代码的人更荣誉将网站分块，便于阅读维护理解。**

## H5的离线存储怎么使用，工作原理？
- 在用户没有与因特网连接时，可以正常访问站点或应用，在用户与因特网连接时，更新用户机器上的缓存文件
- 原理：H5的离线存储是基于一个新建的.appcache文件的缓存机制（不是存储技术），通过这个文件上的解析清单离线存储资源，这些资源就会像cookie一样被存储了下来。之后当网络处于离线状态时，浏览器会通过被离线存储的数据进行页面展示。
- 如何使用：
  - 页面头部加入一个manifast属性
  - 在cache.manifest文件编写离线存储的资源
  - 在离线状态时，操作window.applicationCache进行需求实现

## 浏览器是怎么对H5的离线存储资源进行管理和加载呢？
**在线情况下，浏览器发现html头部有manifest属性，它会请求manifest文件，如果是第一次访问app，那么浏览器就会根据manifest文件下载相应的资源并且进行离线存储。如果已经访问过app并且已经离线存储了，那么浏览器就会使用离线资源加载页面。然后浏览器会对比新的manifest文件和旧的manifest文件，如果文件没有发生改变，就不做任何操作，如果文件改变了，那么就会重新下载文件中的资源并进行离线存储。离线的情况下，浏览器就直接使用离线存储的资源。**

## cookies、sessionStorage和localStorage的区别？
- cookie是网站为了标示用户身份而储存在用户本地终端上的数据（通常经过加密）。
- cookie数据始终在同源的http请求下携带（即使不需要），即会在浏览器和服务器间来回传递。
- 储存大小
  - cookie数据大小不能超过4k。
  - sessionStorage和localStorage虽然也有储存大小限制，但比cookie大得多。可以达到5M或更大。
- 有期时间
  - localStorage：储存持久数据，浏览器关闭后数据不丢失除非主动删除数据
  - sessionStorage：数据在当前浏览器窗口关闭后自动删除
  - cookie：设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭

## iframe有哪些优缺点？
- iframe会阻塞主页面的onLoad事件
- 搜索引擎的检索程序无法解读这种页面，不利于SEO
- iframe和主页面共享连接池，而浏览器对相同域的连接有限制，所以会影响页面的并行加载
- 使用iframe之前需要考虑这两个缺点，如果需要使用iframe，最好是通过js动态给iframe添加src属性，这样可以绕开以上两个问题

## Label的作用是什么？是怎么用的？
**label标签来定义表单控制间的关系，当用户选择该标签时，浏览器会自动将焦点转到和标签相关的表单控件上：**
```html
<label for="Name">Number:</label>
<input type="text" name="Name" id="Name" />
<label>Date:<input type="text" name="B" /> </label>
```

## H5的form如何关闭自动完成功能？
**给不想要提示的form或某个input设置：autocomplete=off**

## 如何在页面上实现一个圆形的可点击区域？
1. map+area或者svg
1. border-radius
1. 纯js实现，需要求一个点在不在圆上的简单算法，获取鼠标坐标等

## 实现不使用border画出1px高的线，在不同浏览器的标准模式与怪异模式下都能保持一致的效果。
```html
<div style="height: 1px; overflow: hidden; background: red"></div>
```

## 网页验证码是干嘛的，是为了解决什么安全问题。
- 区分用户是计算机还是人的公共全自动程序，可以防止恶意破解密码、刷票、论坛灌水
- 有效防止黑客对某一个特定注册用户用特定程序程序暴力破解方式进行不断的登录尝试

## title和h1的区别、b和strong的区别、i和em的区别
- title属性没有明确意义只表示是个标题，H1则表示层次明确的标题，对页面信息的抓取也有很大的影响。
- strong是标明重点内容，有语气加强的含义，使用阅读设备阅读网络时：strong会重读，而b是展示强调内容
- i内容展示为斜体，em表示强调的文本
- 标签类型
  - 自然样式标签：b、i、u、s、pre
  - 语义样式标签：strong、em、ins、del、code

- 应该准确使用语义样式标签，但不能滥用，如果不能确定时首选使用自然样式标签

## HTML&CSS
- 对Web标准的理解（结构、表现、行为）
- 浏览器内核
- 渲染原理
- 依赖管理
- 兼容性
- CSS语法
  - 层次关系
  - 常用属性
  - 布局
  - 选择器
  - 权重
  - 盒模型
  - Hack
  - CSS预处理器
  - CSS3
  - Flexbox
  - CSS Modules
  - Document flow
  - BFC
  - HTML5（离线&存储、History、多媒体、WebGL、SVG、Canvas）

## JavaScript
- 数据类型
- 运算
- 对象
- Function
- 继承
- 闭包
- 作用域
- 事件
- Prototype
- RegExp
- JSON
- Ajax
- DOM
- BOM
- 跨域
- 异步请求
- 模版引擎
- 模块化
- Flux
- 同构
- 算法
- ECMAScript6
- Nodejs
- HTTP

## 其他
- 主流MVVM框架（React、Vue、Angular）
- Hybrid App、React Native、Weex
- TypeScript
- RESTFul
- WEB安全
- 前端工程化
- 性能优化
- 重构
- 团队协作
- 可维护性
- 易用性
- SEO
- UED
- 前端技术选型
- 快速学习能力

## 必须掌握的知识点

- DOM结构：两个节点之间可能存在哪些关系以及如何在节点之间任意移动。
- DOM操作：如何添加、移除、移动、复制、创建和查找节点等。
- 事件：如何使用事件，以及IE和标准DOM事件模型之间存在的差别。
- XMLHttpRequest：这个什么、怎样完整的执行一次GET请求、如何检测错误。
- 严格模式和混杂模式：如何触发这两种模式，区分它们有何意义。
- 盒模型：外边距、内边距、边框之间的关系，及IE8以下版本的浏览器中的盒模型。
- 块级元素和行内元素：怎么用CSS控制它们，以及如何合理的使用它们。
- 浮动元素：怎么使用它们、它们有什么问题以及怎么解决这些问题。
- HTML和XHTML：二者有什么区别，你觉得应该使用哪一个并说明理由。
- JSON：作用、用途、设计结构。