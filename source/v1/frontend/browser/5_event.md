---
title: 事件
order: 5
type: browser
---

## 浏览器事件解读

> [知乎](https://zhuanlan.zhihu.com/p/23059366)

## 事件捕获和冒泡
- 先捕获再冒泡

- `addEventListener`第三个参数是`false`（默认）时，事件处理采取事件冒泡的原则，当第三个参数是`true`时，则采取事件捕获的原则

## 事件代理
> [参考资料](https://www.cnblogs.com/owenChen/archive/2013/02/18/2915521.html)

### 基本思想

- 通过事件冒泡，将子元素的点击事件冒泡到父元素上，通过区分`e.target.nodeName`来区分点击的是哪一个元素，以实现事件代理的效果

## addEventListener
- 挂载在window对象上的keypress事件会重复触发，我们只需要判断e中的元素是不是我们需要处理的元素来触发响应的回调函数就可以了
```js
<input />
<input />
<script>
  window.addEventListener('keypress', function(e) {
    console.log(e)
  })
  window.addEventListener('keypress', function(e) {
    console.log(e)
  })
</script>
```
