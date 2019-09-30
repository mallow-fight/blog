---
title: Hello World
order: 2
type: react
---

> 下面的示例都是基于webpack的

**学习一个框架先从最简单的示例做起，比如下面的示例：**
````jsx
import React from 'react';
import { render } from 'react-dom';
render(
  <h1>Hello World</h1>,
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
	'h1',
	null, // 这个参数代表JSX的props
	'Hello, world'
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
function createElementWithValidation(type, props, children) {
	var info = '';
	info += getDeclarationErrorAddendum();
	var typeString = typeof type;
  return createElement.apply(this, arguments);
}
```

2. createElement

```js
function createElement(type, config, children) {
  var propName; // Reserved names are extracted

  var props = {};
  var key = null;
  var ref = null;
  var self = null;
  var source = null;

  if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref;
    }

    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source; // Remaining properties are added to a new props object

    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  } // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.


  var childrenLength = arguments.length - 2;

  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);

    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }

    {
      if (Object.freeze) {
        Object.freeze(childArray);
      }
    }

    props.children = childArray;
  } // Resolve default props


  if (type && type.defaultProps) {
    var defaultProps = type.defaultProps;

    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }

  {
    if (key || ref) {
      var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;

      if (key) {
        defineKeyPropWarningGetter(props, displayName);
      }

      if (ref) {
        defineRefPropWarningGetter(props, displayName);
      }
    }
  }

  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
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

### 回顾

```jsx
ReactDOM.render(
  <h1>Hello, world</h1>,
  document.getElementById('root')
);
```

现在我们知道其实最后执行的代码是这样的：
```js
ReactDOM.render(
  {
		$$typeof: Symbol.for('react.element'),
		type: 'h1',
		key: null,
		ref: null,
		props: {children: 'Hello world'},
		_owner: Fiber,
	},
  document.getElementById('root')
);
```

### 源码

1. 老办法，找到`react-dom`的入口文件`react-dom/index.js`，我们可以看到它`export`出来的是`./src/client/ReactDOM`。
2. 我们去`./src/client/ReactDOM`找到`render`方法：
```js
const ReactDOM = {
	...
	render,
	...
}
```
3. 整理一下`render`方法，提取出我们示例跑过的分支：
```js
render(
    element: React$Element<any>,
    container: DOMContainer,
    callback: ?Function,
  ) {
	return legacyRenderSubtreeIntoContainer(
		null,
		element,
		container,
		false,
		callback,
	);
}
```
4. 可以看出我们最终执行的是：
```js
return legacyRenderSubtreeIntoContainer(
	null,
	{
		$$typeof: Symbol.for('react.element'),
		type: 'h1',
		key: null,
		ref: null,
		props: {children: 'Hello world'},
		_owner: Fiber,
	},
	document.getElementById('root'),
	false,
	undefined
)
```
5. 下面我们来看看`legacyRenderSubtreeIntoContainer`这个方法：

### legacyRenderSubtreeIntoContainer

1. 整理出我们的示例跑过的分支：
```js
function legacyRenderSubtreeIntoContainer(
	// null
	parentComponent: ?React$Component<any, any>,
	// {
	// 	$$typeof: Symbol.for('react.element'),
	// 	type: 'h1',
	// 	key: null,
	// 	ref: null,
	// 	props: {children: 'Hello world'},
	// 	_owner: Fiber,
	// }
	children: ReactNodeList,
	// document.getElementById('root')
	container: DOMContainer,
	// false
	forceHydrate: boolean,
	// undefined
  callback: ?Function,
) {
  // TODO: Without `any` type, Flow says "Property cannot be accessed on any
  // member of intersection type." Whyyyyyy.
  let root: _ReactSyncRoot = (container._reactRootContainer: any);
  let fiberRoot;
  // Initial mount
	root = container._reactRootContainer = legacyCreateRootFromDOMContainer(
		container,
		forceHydrate,
	);
	fiberRoot = root._internalRoot;
	// Initial mount should not be batched.
	unbatchedUpdates(() => {
		updateContainer(children, fiberRoot, parentComponent, callback);
	});
  return getPublicRootInstance(fiberRoot);
}
```
2. 我们来拆分一下：
	1. `root`: 首先会检查一下`container._reactRootContainer`存不存在，如果不存在，就执行`root = container._reactRootContainer = legacyCreateRootFromDOMContainer(container, forceHydrate)`，执行完这个之后注意一下，我们的`container`就会有`_reactRootContainer`这个属性了。
	2. `fiberRoot`就是`legacyCreateRootFromDOMContainer(container, forceHydrate)._internalRoot`，这样看起来更直观。
