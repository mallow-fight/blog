---
title: 主流框架原理
order: 11
type: questions
---
## 主流框架的原理&问题

### vue
**结合生命周期理解**
**深入响应式原理：**数据模型的改变会更新视图，而数据模型仅仅只是普通的js对象，这使得状态管理变得很简单直接。
- 如何追踪变化：当你把一个普通的js对象传给vue实例的data选项，Vue将遍历此对象所有的属性，并使用`Object.defineProperty`(es5中无法shim的特性，故Vue不支持ie8以及更低版本浏览器)把这些属性全部转为`getter/setter`
- 这些属性对用户来说是不可见的，但是在内部它们让Vue追踪依赖，在属性被访问和修改时通知变化
- 每个组件实例都有相应的`watcher`实例对象，它会在组件渲染过程中把属性记录为依赖，之后当依赖项的`setter`被调用时，会通知`watcher`重新计算，从而使它关联的组件得以更新
![data](../../images/data.png)

**检测变化的注意事项：**受现代`js`的限制（以及废弃`Object.observe`），`Vue`不能检测到对象属性的添加或删除。由于 `Vue` 会在初始化实例时对属性执行 `getter/setter` 转化过程，所以属性必须在 `data` 对象上存在才能让 `Vue` 转换它，这样才能让它是响应的。
解决方式：
1. Vue.set(object, key, value)
1. this.$set(object, key, value)
1. 创建一个新的对象，例：this.someObject = Object.assign({}, this.someObject, {a: 1, b: 2})
1. 针对数组，不能检测以下变动的数组：
    - 当你利用索引直接设置一个项时：可使用`Vue.set(vm.array, index, newValue)` or `vm.items.splice(index, 1, newValue)` or `this.$set`
    - 当你修改数组的长度时：`splice`

**异步更新队列：**`Vue` 异步执行 `DOM` 更新。只要观察到数据变化，`Vue` 将开启一个队列，并缓冲在同一事件循环中发生的所有数据改变。如果同一个 `watcher` 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 `DOM` 操作上非常重要。然后，在下一个的事件循环“`tick`”中，`Vue` 刷新队列并执行实际 (已去重的) 工作。`Vue` 在内部尝试对异步队列使用原生的 `Promise.then` 和 `MessageChannel`，如果执行环境不支持，会采用 `setTimeout(fn, 0)` 代替。例：
```html
<div id="example">{{message}}</div>
<script>
var vm = new Vue({
  el: '#example',
  data: {
    message: '123'
  }
})
vm.message = 'new message' // 更改数据
vm.$el.textContent === 'new message' // false
Vue.nextTick(function () {
  vm.$el.textContent === 'new message' // true
})
</script>
```

### react
**什么是虚拟dom:**虚拟DOM（VDOM）是一种编程概念，是指虚拟的视图被保存在内存中，并通过诸如ReactDOM这样的库与“真实”的DOM保持同步。这个过程被称为和解。
这种编程方法使用了React的声明式API：你需要告诉React你想让视图处于什么状态，React则负责确保DOM与该状态相匹配。因此你在构建你的应用时不必自己去完成属性操作、事件处理、DOM更新，React会替你完成这一切。
由于“虚拟DOM”更像一种模式而不是特定的技术，有时候我们也会用它表示其他的意思。在React的世界中，由于 “虚拟DOM” 和 React元素 都是用于表示视图的对象，因此常常被关联在一起。然而React也使用被称为“fibers”的对象来存放组件树的附加信息。在React中，它们也被认为是“虚拟DOM”实现的一部分。

- 页面空白但是没有报错，可能是因为函数名和关键字冲突
- 组件导入不了，提示空的对象，原因是命名的时候首字母没有大写！！！（指class的名字）
- export default Abc 导入单个class组件不能带{}

### angular
**使用脏检查**

### 对比
[参考资料](https://cn.vuejs.org/v2/guide/comparison.html)