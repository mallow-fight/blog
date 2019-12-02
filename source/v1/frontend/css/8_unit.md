---
title: 数值和单位
type: css
order: 8
---

## 移动端1px像素显示模糊

> [参考资料](https://segmentfault.com/a/1190000007604842)

- boder-image：图片实现

- background-image：渐变实现

- viewport + rem：调整设备像素比

- box-shadow：阴影实现

- transform: scale(0.5)

## 消除1px宽度问题/宽度适配

**box-sizing 属性可以被用来调整这些表现：**

- content-box：默认值。如果你设置一个元素的宽为100px，那么这个元素的内容区会有100px宽，并且任何边框和内边距的宽度都会被增加到最后绘制出来的元素宽度中。

- border-box：告诉浏览器去理解你设置的边框和内边距的值是包含在width内的。也就是说，如果你将一个元素的width设为100px,那么这100px会包含其它的border和padding，内容区的实际宽度会是width减去border + padding的计算值。大多数情况下这使得我们更容易的去设定一个元素的宽高。

## 值的类型

- 数值

- 百分比

- 颜色

- 坐标位置

- 函数

### 数值

- 绝对单位

    - 像素（px）是一种绝对单位，指定的值不会变化

- 相对单位

    - 相对于当前元素的字号（font-size）或视口（viewport）尺寸。

    - `em`: 默认值`16px`, em单位会继承父元素的字体大小，所以如果在父元素上设置了不同的字体大小，em的像素值会变得复杂。web开发中最常用的相对单位。

    - `ex,ch`：分别是小写`x`的高度和数字`0`的宽度。并不像em那样被普遍使用或很好的被支持。

    - `rem`：和em以同样的方式工作，总是等于默认基础字体大小的尺寸，继承的字体大小将不起作用，旧版本ie上不被支持。

    - `vw,vh`：分别是视口宽度的1/100和视口高度的1/100，不像rem那样被广泛支持。

- 无单位的值

**无单位的行高：使用无单位的行高更容易，比如：`line-height: 1.5`, 为元素高度的1.5倍。**