3. 所以有四个函数我们需要研究一下：`legacyCreateRootFromDOMContainer`、`updateContainer`、`unbatchedUpdates`、`getPublicRootInstance`。
4. 我们一个个看下：

### legacyCreateRootFromDOMContainer
1. 也就是执行：
```js
legacyCreateRootFromDOMContainer(
	document.getElementById('root'),
	false,
)
```
2. 整理如下：
```js
function legacyCreateRootFromDOMContainer(
  container: DOMContainer,
  forceHydrate: boolean,
): _ReactSyncRoot {
  const shouldHydrate =
    forceHydrate || shouldHydrateDueToLegacyHeuristic(container); // 这个函数会返回false，它会检查
  // 清空container存在的内容，确保所有的dom结构都在掌控之中
  if (!shouldHydrate) {
    let warned = false;
    let rootSibling;
    while ((rootSibling = container.lastChild)) {
      container.removeChild(rootSibling);
    }
  }

  // Legacy roots are not batched.
  return new ReactSyncRoot(
    container, // document.getElementById('root')
    LegacyRoot, // 0
    shouldHydrate // false
      ? {
          hydrate: true,
        }
      : undefined,
  );
}
```
3. 可以看出，这个函数会返回一个`ReactSyncRoot`的示例，我们来看下这个构造函数：
```js
function ReactSyncRoot(
  container: DOMContainer,
  tag: RootTag, // 0
  options: void | RootOptions, // undefined
) {
  // Tag is either LegacyRoot or Concurrent Root
  const hydrate = options != null && options.hydrate === true; // false
  const hydrationCallbacks =
    (options != null && options.hydrationOptions) || null; // false
  const root = createContainer(container, tag, hydrate, hydrationCallbacks);
  this._internalRoot = root;
}
```
4. 示例化之后，会产生这样的结构：
```js
{
	_internalRoot: createContainer(container, tag, hydrate, hydrationCallbacks)
}
```
5. 看一下`createContainer`的执行结果：
```js
function createContainer(
  containerInfo: Container,
  tag: RootTag, // 0
  hydrate: boolean, // false
  hydrationCallbacks: null | SuspenseHydrationCallbacks, // false
): OpaqueRoot {
  return createFiberRoot(containerInfo, tag, hydrate, hydrationCallbacks);
}
```
6. 即返回一个`FiberRoot`：
```js
function createFiberRoot(
  containerInfo: any,
  tag: RootTag, // 0
  hydrate: boolean, // false
  hydrationCallbacks: null | SuspenseHydrationCallbacks, // false
): FiberRoot {
  const root: FiberRoot = (new FiberRootNode(containerInfo, tag, hydrate): any);
  // 这段代码会产生循环引用，类似：{ current: {stateNode: { current: { stateNode ... } } } }
  const uninitializedFiber = createHostRootFiber(tag);
  root.current = uninitializedFiber;
  uninitializedFiber.stateNode = root;

  return root;
}
```
7. 接下来有两个函数需要研究一下：

