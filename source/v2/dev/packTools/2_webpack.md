---
title: 介绍
order: 2
type: packTools
---

## typeof导致的死循环

- 注意@babel/preset-env的版本要小于@babel/core的版本

## theme.js的使用

- 由于使用了babel-plugin-import之后会生成对应组件的less，项目中已经有了对应的webpack配置了，所以会直接将theme加到编译less的过程中，故只要保证组件库生成正确的less就可以了。