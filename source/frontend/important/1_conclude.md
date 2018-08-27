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

#### 硬绑定

- 硬绑定是显式绑定中的一种，通常情况下是通过调用函数的apply()、call()或者ES5里提供的bind()方法来实现硬绑定的。

#### 软绑定

```js
if(!Function.prototype.softBind){
    Function.prototype.softBind=function(obj){
        var fn=this;
        var args=Array.prototype.slice.call(arguments,1);
        var bound=function(){
            return fn.apply(
                (!this||this===(window||global))?obj:this,
                args.concat.apply(args,arguments)
            );
        };
        bound.prototype=Object.create(fn.prototype);
        return bound;
    };
}
```

#### bind polyfill

```js
if (!Function.prototype.bind) {
  Function.prototype.bind = function(oThis) {
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    var aArgs   = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP    = function() {},
        fBound  = function() {
          // this instanceof fNOP === true时,说明返回的fBound被当做new的构造函数调用
          return fToBind.apply(this instanceof fNOP
                 ? this
                 : oThis,
                 // 获取调用时(fBound)的传参.bind 返回的函数入参往往是这么传递的
                 aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    // 维护原型关系
    if (this.prototype) {
      // Function.prototype doesn't have a prototype property
      fNOP.prototype = this.prototype; 
    }
    // 下行的代码使fBound.prototype是fNOP的实例,因此
    // 返回的fBound若作为new的构造函数,new生成的新对象作为this传入fBound,新对象的__proto__就是fNOP的实例
    fBound.prototype = new fNOP();

    return fBound;
  };
}
```

### 导航栏布局

- 左边使用`position: absolute; left: 0; top: 0; width: 200px`
- 右边使用`margin-left: 200px`

### 实现响应式布局

> [参考](../browser/4_compatibility.html#自适应所有手机和电脑浏览器大小)

- 如何自适应多倍dpi（如平板）？
  - [blog](http://blog.codingplayboy.com/2018/01/06/responsive-web-design/)

- 什么是设备像素比？
  - [github](https://github.com/jawil/blog/issues/21)

- 如何适配iphoneX？
  - [凹凸](https://aotu.io/notes/2017/11/27/iphonex/index.html)

### Vue、React的区别

> [参考](../framework/4_compare.html)

### 函数式编程

> [参考](http://taobaofed.org/blog/2017/03/16/javascript-functional-programing/)

### css预编译器怎么使用函数

> [stylus](http://stylus-lang.com/docs/functions.html)

> [less](http://lesscss.org/functions/)

### webpack对页面性能的优化

> [segmentfault1](https://segmentfault.com/a/1190000004577578)

> [segmentfault2](https://segmentfault.com/a/1190000007891318)

> [github](https://github.com/hawx1993/tech-blog/issues/3)

### fetch、ajax区别

> [github(https://github.com/camsong/blog/issues/2)

### promise、generator、async的区别

> [你不知道的JS](https://github.com/getify/You-Dont-Know-JS/blob/1ed-zh-CN/async%20&%20performance/README.md)

### vuex的mutations键值的唯一

> [官网](https://vuex.vuejs.org/zh/guide/mutations.html)

### UI库的样式覆盖，怎么保证私有化

> [csdn](https://blog.csdn.net/weixin_41557291/article/details/80606525)