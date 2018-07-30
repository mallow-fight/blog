---
title: 问题
order: 10
type: html
---

## Doctype作用？标准模式和兼容模式各有什么区别？
1. `<!DOCTYPE>`声明位于HTML文档的第一行，处于`<html>`标签之前。告知浏览器的解析器用什么文档标准来解析这个文档。DOCTYPE不存在或格式不正确会导致文档以兼容模式呈现。
1. 标准模式的排版和JS运作模式都是以该浏览器支持的最高标准运行。在兼容模式中，页面以宽松的向后兼容的方式显示，模拟老式浏览器的行为以防止站点无法工作。

## 什么是SGML？什么事DTD？
todo

## H5为什么只需要写<!DOCTYPE HTML>?
- H5不基于SGML，因此不需要对DTD进行引用，但是需要doctype来规范浏览器的行为（让浏览器按照它们应该的方式来运行）
- H4.01基于SGML，所以需要对DTD进行引用，才能告知浏览器文档所使用的文档类型

## 行内元素有哪些？块级元素有哪些？空（void）元素有哪些？
1. 行内元素：a、b、span、img、input、select、strong
1. 块级元素：div、ul、ol、li、dl、dt、dd、h1、h2、h3、h4、p
1. 空元素：br、hr、img、input、link、meta、area、base、col、command、embed、keygen、param、source、track、wbr

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

## 什么是SharedWorker？localstorage在另一个上下文里被添加、修改或删除时，会触发什么样的一个事件？
todo

## 如何实现浏览器多个标签页之间的通信？
- WebSocket
- SharedWorker
- 调用localstorage、cookies等本地储存方式
  - localstorage在另一个上下文里被添加、修改或删除时，会触发一个事件，通过监听事件，控制它的值来进行页面信息通信（注意：Safari在无痕模式下设置localstorage值时会抛出QuotaExceedError的异常

## 什么是Adobe Flash Socket？什么是ActiveX HTMLFile（IE）？什么是基于multipart编码发送的XHR？
todo

## webSocket如何兼容低版本浏览器？
- Adobe Flash Socket
- ActiveX HTMLFile（IE）
- 基于multipart编码发送的XHR
- 基于长轮询的XHR

## 怎么使用页面可见性？
todo

## 页面可见性可以有哪些用途？
通过visibilityState的值检测当前页面是否可见，以及打开网页的时间等，在页面被切换到后台其他进程的时候，自动暂停音乐或视频的播放。

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