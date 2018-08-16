---
title: 通信
order: 7
type: browser
---

## 如何用更好的方式跳转app内嵌网页以及携带参数

> [参考资料](https://segmentfault.com/a/1190000010356403)

- 直接透传链接携带的参数，这种方式比较笨拙

- 使用`localStorage`，这种方式不太安全

- 通过`jsBridge`从`app`订阅某些数据，或者通知`app`某些数据
