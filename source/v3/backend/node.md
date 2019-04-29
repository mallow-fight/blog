---
title: node相关
order: 1
type: v3/backend
---

> [浏览器访问404](https://blog.csdn.net/cs380637384/article/details/82702106)
> [ssr](https://juejin.im/post/5bbedfca5188255c5e670682)

## 浏览器访问404

1. 这是因为浏览器访问的后端地址没有对应的后端路由。
2. 可以通过将访问的地址都指向前端静态资源上，也就是直接给浏览器前端首页资源。
3. 浏览器获取到静态资源后，会根据路由自动匹配相应的组件，从而接管应用。