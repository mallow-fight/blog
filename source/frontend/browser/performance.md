---
title: 性能
type: browser
order: 6
---
## chrome开启GPU渲染
**使用transform3d**

## 重绘和回流
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

## 页面优化

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