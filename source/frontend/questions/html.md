---
order: 2
type: questions
title: html
---

## html
### chrome开启GPU渲染
**使用transform3d**

### 重绘和回流
> 回流比重绘的代价要高

**页面的呈现：**

![页面的呈现示意图](../../images/page-show.jpg)

1. 浏览器把获取到的HTML代码解析成1个DOM树，HTML中的每个tag都是DOM树中的1个节点，根节点就是我们常用的document对象。DOM树里包含了所有HTML标签，包括display:none隐藏，还有用JS动态添加的元素等。
1. 浏览器把所有样式(用户定义的CSS和用户代理)解析成样式结构体，在解析的过程中会去掉浏览器不能识别的样式，比如IE会去掉-moz开头的样式，而FF会去掉_开头的样式。
1. DOM Tree 和样式结构体组合后构建render tree, render tree类似于DOM tree，但区别很大，render tree能识别样式，render tree中每个NODE都有自己的style，而且 render tree不包含隐藏的节点 (比如display:none的节点，还有head节点)，因为这些节点不会用于呈现，而且不会影响呈现的，所以就不会包含到 render tree中。注意 visibility:hidden隐藏的元素还是会包含到 render tree中的，因为visibility:hidden 会影响布局(layout)，会占有空间。根据CSS2的标准，render tree中的每个节点都称为Box (Box dimensions)，理解页面元素为一个具有填充、边距、边框和位置的盒子。
4. 一旦render tree构建完毕后，浏览器就可以根据render tree来绘制页面了。

**回流与重绘：**
1. 当render tree中的一部分(或全部)因为元素的规模尺寸，布局，隐藏等改变而需要重新构建。这就称为回流(reflow)。每个页面至少需要一次回流，就是在页面第一次加载的时候。在回流的时候，浏览器会使渲染树中受到影响的部分失效，并重新构造这部分渲染树，完成回流后，浏览器会重新绘制受影响的部分到屏幕中，该过程成为重绘。
1. 当render tree中的一些元素需要更新属性，而这些属性只是影响元素的外观，风格，而不会影响布局的，比如background-color。则就叫称为重绘。
<p class="tip"> 注意：回流必将引起重绘，而重绘不一定会引起回流。</p>

- 回流何时发生：当页面布局和几何属性改变时就需要回流。下述情况会发生浏览器回流：
    - 添加或者删除可见的DOM元素；
    - 元素位置改变；
    - 元素尺寸改变——边距、填充、边框、宽度和高度
    - 内容改变——比如文本改变或者图片大小改变而引起的计算值宽度和高度改变；
    - 页面渲染初始化；
    - 浏览器窗口尺寸改变——resize事件发生时；

**强制浏览器提前flush队列，例：**
1. offsetTop, offsetLeft, offsetWidth, offsetHeight
1. scrollTop/Left/Width/Height
1. clientTop/Left/Width/Height
1. width,height
1. 请求了getComputedStyle(), 或者 IE的 currentStyle

**如何减少回流、重绘**
减少回流、重绘其实就是需要减少对render tree的操作（合并多次多DOM和样式的修改），并减少对一些style信息的请求，尽量利用好浏览器的优化策略。具体方法有：
1. 直接改变className，如果动态改变样式，则使用cssText（考虑没有优化的浏览器）
1. 让要操作的元素进行”离线处理”，处理完后一起更新
    a) 使用DocumentFragment进行缓存操作,引发一次回流和重绘；
    b) 使用display:none技术，只引发两次回流和重绘；
    c) 使用cloneNode(true or false) 和 replaceChild 技术，引发一次回流和重绘；
1. 不要经常访问会引起浏览器flush队列的属性，如果你确实要访问，利用缓存
1. 让元素脱离动画流，减少回流的Render Tree的规模

### 事件捕获和冒泡
- 先捕获再冒泡
- `addEventListener`第三个参数是`false`（默认）时，事件处理采取事件冒泡的原则，当第三个参数是true时，则采取事件捕获的原则

### 输入密码保密
- 使用https
- 客户端使用提交md5，服务端数据库通过md5 + 服务端数据库通过 md5(salt+md5(password)) 的规则存储密码，该 salt 仅存储在服务端，且在每次存储密码时都随机生成。这样即使被拖库，制作字典的成本也非常高。密码被 md5() 提交到服务端之后，可通过 md5(salt + form['password']) 与数据库密码比对。此方法可以在避免明文存储密码的前提下，实现密码加密提交与验证。这里还有防止 replay 攻击（请求被重新发出一次即可能通过验证）的问题，由服务端颁发并验证一个带有时间戳的可信 token （或一次性的）即可。
- 最好使用第三方登录以及手机验证码验证

### K线图怎么画
[使用EChart3](https://zhuanlan.zhihu.com/p/31803528)

### 如何用更好的方式跳转app内嵌网页以及携带参数
[参考资料](https://segmentfault.com/a/1190000010356403)
- 直接透传链接携带的参数，这种方式比较笨拙
- 使用localStorage，这种方式不太安全
- 通过jsBridge从app获取某些数据，或者通知app某些数据

### 如何实现点击子组件首先触发父组件再去触发子组件
[参考资料](https://www.cnblogs.com/owenChen/archive/2013/02/18/2915521.html)
**基本思想：**
通过事件冒泡，将子元素的点击事件冒泡到父元素上，通过区分`e.target.nodeName`来区分点击的是哪一个元素，以实现事件代理的效果
