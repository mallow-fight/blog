---
title: vue
type: framework
order: 1
---

## [官网](https://cn.vuejs.org/v2/guide/installation.html)

>通过阅读官网来了解一些基础知识，为以后深入了解做铺垫。

## 笔记

### 声明式渲染

```html
<div id="app" :title="loadAt">{{message}}</div>
```

```js
var app2 = new Vue({
  name: 'app',
  data() {
    return {
      message: '鼠标悬停几秒钟查看此处动态绑定的提示信息！',
      loadAt: '页面加载于' + new Date().toLocaleString()
    }
  }
})
```

{% raw %}
<div id="vue-state-demo" class="demo" :title="loadAt">{{message}}</div>
<script>
  var app2 = new Vue({
    el: '#vue-state-demo',
    data() {
      return {
        message: '鼠标悬停几秒钟查看此处动态绑定的提示信息！',
        loadAt: '页面加载于' + new Date().toLocaleString()
      }
    }
  })
</script>
{% endraw %}

### 数据和方法

- 使用`Object.freeze()`会阻止修改现有的属性，意味着响应系统无法在追踪变化，除了数据属性，Vue实例还暴露了一些有用的实例属性和方法。它们都有前缀`$`，以便与用户定义的属性区分开来。

- 不要在选项属性或者回调上使用箭头函数，因为箭头函数是和父级上下文绑定在一起的。

- 生命周期图示

