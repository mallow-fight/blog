---
title: 其它
order: 11
type: css
---

## 语法

### 内容组合

- 属性
一些人类可理解的标识符，这些标识符指出你想修改哪一些样式，例如：字体、宽度、背景颜色等

- 属性值
每个指定的属性都需要给定一个值，这个值表示你想把那些特征修改成什么样

### css规则
与值配对的属性被称为css声明。css声明会被放置在一个css声明块中。最后，css声明块与选择器相结合形成一个css规则集

### 层叠算法
一个给定的属性可能被多个规则设置多次。css定义了哪个规则比其它规则更具有优先级，更具优先级的规则必定被应用。

> 如果链或组中的某个选择器无效，比如使用了未知的伪元素或伪类，整个组的选择器仍然是有效的，除了这个无效的被忽略的选择器（class、id除外）

### css语句

1. `@charset`、`@import`(元数据)
1. `@media`(只有运行浏览器的设备匹配其表达条件时才会应用)、 `@document`(只有当前页面匹配一些条件时才会应用)、`@supports`（只有浏览器确实支持被测功能时才会应用） - (条件信息)
1. `@font-face`(描述性信息)

## 过滤器

`CSS`过滤器提供了一种过滤元素的方法，就好比你在诸如`Photoshop`这样的平面设计程序中过滤元素一样。

基本上，过滤器可以应用在任何元素上，块元素（`block`）或者行内元素（`inline`）——你只需要使用`filter`属性，并且给他一个特定的过滤函数的值。有些可用的过滤器选项和其他`CSS`特性做的事情十分相似，例如`drop-shadow()`的工作方式以及产生的效果和 `box-shadow` 或`text-shadow`十分相似。然而过滤器真正出色的地方在于，它们作用于盒（`box`）内内容（`content`）的确切形状，而不仅仅将盒子本身作为一个大的块。


## 混合模式

`CSS`混合模式允许我们为元素添加一个混合模式 ，以当两个元素重叠时，指定一个混合的效果——最终每个像素所展示的颜色将会是原来像素中颜色和其下面一层相组合之后的结果，对于像`Photoshop`这样的图形程序的用户来说，混合模式应该也非常熟悉。

### mix-blend-mode

你可以看到，多层混合（`mix-blend`）不仅混合了两种背景图像，还混合了在`<div>`下面的颜色。

### -webkit-background-clip: text

另一个我们认为在继续之前会提到的新特性(目前支持`Chrome`、`Safari`和`Opera`,和在`Firefox`正在实现)是`background-clip`的 `text` 值。当与专有 `-webkit-text-fill-color: transparent;` 特性一起使用时，这允许您将背景图像剪贴到元素文本的形状，从而产生一些不错的效果。这不是一个正式的标准，但是已经在多个浏览器中实现了，因为它很流行，并且被开发人员广泛使用。在这种情况下，这两种属性都需要一个`-webkit-`供应商前缀，甚至对于非`webkit/Chrome-based`的浏览器来说也是如此。

## css调试

**css是宽容的**

## 列表样式

1. `list-style-type`: 设置用于列表项目符号的类型
1. `list-style-position`: 项目符号出现在列表项内，还是出现在其外
1. `list-style-image`: 允许为项目符号使用自定义图片
1. `list-style`: 融合 ex - list-style: type imageUrl position

## 边框属性

- outline：在一个声明中设置所有的轮廓属性

- outline-color：设置轮廓的颜色

- outline-style：设置轮廓的样式

- outline-width：设置轮廓的宽度

## 百分比宽度
限制图片宽度，可以使用`min-width`和`max-width`

## 媒体查询
‘响应式设计’是一种让网站针对不同的浏览器和设备呈现不同显示效果的策略。

## inline-block
需要注意的事：
- `vertical-align`属性会影响到`inline-block`属性
- 需要设置每一列的宽度
- 如果`html`源码中元素之间有空格，那么列与列之间会产生空隙

## column
```css
/* 三列文章，文章间隙1em */
.three-column{
    padding: 1em;
    -moz-column-count: 3;
    -moz-column-gap: 1em;
    -webkit-column-count: 3;
    -webkit-column-gap: 1em;
    column-count: 3;
    column-gap: 1em;
}
```