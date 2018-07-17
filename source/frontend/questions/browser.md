---
title: 浏览器
order: 9
type: questions
---
## 跨域

### 为何存在
- DOM同源策略：禁止对不同源页面DOM进行操作。这里主要场景是iframe跨域的情况，不同域名的iframe是限制互相访问的
- XmlHttpRequest同源策略：禁止使用XHR对象向不同源的服务器地址发起HTTP请求
- 防止CSRF攻击

### 解决方式
- 跨域资源共享（Cross-origin resource sharing/CORS）
  - CORS需要浏览器和服务器同时支持。目前，所有浏览器都支持该功能，IE浏览器不能低于IE10。
  - 整个CORS通信过程，都是浏览器自动完成，不需要用户参与。对于开发者来说，CORS通信与同源的AJAX通信没有差别，代码完全一样。浏览器一旦发现AJAX请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求，但用户不会有感觉。
  - 因此，实现CORS通信的关键是服务器。只要服务器实现了CORS接口，就可以跨源通信。
- jsonp
 - 利用`<script>`标签没有跨域限制的“漏洞”（历史遗迹啊）来达到与第三方通讯的目的。
 - 当需要通讯时，本站脚本创建一个`<script>`元素，地址指向第三方的API网址，`<script src="http://www.example.net/api?param1=1&param2=2"></script>`并提供一个回调函数来接收数据（函数名可约定，或通过地址参数传递）。
 - 第三方产生的响应为json数据的包装（故称之为jsonp，即json padding，相当于一个立即执行的函数），形如：callback({"name":"hax","gender":"Male"})，这样浏览器会调用callback函数，并传递解析后json对象作为参数。本站脚本可在callback函数里处理所传入的数据。
 - JSONP只支持GET请求，CORS支持所有类型的HTTP请求。JSONP的优势在于支持老式浏览器，以及可以向不支持CORS的网站请求数据。
- 服务器代理
 - 浏览器有跨域限制，但是服务器不存在跨域问题，所以可以由服务器请求所要域的资源再返回给客户端。
- document.domain
- window.name
- location.hash
- postMessage

## 缓存

### 注意
**浏览器只能对非httpOnly的cookie进行操作。**
**httpOnly的cookie只能由服务器操作。**
**不要在缓存中存储敏感信息，服务器需要对缓存数据进行校验。**

### cookie
**服务器发送到用户浏览器并保存在本地的一小块数据，它用于告知服务端两个请求是否来自同一浏览器**

#### 用处
- 会话状态管理：用户登录状态，购物车，游戏分数等
- 个性化设置：用户个性化设置,主题等
- 浏览器行为跟踪：跟踪分析用户行为等

#### 缺点
由于服务器指定`Cookie`后，浏览器的每次请求都会携带`Cookie`数据，会带来额外的性能开销（尤其是在移动环境下）

#### 大小限制
4KB左右

#### 存在时间
如果不在浏览器中设置过期时间，`cookie`被保存在内存中，生命周期随浏览器的关闭而结束，这种`cookie`简称会话`cookie`。如果在浏览器中设置了`cookie`的过期时间，`cookie`被保存在硬盘中，关闭浏览器后，`cookie`数据仍然存在，直到过期时间结束才消失。

#### 如何清除
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

#### 存在时间
除非被清除，否则永久保存

### 大小限制
一般为5MB

### 注意
- 不同浏览器无法共享localStorage或sessionStorage中的信息。
- 相同浏览器的不同页面间可以共享相同的localStorage（**页面属于相同域名和端口**）
- 不同页面或标签页间无法共享sessionStorage的信息。这里需要注意的是，页面及标签页仅指顶级窗口，如果一个标签页包含多个iframe标签且他们属于同源页面，那么他们之间是可以共享sessionStorage的。

### sessionstorage

#### 存在时间
页面会话结束——也就是说当页面被关闭时，数据存储在 `sessionStorage` 会被清除，页面刷新不会被删除。

#### 大小限制
一般为5MB