#### FiberRootNode
```js
function FiberRootNode(containerInfo, tag, hydrate) {
  this.tag = tag;
  this.current = null;
  this.containerInfo = containerInfo;
  this.pendingChildren = null;
  this.pingCache = null;
  this.finishedExpirationTime = NoWork;
  this.finishedWork = null;
  this.timeoutHandle = noTimeout;
  this.context = null;
  this.pendingContext = null;
  this.hydrate = hydrate;
  this.firstBatch = null;
  this.callbackNode = null;
  this.callbackExpirationTime = NoWork;
  this.firstPendingTime = NoWork;
  this.lastPendingTime = NoWork;
	this.pingTime = NoWork;
	this.interactionThreadID = unstable_getThreadID();
	this.memoizedInteractions = new Set();
	this.pendingInteractionMap = new Map();
}
```
这个构造函数`(new FiberRootNode(containerInfo, tag, hydrate): any)`示例化之后会产生这样的结构：
```js
{
	tag: 0,
	current: null,
	containerInfo: document.getElementById('root'),
	pendingChildren: null,
	finishedExpirationTime: 0,
	finishedWork: null,
	timeoutHandle: -1, // 应该就是react-reconciler/src/forks/ReactFiberHostConfig.dom.js，
	context: null,
	pendingContext: null,
	hydrate: false,
	firstBatch: null,
	callbackNode: null,
	callbackExpirationTime: 0,
	firstPendingTime: 0,
	lastPendingTime: 0,
	pingTime: 0,
	interactionThreadId: 1, // 递增的数字
	memoizedInteractions: new Set(),
	pendingInteractionMap: new Map()
}
```

#### createHostRootFiber
```js
function createHostRootFiber(tag: RootTag): Fiber {
  return createFiber(3, null, null, 0);
}
```
createFiber:
```js
var createFiber = function (tag, pendingProps, key, mode) {
  // $FlowFixMe: the shapes are exact here but Flow doesn't like constructors
  return new FiberNode(tag, pendingProps, key, mode);
};
```
即执行：
```js
function FiberNode(tag, pendingProps, key, mode) {
  // Instance
  this.tag = tag;
  this.key = key;
  this.elementType = null;
  this.type = null;
  this.stateNode = null; // Fiber
  this.return = null;
  this.child = null;
  this.sibling = null;
  this.index = 0;
  this.ref = null;
  this.pendingProps = pendingProps;
  this.memoizedProps = null;
  this.updateQueue = null;
  this.memoizedState = null;
  this.dependencies = null;
  this.mode = mode; // Effects
  this.effectTag = NoEffect;
  this.nextEffect = null;
  this.firstEffect = null;
  this.lastEffect = null;
  this.expirationTime = NoWork;
  this.childExpirationTime = NoWork;
  this.alternate = null;
	this.actualDuration = 0;
	this.actualStartTime = -1;
	this.selfBaseDuration = 0;
	this.treeBaseDuration = 0;
	this._debugID = debugCounter++;
	this._debugIsCurrentlyTiming = false;
	this._debugSource = null;
	this._debugOwner = null;
	this._debugNeedsRemount = false;
	this._debugHookTypes = null;
}
```
得到这样的实例：
```js
{
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
	dependencied: null,
	mode: 0,
	effectTag: 0,
	nextEffect: null,
	firstEffect: null,
	lastEffect: null,
	expirationTime: 0,
	childExpirationTime: 0,
	alternate: null,
	actualDuration: 0,
	actualStartTime: -1,
	selfBaseDuration: 0,
	treeBaseDuration: 0,
	_debugID: 1,
	_debugIsCurrentlyTiming: false,
	_debugSource: null,
	_debugOwner: null,
	_debugNeedsRemount: false,
	_debugHookTypes: null
}
```

8. ok, 最后我们的`root`会产生这样的一个结构，也就是后面使用的`fiberRoot`：
```js
const fiberRoot = {
	// 由示例化FiberRootNode产生
	tag: 0,
	current: null,
	containerInfo: document.getElementById('root'),
	pendingChildren: null,
	finishedExpirationTime: 0,
	finishedWork: null,
	timeoutHandle: -1, // 应该就是react-reconciler/src/forks/ReactFiberHostConfig.dom.js，
	context: null,
	pendingContext: null,
	hydrate: false,
	firstBatch: null,
	callbackNode: null,
	callbackExpirationTime: 0,
	firstPendingTime: 0,
	lastPendingTime: 0,
	pingTime: 0,
	interactionThreadId: 1, // 递增的数字
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
		dependencied: null,
		mode: 0,
		effectTag: 0,
		nextEffect: null,
		firstEffect: null,
		lastEffect: null,
		expirationTime: 0,
		childExpirationTime: 0,
		alternate: null,
		actualDuration: 0,
		actualStartTime: -1,
		selfBaseDuration: 0,
		treeBaseDuration: 0,
		_debugID: 1,
		_debugIsCurrentlyTiming: false,
		_debugSource: null,
		_debugOwner: null,
		_debugNeedsRemount: false,
		_debugHookTypes: null,
		stateNode: Object current // 循环引用current本身
	}
}
```
9. 所以`legacyCreateRootFromDOMContainer`最后会返回这样一个对象：
```js
return {
	_internalRoot: root // 见第8步
}
```


