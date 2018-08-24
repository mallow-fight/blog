---
title: 概要
type: important
order: 1
---

## HTML&CSS
- 对Web标准的理解（结构、表现、行为）
- 浏览器内核
- 渲染原理
- 依赖管理
- 兼容性
- CSS语法
  - 层次关系
  - 常用属性
  - 布局
  - 选择器
  - 权重
  - 盒模型
  - Hack
  - CSS预处理器
  - CSS3
  - Flexbox
  - CSS Modules
  - Document flow
  - BFC
  - HTML5（离线&存储、History、多媒体、WebGL、SVG、Canvas）

## JavaScript
- 数据类型
- 运算
- 对象
- Function
- 继承
- 闭包
- 作用域
- 事件
- Prototype
- RegExp
- JSON
- Ajax
- DOM
- BOM
- 跨域
- 异步请求
- 模版引擎
- 模块化
- Flux
- 同构
- 算法
- ECMAScript6
- Nodejs
- HTTP

## 其他
- 主流MVVM框架（React、Vue、Angular）
- Hybrid App、React Native、Weex
- TypeScript
- RESTFul
- WEB安全
- 前端工程化
- 性能优化
- 重构
- 团队协作
- 可维护性
- 易用性
- SEO
- UED
- 前端技术选型
- 快速学习能力

## 必须掌握的知识点

- DOM结构：两个节点之间可能存在哪些关系以及如何在节点之间任意移动。
- DOM操作：如何添加、移除、移动、复制、创建和查找节点等。
- 事件：如何使用事件，以及IE和标准DOM事件模型之间存在的差别。
- XMLHttpRequest：这个什么、怎样完整的执行一次GET请求、如何检测错误。
- 严格模式和混杂模式：如何触发这两种模式，区分它们有何意义。
- 盒模型：外边距、内边距、边框之间的关系，及IE8以下版本的浏览器中的盒模型。
- 块级元素和行内元素：怎么用CSS控制它们，以及如何合理的使用它们。
- 浮动元素：怎么使用它们、它们有什么问题以及怎么解决这些问题。
- HTML和XHTML：二者有什么区别，你觉得应该使用哪一个并说明理由。
- JSON：作用、用途、设计结构。

## questions

### 函数判断变量的所有类型

```js
const a_string = 'i am a string'
const a_number = 1111
const a_null = null
const a_undefined = undefined
const a_boolean = false
const a_symbol = Symbol()
const a_regxp = /abc/
const a_object = {a: 1}
const a_array = [1, 2, 3]
const a_function = function () {
}

function whichType(vars) {
  let type = typeof vars
  if(type === 'object') {
    type = Object.prototype.toString.call(vars)
    type = type.slice(8, type.length - 1).toLowerCase()
    // or: type = type.replace(/\[(\w+)\s(\w+)\]/, '$2')
  }
  console.log(type)
}

whichType(a_string)
whichType(a_number)
whichType(a_null)
whichType(a_undefined)
whichType(a_boolean)
whichType(a_symbol)
whichType(a_regxp)
whichType(a_object)
whichType(a_array)
whichType(a_function)
```

### 绑定上下文

- bind
- prototype
- call || apply

### 导航栏布局

- 左边使用`position: absolute; left: 0; top: 0; width: 200px`
- 右边使用`margin-left: 200px`

### 实现响应式布局

> [参考](../browser/4_compatibility.html#自适应所有手机和电脑浏览器大小)