---
title: webpack
type: node
order: 3
---

## loader

在webpack中使用各种`loader`对文件进行预处理，达到适配各种中断的需求。

## 用法

可以使用`postcss`对编译过后的sass
、less等进行样式补全，即一行代码适应多个浏览器

## issues

### Unknown custom element: `<search-form>` - did you register the component correctly? For recursive components, make sure to provide the "name" option

`import xx from 'xx'` 而不是 `import {xx} from 'xx'`

### render函数中修改一个对象之后，视图需要重新调整渲染一下，通常是控制样式隐藏再显示一次。不太确定，data中已定义的值或对象健值对就可以，有可能是因为绑定了监听器。直接在this对象上新建的健值对不可以。