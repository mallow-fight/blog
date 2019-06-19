---
title: 性能
type: browser
order: 6
---
## chrome开启GPU渲染
- **使用transform3d**

## 页面的呈现

![页面的呈现示意图](../../images/page-show.jpg)

1. 浏览器把获取到的`HTML`代码解析成1个`DOM`树，`HTML`中的每个`tag`都是`DOM`树中的1个节点，根节点就是我们常用的`document`对象。`DOM`树里包含了所有`HTML`标签，包括`display:none`隐藏，还有用`JS`动态添加的元素等。

1. 浏览器把所有样式(用户定义的`CSS`和用户代理)解析成样式结构体，在解析的过程中会去掉浏览器不能识别的样式，比如IE会去掉`-moz`开头的样式，而`FF`会去掉`_`开头的样式。

1. `DOM Tree` 和样式结构体组合后构建`render tree`, `render tree`类似于`DOM tree`，但区别很大，`render tree`能识别样式，`render tree`中每个`NODE`都有自己的`style`，而且 `render tree` 不包含隐藏的节点 (比如`display:none`的节点，还有`head`节点)，因为这些节点不会用于呈现，而且不会影响呈现的，所以就不会包含到 `render tree` 中。注意 `visibility:hidden` 隐藏的元素还是会包含到 `render tree` 中的，因为`visibility:hidden`会影响布局(`layout`)，会占有空间。根据`CSS2`的标准，`render tree`中的每个节点都称为`Box`，理解页面元素为一个具有填充、边距、边框和位置的盒子。

1. 一旦`render tree`构建完毕后，浏览器就可以根据`render tree`来绘制页面了。

### 回流与重绘

1. 回流比重绘的代价要高

1. 当`render tree`中的一部分(或全部)因为元素的规模尺寸，布局，隐藏等改变而需要重新构建。这就称为回流(`reflow`)。每个页面至少需要一次回流，就是在页面第一次加载的时候。在回流的时候，浏览器会使渲染树中受到影响的部分失效，并重新构造这部分渲染树，完成回流后，浏览器会重新绘制受影响的部分到屏幕中，该过程成为重绘。

1. 当`render tree`中的一些元素需要更新属性，而这些属性只是影响元素的外观，风格，而不会影响布局的，比如`background-color`。则就叫称为重绘。

<p class="tip"> 注意：回流必将引起重绘，而重绘不一定会引起回流。</p>

- 回流何时发生：当页面布局和几何属性改变时就需要回流。下述情况会发生浏览器回流：
    - 添加或者删除可见的`DOM`元素；
    - 元素位置改变；
    - 元素尺寸改变——边距、填充、边框、宽度和高度
    - 内容改变——比如文本改变或者图片大小改变而引起的计算值宽度和高度改变；
    - 页面渲染初始化；
    - 浏览器窗口尺寸改变——`resize`事件发生时；
    - 强制浏览器提前flush队列，例：
        1. offsetTop, offsetLeft, offsetWidth, offsetHeight
        1. scrollTop/Left/Width/Height
        1. clientTop/Left/Width/Height
        1. width,height
        1. 请求了getComputedStyle(), 或者 IE的 currentStyle

- 如何减少回流、重绘

减少回流、重绘其实就是需要减少对`render tree`的操作（合并多次`DOM`和样式的修改），并减少对一些`style`信息的请求，尽量利用好浏览器的优化策略。具体方法有：

1. 直接改变`className`，如果动态改变样式，则使用`cssText`（考虑没有优化的浏览器）

1. 让要操作的元素进行”离线处理”，处理完后一起更新
    1. 使用`DocumentFragment`进行缓存操作,引发一次回流和重绘；

    1. 使用`display:none`技术，只引发两次回流和重绘；

    1. 使用`cloneNode(true or false)` 和 `replaceChild` 技术，引发一次回流和重绘；

1. 不要经常访问会引起浏览器`flush`队列的属性，如果你确实要访问，利用缓存
1. 让元素脱离动画流，减少回流的`Render Tree`的规模

## 页面优化

### 用户角度
优化能够让页面加载得更快、对用户的操作响应得更及时，能够给用户提供更为友好的体验

### 服务商角度
优化能够减少页面请求数、或者减小请求所占带宽，能够节省可观的资源

### 页面级别的优化
- 减少`http`请求数，避免重复请求
- 合理设置`http`缓存
- 资源合并与压缩
- 按需加载
- 将脚本放在页面底部
- 将`css`放在`head`中

### 代码级别的优化
- 减少`dom`操作
- 减少作用域链查找
- 避免使用`with`、`Function`、`eval`，会使`js`性能优化失效，容易有安全问题
- 缓存复杂计算的结果，使用`join`进行字符串拼接
- 给`v-for`加上`key`，使得框架尽可能重用已有的节点
- 使用负载均衡，也就是`CDN`
- 同构`js`，针对首屏渲染要求比较高的单页应用
- 加快接口返回速度

### 对未来的展望
- 更快的语言解释运行速度，`webassembly`
- `service workers`
- 图片编码优化

## 网页卡死

