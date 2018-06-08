---
title: vue
type: vue
order: 1
---

<p class="tip">通篇使用的`Vue`版本：2.5.0<br>前置知识：`webpack`、`flow`</p>

## Vue core

`Vue`是一个很流行的前端框架，那么它的原理是什么呢？下面来一步一步解析`Vue`的源代码，看看它是怎么实现的，做到知己知彼，百战不殆。

## 下载仓库

`github`下载`Vue`，`github`快要被`微软`收购了，希望做的越来越好吧！现在发现`github`真是程序员不可缺少的网站啊～

## package.json

拿到一个项目，首先查看`package.json`，看看它是怎么打包，发布以及测试的。我们的目的是查看源代码，所以直接看是如何打包成`Vue.js`就行了。

## npm run build

从`package.json`我们可以看到`npm run build`命令是用来打包代码成`vue.js`的，内容是：

```bash
node build/build.js
```

所以接下来看一下`build.js`到底有什么

## build.js

这个脚本中引入了`config.js`，可以看到在`config.js`脚本中，输出`dist/vue.js`的`key-value`是：

```js
'web-full-dev': {
  entry: resolve('web/entry-runtime-with-compiler.js'),
  dest: resolve('dist/vue.js'),
  format: 'umd',
  env: 'development',
  alias: { he: './entity-decoder' },
  banner
}
```

可以看到入口文件是`web/entry-runtime-with-compiler.js`，找到`src/platforms/web/entry-runtime-with-compiler.js`文件。

从名字来看，这里应该是进入`runtime` 时带上`compiler`，然后可以看到这里面有

```js
import Vue from './runtime/index'
```

继续查看`./runtime/index`，从这地方`export`出来的应该是`Vue`的运行时，里面有这样一段：

```js
import Vue from 'core/index'
```

`core/index`就是`Vue`的核心代码。

以上就是打包顺序，理清一下：

1. `src/platforms/web/entry-runtime-with-compiler.js`
1. `runtime/index`
1. `core/index`

## 打包后的代码结构

上面说到了`Vue`仓库的打包顺序，那么最终产生的代码结构是怎么样的呢？
直接看打包后的`vue.js`也是一种方法，不够明显不够明智，应该直接看未打包之前的代码来推算出打包过后的代码结构
看之前需要了解一下`flow`，跟`typescript`类似。
这里揭晓一下答案：
- `Vue`就是在全局对象（`node`环境下是`global`，浏览器环境下是`window`，其他环境对应该环境的全局变量）下挂载的一个构造函数。
- 这个构造函数有着自己众多的原型
- 当使用`new`关键词创建实例时，该实例会继承构造函数的所有原型
- 随着实例的创建，完成了传入对象参数到渲染至浏览器的一系列步骤
- 大致过程就是这样，具体细节后面讨论

## 从`hello vue`开始

不管学什么先从`hello world`开始，这是一条永恒不变的真理，首先看看下面这段代码`vue`是怎么执行的，了解了它之后，才可以向更深层次的应用进发：

```html
<div>{{hello}}</div>
```
```js
new Vue({
  name: 'hello vue',
  data () {
    hello: 'i am hello vue'
  }
})
```

### 观察`vue.js`

假设你对打包之前的项目结构比较了解，安装依赖，运行`npm run build`，这里直接从生成的`dist/vue.js`文件开始看起，好处是节省时间成本，不用到处跳转找依赖函数，不过不了解的地方还是需要查阅一下`src`中的代码。

### 入口

首先看看`Vue`构造函数是怎么挂载在全局对象上的：

```js
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Vue = factory());
}(this, (function () { 
  'use strict';
  // ...
  return Vue$3
})
```
可以看到，通过自运行函数传入`this`和`factory`函数，来将`Vue$3`赋值给`global.vue`，这里的`this`会默认取全局上下文，即不同环境下的全局对象。

---

接下来看看`Vue$3`：
```js
function Vue$3 (options) {
  if ("development" !== 'production' &&
    !(this instanceof Vue$3)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}
```
`options`就是我们传入的：
```js
{
  name: 'hello vue',
  data () {
    hello: 'i am hello vue'
  }
}
```
这一部分，至此，入口函数找到了，他会判断你是不是使用了`new`来创建实例，以及调用一个`this._init(options)`方法，前文所说，这个`_init`方法肯定存在于`Vue$3`的`prototype`上。

### _init(options)

首先`factory`函数中执行了`initMixin(Vue$3)`，下面看一下这个函数：
```js
var uid$1 = 0;
function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$1++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ("development" !== 'production' && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    {
      initProxy(vm);
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if ("development" !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}
```
可以看到，这个函数在挂载到全局对象时就已经执行了，当构造函数实例化时，就可以直接调用原型上的`_init`函数了，实例在这里挂载了一些属性（通过`this`挂载，这里的`this`就是指实例对象了)
下面来一步一步分析`_init`干了些什么事

#### 挂载_uid和_isVue

```js
var vm = this;
// a uid
vm._uid = uid$1++;

var startTag, endTag;
/* istanbul ignore if */
if ("development" !== 'production' && config.performance && mark) {
  startTag = "vue-perf-start:" + (vm._uid);
  endTag = "vue-perf-end:" + (vm._uid);
  mark(startTag);
}

// a flag to avoid this being observed
vm._isVue = true;
```

#### mergeOptions

```js
// merge options
if (options && options._isComponent) {
  // optimize internal component instantiation
  // since dynamic options merging is pretty slow, and none of the
  // internal component options needs special treatment.
  initInternalComponent(vm, options);
} else {
  vm.$options = mergeOptions(
    resolveConstructorOptions(vm.constructor),
    options || {},
    vm
  );
}
/* istanbul ignore else */
{
  initProxy(vm);
}
// expose real self
vm._self = vm
```
首先我们走了
```js
vm.$options = mergeOptions(
  resolveConstructorOptions(vm.constructor),
  options || {},
  vm
);
```
和
```js
{
  initProxy(vm)
}
```
部分，下面分析一下这部分干了些什么：

---

```js
function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}
```
resolveConstructorOptions