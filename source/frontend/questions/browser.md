---
title: 浏览器
order: 9
type: questions
---

## app和web浏览器之间如何通信
[参考资料](https://segmentfault.com/a/1190000008012111)
**`js2java`，从Js到Java，从网页到app，他们是双向通信，可互相调用的，Android的App是通过WebView（请亲理解成一个组件，想象WebView就是一个没有任何操作按钮的浏览器，你输入baidu.com他就打开了百度的页面）来展示一个网页的，同时WebView为网页和原生App建立一个桥梁，让网页和原生App能够看到彼此暴露的一些方法，从而达到互相操作的目的。
当然，这些操作是需要前端页面和终端程序互相协商的。虽然很多App遵守了一些相同的原则，使网页在不同的APP中都能具备相同的能力，但是如果你看到同一个网页在一个App中能够调用一些安卓系统的能力，而在另一个APP中却没有对应的能力也不要觉得奇怪（找对应App的开发勾兑一下就好了）。**

**现公司jsBridge实现方式，通过在window对象上挂载一个桥对象，通过这个对象用`观察者模式`实现事件的订阅，通知，以及取消订阅。**

## 跨域问题

为何存在：
- DOM同源策略：禁止对不同源页面DOM进行操作。这里主要场景是iframe跨域的情况，不同域名的iframe是限制互相访问的
- XmlHttpRequest同源策略：禁止使用XHR对象向不同源的服务器地址发起HTTP请求
- 防止CSRF攻击

解决方式：
- 跨域资源共享（Cross-origin resource sharing/CORS）
    - CORS需要浏览器和服务器同时支持。目前，所有浏览器都支持该功能，IE浏览器不能低于IE10。
    - 整个CORS通信过程，都是浏览器自动完成，不需要用户参与。对于开发者来说，CORS通信与同源的AJAX通信没有差别，代码完全一样。浏览器一旦发现AJAX请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求，但用户不会有感觉。
    - 因此，实现CORS通信的关键是服务器。只要服务器实现了CORS接口，就可以跨源通信。
    - 请求分类：
        - 简单请求
          - 请求方法是以下三种方法之一：
              HEAD
              GET
              POST
          - HTTP的头信息不超出以下几种字段：
              Accept
              Accept-Language
              Content-Language
              Last-Event-ID
              Content-Type：只限于三个值application/x-www-form-urlencoded、multipart/form-data、text/plain
        - 非简单请求
          - 非简单请求是那种对服务器有特殊要求的请求，比如请求方法是PUT或DELETE，或者Content-Type字段的类型是application/json。
          - 非简单请求的CORS请求，会在正式通信之前，增加一次HTTP查询请求，称为"预检"请求（preflight）。
          - 浏览器先询问服务器，当前网页所在的域名是否在服务器的许可名单之中，以及可以使用哪些HTTP动词和头信息字段。只有得到肯定答复，浏览器才会发出正式的XMLHttpRequest请求，否则就报错。

- jsonp
 - 利用`<script>`标签没有跨域限制的“漏洞”（历史遗迹啊）来达到与第三方通讯的目的。当需要通讯时，本站脚本创建一个`<script>`元素，地址指向第三方的API网址，`<script src="http://www.example.net/api?param1=1&param2=2"></script>`并提供一个回调函数来接收数据（函数名可约定，或通过地址参数传递）。     第三方产生的响应为json数据的包装（故称之为jsonp，即json padding，相当于一个立即执行的函数），形如：callback({"name":"hax","gender":"Male"})，这样浏览器会调用callback函数，并传递解析后json对象作为参数。本站脚本可在callback函数里处理所传入的数据。
 - JSONP只支持GET请求，CORS支持所有类型的HTTP请求。JSONP的优势在于支持老式浏览器，以及可以向不支持CORS的网站请求数据。
- 服务器代理
 - 浏览器有跨域限制，但是服务器不存在跨域问题，所以可以由服务器请求所要域的资源再返回给客户端。
- document.domain
- window.name
- location.hash
- postMessage

## 缓存
### cookie
**服务器发送到用户浏览器并保存在本地的一小块数据，它用于告知服务端两个请求是否来自同一浏览器**
用处：
- 会话状态管理：用户登录状态，购物车，游戏分数等
- 个性化设置：用户个性化设置,主题等
- 浏览器行为跟踪：跟踪分析用户行为等
缺点：
由于服务器指定`Cookie`后，浏览器的每次请求都会携带`Cookie`数据，会带来额外的性能开销（尤其是在移动环境下）
存在时间：
如果不在浏览器中设置过期时间，`cookie`被保存在内存中，生命周期随浏览器的关闭而结束，这种`cookie`简称会话`cookie`。如果在浏览器中设置了`cookie`的过期时间，`cookie`被保存在硬盘中，关闭浏览器后，`cookie`数据仍然存在，直到过期时间结束才消失。
如何清除：
```js
/**
 * 设置cookie
 * @param {string} name  键名
 * @param {string} value 键值
 * @param {integer} days cookie周期
 */
function setCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }else{
        var expires = "";
    }
    document.cookie = name+"="+value+expires+"; path=/";
}
// 获取cookie
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
// 删除cookie
function deleteCookie(name) {
    setCookie(name,"",-1);
}
```

### localstorage
存在时间：无限制
用处：缓存上一次访问内容，使得用户进入页面能看到内容
注意：
- 不同浏览器无法共享localStorage或sessionStorage中的信息。
- 相同浏览器的不同页面间可以共享相同的localStorage（**页面属于相同域名和端口**）
- 不同页面或标签页间无法共享sessionStorage的信息。这里需要注意的是，页面及标签页仅指顶级窗口，如果一个标签页包含多个iframe标签且他们属于同源页面，那么他们之间是可以共享sessionStorage的。

### sessionstorage
存在时间：页面会话结束——也就是说当页面被关闭时,数据存储在 `sessionStorage` 会被清除

## 路由原理
[参考资料](https://zhuanlan.zhihu.com/p/37730038)
[参考资料](https://juejin.im/post/5b08c9ccf265da0dd527d98d)
- hash 模式
    - hashchange
- history（html5）
    - pushState 和 replaceState

## 兼容性
- 移动端点击穿透
    [参考资料](https://juejin.im/entry/56ce9c97c24aa80052101aab)
- fixed定位问题（如：评论框）
    [参考资料](https://www.zhihu.com/question/32746176)
    [参考资料](https://segmentfault.com/a/1190000006243816)

## 浏览器从接受链接到渲染整个页面的流程
[参考资料 - 这上面的回答有一些好的连链接](https://www.zhihu.com/question/34873227)
[参考资料](https://segmentfault.com/a/1190000006879700)
[参考资料](https://dailc.github.io/2018/03/12/whenyouenteraurl.html)
[参考资料](https://blog.csdn.net/sinat_27346451/article/details/77451634)
[参考资料](https://blog.csdn.net/m0_38099607/article/details/71403298)

> [参考资料](http://fex.baidu.com/blog/2014/05/what-happen/)
### 从输入URL到浏览器接受的过程中发生了什么事情
- 从触屏到CPU：触摸屏是一种传感器，当手指在这个传感器上触摸时，有些电子会传递到手上，从而导致该区域的电压变化，触摸屏控制器芯片根据这个变化就能计算出所触摸的位置，然后通过总线接口将信号传到CPU的引脚上
- CPU内部的处理：移动设备中的CPU并不是一个单独的芯片，而是和GPU等芯片集成在一起，被称为SoC（片上系统）
- 从CPU到操作系统内核：前面说到触屏控制器将电气信号发送到 CPU 对应的引脚上，接着就会触发 CPU 的中断机制，以 Linux 为例，每个外部设备都有一标识符，称为中断请求(IRQ)号，可以通过 /proc/interrupts 文件来查看系统中所有设备的中断请求号
- 从操作系统GUI到浏览器：前面提到 Linux 内核已经完成了对硬件的抽象，其它程序只需要通过监听 /dev/input/event0 文件的变化就能知道用户进行了哪些触摸操作

### 浏览器如何向网卡发送数据
- 从浏览器到浏览器内核：浏览器可能会进行一些预处理，比如显示历史搜索等，输入URL后的回车，浏览器会对URL进行检查，首先判断协议，如果是http就按照web来处理，另外还会对这个URL进行安全检查，然后直接调用浏览器内核中的对应方法，在浏览器内核中会先查看缓存，然后设置UA等HTTP信息，接着调用不同平台下网络请求的方法
> 需要注意浏览器和浏览器内核是不同的概念，浏览器指的是Chrome、Firefox，而浏览器内核则是Blink、Gecko，浏览器内核只负责渲染，GUI及网络连接等跨平台工作则是浏览器实现的
- http请求的发送：因为网络的底层实现是和内核相关的，所以这一部分需要针对不同平台进行处理，从应用层角度看主要做两件事情：通过DNS查询IP、通过Socket发送数据
- DNS查询：应用程序可以直接调用 Libc 提供的 getaddrinfo() 方法来实现 DNS 查询，基于UDP来实现的
- 通过Socket发送数据：有了IP地址，就可以通过Socket API来发送数据了，这时可以选择TCP或UDP协议
- Socket在内核中的实现
- 底层网络协议

### 数据如何从本机网卡发送到服务器
- 从内核到网络适配器
- 连接Wi-Fi路由
- 运营商网络内的路由
- 主干网间的传输
- IDC内网
- 服务器CPU

### 服务器接受到数据后会进行哪些处理
- 负载均衡
- LVS
- 反向代理
- web server中的处理
- 进入后端语言
- web框架
- 读取数据

### 服务器返回数据后浏览器如何处理
- 从01到字符
- 外链资源的加载
- js的执行
- 从字符到图片
- 跨平台2d绘制库
- GPU合成
- 扩展学习

### 浏览器如何将页面展现出来
- Framebuffer
- 从内存到LCD
- LCD显示