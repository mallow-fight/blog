---
title: 混合模式
order: 4
type: css
---

`CSS`混合模式允许我们为元素添加一个混合模式 ，以当两个元素重叠时，指定一个混合的效果——最终每个像素所展示的颜色将会是原来像素中颜色和其下面一层相组合之后的结果，对于像`Photoshop`这样的图形程序的用户来说，混合模式应该也非常熟悉。

## mix-blend-mode

你可以看到，多层混合（`mix-blend`）不仅混合了两种背景图像，还混合了在`<div>`下面的颜色。

## -webkit-background-clip: text

另一个我们认为在继续之前会提到的新特性(目前支持`Chrome`、`Safari`和`Opera`,和在`Firefox`正在实现)是`background-clip`的 `text` 值。当与专有 `-webkit-text-fill-color: transparent;` 特性一起使用时，这允许您将背景图像剪贴到元素文本的形状，从而产生一些不错的效果。这不是一个正式的标准，但是已经在多个浏览器中实现了，因为它很流行，并且被开发人员广泛使用。在这种情况下，这两种属性都需要一个`-webkit-`供应商前缀，甚至对于非`webkit/Chrome-based`的浏览器来说也是如此。

## css调试

**css是宽容的**
