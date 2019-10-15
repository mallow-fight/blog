---
title: Hello World
order: 2
type: react
---

> 下面的示例都是基于webpack的
> react: 16.9.0
> react-dom: 16.9.0

**学习一个框架先从最简单的示例做起，比如下面的示例：**
````jsx
import React from 'react';
import { render } from 'react-dom';
render(
  <p>test</p>,
  document.getElementById('root')
);
````

## JSX

1. 如果我们使用`webpack`来开发`react`应用，如何需要使用`JSX`，我们需要引入以下代码：
```js
import React from 'react';
```
2. 如果你引入了这段代码，`babel`会自动将`JSX`解析成如下形式：
```js
React.createElement(
	'p',
	null, // 这个参数代表JSX的props
	'test'
)
```
3. 所以说需要导入`React`来支持`JSX`的解析。
4. 具体`babel`是怎么编译的，查看这个[在线演示](https://babeljs.io/repl#?babili=false&browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wG4AoctCAOwGd4U4BeOAHgAsBGAPhiQZsA9Nx5A&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=es2015%2Creact%2Cstage-2&prettier=false&targets=&version=7.5.5&externalPlugins=)

## 研究重点

**至此，我们发现两个需要研究的重点**
1. 第一个是`react-dom`中的`render`方法。
2. 第二个是`react`中的`createElement`方法。

下面我们来一个个看：

## 准备工作

1. 先`clone`一下`react`的仓库。
1. 源码是使用`flow`写的，最好`build`一下，拿最后生成的`es5`文件来研究源码，`flow`版本有一些`webpack`的变量和参数，很难找，不清晰，而且依赖引用太多，跳跃性太强。

## react/createElement

1. 我们只看这个示例执行的时候`createElement`跑过的分支，整理如下：
```js
function createElementWithValidation(type = 'p', props = null, children = 'test') {
  return createElement.apply(this, arguments);
}
```
> 如果有多个`children`，会使用`React.createElement`层层嵌套：如`<p><a>test</a></p>`，会被解析成：`React.createElement('p', null, React.createElement('a', null, 'test'))`

2. createElement：为了方便查看，直接将参数携带过来

```js
function createElement(type = 'p', config = null, children = 'test') {
  var propName;
  var props = {};
  var key = null;
  var ref = null;
  var self = null;
  var source = null;
	props.children = children;
  return ReactElement(type, key, ref, self, source, null, props);
}
```

6. 很简单，最后会返回这样的执行函数：
```js
var ReactElement = function (
	type = 'p',
	key = null,
	ref = null,
	self = null,
	source = null,
	owner = null,
	props = { children: 'test' }
) {
	const element = {
		$$typeof: Symbol.for('react.element'),
		type: 'p',
		key: null,
		ref: null,
		props: { children: 'test' },
		_owner: null,
		_store: {
			validated: false
		},
		_self: null,
		_source: null,
	};
	// 这里有个小细节，freeze方法相当于浅冻结，所以需要对属性中的对象再次冻结
	if (Object.freeze) {
    Object.freeze(element.props);
    Object.freeze(element);
  }
  return element;
};
```

## react-dom/render

现在我们知道其实最后执行的代码是这样的：
```js
ReactDOM.render(
  {
		$$typeof: Symbol.for('react.element'),
		type: 'p',
		key: null,
		ref: null,
		props: { children: 'test' },
		_owner: null,
		_store: {
			validated: false
		},
		_self: null,
		_source: null,
	},
  document.getElementById('root')
);
```

### 源码

1. 话不多说：找到`build/node_modules/react-dom/cjs/react-dom.development.js`

### render

```js
function (element, container, callback) {
	return legacyRenderSubtreeIntoContainer(null, element, container, false, callback);
}
```

### legacyRenderSubtreeIntoContainer

```js
function legacyRenderSubtreeIntoContainer(
	parentComponent = null,
	children = {
		$$typeof: Symbol.for('react.element'),
		type: 'p',
		key: null,
		ref: null,
		props: { children: 'test' },
		_owner: null,
		_store: {
			validated: false
		},
		_self: null,
		_source: null,
	},
	container = AppContainerDom, // 就是承载web网站dom容器
	forceHydrate = false,
	callback = undefined) {
	const rootContainer = legacyCreateRootFromDOMContainer(container, forceHydrate);
	var root = rootContainer;
	container._reactRootContainer = rootContainer;
	var fiberRoot = root._internalRoot;
	unbatchedUpdates(function () {
		updateContainer(children, fiberRoot, parentComponent, callback);
	});
  return getPublicRootInstance(fiberRoot);
}
```

### 拆分一下

1. `legacyCreateRootFromDOMContainer`
2. `fiberRoot`，也就是`root._internalRoot`，也就是`rootContainer._internalRoot`，也就是`legacyCreateRootFromDOMContainer`执行过后返回的对象里面的那个`_internalRoot`属性
3. `updateContainer`
4. `unbatchedUpdates`
5. `getPublicRootInstance`
6. ok，一个个来。

### legacyCreateRootFromDOMContainer

```js
// 第一步：格式化了一下`AppContainerDom`，移除了一些不必要的`dom`节点
function legacyCreateRootFromDOMContainer(container = AppContainerDom, forceHydrate = false) {
	var rootSibling;
	// 移除app容器的所有dom节点
	while (rootSibling = container.lastChild) {
		container.removeChild(rootSibling);
	}
  return new ReactSyncRoot(container, LegacyRoot, undefined);
}
// 第二步：通过createContainer生成了root，赋值给_internalRoot
function ReactSyncRoot(container = FormatedAppContainerDom, tag = 0, options = undefined) {
  var hydrate = false;
  var hydrationCallbacks = null;
  var root = createContainer(container, tag, hydrate, hydrationCallbacks);
  this._internalRoot = root;
}
// 第三步：这个地方估计是v16之前用的函数，后来替换成fiber形式的了
function createContainer(containerInfo, tag, hydrate, hydrationCallbacks) {
  return createFiberRoot(containerInfo, tag, hydrate, hydrationCallbacks);
}

// 第四步
function createFiberRoot(containerInfo = FormatedAppContainerDom, tag = 0, hydrate = false, hydrationCallbacks = null) {
  var root = new FiberRootNode(containerInfo, tag, hydrate);
  var uninitializedFiber = createHostRootFiber(tag);
  root.current = uninitializedFiber;
  uninitializedFiber.stateNode = root;
  return root;
}
// 第五步：生成root
{
	// FiberRootNode部分
	function FiberRootNode(containerInfo = FormatedAppContainerDom, tag = 0, hydrate = false) {
		this.tag = 0;
		this.current = null;
		this.containerInfo = FormatedAppContainerDom;
		this.pendingChildren = null;
		this.pingCache = null;
		this.finishedExpirationTime = 0;
		this.finishedWork = null;
		this.timeoutHandle = -1;
		this.context = null;
		this.pendingContext = null;
		this.hydrate = false;
		this.firstBatch = null;
		this.callbackNode = null;
		this.callbackExpirationTime = 0;
		this.firstPendingTime = 0;
		this.lastPendingTime = 0;
		this.pingTime = 0;
		this.interactionThreadID = 1, // require('scheduler/tracing').unstable_getThreadID();	这个就是一个递增ID的函数
		this.memoizedInteractions = new Set();
		this.pendingInteractionMap = new Map();
	}
	// createHostRootFiber部分
	function createHostRootFiber(tag = 0) {
		return createFiber(3, null, null, 0);
	}
	var createFiber = function (tag, pendingProps, key, mode) {
		return new FiberNode(tag, pendingProps, key, mode);
	};
	function FiberNode(tag = 3, pendingProps = null, key = null, mode = 0) {
		this.tag = 3;
		this.key = null;
		this.elementType = null;
		this.type = null;
		this.stateNode = null;

		this.return = null;
		this.child = null;
		this.sibling = null;
		this.index = 0;
		this.ref = null;
		this.pendingProps = null;
		this.memoizedProps = null;
		this.updateQueue = null;
		this.memoizedState = null;
		this.dependencies = null;
		this.mode = 0;

		this.effectTag = 0;
		this.nextEffect = null;
		this.firstEffect = null;
		this.lastEffect = null;
		this.expirationTime = 0;
		this.childExpirationTime = 0;
		this.alternate = null;

		this.actualDuration = Number.NaN;
		this.actualStartTime = Number.NaN;
		this.selfBaseDuration = Number.NaN;
		this.treeBaseDuration = Number.NaN;

		this.actualDuration = 0;
		this.actualStartTime = -1;
		this.selfBaseDuration = 0;
		this.treeBaseDuration = 0;

		this._debugID = 2;
		this._debugIsCurrentlyTiming = false;

		this._debugSource = null;
		this._debugOwner = null;
		this._debugNeedsRemount = false;
		this._debugHookTypes = null;
	}
}

// 第六步：root的结构(结合createFiberRoot和FiberRootNode)
const rootInstance = {
	tag: 0,
	current: null,
	containerInfo: FormatedAppContainerDom,
	pendingChildren: null,
	pingCache: null,
	finishedExpirationTime: 0,
	finishedWork: null,
	timeoutHandle: -1,
	context: null,
	pendingContext: null,
	hydrate: false,
	firstBatch: null,
	callbackNode: null,
	callbackExpirationTime: 0,
	firstPendingTime: 0,
	lastPendingTime: 0,
	pingTime: 0,
	interactionThreadID: 1,
	memoizedInteractions: new Set(),
	pendingInteractionMap: new Map(),

	current: {
		tag: 3,
		key: null,
		elementType: null,
		type: null,
		stateNode: null,

		return: null,
		child: null,
		sibling: null,
		index: 0,
		ref: null,
		pendingProps: null,
		memoizedProps: null,
		updateQueue: null,
		memoizedState: null,
		dependencies: null,
		mode: 0,

		effectTag: 0,
		nextEffect: null,
		firstEffect: null,
		lastEffect: null,
		expirationTime: 0,
		childExpirationTime: 0,
		alternate: null,

		actualDuration: Number.NaN,
		actualStartTime: Number.NaN,
		treeBaseDuration: Number.NaN,

		actualDuration: 0,
		actualStartTime: -1,
		selfBaseDuration: 0,
		treeBaseDuration: 0,

		_debugID: 2,
		_debugIsCurrentlyTiming: false,

		_debugSource: null,
		_debugOwner: null,
		_debugNeedsRemount: false,
		_debugHookTypes: null,

		stateNode: ROOT_SELF, // root本身的引用
	},
}
```

### 结果

通过上面的步骤可以看到，最终`legacyCreateRootFromDOMContainer`返回的是一个`root`的实例，`rootInstance`就是`legacyRenderSubtreeIntoContainer`中的`fiberRoot`：
```js
{
	_internalRoot: rootInstance
}
```

### updateContainer

continue...
