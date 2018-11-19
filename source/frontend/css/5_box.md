---
title: 框模型
order: 5
type: css
---

## 边界

### 定义

**元素有一个边界，它位于元素的内边距(padding)和外边距(margin)之间。默认情况下，边界的大小为0，使其不可见，但可以设置边界的粗细、样式和颜色以使其显示出来。**

### 属性

**border可以分解成许多不同的属性，以获得更具体的样式需求：**

- border-top, border-right, border-bottom, border-left: 设置边界一侧的宽度，样式和颜色。

- border-width, border-style, border-color: 设置边界宽度度、样式或颜色，但是会设置边界的四个边。

- 您还可以单独三个属性中的一个并且设置其中一侧边界生效：border-top-width, border-top-style, border-top-color等。

### 边界半径（border-radius）

**可以设置四个角落的边界半径大小**

### 阴影

**box-shadow属性值中有4个项：**

- 第一个长度值是水平偏移量（horizontal offset ）——即向右的距离，阴影被从原始的框中偏移(如果值为负的话则为左)。

- 第二个长度值是垂直偏移量（vertical offset）——即阴影从原始盒子中向下偏移的距离(或向上，如果值为负)。

- 第三个长度的值是模糊半径（blur radius）——在阴影中应用的模糊度。

- 颜色值是阴影的基本颜色（base color）。

**多个box-shadow：还可以在单个box-shadow声明中指定多个框阴影，用逗号分隔**

## 属性

- width\height

**设置内容框的高度和宽度**

**设置大小约束：min-width、max-width、min-height、max-height**

- padding

**表示css框的内边距 - 这一层位于内容框的外边缘与边界的内边缘之间**

- border

**分隔层 - 位于内边距的外边缘以及外边距的内边缘之间**

- margin

**代表css框周围的外部区域，它在布局中推开其它css框，表现和padding类似**

## 高级的框操作

- 溢流

**当使用绝对的值设置了一个框的大小（固定像素的宽高），允许的大小可能不适合放置内容，这种情况下内容会从盒子溢流。**

**使用`overflow`来控制这些属性的发生：**

  - visible：当内容过多，溢流的内容被显示在盒子的外边（默认）

  - auto：当内容过多，溢流的内容被隐藏，然后出现滚动条查看所有内容

  - hidden：当内容过多，溢流的内容被隐藏

- 背景裁剪

```css
background-clip: border-box;
background-clip: padding-box;
background-clip: content-box;
```

- 轮廓

`outline`: 和边界差不多，框边界之外，外边距区域之内

## 背景

**在元素内容、内边距和边界下层的区域**

### 属性：

- `background-color`: 为背景设置一个纯色。

- `background-image`: 指定在元素的背景中出现的背景图像，这可以是静态文件，也可以是生成的渐变。

- `background-position`:指定背景应该出现在元素背景中的位置。

- `background-repeat`: 指定背景是否应该被重复(平铺)。

- `background-attachment`: 当内容滚动时，指定元素背景的行为，例如，它是滚动的内容，还是固定的? - 这个可以设置`fixed`来使得图片不跟随滚动条滚动.

- `background`: 在一行中指定以上五个属性的缩写。

- `background-size`: 允许动态调整背景图像的大小。

### color

- 大多数元素的默认颜色不是白色，而是`transparent`

### image

- `url()` 函数——它以一个参数的路径作为参数——获取一个静态图像文件来插入

### repeat

- `no-repeat`: 图像将不会重复，它只会显示一次。

- `repeat-x`: 图像将在整个背景中水平地重复。

- `repeat-y`: 图像会在背景下垂直地重复。

### position

- 允许我们在背景中任意位置放置背景图像。通常，该属性将使用两个通过空格分隔的值，该空间指定了图像的水平(x)和垂直(y)坐标。图像的左上角是原点(0,0)。把背景想象成一个图形，x坐标从左到右，y坐标从上到下。

- 不同的值类型：

  - 像`px`这样的绝对值，比如：`background-position: 200px 25px`

  - 像`rems`这样的相对值，比如：`background-position: 20rem 2.5rem`

  - 百分比，比如 `background-position: 90% 25%`

  - 关键字，比如 `background-position: right center`. 这两个值是直观的，可以分别取值比如 `left`，`center`， `right`和 `top`，`center`， `bottom`

### 渐变

- 渐变就是在背景中平滑的颜色过渡。

- 动态生成的渐变是在不久之前引入的，这是因为在web设计中使用渐变是非常受欢迎的，但是使用背景图像来实现渐变是相当不灵活的。

- 目前有两种类型的渐变——线性渐变(从一条直线到另一条直线)和径向渐变(从一个点发散出来)。

### 背景附着

- 使用`background-attachment`属性来控制的，该属性可以使用以下值：

  - `scroll`: 这将把背景修改为页面视图，因此它将在页面滚动时滚动。注意，我们说的是视图，而不是元素——如果你滚动实际的背景设置的元素，而不是页面，背景不会滚动。

  - `fixed`: 这可以在页面的位置上固定背景，所以当页面滚动时，它不会滚动，不管你是滚动页面还是背景设置的元素，它都会保持在相同的位置。

  - `local`:这个值后来被添加了(它只在`Internet Explorer 9+`中得到支持，而其他的则在`IE4+`中得到支持)，因为`scroll`值相当混乱，并且在许多情况下并没有真正做您想要的事情。`local` 值将背景设置为它所设置的元素的背景，因此当您滚动元素时，背景会随之滚动。