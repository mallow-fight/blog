---
title: html
order: 2
type: frontend
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

## <a href="javascript:;"></a>

1. 没有href的a标签是非法的
2. 使用'#'会导致浏览器回到顶部
3. 更好的方式：写一个函数：return false; 或者 event.preventDefault()