### updateContainer

1. 即执行：
```js
updateContainer(
	{
		$$typeof: Symbol.for('react.element'),
		type: 'h1',
		key: null,
		ref: null,
		props: {children: 'Hello world'},
		_owner: Fiber,
	},
	fiberRoot, // legacyCreateRootFromDOMContainer执行结果的root
	null,
	undefined
);
```
2. 整理一下：
```js
function updateContainer(element, container, parentComponent, callback) {
  var current$$1 = container.current; // 就是fiberRoot的current
  var currentTime = requestCurrentTime(); // 当前时间，todo：怎么生成的
  var suspenseConfig = requestCurrentSuspenseConfig(); // todo：这是什么的配置
  var expirationTime = computeExpirationForFiber(currentTime, current$$1, suspenseConfig); // 终结时间 todo：怎么生成的
  return updateContainerAtExpirationTime(element, container, parentComponent, expirationTime, suspenseConfig, callback);
}
```

#### updateContainerAtExpirationTime

1. 整理如下
```js
function updateContainerAtExpirationTime(element, container, parentComponent, expirationTime, suspenseConfig, callback) {
  // TODO: If this is a nested container, this won't be the root.
  var current$$1 = container.current;
	var context = getContextForSubtree(parentComponent);
  container.context = context;
  return scheduleRootUpdate(current$$1, element, expirationTime, suspenseConfig, callback);
}
```

#### getContextForSubtree

```js
function getContextForSubtree(parentComponent) {
  return emptyContextObject; // {}
}
```

#### scheduleRootUpdate

1. 即执行：
```js
scheduleRootUpdate(fiberRoot.current, {
		$$typeof: Symbol.for('react.element'),
		type: 'h1',
		key: null,
		ref: null,
		props: {children: 'Hello world'},
		_owner: Fiber,
	}, expirationTime, suspenseConfig, undefined);
```
2. 整理如下：
```js
function scheduleRootUpdate(current$$1, element, expirationTime, suspenseConfig, callback) {
	var update = createUpdate(expirationTime, suspenseConfig);
	
  update.payload = {
    element: element
  };

  enqueueUpdate(current$$1, update); // 这个应该就是把需要更新的内容放到更新队列中去
  scheduleWork(current$$1, expirationTime); // 这一步应该就是在终止时间之前更新
  return expirationTime;
}
```


### unbatchedUpdates

```js
function unbatchedUpdates(fn, a) {
  var prevExecutionContext = executionContext;
  executionContext &= ~BatchedContext;
  executionContext |= LegacyUnbatchedContext;

  try {
    return fn(a);
  } finally {
    executionContext = prevExecutionContext;

    if (executionContext === NoContext) {
      // Flush the immediate callbacks that were scheduled during this batch
      flushSyncCallbackQueue();
    }
  }
}
```

### getPublicRootInstance

```js
function getPublicRootInstance(container) {
  var containerFiber = container.current;

  switch (containerFiber.child.tag) { // 5
		case HostComponent: // 5
			// stateNode就是真实的dom节点，react对它进行了一些修改
      return getPublicInstance(containerFiber.child.stateNode); // return containerFiber.child.stateNode

    default:
      return containerFiber.child.stateNode;
  }
}
```

## 回顾

1. 至此，我们走完了整个流程。但是，`react`是如何将`jsx`更新到真实的`dom`节点上，还是很模糊，我们单独拎出来。
2. 这段是关键：
```js
unbatchedUpdates(() => {
	updateContainer(children, fiberRoot, parentComponent, callback);
});
```