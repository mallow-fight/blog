---
title: redux
order: 2
type: state
---

## 自述

redux时是js状态容器, 提供可预测化的状态管理

1. 构建一致化的应用，运行于不同的环境（客户端/服务器/原生应用）
1. 易于测试

## 要点

1. 应用中所有的state都以一个对象树的形式存储在一个store中
1. 唯一改变state的办法是触发action: 一个描述发生什么的对象
1. 为了描述acton如何改变state树，你需要编写reducers

## 动机

1. 单页应用日益复杂，js需要管理比任何时候都要多的state（状态）
1. stete在什么时候，由于什么原因，如何变化已不受控制
1. 前端开发的新需求，如更新优化、服务端渲染、路由跳转前请求数据
1. 变化和异步

## 三大原则

- 单一数据源

整个应用的state被存储在一棵object tree中，并且这个object tree只存在于唯一一个store中

- state是只读的

the only way to change the state to emit an action, an object describing what happened.

- changes are made with pure functions

the specify how the state tree is transformed by actions, you write pure reducers.

## Action

Action 是把数据从应用传到store的有效载荷，它是store数据的唯一来源。
当应用规模越来越大时，建议用单独的模块或文件来存放action

## Reducer

指定了应用状态的变化如何响应actions并发送到store
actions只是描述了有事情发生了这一事实，并没有描述应用如何更新state
纯函数，接受旧的state和action，返回新的state
禁止在reducer中进行以下操作
  - 修改传入参数
  - 执行有副作用的操作，如API请求和路由跳转
  - 调用非纯函数，如Date.now() 或 Math.random()