---
title: 兼容
order: 4
type: browser
---

## 移动端点击穿透

### 现象
- 点击穿透问题：点击蒙层（`mask`）上的关闭按钮，蒙层消失后发现触发了按钮下面元素的`click`事件
    - 蒙层的关闭按钮绑定的是`touch`事件，而按钮下面元素绑定的是`click`事件，`touch`事件触发之后，蒙层消失了，300ms后这个点的`click`事件`fire`，`event`的`target`自然就是按钮下面的元素，因为按钮跟蒙层一起消失了

- 跨页面点击穿透问题：如果按钮下面恰好是一个有`href`属性的`a`标签，那么页面就会发生跳转
    - 因为 `a` 标签跳转默认是`click`事件触发 ，所以原理和上面的完全相同

- 另一种跨页面点击穿透问题：这次没有`mask`了，直接点击页内按钮跳转至新页，然后发现新页面中对应位置元素的`click`事件被触发了
    - 和蒙层的道理一样，`js`控制页面跳转的逻辑如果是绑定在`touch`事件上的，而且新页面中对应位置的元素绑定的是`click`事件，而且页面在`300ms`内完成了跳转，三个条件同时满足，就出现这种情况了

- 新页面中对应位置元素恰好是`a`标签，然后就发生连续跳转了

### 原因
- 移动浏览器提供一个特殊的功能：双击（`double tap`）放大。

- `300ms`的延迟就来自这里，用户碰触页面之后，需要等待一段时间来判断是不是双击动作，而不是立即响应单击，等待的这段时间大约是`300ms`。

### 解决方案
- 只用`touch`：最简单的解决方案，完美解决点击穿透问题，把页面内所有`click`全部换成`touch`事件（ `touchstart` 、`touchend`、`tap`）， 需要特别注意`a`标签，`a`标签的`href`也是`click`，需要去掉换成`js`控制的跳转，或者直接改成`span + tap`控制跳转。如果要求不高，不在乎滑走或者滑进来触发事件的话，`span + touchend`就可以了，毕竟`tap`需要引入第三方库，不用`a`标签其实没什么，移动`app`开发不用考虑`SEO`，即便用了`a`标签，一般也会去掉所有默认样式，不如直接用`span`。

- 只用`click`：下下策 ，因为会带来`300ms`延迟，页面内任何一个自定义交互都将增加`300ms`延迟，想想都慢，不用`touch`就不会存在`touch`之后`300ms`触发`click`的问题，如果交互性要求不高可以这么做， 强烈不推荐 ，快一点总是好的。

- 拿个东西来挡住：比较笨的方法， 千万不要用

- `tap`后延迟`350ms`再隐藏`mask`：改动最小，缺点是隐藏`mask`变慢了，`350ms`还是能感觉到慢的，只需要针对`mask`做处理就行，改动非常小，如果要求不高的话，用这个比较省力

- `pointer-events`：比较麻烦且有缺陷， 不建议使用，`mask`隐藏后，给按钮下面元素添上 `pointer-events: none;` 样式，让`click`穿过去，`350ms`后去掉这个样式，恢复响应，缺陷是`mask`消失后的的`350ms`内，用户可以看到按钮下面的元素点着没反应，如果用户手速很快的话一定会发现

- 在下面元素的事件处理器里做检测（配合全局`flag`），比较麻烦， 不建议使用，全局`flag`记录按钮点击的位置（坐标点），在下面元素的事件处理器里判断`event`的坐标点，如果相同则是那个可恶的`click`，拒绝响应

- `fastclick`：好用的解决方案，不介意多加载几KB的话， 不建议使用 ，因为有人遇到了bug，更多信息请查看： `Fastclick` 导致`click`事件触发两次的问题，首先引入`fastclick`库，再把页面内所有`touch`事件都换成`click`，其实稍微有点麻烦，建议引入这几KB就为了解决点透问题不值得，不如用第一种方法呢。

- 禁用缩放：对于不需要缩放的页面，通过设置`meta`标签禁用缩放，表明这个页面是不需要缩放的，双击缩放就没有意义了。此时浏览器可以禁用默认的双击缩放行为并且去掉`300ms`的点击延迟。该方法缺点在于必须通过完全禁用缩放来达到去掉点击延迟的目的，但我们初衷是想禁止默认双击缩放行为，这样就不用等待`300ms`来判断当前操作是否是双击。但是通常情况下我们还是希望能通过双指缩放来进行缩放操作，比如放大图片，很小的一段文字等
```html
<meta name="viewport" content="user-scalable=no">
<meta name="viewport" content="initial-scale=1,maximum-scale=1">
```

### fastclick原理
- 预备知识：移动端点击一个元素触发事件的顺序

- 以下是四种touch和click事件

- touchstart: 手指放到屏幕上时触发

- touchmove: 手指在屏幕上滑动式触发

- touchend: 手指离开屏幕时触发

- touchcancel: 系统取消touch事件的时候触发，这个好像比较少用

- click：在这个dom（或冒泡到这个dom）上手指触摸开始，且手指未曾在屏幕上移动（某些浏览器允许移动一个非常小的位移值），且在这个在这个dom上手指离开屏幕，且触摸和离开屏幕之间的间隔时间较短（某些浏览器不检测间隔时间，也会触发click）才能触发

- 上述事件发生顺序：在移动端，手指点击一个元素，会经过：touchstart --> touchmove -> touchend -> click。

- 基本原理：FastClick的实现原理是在检测到touchend事件的时候，会通过DOM自定义事件立即出发模拟一个click事件，并把浏览器在300ms之后真正的click事件阻止掉。

## 输入框定位问题
> [知乎问题](https://www.zhihu.com/question/32746176)
> [知乎专栏](https://zhuanlan.zhihu.com/p/33298947)
> [知否](https://segmentfault.com/a/1190000006243816)

- 根据用户使用浏览器类型的占比选择适配哪些浏览器。

- 通过`navigator.userAgent`判断浏览器类型，或者根据浏览器特有的属性或者方法来判断浏览器类型，再去做出合适的polyfill。

- 直接使用悬浮窗显示输入的内容。

## 自适应所有手机和电脑浏览器大小
```html
<meta name="viewport" content="width=device-widht,initial-scale=1.0,suer-scalable=1.0,maximum-scale=1.0,minimum-scale=1.0">
```
```js
(function () {
    var b = document.documentElement,
        a = function () {
            // 获取屏幕宽度
            var a = b.getBoundingClientRect().width;
            // size is screen width
            b.style.fontSize = (a / 'size') * 100 + "px";
        }, c = null;
    window.addEventListener("resize", function () {
        clearTimeout(c);
        c = setTimeout(a, 300);
    });
    a();
})();
```

