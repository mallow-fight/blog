---
title: 前端问题汇总
type: questions
order: 1
---

## html
### 输入密码保密
### K线图怎么画
### 如何用更好的方式跳转app内嵌网页以及携带参数
### 给长列表全部代理事件的最优解
### 如何实现点击子组件首先触发父组件再去触发子组件
[参考资料](https://www.cnblogs.com/owenChen/archive/2013/02/18/2915521.html)

## css

### 消除1px宽度问题/宽度适配
box-sizing 属性可以被用来调整这些表现:
- content-box：默认值。如果你设置一个元素的宽为100px，那么这个元素的内容区会有100px宽，并且任何边框和内边距的宽度都会被增加到最后绘制出来的元素宽度中。
- border-box：告诉浏览器去理解你设置的边框和内边距的值是包含在width内的。也就是说，如果你将一个元素的width设为100px,那么这100px会包含其它的border和padding，内容区的实际宽度会是width减去border + padding的计算值。大多数情况下这使得我们更容易的去设定一个元素的宽高。

### 选择器权重
**`!important` > `style`属性 > `ID`选择器 > 类选择器 > 元素选择器**
一个选择器具有专用性的量是用四种不同的值（或组件）来衡量的：
- 千位：`style`属性
- 百位：`ID`选择器
- 十位：类选择器、属性选择器、伪类
- 个位：元素选择器、伪元素

### float高度塌陷问题
```css
.after-box{
/* 和float方向保持一致 */
clear: left;
/* clear: both 清除所有方向的浮动 */
}
/* 或者 */
.after-box{
overflow: hidden;
}
```

### flex布局
**设置 flex 布局之后，子元素的 float、clear、vertical-align 的属性将会失效。**
容器属性：
- flex-direction：控制嵌套元素排列方向，起点是左端还是右端，水平排列还是垂直排列
- flex-wrap：控制嵌套元素是否换行以及换行后第一行在上方还是下方
- justify-content：控制嵌套元素的对齐状况，左对齐还是右对齐，居中还是两端对齐，还是元素之间间隔相等
- align-items：定义了元素在交叉轴上的对齐方式，包括起点、终点、中点以及第一行文字基线
- align-content：定义了多根轴线的对齐方式，如果项目只有一根轴线，那么该属性将不起作用，也就是项目如何分隔垂直方向的空间

项目属性：
- order：定义了项目的排列顺序，数值越小，排名越靠前，最小值为0
- flex-basis：定义了在分配多余空间之前，项目占据的主轴空间，浏览器根据这个属性，计算主轴是否有多余空间
- flex-grow：定义项目的放大比例
- flex-shrink：定义了项目的缩小比例
- align-self： 允许单个项目有与其他项目不一样的对齐方式，跟`align-items`类似，一个针对容器下的所有项目，一个针对单个项目

## js
### 变量声明
```js
var a = 1
function foo() {
  console.log(a) 
  var a = 2
  console.log(a)
  function bar() {

  }
}
foo()
```
函数里面的变量和自有函数也是会提升的
上面等价于：
```js
var a = 1 // 其实这一行并没有触发
function foo() {
  function bar() { // 函数优先提升

  }
  var a // 这里的a是undefined
  console.log(a)
  a = 2
  console.log(a)
}
```
### 正则表达式
### 手写ajax请求
### `var a = a || b`这样写有什么问题
如果a是false类型的值，则会丢失该类型的值，取b值


## wechat

## node
### 登录授权的完整流程

## 性能优化

### 用户角度
优化能够让页面加载得更快、对用户的操作响应得更及时，能够给用户提供更为友好的体验

### 服务商角度
优化能够减少页面请求数、或者减小请求所占带宽，能够节省可观的资源

### 页面级别的优化
- 减少http请求数，避免重复请求
- 合理设置http缓存
- 资源合并与压缩
- 按需加载
- 将脚本放在页面底部
- 件css放在head中

### 代码级别的优化
- 减少dom操作
- 减少作用域链查找
- 避免使用with、Function、eval，会使js性能优化失效，容易有安全问题
- 缓存复杂计算的结果，使用join进行字符串拼接
- 给`v-for`加上`key`，使得框架尽可能重用已有的节点
- 使用负载均衡，也就是CDN
- 同构js，针对首屏渲染要求比较高的单页应用
- 加快接口返回速度

### 对未来的展望
- 更快的语言解释运行速度，webassembly
- service workers
- 图片编码优化

## 安全问题
- XSS：跨站脚本（cross-site scripting），是一种网站应用程序的安全漏洞攻击，是代码注入的一种。它允许恶意用户将代码注入到网页上，其他用户在观看网页时就会受到影响。这类攻击通常包含了HTML以及用户端脚本语言。比如：发帖时写下恶意代码

- CSRF:跨站请求伪造（Cross-site request forgery），也被称为 one-click attack 或者 session riding，通常缩写为 CSRF 或者 XSRF， 是一种挟制用户在当前已登录的Web应用程序上执行非本意的操作的攻击方法。比如：帖子里包含恶意链接，点击就会发出恶意请求

XSS是过程，CSRF是结果，XSS获取到用户信息，CSRF利用用户信息伪造请求来损害用户利益，CSRF是基于XSS的。

预防：
**CSRF依赖于XSS，防住XSS基本也就防住了CSRF**
- 始终检查用户发送给服务器的数据，尽量不要显示用户提供的html内容
- 执行存储用户发送的数据的清理工作
- 转义有潜在危险的字符
- 限制输入的数据量
- 沙箱上传文件（将它们存储在不同的服务器上，只允许通过不同的子域访问文件，或者通过完全不同的域名访问文件更好）

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

### sessionstorage
存在时间：页面会话结束——也就是说当页面被关闭时,数据存储在 `sessionStorage` 会被清除

## webpack原理
todo

## app和web之间如何通信
[参考资料](https://segmentfault.com/a/1190000008012111)
**`js2java`，从Js到Java，从网页到app，他们是双向通信，可互相调用的，Android的App是通过WebView（请亲理解成一个组件，想象WebView就是一个没有任何操作按钮的浏览器，你输入baidu.com他就打开了百度的页面）来展示一个网页的，同时WebView为网页和原生App建立一个桥梁，让网页和原生App能够看到彼此暴露的一些方法，从而达到互相操作的目的。
当然，这些操作是需要前端页面和终端程序互相协商的。虽然很多App遵守了一些相同的原则，使网页在不同的APP中都能具备相同的能力，但是如果你看到同一个网页在一个App中能够调用一些安卓系统的能力，而在另一个APP中却没有对应的能力也不要觉得奇怪（找对应App的开发勾兑一下就好了）。**

## 如何更好的mock前端数据
构建一套`mock-server`，供前端使用，只需要简单返回拼接的数据

## 兼容性
- 移动端点击穿透
- fixed定位问题（如：评论框）

## 页面呈现
### 浏览器从接受链接到渲染整个页面的流程
