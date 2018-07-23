---
title: 事件
order: 5
type: browser
---

## 事件捕获和冒泡
- 先捕获再冒泡
- `addEventListener`第三个参数是`false`（默认）时，事件处理采取事件冒泡的原则，当第三个参数是true时，则采取事件捕获的原则

## 如何实现点击子组件首先触发父组件再去触发子组件
[参考资料](https://www.cnblogs.com/owenChen/archive/2013/02/18/2915521.html)
**基本思想：**
通过事件冒泡，将子元素的点击事件冒泡到父元素上，通过区分`e.target.nodeName`来区分点击的是哪一个元素，以实现事件代理的效果
