---
title: react源码
order: 7
type: special
---

> [参考资料](https://juejin.im/post/5983dfbcf265da3e2f7f32de)

## 仓库

### 入口和出口

- 研究一个开源框架，首先得找到仓库的入口和出口

- package.json
```js
{
  "private": true, // npm 将拒绝发布它，这是一种防止意外发布私有存储库的方法，如果您希望确保仅将某个包发布到特定注册表，使用publishConfig下面描述的字典registry在发布时覆盖config参数
  "version": "16.6.1", // 版本
  "workspaces": [ // 应该是作为工作目录的入口供其它库读取，暂时不清楚干嘛的
    "packages/*"
  ],
  "devDependencies": { // 开发时的依赖
    "art": "^0.10.1",
    "babel-cli": "^6.6.5",
    "babel-code-frame": "^6.26.0",
    "babel-core": "^6.0.0",
    "babel-eslint": "^10.0.0",
    "babel-jest": "^23.0.1",
    "babel-plugin-check-es2015-constants": "^6.5.0",
    "babel-plugin-external-helpers": "^6.22.0",
    "babel-plugin-syntax-trailing-function-commas": "^6.5.0",
    "babel-plugin-transform-async-to-generator": "^6.22.0",
    "babel-plugin-transform-class-properties": "^6.11.5",
    "babel-plugin-transform-es2015-arrow-functions": "^6.5.2",
    "babel-plugin-transform-es2015-block-scoped-functions": "^6.5.0",
    "babel-plugin-transform-es2015-block-scoping": "^6.23.0",
    "babel-plugin-transform-es2015-classes": "^6.5.2",
    "babel-plugin-transform-es2015-computed-properties": "^6.5.2",
    "babel-plugin-transform-es2015-destructuring": "^6.5.0",
    "babel-plugin-transform-es2015-for-of": "^6.5.2",
    "babel-plugin-transform-es2015-literals": "^6.5.0",
    "babel-plugin-transform-es2015-modules-commonjs": "^6.5.2",
    "babel-plugin-transform-es2015-object-super": "^6.5.0",
    "babel-plugin-transform-es2015-parameters": "^6.5.0",
    "babel-plugin-transform-es2015-shorthand-properties": "^6.5.0",
    "babel-plugin-transform-es2015-spread": "^6.5.2",
    "babel-plugin-transform-es2015-template-literals": "^6.5.2",
    "babel-plugin-transform-object-rest-spread": "^6.6.5",
    "babel-plugin-transform-react-jsx-source": "^6.8.0",
    "babel-plugin-transform-regenerator": "^6.26.0",
    "babel-preset-react": "^6.5.0",
    "babel-traverse": "^6.9.0",
    "babylon": "6.18.0",
    "chalk": "^1.1.3",
    "cli-table": "^0.3.1",
    "coffee-script": "^1.8.0",
    "core-js": "^2.2.1",
    "coveralls": "^2.11.6",
    "create-react-class": "^15.6.3",
    "cross-env": "^5.1.1",
    "danger": "^3.0.4",
    "error-stack-parser": "^2.0.2",
    "eslint": "^4.1.0",
    "eslint-config-fbjs": "^1.1.1",
    "eslint-plugin-babel": "^3.3.0",
    "eslint-plugin-flowtype": "^2.25.0",
    "eslint-plugin-jest": "^21.6.1",
    "eslint-plugin-no-for-of-loops": "^1.0.0",
    "eslint-plugin-react": "^6.7.1",
    "eslint-plugin-react-internal": "link:./scripts/eslint-rules/",
    "fbjs-scripts": "^0.8.3",
    "filesize": "^3.5.6",
    "flow-bin": "^0.72.0",
    "glob": "^6.0.4",
    "glob-stream": "^6.1.0",
    "google-closure-compiler": "20180506.0.0",
    "gzip-size": "^3.0.0",
    "jasmine-check": "^1.0.0-rc.0",
    "jest": "^23.1.0",
    "jest-diff": "^23.0.1",
    "minimatch": "^3.0.4",
    "minimist": "^1.2.0",
    "mkdirp": "^0.5.1",
    "ncp": "^2.0.0",
    "object-assign": "^4.1.1",
    "prettier": "1.13.7",
    "prop-types": "^15.6.2",
    "random-seed": "^0.3.0",
    "react-lifecycles-compat": "^3.0.2",
    "rimraf": "^2.6.1",
    "rollup": "^0.52.1",
    "rollup-plugin-babel": "^3.0.1",
    "rollup-plugin-commonjs": "^8.2.6",
    "rollup-plugin-node-resolve": "^2.1.1",
    "rollup-plugin-prettier": "^0.3.0",
    "rollup-plugin-replace": "^2.0.0",
    "rollup-plugin-strip-banner": "^0.2.0",
    "semver": "^5.5.0",
    "targz": "^1.0.1",
    "through2": "^2.0.0",
    "tmp": "~0.0.28",
    "typescript": "~1.8.10",
    "@mattiasbuelens/web-streams-polyfill": "0.1.0"
  },
  "devEngines": { // 开发需要的node版本
    "node": "8.x || 9.x || 10.x || 11.x"
  },
  "jest": { // jest测试配置
    "testRegex": "/scripts/jest/dont-run-jest-directly\\.js$"
  },
  "scripts": { // 各种命令
    "build": "node ./scripts/rollup/build.js",
    "linc": "node ./scripts/tasks/linc.js",
    "lint": "node ./scripts/tasks/eslint.js",
    "lint-build": "node ./scripts/rollup/validate/index.js",
    "postinstall": "node node_modules/fbjs-scripts/node/check-dev-engines.js package.json && node ./scripts/flow/createFlowConfigs.js",
    "debug-test": "cross-env NODE_ENV=development node --inspect-brk node_modules/.bin/jest --config ./scripts/jest/config.source.js --runInBand",
    "test": "cross-env NODE_ENV=development jest --config ./scripts/jest/config.source.js",
    "test-fire": "cross-env NODE_ENV=development jest --config ./scripts/jest/config.source-fire.js",
    "test-prod": "cross-env NODE_ENV=production jest --config ./scripts/jest/config.source.js",
    "test-fire-prod": "cross-env NODE_ENV=production jest --config ./scripts/jest/config.source-fire.js",
    "test-prod-build": "yarn test-build-prod",
    "test-build": "cross-env NODE_ENV=development jest --config ./scripts/jest/config.build.js",
    "test-build-prod": "cross-env NODE_ENV=production jest --config ./scripts/jest/config.build.js",
    "flow": "node ./scripts/tasks/flow.js",
    "flow-ci": "node ./scripts/tasks/flow-ci.js",
    "prettier": "node ./scripts/prettier/index.js write-changed",
    "prettier-all": "node ./scripts/prettier/index.js write",
    "version-check": "node ./scripts/tasks/version-check.js"
  }
}
```

- 从package.json来看，react源码仓库的入口是执行npm run build，出口是执行这个命令之后的一个build文件夹，里面包含了所有需要打包的静态资源，它不是通过npm publish发布这些静态资源的，初步猜测应该是通过其它方式将build文件夹中的资源分发到各个npm包中，这点通过安装了react项目中的node_modules中的react文件夹也可以看出来

- 这么庞大的项目，涵盖了包括dist、node_modules以及native所有的资源，package.json可以做到这么精简，值得学习

## npm run build

- 最重要的命令莫过于打包命令了，下面来看看react是怎么执行打包命令来生成各种包的

- 打包过程：https://www.processon.com/mindmap/5c272483e4b0beb24861f67e

- build的之后的文件夹主要注意node_modules和react-native，一个一个来：

## node_modules

### react

- react核心代码，见下方详解

### react-art

- 画矢量图用的

### react-cache

- 给react应用提供缓存，目前不成熟，不可以在生产环境下使用

### react-dom

- 如果使用`<script>`标签引用React，可以在ReactDOM全局对象上直接访问到，如果npm使用es6，可以写作：`import ReactDOM from 'react-dom'`。

- 提供一些跟DOM相关的方法，作为一个触摸react模块之外的逃生舱。绝大多数组件不需要用到这个模块。

#### render

- 控制了你传入的节点内容，在第一次调用时，所有的DOM元素都会被替换，然后使用react-dom的diffing算法来高效更新

- 返回一个根实例的引用，使用这个引用是非法的，因为将来可能是异步返回的

#### hydrate

- 服务端渲染使用

#### unmountComponentAtNode

- 卸载某个已经挂载好的组件，同时清除它的所有事件监听和状态

#### findDOMNode

- 查找某个已经挂载好的组件

- 一般情况下，使用ref就足够了，最好不要使用这种刺穿组件模型的API

#### createPortal

- 将组件渲染到根节点之外的节点中，像门户一样

### react-is

- 用于测试传入的值是不是react的元素类型

### react-test-renderer

- 将React组件解析成js对象

- for example：
```js
const ReactTestRenderer = require('react-test-renderer');
const renderer = ReactTestRenderer.create(
  <Link page = "https://www.facebook.com/">Facebook</Link>
)
renderer.toJSON();
// {
//   type: 'a',
//   props: { href: 'https://www.facebook.com/' },
//   children: [ 'Facebook' ]
// }
```

## 研究思路

### 渲染过程

一般的web应用在脚手架中都是通过这种方式渲染出来的：
```js
import { render } from 'react-dom';
render(
  <App />,
  document.getElementById('app')
);
```

## React

对应到`<App />`的产生

### class

- 是构造函数的语法糖

- constructor就是构造函数体

- class里面的除了constructor之外的方法就是构造函数prototype上的方法

- constructor调用super来执行父constructor，这时候子constructor的参数就是父+子，通过这种方式来完全继承

- class中的static就相当于构造函数直接挂载的普通属性

### 依赖图

[processon](https://www.processon.com/mindmap/5c272483e4b0beb24861f67e)

### 结论

一般的class都会继承Component这个构造函数，这个函数会将props、setState等属性和方法注册到class上，然后这个class会作为react-dom的render函数的第一个参数传入，这个时候的形式是一个jsx，那么何为jsx呢？

## jsx

- [参考](https://reactjs.org/docs/introducing-jsx.html)

```jsx
const element = (
  <h1 className = "greeting">
    hello, world!
  </h1>
)
```

同：

```jsx
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'hello, world!'
)
```

经过React.createElement之后的简单结构：

```jsx
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'hello, world!'
  }
}
```

可以看到，React.createElement会对树状结构的jsx进行处理来生成需要的数据结构，所以说首先需要知道React.createElement干了些啥

## createElement

[参考](https://reactjs.org/docs/react-api.html#createelement)

```js
React.createElement(
  type,
  [props],
  [...children]
)
```

### type

- tag字符串名，如：'div'、'span'
- React component：class、function
- React fragment

### 示意图

[参考](https://www.processon.com/mindmap/5c272483e4b0beb24861f67e)