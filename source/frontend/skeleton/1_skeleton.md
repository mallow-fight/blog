---
title: 前端骨架
order: 1
type: skeleton
---

> [参考资料 - 偏前端](https://dailc.github.io/2018/03/12/whenyouenteraurl.html)
> [参考资料 - 偏硬件](http://fex.baidu.com/blog/2014/05/what-happen/)

## 大纲
- 接受URL～开启网络请求线程
  - 多进程的浏览器
  - 多线程的浏览器内核
  - 解析URL

- 开启网络请求线程～发出一个完整的http请求
  - DNS查询得到IP
  - TCP/IP请求
  - 五层因特网协议栈
  
- 服务器接收到完整的http请求～对应后台接受到请求
  - 负载均衡
  - 后台处理

- 后台和前台的http交互
  - http报文结构
  - cookie及优化
  - gzip压缩
  - 长连接和短连接
  - http2.0
  - https

- http的缓存
  - 强缓存和弱缓存
  - 缓存头部简述
  - 头部的区别

- 解析页面流程
  - 流程简述
  - HTML解析，构建DOM
  - 生成CSS规则
  - 构建渲染树
  - 渲染
  - 简单层和复合层
  - Chrome中的调试
  - 资源外链的下载
  - loaded和domcontentloaded

- CSS可视化格式模型
  - 包含块
  - 控制框
  - BFC
  - IFC

- JS引擎解析过程
  - 解释阶段
  - 预处理阶段
  - 执行阶段
  - 回收机制

## 前端向知识重点
- 核心知识：浏览器模型、渲染原理、JS解析过程、JS运行机制，作为骨架承载知识体系
- 重点知识：http、web、跨域、算法、流行的框架
- 扩展知识：五层因特网协议栈、hybrid模式、移动原生开发、后台相关