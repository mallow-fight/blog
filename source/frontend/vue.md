---
title: vue
type: vue
order: 1
---

<p class="tip">通篇使用的Vue版本：2.5.0</p>

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

可以看到入口文件是`web/entry-runtime-with-compiler.js`，