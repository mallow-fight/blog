---
title: webpack
type: node
order: 4
---
## 核心概念
- entry 一个可执行模块或库的入口文件。
- chunk 多个文件组成的一个代码块，例如把一个可执行模块和它所有依赖的模块组合成一个 chunk 这体现了webpack的打包机制。
- loader 文件转换器，例如把es6转换为es5，scss转换为css。
- plugin 插件，用于扩展webpack的功能，在webpack构建生命周期的节点上加入扩展hook为webpack加入功能。

## 构建流程
从启动webpack构建到输出结果经历了一系列过程，它们是：
- 解析webpack配置参数，合并从shell传入和webpack.config.js文件里配置的参数，生产最后的配置结果。
- 注册所有配置的插件，好让插件监听webpack构建生命周期的事件节点，以做出对应的反应。
- 从配置的entry入口文件开始解析文件构建AST语法树，找出每个文件所依赖的文件，递归下去。
- 在解析文件递归的过程中根据文件类型和loader配置找出合适的loader用来对文件进行转换。
- 递归完后得到每个文件的最终结果，根据entry配置生成代码块chunk。
- 输出所有chunk到文件系统。

> 需要注意的是，在构建生命周期中有一系列插件在合适的时机做了合适的事情，比如UglifyJsPlugin会在loader转换递归完后对结果再使用UglifyJs压缩覆盖之前的结果。

## 如何生成不同格式的文件
使用node的writeFile模块来生成不同格式的文件。

## import error

Unknown custom element: `<search-form>` - did you register the component correctly? For recursive components, make sure to provide the "name" option:
`import xx from 'xx'` 而不是 `import {xx} from 'xx'`

## loader

在webpack中使用各种`loader`对文件进行预处理，达到适配各种中断的需求。

### 用法

可以使用`postcss`对编译过后的sass、less等进行样式补全，即一行代码适应多个浏览器

## webpack对页面性能的优化

> [segmentfault1](https://segmentfault.com/a/1190000004577578)

> [segmentfault2](https://segmentfault.com/a/1190000007891318)

> [github](https://github.com/hawx1993/tech-blog/issues/3)