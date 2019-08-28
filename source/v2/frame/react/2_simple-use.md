---
title: JSX和简单示例
order: 2
type: react
---

## Hello World

1. 学习一个框架先从最简单的示例做起，比如下面的示例：
```jsx
ReactDOM.render(
  <h1>Hello, world</h1>,
  document.getElementById('root')
);
```

## 注意点

现在开发`react`应用一般都使用`webpack`进行开发，那么上述示例的真实面貌是什么呢？我们来拆解一下：

1. 首先是`ReactDOM.render`，它是`react-dom`包里面的一个方法，用来将`<h1>Hello, world</h1>`挂载到选中的`document.getElementById('root')`元素上，具体实现我们说到`react-dom`包的时候再说。
2. 然后是`<h1>Hello, world</h1>`，注意一下，这不是传统意义上的`html`，这是名为`jsx`的语法，它通过`babel`来解析类似`html`结构的语法，下面我们来介绍一下`jsx`。

## JSX

1. 如果我们使用`webpack`来开发`react`应用，在使用`JSX`，我们需要引入以下代码：
```js
import React from 'react';
```
2. 如果你引入了这段代码，`babel`会自动将`JSX`解析成如下形式：
```js
React.createElement(
	'h1',
	null,
	'Hello, world'
)
```
3. 如果`JSX`结构有`Props`，类似`<h1 name="mallow">Hello, world!</h1>`，那么`babel`会解析成如下形式：
```js
React.createElement(
	'h1',
	{name: 'mallow'},
	'Hello, world'
)
```
4. 如何看`babel`是怎么编译的，查看这个[链接](https://babeljs.io/repl#?babili=false&browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wG4AoctCAOwGd4U4BeOAHgAsBGAPhiQZsA9Nx5A&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=es2015%2Creact%2Cstage-2&prettier=false&targets=&version=7.5.5&externalPlugins=)

## 研究重点

*至此，我们发现两个需要研究的重点*
1. 一个是`react-dom`中的`render`方法。
2. 第二个是`react`中的`createElement`方法。

下面我们来一个个看：

## 准备工作

1. 先`clone`一下`react`的仓库。
1. 最好研究一下`flow`是怎么用的，源码是使用`flow`写的。
1. 源码仓库结构，下面来介绍一下重点的一些文件夹：

### packages

1. 这是存放主要的`npm`包源码的地方，包括`react`、`react-dom`等一些`react`相关的`npm`包。

### 发布过程

1. 首先会构建`packages`中的有更新的包，然后把构建之后的文件夹中的一个个单独的文件作为不同的`npm`包发布上去。
2. 当然真实过程没有这么简单，具体可以从`package.json`看起，一步步看它是怎么`build`到`deploy`。

ok，基本了解了源码的仓库结构，下面我们直奔主题，看看我们研究的`npm`包，即`packages/react`、`packages/react-dom`

## react：createElement

1. `React.createElement(xxx)`的结果作为`ReactDOM.render`的第一个参数，我们当然首先研究一下这个方法干了些什么。
2. 根据`react/index.js`找到`React`的入口文件，即：`src/React.js`，这个文件`export`了一个大对象。
```js
export default {
	...
	createElement
	...
}
```
3. 接下来我们就研究一下这个方法：

4. 我们之前的示例是：
```js
React.createElement(
	'h1',
	null,
	'Hello, world'
)
```

5. 我们只看这个示例执行的时候`createElement`跑过的分支，整理如下：
```js
function createElement(type, config, children) {
  let propName;

  // Reserved names are extracted
  const props = {};

  let key = null;
  let ref = null;
  let self = null;
  let source = null;

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  const childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
	}

  return ReactElement(
    type,
    key,
    ref,
    self,
    source,
    ReactCurrentOwner.current,
    props,
  );
}
```

6. 很简单，最后会返回这样的执行函数，我们把参数直接赛给它：
```js
return ReactElement(
	'h1', // type
	null, // key
	null, // ref
	null, // self
	null, // source
	Fiber, // Fiber结构，目前应该用不到，暂时不详细说
	{children: 'Hello world'} // 因为只有一个孩子，所以比较简单
)
```

7. ok，接下来我们来看看`ReactElement`这个方法。

### ReactElement

```js
const hasSymbol = typeof Symbol === 'function' && Symbol.for;

const REACT_ELEMENT_TYPE = hasSymbol
  ? Symbol.for('react.element')
  : 0xeac7;
const ReactElement = function(type, key, ref, self, source, owner, props) {
  const element = {
    // This tag allows us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,

    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,

    // Record the component responsible for creating this element.
    _owner: owner,
  };

  return element;
};
```

这个函数会返回一个`element`，下面我们来看下`element`的结构。

### element

```js
return {
	$$typeof: Symbol.for('react.element'),
	type: 'h1',
	key: null,
	ref: null,
	props: {children: 'Hello world'},
	_owner: Fiber,
}
```

至此，我们知道了最后的结果，是一个含有一些属性的对象，接下来我们看看`react-dom`中的`render`方法是怎么处理这个对象的

## react-dom：render