## 路由原理
[知乎专栏](https://zhuanlan.zhihu.com/p/37730038)
[DDFE](https://github.com/DDFE/DDFE-blog/issues/9)

### hash模式
2014年之前，通过hash来实现路由：
```http
http://www.xxx.com/#/login
```
这种`#/login`hash值的变化，不会导致浏览器向服务器发出请求，所以不会刷新页面。hash值的变化，会触发`hashchange`这个事件，通过这个事件我们就可以知道hash值发生了哪些变化。然后我们可以监听`hashchange`来实现更新页面部分内容的操作。

### history模式
2014年后，因为 HTML5 标准发布。多了pushState、popstate、replaceState，可以改变 url 地址且不会发送请求。同时还有 事件。通过这些就能用另一种方式来实现前端路由了，但原理都是跟 hash 实现相同的。用了 HTML5 的实现，单页路由的 url 就不会多出一个#，变得更加美观。但因为没有 # 号，所以当用户刷新页面之类的操作时，浏览器还是会给服务器发送请求。为了避免出现这种情况，所以这个实现需要服务器的支持，需要把所有路由都重定向到根页面。

### vue-router示意图
![vue-router示意图](../../images/vueRouter.png)


## 兼容性

### 移动端点击穿透

#### 现象
- 点击穿透问题：点击蒙层（mask）上的关闭按钮，蒙层消失后发现触发了按钮下面元素的click事件
    - 蒙层的关闭按钮绑定的是touch事件，而按钮下面元素绑定的是click事件，touch事件触发之后，蒙层消失了，300ms后这个点的click事件fire，event的target自然就是按钮下面的元素，因为按钮跟蒙层一起消失了
- 跨页面点击穿透问题：如果按钮下面恰好是一个有href属性的a标签，那么页面就会发生跳转
    - 因为 a标签跳转默认是click事件触发 ，所以原理和上面的完全相同
- 另一种跨页面点击穿透问题：这次没有mask了，直接点击页内按钮跳转至新页，然后发现新页面中对应位置元素的click事件被触发了
    - 和蒙层的道理一样，js控制页面跳转的逻辑如果是绑定在touch事件上的，而且新页面中对应位置的元素绑定的是click事件，而且页面在300ms内完成了跳转，三个条件同时满足，就出现这种情况了
- 新页面中对应位置元素恰好是a标签，然后就发生连续跳转了

#### 原因
- 移动浏览器提供一个特殊的功能：双击（double tap）放大。
- 300ms的延迟就来自这里，用户碰触页面之后，需要等待一段时间来判断是不是双击动作，而不是立即响应单击，等待的这段时间大约是300ms。

#### 解决方案
- 只用touch：最简单的解决方案，完美解决点击穿透问题，把页面内所有click全部换成touch事件（ touchstart 、’touchend’、’tap’）， 需要特别注意 a标签，a标签的href也是click，需要去掉换成js控制的跳转，或者直接改成span + tap控制跳转。如果要求不高，不在乎滑走或者滑进来触发事件的话，span + touchend就可以了，毕竟tap需要引入第三方库，不用a标签其实没什么，移动app开发不用考虑SEO，即便用了a标签，一般也会去掉所有默认样式，不如直接用span。
- 只用click：下下策 ，因为会带来300ms延迟，页面内任何一个自定义交互都将增加300毫秒延迟，想想都慢，不用touch就不会存在touch之后300ms触发click的问题，如果交互性要求不高可以这么做， 强烈不推荐 ，快一点总是好的。
- 拿个东西来挡住：比较笨的方法， 千万不要用
- tap后延迟350ms再隐藏mask：改动最小，缺点是隐藏mask变慢了，350ms还是能感觉到慢的，只需要针对mask做处理就行，改动非常小，如果要求不高的话，用这个比较省力
- pointer-events：比较麻烦且有缺陷， 不建议使用，mask隐藏后，给按钮下面元素添上 pointer-events: none; 样式，让click穿过去，350ms后去掉这个样式，恢复响应，缺陷是mask消失后的的350ms内，用户可以看到按钮下面的元素点着没反应，如果用户手速很快的话一定会发现
- 在下面元素的事件处理器里做检测（配合全局flag），比较麻烦， 不建议使用，全局flag记录按钮点击的位置（坐标点），在下面元素的事件处理器里判断event的坐标点，如果相同则是那个可恶的click，拒绝响应
- fastclick：好用的解决方案，不介意多加载几KB的话， 不建议使用 ，因为有人遇到了bug，更多信息请查看： Fastclick 导致click事件触发两次的问题，首先引入fastclick库，再把页面内所有touch事件都换成click，其实稍微有点麻烦，建议引入这几KB就为了解决点透问题不值得，不如用第一种方法呢。
- 禁用缩放：对于不需要缩放的页面，通过设置meta标签禁用缩放，表明这个页面是不需要缩放的，双击缩放就没有意义了。此时浏览器可以禁用默认的双击缩放行为并且去掉300ms的点击延迟。该方法缺点在于必须通过完全禁用缩放来达到去掉点击延迟的目的，但我们初衷是想禁止默认双击缩放行为，这样就不用等待300ms来判断当前操作是否是双击。但是通常情况下我们还是希望能通过双指缩放来进行缩放操作，比如放大图片，很小的一段文字：`<pre><code><meta name="viewport" content="user-scalable=no">
<meta name="viewport" content="initial-scale=1,maximum-scale=1"></code></pre>`

#### fastclick原理
预备知识：移动端点击一个元素触发事件的顺序
以下是四种touch和click事件
touchstart: 手指放到屏幕上时触发
touchmove: 手指在屏幕上滑动式触发
touchend: 手指离开屏幕时触发
touchcancel: 系统取消touch事件的时候触发，这个好像比较少用
click：在这个dom（或冒泡到这个dom）上手指触摸开始，且手指未曾在屏幕上移动（某些浏览器允许移动一个非常小的位移值），且在这个在这个dom上手指离开屏幕，且触摸和离开屏幕之间的间隔时间较短（某些浏览器不检测间隔时间，也会触发click）才能触发
上述事件发生顺序：在移动端，手指点击一个元素，会经过：touchstart --> touchmove -> touchend -> click。

基本原理：FastClick的实现原理是在检测到touchend事件的时候，会通过DOM自定义事件立即出发模拟一个click事件，并把浏览器在300ms之后真正的click事件阻止掉。

### 输入框定位问题
> [知乎问题](https://www.zhihu.com/question/32746176)
> [知乎专栏](https://zhuanlan.zhihu.com/p/33298947)
> [知否](https://segmentfault.com/a/1190000006243816)

- 根据用户使用浏览器类型的占比选择适配哪些浏览器。
- 通过`navigator.userAgent`判断浏览器类型，或者根据浏览器特有的属性或者方法来判断浏览器类型，再去做出合适的polyfill。
- 直接使用悬浮窗显示输入的内容。