![vue life](https://cn.vuejs.org/images/lifecycle.png)

### 模版语法

- 通过使用 v-once 指令，你也能执行一次性地插值，当数据改变时，插值处的内容不会更新。但请留心这会影响到该节点上的其它数据绑定。

- 双大括号会将数据解释为普通文本，而非 HTML 代码。为了输出真正的 HTML，你需要使用 v-html 指令。

<p class="tip">你的站点上动态渲染的任意 HTML 可能会非常危险，因为它很容易导致 XSS 攻击。请只对可信内容使用 HTML 插值，绝不要对用户提供的内容使用插值。</p>

- Mustache(双大括号) 语法不能作用在 HTML 特性上，遇到这种情况应该使用 v-bind 指令。

- 迄今为止，在我们的模板中，我们一直都只绑定简单的属性键值。但实际上，对于所有的数据绑定，Vue.js 都提供了完全的 JavaScript 表达式支持。

- 这些表达式会在所属 Vue 实例的数据作用域下作为 JavaScript 被解析。有个限制就是，每个绑定都只能包含单个表达式，所以下面的例子都不会生效。

- 模板表达式都被放在沙盒中，只能访问全局变量的一个白名单，如 Math 和 Date 。你不应该在模板表达式中试图访问用户定义的全局变量。

- `v-bind:test` = `:test`，`v-on:click` = `@click`

### 计算属性和侦听器

- 对于任何复杂逻辑，你都应当使用计算属性，而不是模版内的表达式。

- 你可以像绑定普通属性一样在模板中绑定计算属性。Vue 知道 vm.reversedMessage 依赖于 vm.message，因此当 vm.message 发生改变时，所有依赖 vm.reversedMessage 的绑定也会更新。而且最妙的是我们已经以声明的方式创建了这种依赖关系：计算属性的 getter 函数是没有副作用 (side effect) 的，这使它更易于测试和理解。

- 我们可以将同一函数定义为一个方法而不是一个计算属性。两种方式的最终结果确实是完全相同的。然而，不同的是计算属性是基于它们的依赖进行缓存的。计算属性只有在它的相关依赖发生改变时才会重新求值。这就意味着只要 message 还没有发生改变，多次访问 reversedMessage 计算属性会立即返回之前的计算结果，而不必再次执行函数。

- `Date.now()` 不是响应式依赖。

- 我们为什么需要缓存？假设我们有一个性能开销比较大的计算属性 A，它需要遍历一个巨大的数组并做大量的计算。然后我们可能有其他的计算属性依赖于 A 。如果没有缓存，我们将不可避免的多次执行 A 的 getter！如果你不希望有缓存，请用方法来替代。

- Vue 提供了一种更通用的方式来观察和响应 Vue 实例上的数据变动：侦听属性。当你有一些数据需要随着其它数据变动而变动时，你很容易滥用 watch——特别是如果你之前使用过 AngularJS。然而，通常更好的做法是使用计算属性而不是命令式的 watch 回调。细想一下这个例子：

- 计算属性默认只有 getter ，不过在需要时你也可以提供一个 setter

- 虽然计算属性在大多数情况下更合适，但有时也需要一个自定义的侦听器。这就是为什么 Vue 通过 watch 选项提供了一个更通用的方法，来响应数据的变化。当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。

### 绑定HTML Class

- 对象语法

- 可以在这里绑定一个返回对象的计算属性

- 我们可以把一个数组传给`v-bind:class`，以应用一个 class 列表

- 当在一个自定义组件上使用 `class` 属性时，这些类将被添加到该组件的根元素上面。这个元素上已经存在的类不会被覆盖。

- `v-bind:style` 的对象语法十分直观——看着非常像 CSS，但其实是一个 JavaScript 对象。CSS 属性名可以用驼峰式 (camelCase) 或短横线分隔 (kebab-case，记得用单引号括起来) 来命名

- 直接绑定到一个样式对象通常更好，这会让模板更清晰

- `v-bind:style` 的数组语法可以将多个样式对象应用到同一个元素上

- 从 `2.3.0` 起你可以为 `style` 绑定中的属性提供一个包含多个值的数组，常用于提供多个带前缀的值

### 条件渲染

- `v-else` 元素必须紧跟在带 `v-if` 或者 `v-else-if` 的元素的后面，否则它将不会被识别，v-else-if 也必须紧跟在带 v-if 或者 v-else-if 的元素之后。

- Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。这么做除了使 Vue 变得非常快之外，还有其它一些好处。

- 这样也不总是符合实际需求，所以 Vue 为你提供了一种方式来表达“这两个元素是完全独立的，不要复用它们”。只需添加一个具有唯一值的 key 属性即可

- 不同的是带有 v-show 的元素始终会被渲染并保留在 DOM 中。v-show 只是简单地切换元素的 CSS 属性 display。

<p class="tip">注意，v-show 不支持 `<template>` 元素，也不支持 `v-else`。</p>

- `v-if` vs `v-show`
v-if 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。

v-if 也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。

相比之下，v-show 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。

一般来说，v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 v-show 较好；如果在运行时条件很少改变，则使用 v-if 较好。

- 当 v-if 与 v-for 一起使用时，v-for 具有比 v-if 更高的优先级。

### 列表渲染

- 我们用 v-for 指令根据一组数组的选项列表进行渲染。v-for 指令需要使用 item in items 形式的特殊语法，items 是源数据数组并且 item 是数组元素迭代的别名。

- 在 v-for 块中，我们拥有对父作用域属性的完全访问权限。v-for 还支持一个可选的第二个参数为当前项的索引，形式（`v-for="(item, index) in items`"）。

- 你也可以用 v-for 通过一个对象的属性来迭代，形式（`v-for="(value, key) in object`"）。

<p class="tip">在遍历对象时，是按 Object.keys() 的结果遍历，但是不能保证它的结果在不同的 JavaScript 引擎下是一致的。</p>

- 当 Vue.js 用 v-for 正在更新已渲染过的元素列表时，它默认用“就地复用”策略。如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序， 而是简单复用此处每个元素，并且确保它在特定索引下显示已被渲染过的每个元素。这个类似 Vue 1.x 的 track-by="$index" 。

- 这个默认的模式是高效的，但是只适用于不依赖子组件状态或临时 DOM 状态 (例如：表单输入值) 的列表渲染输出。

- Vue 包含一组观察数组的变异方法，所以它们也将会触发视图更新。这些方法如下：
    `push()`
    `pop()`
    `shift()`
    `unshift()`
    `splice()`
    `sort()`
    `reverse()`
    
- 变异方法 (mutation method)，顾名思义，会改变被这些方法调用的原始数组。相比之下，也有非变异 (non-mutating method) 方法，例如：filter(), concat() 和 slice() 。这些不会改变原始数组，但总是返回一个新数组。当使用非变异方法时，可以用新数组替换旧数组：

- 你可能认为这将导致 Vue 丢弃现有 DOM 并重新渲染整个列表。幸运的是，事实并非如此。Vue 为了使得 DOM 元素得到最大范围的重用而实现了一些智能的、启发式的方法，所以用一个含有相同元素的数组去替换原来的数组是非常高效的操作。

- 由于 JavaScript 的限制，Vue 不能检测以下变动的数组：

1. 当你利用索引直接设置一个项时，例如：vm.items[indexOfItem] = newValue
1. 当你修改数组的长度时，例如：vm.items.length = newLength

- 可以使用 `vm.$set` 实例方法，该方法是全局方法 `Vue.set` 的一个别名：

- 为了解决第二类问题，你可以使用 `splice`

- Vue 不能检测对象属性的添加或删除：

- 对于已经创建的实例，Vue 不能动态添加根级别的响应式属性。但是，可以使用 `Vue.set(object, key, value)` / `vm.$set` 方法向嵌套对象添加响应式属性

- 有时你可能需要为已有对象赋予多个新属性，比如使用 `Object.assign()` 或 `_.extend()`。在这种情况下，你应该用两个对象的属性创建一个新的对象。所以，如果你想添加新的响应式属性

### 事件处理

- 可以用 v-on 指令监听 DOM 事件，并在触发时运行一些 JavaScript 代码。

- 然而许多事件处理逻辑会更为复杂，所以直接把 JavaScript 代码写在 v-on 指令中是不可行的。因此 v-on 还可以接收一个需要调用的方法名称。

- 除了直接绑定到一个方法，也可以在内联 JavaScript 语句中调用方法（就是往函数里传参数）

- 有时也需要在内联语句处理器中访问原始的 DOM 事件。可以用特殊变量 `$event` 把它传入方法

- Vue.js 为 v-on 提供了事件修饰符。之前提过，修饰符是由点开头的指令后缀来表示的。
    .stop
    .prevent
    .capture
    .self
    .once
    .passive

- 使用修饰符时，顺序很重要；相应的代码会以同样的顺序产生。因此，用 `v-on:click.prevent.self` 会阻止所有的点击，而 `v-on:click.self.prevent` 只会阻止对元素自身的点击。

> 2.1.4 新增

- 不像其它只能对原生的 DOM 事件起作用的修饰符，.once 修饰符还能被用到自定义的组件事件上。如果你还没有阅读关于组件的文档，现在大可不必担心。

> 2.3.0 新增

- Vue 还对应 addEventListener 中的 passive 选项提供了 .passive 修饰符。这个 .passive 修饰符尤其能够提升移动端的性能。

<p class="tip">不要把 `.passive` 和 `.prevent` 一起使用，因为 `.prevent` 将会被忽略，同时浏览器可能会向你展示一个警告。请记住，`.passive` 会告诉浏览器你不想阻止事件的默认行为。</p>

你可能注意到这种事件监听的方式违背了关注点分离 (separation of concern) 这个长期以来的优良传统。但不必担心，因为所有的 Vue.js 事件处理方法和表达式都严格绑定在当前视图的 ViewModel 上，它不会导致任何维护上的困难。实际上，使用 v-on 有几个好处：

- 扫一眼 HTML 模板便能轻松定位在 JavaScript 代码里对应的方法。

- 因为你无须在 JavaScript 里手动绑定事件，你的 ViewModel 代码可以是非常纯粹的逻辑，和 DOM 完全解耦，更易于测试。

- 当一个 ViewModel 被销毁时，所有的事件处理器都会自动被删除。你无须担心如何自己清理它们。

### 表单输入绑定

- 你可以用 `v-model` 指令在表单 `<input>` 及 `<textarea>` 元素上创建双向数据绑定。它会根据控件类型自动选取正确的方法来更新元素。尽管有些神奇，但 `v-model` 本质上不过是语法糖。它负责监听用户的输入事件以更新数据，并对一些极端场景进行一些特殊处理。

- 如果 `v-model` 表达式的初始值未能匹配任何选项，`<select>` 元素将被渲染为“未选中”状态。在 iOS 中，这会使用户无法选择第一个选项。因为这样的情况下，iOS 不会触发 `change` 事件。因此，更推荐像上面这样提供一个值为空的禁用选项。

- 修饰符
    `.lazy`
    `.number`
    `.trim`

### 组件基础

- 因为组件是可复用的 Vue 实例，所以它们与 new Vue 接收相同的选项，例如 data、computed、watch、methods 以及生命周期钩子等。仅有的例外是像 el 这样根实例特有的选项。

- 一个组件的 `data` 选项必须是一个函数，因此每个实例可以维护一份被返回对象的独立的拷贝

- 全局注册和局部注册。至此，我们的组件都只是通过 Vue.component 全局注册的：

- Prop 是你可以在组件上注册的一些自定义特性。当一个值传递给一个 prop 特性的时候，它就变成了那个组件实例的一个属性。为了给博文组件传递一个标题，我们可以用一个 props 选项将其包含在该组件可接受的 prop 列表中：

- 单个根元素

- 子组件调用父组件的方法，使用`this.$emit`

- 插槽

- 动态组件

### Prop

- HTML 中的特性名是大小写不敏感的，所以浏览器会把所有大写字符解释为小写字符。这意味着当你使用 DOM 中的模板时，camelCase (驼峰命名法) 的 prop 名需要使用其等价的 kebab-case (短横线分隔命名),如果你使用字符串模板，那么这个限制就不存在了。

- 如果你想要将一个对象的所有属性都作为 `prop` 传入，你可以使用不带参数的 `v-bind` (取代 `v-bind:prop-name`)。例如，对于一个给定的对象 `post`

- 所有的 prop 都使得其父子 prop 之间形成了一个单向下行绑定：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外改变父级组件的状态，从而导致你的应用的数据流向难以理解。

- 额外的，每次父级组件发生更新时，子组件中所有的 prop 都将会刷新为最新的值。这意味着你不应该在一个子组件内部改变 prop。如果你这样做了，Vue 会在浏览器的控制台中发出警告。

- 我们可以为组件的 prop 指定验证要求，例如你知道的这些类型。如果有一个需求没有被满足，则 Vue 会在浏览器控制台中警告你。这在开发一个会被别人用到的组件时尤其有帮助。

- 将原生事件绑定到组件

- `.sync`

### 插槽

- 插槽内容

```html
<navigation-link url="/profile">
  Your Profile
</navigation-link>
```

`<navigation-link>`:

```html
<a
  :href="url"
  class="nav-link">
  <slot></slot>
</a>
```

- 具名插槽

```html
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

在向具名插槽提供内容的时候，我们可以在一个父组件的 `<template>` 元素上使用 slot 特性：

```html
<base-layout>
  <template slot="header">
    <h1>Here might be a page title</h1>
  </template>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template slot="footer">
    <p>Here's some contact info</p>
  </template>
</base-layout>
```

另一种 `slot` 特性的用法是直接用在一个普通的元素上：

```html
<base-layout>
  <h1 slot="header">Here might be a page title</h1>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <p slot="footer">Here's some contact info</p>
</base-layout>
```

我们还是可以保留一个未命名插槽，这个插槽是默认插槽，也就是说它会作为所有未匹配到插槽的内容的统一出口。

- 插槽作用域

### 动态组件 & 异步组件

- 重新创建动态组件的行为通常是非常有用的，但是在这个案例中，我们更希望那些标签的组件实例能够被在它们第一次被创建的时候缓存下来。为了解决这个问题，我们可以用一个 `<keep-alive>` 元素将其动态组件包裹起来。

- 处理加载状态

### 处理边界情况

- 循环引用

组件是可以在它们自己的模板中调用自身的。不过它们只能通过 name 选项来做这件事：

### 进入/离开 & 列表过渡

- 在 CSS 过渡和动画中自动应用 class
- 可以配合使用第三方 CSS 动画库，如 Animate.css
- 在过渡钩子函数中使用 JavaScript 直接操作 DOM
- 可以配合使用第三方 JavaScript 动画库，如 Velocity.js

- Vue 提供了 transition 的封装组件，在下列情形中，可以给任何元素和组件添加进入/离开过渡

### 插件

- 插件通常会为 Vue 添加全局功能。插件的范围没有限制——一般有下面几种：

    添加全局方法或者属性，如: vue-custom-element

    添加全局资源：指令/过滤器/过渡等，如 vue-touch

    通过全局 mixin 方法添加一些组件选项，如: vue-router

    添加 Vue 实例方法，通过把它们添加到 Vue.prototype 上实现。

    一个库，提供自己的 API，同时提供上面提到的一个或多个功能，如 vue-router

- Vue.js 的插件应当有一个公开方法 install 。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象：

```js
const AsyncComponent = () => ({
  // 需要加载的组件 (应该是一个 `Promise` 对象)
  component: import('./MyComponent.vue'),
  // 异步组件加载时使用的组件
  loading: LoadingComponent,
  // 加载失败时使用的组件
  error: ErrorComponent,
  // 展示加载时组件的延时时间。默认值是 200 (毫秒)
  delay: 200,
  // 如果提供了超时时间且组件加载也超时了，
  // 则使用加载失败时使用的组件。默认值是：`Infinity`
  timeout: 3000
})
```

### 开发插件
插件通常会为 Vue 添加全局功能。插件的范围没有限制——一般有下面几种：

添加全局方法或者属性，如: vue-custom-element

添加全局资源：指令/过滤器/过渡等，如 vue-touch

通过全局 mixin 方法添加一些组件选项，如: vue-router

添加 Vue 实例方法，通过把它们添加到 Vue.prototype 上实现。

一个库，提供自己的 API，同时提供上面提到的一个或多个功能，如 vue-router

**Vue.js 的插件应当有一个公开方法 install 。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象：**
```js
MyPlugin.install = function (Vue, options) {
  // 1. 添加全局方法或属性
  Vue.myGlobalMethod = function () {
    // 逻辑...
  }

  // 2. 添加全局资源
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
      // 逻辑...
    }
    ...
  })

  // 3. 注入组件
  Vue.mixin({
    created: function () {
      // 逻辑...
    }
    ...
  })

  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (methodOptions) {
    // 逻辑...
  }
}
```
### 使用插件
通过`Vue.use()`使用插件，第一个参数是插件，第二个参数是选项对象

## Vue Api note

### data

需要使用函数返回新的对象，以保证每个实例的`data`对象都是独立的

### computed

计算属性的结果会被缓存，除非依赖的响应式属性出现更新，非响应式属性不能触发自动更新操作

> 第一个参数是`vm`

### methods

不能使用箭头函数，会出现绑定的上下文不是`vm`的情况

### watch

也不能使用箭头函数

### template

有`render`函数，该选项会被忽略
模板将会 替换 挂载的元素。挂载元素的内容都将被忽略，除非模板的内容有分发插槽。

### render

如果组件是一个函数组件，渲染函数还会接收一个额外的 context 参数，为没有实例的函数组件提供上下文信息。

### 生命周期钩子

> 不能使用箭头函数

- `beforeCreate`：在实例初始化之后，数据观测 (`data observer`) 和 `event/watcher` 事件配置之前被调用。这里访问不到`data`，`methods`和`watch`

- `created`: 在实例创建完成后被立即调用。在这一步，实例已完成以下的配置：数据观测 (`data observer`)，属性和方法的运算，`watch/event` 事件回调。然而，挂载阶段还没开始，`$el` 属性目前不可见。这一步完成了渲染前的准备动作，真实的`dom`还未渲染。

- `beforeMount`: 在挂载开始之前被调用：相关的 `render` 函数首次被调用。该钩子在服务器端渲染期间不被调用。这一步产生了真实`dom`结构，但是还是没有挂载到真实`dom`节点上。

- `mounted`: `el` 被新创建的 `vm.$el` 替换，并挂载到实例上去之后调用该钩子。如果 `root` 实例挂载了一个文档内元素，当 `mounted` 被调用时 `vm.$el` 也在文档内。注意 `mounted` 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以用 `vm.$nextTick` 替换掉 `mounted`。这一步可以使用实例的`$el`属性来修改渲染后的`dom`结构，不过这么做比较低效，因为此时操作的是真实的`dom`

- `beforeUpdate`: 数据更新时调用，发生在虚拟 `DOM` 打补丁之前。这里适合在更新之前访问现有的 `DOM`，比如手动移除已添加的事件监听器。该钩子在服务器端渲染期间不被调用，因为只有初次渲染会在服务端进行。这一步发生在`watch`之后，如果更新的值有`watcher`。更新`data`才会触发，更新`methods`不会触发。

- `updated`: 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。然而在大多数情况下，你应该避免在此期间更改状态。如果要相应状态改变，通常最好使用计算属性或 watcher 取而代之。注意 updated 不会承诺所有的子组件也都一起被重绘。如果你希望等到整个视图都重绘完毕，可以用 vm.$nextTick 替换掉 updated

- `activated`: keep-alive 组件激活时调用。该钩子在服务器端渲染期间不被调用。

- `deactivated`: keep-alive 组件停用时调用。该钩子在服务器端渲染期间不被调用。

- `beforeDestroy`: 实例销毁之前调用。在这一步，实例仍然完全可用。该钩子在服务器端渲染期间不被调用。

- `destroyed`: Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。该钩子在服务器端渲染期间不被调用。

- `errorCaptured`: 当捕获一个来自子孙组件的错误时被调用。此钩子会收到三个参数：错误对象、发生错误的组件实例以及一个包含错误来源信息的字符串。此钩子可以返回 false 以阻止该错误继续向上传播。

### vm.$watch

- 在变异 (不是替换) 对象或数组时，旧值将与新值相同，因为它们的引用指向同一个对象/数组。Vue 不会保留变异之前值的副本。

## 参考资料

> [链接](https://ustbhuangyi.github.io/vue-analysis/)

### 笔记

>通过阅读其他人的文档来了解他们是怎么拆分和阅读源码的，前提是你对源码和仓库结构有一定了解。

下面记录阅读上面电子书的一些重点、笔记：

### `runtime only` VS `runtime with compiler`

使用`vue-loader`将`template`编译成`js`，只需要使用到`runtime only`版本的`Vue`，因此更轻量。
相反，如果使用到`template`属性，则需要使用`runtime with compiler`将`template`编译成`js`。
所以使用脚手架一般采用`rumtime only`，而在浏览器中一般使用`runtime with compiler`。

### 拆分过程

- 简要介绍仓库结构和前置知识。
- 从最简单的渲染`hello vue`开始，这点和我基本一致。
- `Vue`实例挂载的实现，直接从`$mount`开始说起，这点和我不同，我是一步步分析下来，且行且看。

## 我理解的Vue源码

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
> super关键字用于访问和调用一个对象的父对象上的函数。
>在构造函数中使用时，super关键字将单独出现，并且必须在使用this关键字之前使用。super关键字也可以用来调用父对象上的函数。
```js
// 调用 父对象/父类 的构造函数
super([arguments]); 
// 调用 父对象/父类 上的方法
super.functionOnParent([arguments]); 
```
这个函数主要用来拿出构造函数的`options`，这里的构造函数就是`Vue`。
下面我们来看看这个函数返回了什么：
`Ctor.super`是`undefined`，因为`Vue`没有父对象。
所以最终返回的是`Ctor.options`，即`Vue`的`options`，对应到源代码就是`Vue$3`。

---

下面再来看看这个`Ctor.options`又是什么东东：
`initGlobalAPI`中有这样一段：
```js
Vue.options = Object.create(null);
ASSET_TYPES.forEach(function (type) {
  Vue.options[type + 's'] = Object.create(null);
});

// this is used to identify the "base" constructor to extend all plain-object
// components with in Weex's multi-instance scenarios.
Vue.options._base = Vue;

extend(Vue.options.components, builtInComponents);
```
可以看到通过执行`initGlobalAPI`...

## 注解

**由于`Vue`源码太过复杂，一步步分析容易掉进回调地狱，所以应该以一种更好的形式展现其中的原理**

- 关于源码一步步实现以及分析可以参考开头的那篇文章，不在此赘述
- 仔细阅读官网上的实现原理
- 首先掌握核心思想，至于实现细节，目前不太适合查看
- 画出原理图，理解实现原理，使用脑图或者流程图