---
title: react相关
order: 5
type: v3/frontend
---

> [手搓react、react-router、redux](https://github.com/mallow-fight/mini-react)
> 这个仓库中有react、react-router、redux的简单实现。

## react

1. 写一个简单版的react最重要的是定义好虚拟DOM树的结构，使用这个结构来适配所有的JSX类型，这样就可以统一操作，不容易出错，处理逻辑复用程度就很高。
2. 其次应该分清各个模块的职责，每个模块之间的功能都是单一且稳定的。
3. 最后是弄清楚树状结构各个层级之间的关系。
4. 主要会用到各种递归以及处理各种类型的DOM元素的差异性。
5. 对比新旧VDOM的算法也挺有意思的，加上一些启发性的算法可以加快对比速度。

## react-router

> 这几种方式可以封装成同一个API，比如history库。这样有利于逻辑的复用，而且不容易出错。

### hash

1. 监听hashchange。
2. 根据hashchange之后的newUrl匹配对应的path。
3. 渲染匹配到的path对应的component。
4. 如果是初次渲染有hash的url，直接匹配渲染。

### history

1. 主要难点在怎么监听pushState，然后更新对应的路由。
2. 得维护一个实例数组，在route组件willMount的时候注册这个实例（也就是this），unMount的时候取消注册这个实例（也就是从数组中删除）。
3. 还有注意一下浏览器本身的前进后退等行为，这个一样可以被监听到。

### memory

1. 将router对象存在服务器内存中。
2. 当浏览器访问对应路由时，会去服务器内存中读取对应路由的配置。
3. 将配置中的组件返回给前端，完成首屏渲染。
4. 一般只是首次渲染使用ssr，后续会交给浏览器作为一个spa应用。

## redux