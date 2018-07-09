---
title: 边界
order: 2
type: css
---

## 边界

**元素有一个边界，它位于元素的内边距(padding)和外边距(margin)之间。默认情况下，边界的大小为0，使其不可见，但可以设置边界的粗细、样式和颜色以使其显示出来。**

### 属性

**border可以分解成许多不同的属性，以获得更具体的样式需求：**
- border-top, border-right, border-bottom, border-left: 设置边界一侧的宽度，样式和颜色。
- border-width, border-style, border-color: 设置边界宽度度、样式或颜色，但是会设置边界的四个边。
- 您还可以单独三个属性中的一个并且设置其中一侧边界生效：border-top-width, border-top-style, border-top-color等。

### 边界半径（border-radius）

**可以设置四个角落的边界半径大小**

### 阴影

box-shadow属性值中有4个项：
- 第一个长度值是水平偏移量（horizontal offset ）——即向右的距离，阴影被从原始的框中偏移(如果值为负的话则为左)。
- 第二个长度值是垂直偏移量（vertical offset）——即阴影从原始盒子中向下偏移的距离(或向上，如果值为负)。
- 第三个长度的值是模糊半径（blur radius）——在阴影中应用的模糊度。
- 颜色值是阴影的基本颜色（base color）。

多个box-shadow：还可以在单个box-shadow声明中指定多个框阴影，用逗号分隔
