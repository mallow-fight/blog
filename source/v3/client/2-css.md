---
title: css
order: 2
type: v3/client
---

## 动画

>[参考](http://www.ruanyifeng.com/blog/2014/02/css_transition_and_animation.html)

## 布局

### 盒(框)模型

![ct_boxmodel](../../../images/ct_boxmodel.gif)

#### 内容 - content

- 元素框的最内部分

#### 内边距 - padding

- 内容和边框之间的空白区域

- 可以设置长度值或者百分比值，不允许使用负值

#### 边框 - border

- 围绕内边距（如果有，没有就是内容）的一条或多条线

- 可以设置颜色、样式、宽度

#### 外边距 - margin

- 围绕元素边框的空白区域

- 可以设置长度值或者百分比值，甚至负值

### 定位机制

- 类型：普通流、浮动、绝对定位。

- 除非专门指定，否则所有框都在普通流中定位。

- 普通流中的元素的位置由元素在 (X)HTML 中的位置决定。

### display

- block: 块级元素

  - 每个元素独占一行

  - 宽度默认100%

  - 框之间的垂直距离是由框的垂直外边距计算出来。

- inline：行内元素

  - 和其他元素都在一行

  - 元素的`height`、`width`、`margin-top`、`margin-bottom`都不可设置

  - 元素的宽度就是它包含的文字或图片的宽度，不可改变

  - 多个内联元素的宽度超过行宽时，会自动换行

  - 通常用于段落中某些文字的修饰

  - 可以使用水平内边距、边框和外边距调整它们的间距。但是，垂直内边距、边框和外边距不影响行内框的高度。由一行形成的水平框称为行框（Line Box），行框的高度总是足以容纳它包含的所有行内框。不过，设置行高可以增加这个框的高度。

- inline-block：行内块级元素

  - 和其他元素都在一行上

  - 元素的`height`、`width`、`line-height`、`margin-top`、`margin-bottom`都可设置

  - 多个内联块状元素的宽度超过行宽时，会自动换行

- none: 用于隐藏元素，不占据空间

### position

- static：元素框正常生成。块级元素生成一个矩形框，作为文档流的一部分，行内元素则会创建一个或多个行框，置于其父元素中。

- relative：元素框偏移某个距离。元素仍保持其未定位前的形状，它原本所占的空间仍保留。如果不添加额外的属性，表现的和`static`一样，如果添加了`top`、`right`、`bottom`、`left`会使其偏离正常位置，其它元素此时不会受该元素影响。相对定位实际上被看作普通流定位模型的一部分，因为元素的位置相对于它在普通流中的位置。意思就是设置四个方向的值就是相对于原来位置的偏移，其它元素在定位时还是以它原来所在的位置定位。

- absolute：包含块由离它最近的position属性为absolute、relative或fixed祖先元素创建，如果没有这三种类型，则以当前可视窗口为包含块。设置为绝对定位的元素框从文档流完全删除，并相对于其包含块定位，包含块可能是文档中的另一个元素或者是初始包含块。元素原先在正常文档流中所占的空间会关闭，就好像该元素原来不存在一样。元素定位后生成一个块级框，而不论原来它在正常流中生成何种类型的框。

- fixed：相对于可视窗口定位。

### float

- 通常用于用于实现文字环绕图片效果。

- 浮动的框可以向左或向右移动，直到它的外边缘碰到包含框或另一个浮动框的边框为止。

- 由于浮动框不在文档的普通流中，所以文档的普通流中的块框表现得就像浮动框不存在一样。

### 优先级

> [w3c](http://w3help.org/zh-cn/kb/009/)

![display_float_position](../../../images/display_float_position.png)

## 响应式&自适应

### 响应式：媒体查询

>[参考](http://www.runoob.com/css/css-rwd-mediaqueries.html)

### 自适应：百分比

>[参考](http://www.ruanyifeng.com/blog/2012/05/responsive_web_design.html)

## 预处理器

- 主要用来复用样式
- 主流的有：less、stylus

## 命名方案

>[BEM](https://zhuanlan.zhihu.com/p/33506102)

## UI框架

- ant.design

## 选择器

### 层叠

**什么选择器在层叠中胜出取决于三个因素：按重量级顺序排列 - 前面的一种会否决后一种:**

### 重要性

- 在css中，有一个特别的语法可以让一条规则总是优先于其他规则：`!important`

  - 使用场景：cms不能编辑核心模块/重写web开发人员的样式

  - 一般情况下禁止使用，**会导致大型样式表难以维护**

### 专用性

big: `!important` 
1000: `style`属性
100: `ID`选择器
10: 类选择器、属性选择器、伪类（`:`号，如`hover`, `active`, `visited`）
1: 元素选择器、伪元素（`::`号，如`after`, `before`）

### 源代码次序

**如果多个相互竞争的选择器具有相同的重要性和专用性 - 后面的规则将战胜先前的规则**

## BFC

>[参考](https://zhuanlan.zhihu.com/p/25321647)

## 回流和重绘

- 回流一定会引起重绘，重绘不一定引起回流
- 可以通过减少页面的回流和重绘来优化性能
- 可以使用requestAnimationFrame来限制dom元素渲染的帧率以防止页面卡顿

>[参考资料](https://juejin.im/post/5a9923e9518825558251c96a)
>[参考资料](https://www.html.cn/archives/4996)
>[参考资料](https://segmentfault.com/a/1190000017332455)

## 移动端1px像素显示模糊

> [参考资料](https://segmentfault.com/a/1190000007604842)

- transform: scale(0.5)
- viewport + rem：调整设备像素比
- box-shadow：阴影实现
- boder-image：图片实现
- background-image：渐变实现
  
## 消除1px宽度问题/宽度适配

**box-sizing 属性可以被用来调整这些表现：**

- content-box：默认值。如果你设置一个元素的宽为100px，那么这个元素的内容区会有100px宽，并且任何边框和内边距的宽度都会被增加到最后绘制出来的元素宽度中。

- border-box：告诉浏览器去理解你设置的边框和内边距的值是包含在width内的。也就是说，如果你将一个元素的width设为100px,那么这100px会包含其它的border和padding，内容区的实际宽度会是width减去border + padding的计算值。大多数情况下这使得我们更容易的去设定一个元素的宽高。

## CSS

>[参考资料](https://developer.mozilla.org/zh-CN/docs/Web/CSS)

- 层叠样式表是一种用来描述`HTML`或`XML`（包括如`SVG`、`XHTML`之类的`XML`分支语言）文档呈现的样式表语言

- 它描述了在屏幕、纸质、音频等其它媒体上的元素应该如何被渲染的问题。

- CSS 是开放网络的核心语言之一，由 W3C 规范 进行标准化。

- CSS 被分为不同等级：CSS1 现已废弃， CSS2.1 是推荐标准， CSS3 分成多个小模块且正在标准化中

## CSS3

**CSS3 是层叠样式表（Cascading Style Sheets）语言的最新版本，旨在扩展CSS2.1。**

**它带来了许多期待已久的新特性， 例如：**

- 圆角

- 阴影

- `gradients`(渐变)

- `transitions`(过渡)

- `animations`(动画)

- 新的布局方式，如 `multi-columns`、 `flexible box` 与 `grid layouts`

> 实验性特性以浏览器引擎为前缀（`vendor-prefixed`），应避免在生产环境中使用，或极其谨慎地使用，因为将来它们的语法和语义都有可能被更改。

>[参考资料](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS3)

## css预编译器怎么使用函数

> [stylus](http://stylus-lang.com/docs/functions.html)

> [less](http://lesscss.org/functions/)

> [w3c](http://www.w3school.com.cn/css/css_padding.asp)

## 盒(框)模型

![ct_boxmodel](../../images/ct_boxmodel.gif)

### 内容 - content

- 元素框的最内部分

### 内边距 - padding

- 内容和边框之间的空白区域

- 可以设置长度值或者百分比值，不允许使用负值

### 边框 - border

- 围绕内边距（如果有，没有就是内容）的一条或多条线

- 可以设置颜色、样式、宽度

### 外边距 - margin

- 围绕元素边框的空白区域

- 可以设置长度值或者百分比值，甚至负值

## 定位机制

- 类型：普通流、浮动、绝对定位。

- 除非专门指定，否则所有框都在普通流中定位。

- 普通流中的元素的位置由元素在 (X)HTML 中的位置决定。

## display

- block: 块级元素

  - 每个元素独占一行

  - 宽度默认100%

  - 框之间的垂直距离是由框的垂直外边距计算出来。

- inline：行内元素

  - 和其他元素都在一行

  - 元素的`height`、`width`、`margin-top`、`margin-bottom`都不可设置

  - 元素的宽度就是它包含的文字或图片的宽度，不可改变

  - 多个内联元素的宽度超过行宽时，会自动换行

  - 通常用于段落中某些文字的修饰

  - 可以使用水平内边距、边框和外边距调整它们的间距。但是，垂直内边距、边框和外边距不影响行内框的高度。由一行形成的水平框称为行框（Line Box），行框的高度总是足以容纳它包含的所有行内框。不过，设置行高可以增加这个框的高度。

- inline-block：行内块级元素

  - 和其他元素都在一行上

  - 元素的`height`、`width`、`line-height`、`margin-top`、`margin-bottom`都可设置

  - 多个内联块状元素的宽度超过行宽时，会自动换行

- none: 用于隐藏元素，不占据空间

## position

- static：元素框正常生成。块级元素生成一个矩形框，作为文档流的一部分，行内元素则会创建一个或多个行框，置于其父元素中。

- relative：元素框偏移某个距离。元素仍保持其未定位前的形状，它原本所占的空间仍保留。如果不添加额外的属性，表现的和`static`一样，如果添加了`top`、`right`、`bottom`、`left`会使其偏离正常位置，其它元素此时不会受该元素影响。相对定位实际上被看作普通流定位模型的一部分，因为元素的位置相对于它在普通流中的位置。意思就是设置四个方向的值就是相对于原来位置的偏移，其它元素在定位时还是以它原来所在的位置定位。

- absolute：包含块由离它最近的position属性为absolute、relative或fixed祖先元素创建，如果没有这三种类型，则以当前可视窗口为包含块。设置为绝对定位的元素框从文档流完全删除，并相对于其包含块定位，包含块可能是文档中的另一个元素或者是初始包含块。元素原先在正常文档流中所占的空间会关闭，就好像该元素原来不存在一样。元素定位后生成一个块级框，而不论原来它在正常流中生成何种类型的框。

- fixed：相对于可视窗口定位。

## float

- 通常用于用于实现文字环绕图片效果。

- 浮动的框可以向左或向右移动，直到它的外边缘碰到包含框或另一个浮动框的边框为止。

- 由于浮动框不在文档的普通流中，所以文档的普通流中的块框表现得就像浮动框不存在一样。

## 优先级

> [w3c](http://w3help.org/zh-cn/kb/009/)

![display_float_position](../../images/display_float_position.png)

设定值 | 计算值
--- | ---
inline-table | table
inline / run-in / inline-block | block
table-row-group / table-column / table-column-group / table-header-group / table-footer-group / table-row / table-cell / table-caption | block
其他 | 同设定值


## 学习flex布局

> [知乎专栏](https://zhuanlan.zhihu.com/p/25303493)

![flex布局示意图](/images/flex.jpg)

### 示意图解读

- 在 `flex` 容器中默认存在两条轴，水平主轴(`main axis`) 和垂直的交叉轴(`cross axis`)，这是默认的设置，当然你可以通过修改使垂直方向变为主轴，水平方向变为交叉轴。

- 在容器中的每个单元块被称之为 `flex item`，每个项目占据的主轴空间为 (`main size`), 占据的交叉轴的空间为 (`cross size`)。

### flex容器

- 首先需要指定一个容器

  - 通过`display: flex; /* or inline-flex */`分别生成一个块状或行内的 `flex` 容器盒子。

  - 如果你使用块元素如 `div`，你就可以使用 `flex`，而如果你使用行内元素，你可以使用 `inline-flex`。

> 当设置 flex 布局之后，子元素的 float、clear、vertical-align 的属性将会失效。

- 有六种属性可以设置在容器上

  - flex-direction

    - 默认值：row，主轴为水平方向，起点在左端

    - row-reverse：主轴为水平方向，起点在右端

    - column：主轴为垂直方向，起点在上沿

    - column-reverse：主轴为垂直方向，起点在下沿
    
  - flex-wrap: 决定容器内项目是否可换行

    - 默认情况下，项目都排在主轴线上，使用 flex-wrap 可实现项目的换行。

    - 默认值：nowrap 不换行，即当主轴尺寸固定时，当空间不足时，项目尺寸会随之调整而并不会挤到下一行。

    - wrap：项目主轴总尺寸超出容器时换行，第一行在上方

    - wrap-reverse：换行，第一行在下方

  - flex-flow: flex-direction 和 flex-wrap 的简写形式

    - 默认值为: row nowrap

  - justify-content：定义了项目在主轴的对齐方式

    - flex-start：左对齐，默认值

    - flex-end：右对齐

    - center：居中

    - space-between：两端对齐，项目之间的间隔相等，即剩余空间等分成间隙

    - space-around：每个项目两侧的间隔相等，所以项目之间的间隔比项目与边缘的间隔大一倍

  - align-items：定义了项目在交叉轴上的对齐方式

    - stretch：默认值

    - flex-start：交叉轴的起点对齐

    - flex-end：交叉轴的终点对齐

    - center：交叉轴的中点对齐

    - baseline: 项目的第一行文字的基线对齐

  - align-content：定义了多根轴线的对齐方式，如果项目只有一根轴线，那么该属性将不起作用

    - stretch：三条轴线平分容器的垂直方向上的空间，默认值

    - flex-start：轴线全部在交叉轴上的起点对齐

    - flex-end：轴线全部在交叉轴上的终点对齐

    - center：轴线全部在交叉轴上的中间对齐

    - space-between：轴线两端对齐，之间的间隔相等，即剩余空间等分成间隙。

    - space-around：每个轴线两侧的间隔相等，所以轴线之间的间隔比轴线与边缘的间隔大一倍。

### 有六种属性可运用在 item 项目上

- order: 定义项目在容器中的排列顺序，数值越小，排列越靠前，默认值为 0

- flex-basis: 定义了在分配多余空间之前，项目占据的主轴空间，浏览器根据这个属性，计算主轴是否有多余空间

    - 默认值：auto，即项目本来的大小, 这时候 item 的宽高取决于 width 或 height 的值。

    - 当主轴为水平方向的时候，当设置了 flex-basis，项目的宽度设置值会失效，flex-basis 需要跟flex-grow 和 flex-shrink 配合使用才能发挥效果。

    - 当 flex-basis 值为 0 % 时，是把该项目视为零尺寸的，故即使声明该尺寸为 140px，也并没有什么用。

    - 当 flex-basis 值为 auto 时，则跟根据尺寸的设定值(假如为 100px)，则这 100px 不会纳入剩余空间。

- flex-grow: 定义项目的放大比例

    - 默认值为 0，即如果存在剩余空间，也不放大

    - 当所有的项目都以 flex-basis 的值进行排列后，仍有剩余空间，那么这时候 flex-grow 就会发挥作用了。

    - 如果所有项目的 flex-grow 属性都为 1，则它们将等分剩余空间。(如果有的话)  

    - 如果一个项目的 flex-grow 属性为 2，其他项目都为 1，则前者占据的剩余空间将比其他项多一倍。

    - 当然如果当所有项目以 flex-basis 的值排列完后发现空间不够了，且 flex-wrap：nowrap 时，此时flex-grow 则不起作用了，这时候就需要接下来的这个属性。

- flex-shrink: 定义了项目的缩小比例

    - 默认值: 1，即如果空间不足，该项目将缩小，负值对该属性无效。

    - 这里可以看出，虽然每个项目都设置了宽度为 50px，但是由于自身容器宽度只有 200px，这时候每个项目会被同比例进行缩小，因为默认值为 1。

    - 如果所有项目的 flex-shrink 属性都为 1，当空间不足时，都将等比例缩小。

    - 如果一个项目的 flex-shrink 属性为 0，其他项目都为 1，则空间不足时，前者不缩小。

- flex: flex-grow, flex-shrink 和 flex-basis的简写

- align-self: 允许单个项目有与其他项目不一样的对齐方式

### 总结

#### 容器属性：

- flex-direction：控制嵌套元素排列方向，起点是左端还是右端，水平排列还是垂直排列

- flex-wrap：控制嵌套元素是否换行以及换行后第一行在上方还是下方

- justify-content：控制嵌套元素的对齐状况，左对齐还是右对齐，居中还是两端对齐，还是元素之间间隔相等

- align-items：定义了元素在交叉轴上的对齐方式，包括起点、终点、中点以及第一行文字基线

- align-content：定义了多根轴线的对齐方式，如果项目只有一根轴线，那么该属性将不起作用，也就是项目如何分隔垂直方向的空间

#### 项目属性：

- order：定义了项目的排列顺序，数值越小，排名越靠前，最小值为0

- flex-basis：定义了在分配多余空间之前，项目占据的主轴空间，浏览器根据这个属性，计算主轴是否有多余空间

- flex-grow：定义项目的放大比例

- flex-shrink：定义了项目的缩小比例

- align-self： 允许单个项目有与其他项目不一样的对齐方式，跟`align-items`类似，一个针对容器下的所有项目，一个针对单个项目

## 元素对齐

- 针对同一行`inline-block`元素

- 使用`<!-- -->`来消除元素之间的空隙

- 使用`vertical-align: middle;`来对齐各元素

```html
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <style>
    html, body {
      padding: 0;
      margin: 0;
      height: 100%;
      width: 100%;
    }
    #parent {
      height: 100%;
      width: 100%;
    }
    #div {
      display: inline-block;
      vertical-align: middle;
      height: 100px;
      width: 100px;
      background: red;
    }
    #input, #button {
      vertical-align: middle;
      height: 100px;
      width: 100px;
    }
  </style>
</head>
<body>
  <div id="parent">
    test<!-- 插入的文字会在 -->
    <div id="div"></div><!--  
  --><input id="input" type="text"><!-- 
  --><button id="button"></button>
  </div>
</body>
</html>
```

## 水平居中

```css
#main1{
  width: 100px;
  margin: 0 auto;
}
/* 或者 */
#main2{
  width: 100px;
  margin-left: auto;
  margin-right: auto;
}
```

## 垂直水平居中

> [参考资料](https://github.com/hawx1993/tech-blog/issues/12)

<p class="tip">注意`html`和`body`的初始化以及父元素的高度需要设置为`100%`<p>

### flex

```html
<!-- 有兼容性问题 -->
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <style>
    html, body {
      padding: 0;
      margin: 0;
      height: 100%;
      width: 100%;
    }
    #parent {
      height: 100%;
      display: flex;
      justify-content: center; /* 水平居中 */
      align-items: center; /* 垂直居中 */
    }
    #child {
      width: 100px;
      height: 100px;
      background: red;
    }
  </style>
</head>
<body>
  <div id="parent">
    <div id="child"></div>
  </div>
</body>
</html>
```

### transform

```html
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <style>
    html, body {
      padding: 0;
      margin: 0;
      height: 100%;
      width: 100%;
    }
    #parent {
      position: relative;
      height: 100%;
    }
    #child {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      height: 100px;
      width: 100px;
      background: red;
    }
  </style>
</head>
<body>
  <div id="parent">
    <div id="child"></div>
  </div>
</body>
</html>
```

### margin

> 需要知道子元素的具体宽高

```html
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <style>
    html, body {
      padding: 0;
      margin: 0;
      height: 100%;
      width: 100%;
    }
    #parent {
      position: relative;
      height: 100%;
    }
    #child {
      position: absolute;
      left: 50%;
      top: 50%;
      height: 100px;
      width: 100px;
      margin-left: -50px;
      margin-top: -50px;
      background: red;
    }
  </style>
</head>
<body>
  <div id="parent">
    <div id="child"></div>
  </div>
</body>
</html>
```

### absolute

```html
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <style>
    html, body {
      padding: 0;
      margin: 0;
      height: 100%;
      width: 100%;
    }
    #parent {
      position: relative;
      height: 100%;
    }
    #child {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      height: 100px;
      width: 100px;
      background: red;
    }
  </style>
</head>
<body>
  <div id="parent">
    <div id="child"></div>
  </div>
</body>
</html>
```

## 外边距塌陷

> [MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing)

> [解决方式](https://segmentfault.com/a/1190000011075163)

### 定义

**块的顶部外边距和底部外边距有时被组合（折叠）为单个边框，其大小是组合到其中的最大外边距，这种行为称为外边距塌陷（合并）**

### 发生条件

1. 相邻元素之间：毗邻的两个元素之间的外边距会折叠

1. 父元素与其第一个/最后一个子元素：如果没有触发BFC，那么子元素的外边距会溢出到父元素的外面

1. 空的块级元素：不包含任何内容，该元素的上下外边距会折叠

### 解决方案

1. 设置padding或者border，这个针对第二种情况

1. 设置同一个方向的margin，这个针对所有情况

1. 创建BFC(块格式化上下文)，这个针对第二种情况

    - 根元素或包含根元素的元素

    - 浮动元素: float != none

    - 绝对定位元素: position = absolute | fixed

    - 行内块元素: display = inline-block

    - 弹性元素: display = flex | inline-flex

    - overflow != visible

    - 网格元素: display = grid | inline-grid 元素的直接子元素

    - 多列容器: conlumn-count | column-width != auto | column-count = 1

    - column-span = all

    - display = flow-root

    - contain = layout | content | strict

    - 表格单元格: display = table-cell

    - 表格标题: display = table-caption

    - 匿名表格单元格元素: display = table | table-row | table-row-group | table-header-group | table-footer-group | inline-table

## float高度塌陷

```css
.after-box{
/* 和float方向保持一致 */
clear: left;
/* clear: both 清除所有方向的浮动 */
}
/* 或者 */
.after-box{
overflow: hidden;
}
```

## 导航栏布局

- 左边使用`position: absolute; left: 0; top: 0; width: 200px`
- 右边使用`margin-left: 200px`

## 实现响应式布局

> [参考](../browser/4_compatibility.html#自适应所有手机和电脑浏览器大小)

- 如何自适应多倍dpi（如平板）？
  - [blog](http://blog.codingplayboy.com/2018/01/06/responsive-web-design/)

- 什么是设备像素比？
  - [github](https://github.com/jawil/blog/issues/21)

- 如何适配iphoneX？
  - [凹凸](https://aotu.io/notes/2017/11/27/iphonex/index.html)

## 继承

- 控制继承

  - inherit：该值将应用到选定元素的属性值设置为与其父元素一样。

  - initial：该值将应用到选定元素的属性值设置为与浏览器默认样式表中该元素设置的值一样。如果浏览器默认样式表中没有设置值，并且该属性是自然继承的，那么该属性值就被设置为 inherit。

  - unset：该值将属性重置为其自然值，即如果属性是自然继承的，那么它就表现得像 inherit，否则就是表现得像 initial。
  
  - revert：如果当前的节点没有应用任何样式，则将该属性恢复到它所拥有的值。换句话说，属性值被设置成自定义样式所定义的属性（如果被设置）， 否则属性值被设置成用户代理的默认样式。

- 重新设置所有的属性值

  - CSS速写属性 all 能够被应用到每一个继承属性，一次性应用所有的继承属性。这里的值可以是继承属性里的任何一个 (inherit, initial, unset, or revert)。对于撤销对样式的修改，这是非常方便的一种方式。然后你就可以在开始新的修改之前，返回到一个已知的开始点。

## 种类

1. 简单选择器

1. 属性选择器

1. 伪类

1. 伪元素

1. 组合器

1. 多用选择器

## 简单选择器

**基于元素的类型（或其class或id）直接匹配文档的一个或多个元素**

### 类型选择器/元素选择器：

**选择器名和指定的html元素名不区分大小写的匹配**

### 类选择器：

**即`class`选择器，`.` + `className`, 多个元素可以有相同类名，单个元素可以有多个`className`，用空格隔开。**

### ID选择器：

**即id选择器，`#` + `idName`, `id`唯一，重复`id`的行为在不同浏览器中是不可预测的。**

### 通用选择器：

**形式：`*`，允许选择在一个页面的所有元素，通常用于初始化页面样式，比如去除`html`元素间隙，但大型应用中对页面性能有影响。**

## 属性选择器

**形式：`attr`，表示属性全名**

- 存在和值属性选择器

匹配精确的属性值：

`[attr]`：该选择器选择包含attr属性的所有元素，不论attr的值为何。

`[attr=val]`：该选择器仅选择attr属性被赋值为val的所有元素。（刚好是val）

`[attr~=val]`：该选择器仅选择attr属性的值（以空格间隔出多个值）中有包含val值的所有元素，比如位于被空格间隔的多个类（class）中的一个类。（包含val）

- 子串值属性选择器/伪正则选择器

`[attr|=val]`：选择attr属性值是val或值以`val-`开头的元素。

`[attr^=val]`：选择attr属性的值以val开头（包括val）的元素。

`[attr$=val]`：选择attr属性的值以val结尾（包括val）的元素。

`[attr*=val]`：选择attr属性的值中包含字符串val的元素。

## 伪类

- 一个冒号`:` + 关键字，当你希望样式在特定状态下才被呈现到指定的元素。

- example: `hover`, `active`, `visited`

## 伪元素

- 两个冒号`::` + 关键字，添加到选择器后面达到指定某个元素的某个部分。

- example: `after`, `before`

## 组合器

组合 | 描述
--- | ---
a, b | 匹配满足a或者b的任意元素
a b | b是a的后代子孙
a > b | b是a的孩子
a + b | b和a是相邻的兄弟
a ～ b | b和a是兄弟（任意一个）

## 层叠

**什么选择器在层叠中胜出取决于三个因素：按重量级顺序排列 - 前面的一种会否决后一种:**

### 重要性

- 在css中，有一个特别的语法可以让一条规则总是优先于其他规则：`!important`

  - 使用场景：cms不能编辑核心模块/重写web开发人员的样式

  - 一般情况下禁止使用，**会导致大型样式表难以维护**

### 专用性

`!important` > `style`属性 > `ID`选择器 > 类选择器 > 元素选择器

一个选择器具有专用性的量是用四种不同的值（或组件）来衡量的：

  - 千位：`style`属性

  - 百位：`ID`选择器

  - 十位：类选择器、属性选择器、伪类
  
  - 个位：元素选择器、伪元素

### 源代码次序

**如果多个相互竞争的选择器具有相同的重要性和专用性 - 后面的规则将战胜先前的规则**

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

## 字体

- color

- font-family 字体种类

>网络安全字体：有几个字体通常可以应用到所有系统，可以无所顾忌的使用。

字体名称 | 字体类型
--- | ---
Arial | sans-serif
Courier New | monospace
Georgia | serif
Times New Roman | serif
Trebuchet MS | sans-serif
Verdana | sans-serif

## 默认字体

**css定义了5个常用的字体名称：**

1. serif

1. sans-serif

1. monospace

1. cursive

1. fantasy

## 字体栈

**使浏览器有多种字体选择**

```css
p {
  font-family: 'Trebuchet MS', Verdana, sans-serif;
}
```

## 字体大小

- 单位：px、em、rem

- 浏览器的`font-size`标准设置的值为`16px`

## 其它字体属性

- font-style：用来打开和关闭文本斜体

- font-weight：设置文字的粗体大小

- text-transform：允许你设置要转换的字体

- text-decoration：设置/取消字体上的文本装饰

- text-shadow：对文本应用阴影：可以用逗号分隔开阴影值，将多个阴影应用于同一文本

## 文本布局

- 文本对齐：text-align

- 行高：line-height

- 字母和字间距：letter-spacing和word-spacing

## 线性渐变 - 从上到下

**可使用postcss修补样式**

```css
#grad {
  background: linear-gradient(red, blue); /* 标准的语法 */
}
```

## 线性渐变 - 从左到右

```css
#grad {
  background: linear-gradient(to right, red , blue); /* 标准的语法 */
}
```

## 线性渐变 - 从左上角到右下角的线性渐变

```css
#grad {
  background: linear-gradient(to bottom right, red , blue); /* 标准的语法 */
}
```

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

## 可视化格式模型

> [掘金](https://juejin.im/entry/5a123c55f265da432240cc90)

**规定了用户端在媒介中如何处理文档树：**

- 用户端：一般指浏览器

- 媒介：纸媒介、听觉浏览器、显示器

- 文档树：指源文档中元素树的编码。每一个元素恰好有一个父元素。根元素是例外，它没有父元素。就是document和页面上的元素所构成的类似树形的结构。

- box尺寸和类型：类型是指display特性所决定的元素类型，如：div是块级元素、span是行内元素。

- 定位体系：元素在布局时，根据3中定位体系定位。分别是：常规流、浮动和绝对定位。这三种定位体系的详细内容会在后面讲到。

- 在文档树中，元素之间的关系

- 外部信息：可视窗口的大小

## 视口

- 视口（viewport）：可视窗口，当可视窗口尺寸大小改变时，浏览器应该改变文档的布局。

## 包含块

- 包含块（containing block）：box定位和尺寸的计算，都取决于一个矩形的边界，这个矩形就被称作包含块。一般来说，元素生成的box会扮演它子孙元素包含块的角色，称为：一个box为它的子孙节点建造了包含块，是一个相对的概念。

### 根元素

- 处于文档树最顶端的元素，没有父节点

- 根元素存在的包含块，被叫做初始包含块

- 一般指html元素

### position

**如果元素没有声明position，默认值是：static**

- static & relative：它的包含块由它最近的块级、单元格或行内块祖先元素的内容框创建。

  - static不可设置四个方向的位移

  - relative可以设置四个方向的位移

    - 如果relative只设置一个bottom，那么box会被上移bottom个单位
    
    - 最好不要使用bottom，会导致各种难以预见的布局问题

- fixed：包含块是当前可视窗口。

- absolute：包含块由离它最近的position属性为absolute、relative或fixed祖先元素创建，如果没有这三种类型，则以当前可视窗口为包含块。

## 问题

> [其它问题1](https://segmentfault.com/a/1190000009429179)

> [其它问题2](https://segmentfault.com/a/1190000002528855)

## 高度塌陷 - 使用float的元素高度会塌陷，造成接下来的元素不能在它下方显示
解决方案：
给这个元素的接下来的元素设置样式

```css
.after-box{
    /* 和float方向保持一致 */
    clear: left;
    /* clear: both 清除所有方向的浮动 */
}
/* 或者 */
.after-box{
    overflow: hidden;
}
```

## 图片比元素还要高，会造成图片溢出元素范围
解决方案：

```css
.clearfix{
    overflow: auto;
    /* for ie6 */
    zoom: 1;
}
```

## 元素的边框和内边距会撑开元素

- 解决方案: 设置一个元素为`box-sizing: border-box`,则此元素的内边距和边框不会增加它的宽度

```css
.simple{
    width: 500px;
    margin: 20px auto;
    border: solid blue 10px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
```

## `inline-block`元素的对齐
```css
.align{
    vertical-align: middle;
}
```

## 超出部分字体省略号
```css
.ignore{
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
```

## ios下流畅的滑动
```css
.scroll{
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
}
```

## 多列布局

> [MDN](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Using_multi-column_layouts)

- CSS多列布局 扩展块布局模式，以便更容易地定义多列文本。如果一行太长，人们阅读文本很麻烦; 如果眼睛从一行的终点移动到下一个行的开始需要太长时间，它们就会丢失它们所在的行。因此，为了最大限度地利用大屏幕，作者应该将宽度不等的文本列并排放置，就像报纸一样。
- 糟糕的是如果不使用CSS和HTML在特定的位置强制换行，或者严格限制文本中允许的标记，或者夸张地使用脚本的话，这是不可能实现的。该限制通过从传统的块级布局模块中延伸出来的新的CSS属性得以解决。

## 什么是脱离文档流？
- 使用float后
  - 一个元素脱离文档流（out of normal flow）之后，其他的元素在定位的时候会当做没看见它，两者位置重叠都是可以的。
  - 脱离文档流的元素（例如被float了）依然会出现在dom树里
  - 其它盒子看不见被float的元素，但是其他盒子里的文本看得见

- 使用absolute后
  - 其它盒子看不见被float的元素，其他盒子盒其它盒子内的文本都会无视它

> 脱离文档流的元素默认层级比普通文档流的元素高，absolute元素比float元素高

## 介绍以下标准的盒子模型？低版本IE的盒子模型有什么不同？
1. 有两种：IE盒子模型、W3C盒子模型
1. 盒模型：内容（content）、填充（padding）、边界（margin）、边框（border）
1. 区别：IE的content部分把border和padding计算了进去

## 选择符有哪些？哪些属性可以继承？
- 选择器
  - id
  - 类
  - 标签
  - 相邻（h1 + p）
  - 子（ul > li）
  - 后代（li a）
  - 通配符（*）
  - 属性（a[rel = 'external']）
  - 伪类（a:hover, li:nth-child）

- 可继承样式
  - font-size
  - font-family
  - color
  - ul
  - li
  - dl
  - dd
  - dt

- 不可继承样式
  - border
  - padding
  - margin
  - width
  - height

## 优先级算法如何计算？
- 就近原则：同权重情况下样式定义最近者为准
- 载入样式以最后载入的定位为准
- 优先级：从高到低
  - 同权重：
    - 内联样式表（标签内部）
    - 嵌入样式表（当前文件中）
    - 外部样式表（外部文件中）
  - 不同权重：
    - !important：比内联优先级高
    - id
    - class
    - tag

## CSS3新增伪类？
- p:first-of-type：选择属于其父元素的首个`<p>`元素的每个`<p>`元素
- p:last-of-type：选择属于其父元素的最后`<p>`元素的每个`<p>`元素
- p:only-of-type：选择属于其父元素唯一的`<p>`元素的每个`<p>`元素
- p:only-child：选择属于其父元素的第二个子元素的每个`<p>`元素
- p:nth-child(2)：选择属于其父元素的第二个子元素的每个`<p>`元素
- ::after：在元素之前添加内容，也可以用来做清除浮动
- ::before：在元素之后添加内容
- :enabled：选择所有非禁用状态的元素
- :disabled：控制表单控件的禁用状态
- :checked：单选框或复选框被选中

## 如何居中div

### 水平居中
```css
div {
  width: 200px;
  margin: 0 auto;
}
```

### 水平垂直居中
```css
div {
  position: absolute;
  width: 300px;
  height: 300px;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

div {
  position: relative;
  width: 500px;
  height: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
}
.container div {
  width: 100px;
  height: 100px;
  background-color: pink;
}
```

## display有哪些值？说明它们的作用。
- block：块类型，默认宽度为父元素宽度，可设置宽高，换行显示
- none：缺省值，像行内元素类型一样显示
- inline：行内元素类型，默认宽度为内容宽度，不可设置宽高，同行显示
- inline-block：默认宽度为内容宽度，可以设置宽高，同行显示
- list-item：像块类型元素一样显示，并添加样式列表标签
- table：此元素会作为块级表格来显示
- inherit：规定应该从父元素继承display属性的值

## position的值relative和absolute的定位原点？
- absolute：生成绝对定位的元素，相对于值不为static的第一个父元素进行定位
- fixed（IE低版本不支持）：生成绝对定位的元素，相对于浏览器窗口进行定位
- relative：生成相对定位的元素，相对于其正常位置进行定位
- static：默认值。没有定位，元素出现在正常的流中（忽略top、bottom、left、right、z-index声明）
- inherit：规定从父元素继承position属性的值

## CSS3有哪些新特性？
- 新增各种CSS选择器
- 圆角
- 多列布局
- 阴影和反射
- 文字特效
- 文字渲染
- 线性渐变
- 旋转
- 缩放、定位、倾斜、动画、多背景

## CSS3的Flexbox，适用场景？
**一个用于页面布局的全新CSS3功能，Flexbox可以把列表放在同一个方向（从上到下排列，从左到右），并让列表能延伸到占用可用的空间。较为复杂的布局还可以通过嵌套一个伸缩容器来实现。采用Flex布局的元素，称为Flex容器，简称容器。它的所有子元素自动称为容器成员，称为Flex项目，简称项目。常规布局是基于块和内联流方向。而Flex布局是基于flex-flow流可以很方便的用来做居中，能对不同屏幕大小自适应。在布局上有了比以前更加灵活的空间。**

## 用纯CSS创建一个三角形的原理是什么？
```css
div {
  width: 0;
  height: 0;
  border-width: 20px;
  border-style: solid;
  border-color: transparent transparent red transparent;
}
```

## 一个满屏品字布局如何设计？
- 上面的div宽100%
- 下面的两个div分别宽50%
- 然后用float或者inline使其不换行即可

## CSS多列等高如何实现？
- 利用padding-bottom | margin-bottom正负值相抵（尽量大）
- 设置父容器超出隐藏，这样子父容器的高度就还是它里面的列没有设置padding-bottom时的高度。
- 当它里面的任一列高度增加了，则父容器的高度被撑到里面最高那列的高度
- 其他比这列矮的列会用它们的padding-bottom补偿这部分高度差

## 经常遇到的浏览器兼容性有哪些？原因，解决方法是什么？常用hack技巧？
- png24位图片在IE6上出现背景：做成png8
- 浏览器默认的margin和padding不同：加一个全局的*{margin: 0; padding: 0}
- IE6双边距bug：浮动ie产生的双倍距离 #box{ float:left; width:10px; margin:0 0 0 100px;}
  - 这种情况之下IE会产生20px的距离，解决方案是在float的标签样式控制中加入 _display:inline;将其转化为行内属性。(_这个符号只有ie6会识别)

- 背景兼容
  - 渐进识别的方式，从总体中逐渐排除局部。
    - 首先，巧妙的使用“\9”这一标记，将IE游览器从所有情况中分离出来。
    - 接着，再次使用“+”将IE8和IE7、IE6分离开来，这样IE8已经独立识别。
    ```css
    .bb{
      background-color:red;/*所有识别*/
      background-color:#00deff\9; /*IE6、7、8识别*/
      +background-color:#a200ff;/*IE6、7识别*/
      _background-color:#1e0bd1;/*IE6识别*/
    }
    ```

- IE下,可以使用获取常规属性的方法来获取自定义属性,也可以使用getAttribute()获取自定义属性;Firefox下,只能使用getAttribute()获取自定义属性。解决方法:统一通过getAttribute()获取自定义属性。

- IE下,even对象有x,y属性,但是没有pageX,pageY属性;Firefox下,event对象有pageX,pageY属性,但是没有x,y属性。
  - 解决方法：（条件注释）缺点是在IE浏览器下可能会增加额外的HTTP请求数。

- Chrome 中文界面下默认会将小于 12px 的文本强制按照 12px 显示,可通过加入 CSS 属性 -webkit-text-size-adjust: none; 解决。

- 超链接访问过后hover样式就不出现了，被点击访问过的超链接样式不在具有hover和active了：解决方法是改变CSS属性的排列顺序:
  - L-V-H-A :  
    - a:link {} 
    - a:visited {} 
    - a:hover {} 
    - a:active {}

## li与li之间有看不见的空白间隔是什么原因引起的？有什么解决办法？
**行框的排列会受到中间空白（回车\空格）等的影响，因为空格也属于字符,这些空白也会被应用样式，占据空间，所以会有间隔，把字符大小设为0，就没有空格了。**

## 为什么要初始化CSS样式？

- 因为浏览器的兼容问题，不同浏览器对有些标签的默认值是不同的，如果没对CSS初始化往往会出现浏览器之间的页面显示差异。
- 当然，初始化样式会对SEO有一定的影响，但鱼和熊掌不可兼得，但力求影响最小的情况下初始化。
- 最简单的初始化方法（强烈不建议）： 
```css
* {padding: 0; margin: 0;} 
```
- 淘宝的样式初始化代码：
```css
body, h1, h2, h3, h4, h5, h6, hr, p, blockquote, dl, dt, dd, ul, ol, li, pre, form, fieldset, legend, button, input, textarea, th, td { margin:0; padding:0; }
body, button, input, select, textarea { font:12px/1.5tahoma, arial, \5b8b\4f53; }
h1, h2, h3, h4, h5, h6{ font-size:100%; }
address, cite, dfn, em, var { font-style:normal; }
code, kbd, pre, samp { font-family:couriernew, courier, monospace; }
small{ font-size:12px; }
ul, ol { list-style:none; }
a { text-decoration:none; }
a:hover { text-decoration:underline; }
sup { vertical-align:text-top; }
sub{ vertical-align:text-bottom; }
legend { color:#000; }
fieldset, img { border:0; }
button, input, select, textarea { font-size:100%; }
table { border-collapse:collapse; border-spacing:0; }
```

## absolute的containing block(容器块)计算方式跟正常流有什么不同？
- 无论属于哪种，都要先找到其祖先元素中最近的 position 值不为 static 的元素，然后再判断：
  - 若此元素为 inline 元素，则 containing block 为能够包含这个元素生成的第一个和最后一个 inline box 的 padding box (除 margin, border 外的区域) 的最小矩形；
  - 否则,则由这个祖先元素的 padding box 构成。
  - 如果都找不到，则为 initial containing block。
  - static(默认的)/relative：简单说就是它的父元素的内容框（即去掉padding的部分）
  - absolute: 向上找最近的定位为absolute/relative的元素
  - fixed: 它的containing block一律为根元素(html/body)，根元素也是initial containing block

## CSS里的visibility属性有个collapse属性值是干嘛用的？在不同浏览器下以后什么区别？
**对于普通元素visibility:collapse;会将元素完全隐藏,不占据页面布局空间,与display:none;表现相同. 如果目标元素为table,visibility:collapse;将table隐藏,但是会占据页面布局空间. 仅在Firefox下起作用,IE会显示元素,Chrome会将元素隐藏,但是占据空间.**

## position跟display、margin collapse、overflow、float这些特性相互叠加后会怎么样？
**如果元素的display为none,那么元素不被渲染,position,float不起作用,如果元素拥有position:absolute;或者position:fixed;属性那么元素将为绝对定位,float不起作用.如果元素float属性不是none,元素会脱离文档流,根据float属性值来显示.有浮动,绝对定位,inline-block属性的元素,margin不会和垂直方向上的其他元素margin折叠.**

## 对BFC规范(块级格式化上下文：block formatting context)的理解？
**W3C CSS 2.1 规范中的一个概念,它是一个独立容器，决定了元素如何对其内容进行定位,以及与其他元素的关系和相互作用。**
   - 一个页面是由很多个 Box 组成的,元素的类型和 display 属性,决定了这个 Box 的类型。
   - 不同类型的 Box,会参与不同的 Formatting Context（决定如何渲染文档的容器）,因此Box内的元素会以不同的方式渲染,也就是说BFC内部的元素和外部的元素不会互相影响
  想要理解BFC与IFC，首先要理解FC，即 formatting context，它是W3C CSS2.1规范中的一个概念，定义的是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。

常见的Formatting Context 有：Block Formatting Context（BFC | 块级格式化上下文） 和 Inline Formatting Context（IFC |行内格式化上下文）。

一个页面是由很多个 Box 组成的，元素的类型和 display 属性决定了这个 Box 的类型。不同类型的 Box，会参与不同的 Formatting Context。

Block level的box会参与形成BFC，比如display值为block，list-item，table的元素。

Inline level的box会参与形成IFC，比如display值为inline，inline-table，inline-block的元素。

- IFC布局规则：
在行内格式化上下文中，框(boxes)一个接一个地水平排列，起点是包含块的顶部。水平方向上的 margin，border 和 padding在框之间得到保留。框在垂直方向上可以以不同的方式对齐：它们的顶部或底部对齐，或根据其中文字的基线对齐。包含那些框的长方形区域，会形成一行，叫做行框。

- BFC布局规则：
内部的Box会在垂直方向，一个接一个地放置。

Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠

每个元素的左外边缘（margin-left)， 与包含块的左边（border-left）相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。除非这个元素自己形成了一个新的BFC。

BFC的区域不会与float box重叠。

BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。

计算BFC的高度时，浮动元素也参与计算

## 请解释一下为什么需要清除浮动？清除浮动的方式

**清除浮动是为了清除使用浮动元素产生的影响。浮动的元素，高度会塌陷，而高度的塌陷使我们页面后面的布局不能正常显示。**

## 什么是外边距合并？

- [w3c](http://www.w3school.com.cn/css/css_margin_collapsing.asp)

**外边距合并指的是，当两个垂直外边距相遇时，它们将形成一个外边距。合并后的外边距的高度等于两个发生合并的外边距的高度中的较大者。**

## zoom:1的清除浮动原理?

- 清除浮动，触发hasLayout；Zoom属性是IE浏览器的专有属性，它可以设置或检索对象的缩放比例。解决ie下比较奇葩的bug。譬如外边距（margin）的重叠，浮动清除，触发ie的haslayout属性等。
- 来龙去脉大概如下：当设置了zoom的值之后，所设置的元素就会就会扩大或者缩小，高度宽度就会重新计算了，这里一旦改变zoom值时其实也会发生重新渲染，运用这个原理，也就解决了ie下子元素浮动时候父元素不随着自动扩大的问题。
- Zoom属是IE浏览器的专有属性，火狐和老版本的webkit核心的浏览器都不支持这个属性。然而，zoom现在已经被逐步标准化，出现在 CSS 3.0 规范草案中。
- 目前非ie由于不支持这个属性，它们又是通过什么属性来实现元素的缩放呢？可以通过css3里面的动画属性scale进行缩放。

## 移动端的布局用过媒体查询吗？
- 假设你现在正用一台显示设备来阅读这篇文章，同时你也想把它投影到屏幕上，或者打印出来， 而显示设备、屏幕投影和打印等这些媒介都有自己的特点，CSS就是为文档提供在不同媒介上展示的适配方法
- 当媒体查询为真时，相关的样式表或样式规则会按照正常的级联规被应用。 当媒体查询返回假， 标签上带有媒体查询的样式表 仍将被下载 （只不过不会被应用）。
- 包含了一个媒体类型和至少一个使用 宽度、高度和颜色等媒体属性来限制样式表范围的表达式。 CSS3加入的媒体查询使得无需修改内容便可以使样式应用于某些特定的设备范围。

## 使用 CSS 预处理器吗？喜欢那个？
**SASS (SASS、LESS没有本质区别，只因为团队前端都是用的SASS)**

## CSS优化、提高性能的方法有哪些？
- 关键选择器（key selector）。选择器的最后面的部分为关键选择器（即用来匹配目标元素的部分）；
- 如果规则拥有 ID 选择器作为其关键选择器，则不要为规则增加标签。过滤掉无关的规则（这样样式系统就不会浪费时间去匹配它们了）；
- 提取项目的通用公有样式，增强可复用性，按模块编写组件；增强项目的协同开发性、可维护性和可扩展性;
- 使用预处理工具或构建工具（gulp对css进行语法检查、自动补前缀、打包压缩、自动优雅降级）；

## 浏览器是怎样解析CSS选择器的？
**样式系统从关键选择器开始匹配，然后左移查找规则选择器的祖先元素。只要选择器的子树一直在工作，样式系统就会持续左移，直到和规则匹配，或者是因为不匹配而放弃该规则。**

## 在网页中的应该使用奇数还是偶数的字体？

> [知乎](https://www.zhihu.com/question/20440679)

## margin和padding分别适合什么场景使用？
- margin是用来隔开元素与元素的间距；padding是用来隔开元素与内容的间隔。
- margin用于布局分开元素使元素与元素互不相干；
- padding用于元素与内容之间的间隔，让内容（文字）与（包裹）元素之间有一段

## 抽离样式模块怎么写，说出思路，有无实践经验？
> [博客](http://nec.netease.com/standard/css-sort.html)

## 介绍一下标准的CSS的盒子模型？低版本IE的盒子模型有什么不同的？
（1）有两种， IE 盒子模型（相当于box-sizing: border-box;）、W3C 盒子模型（box-sizing: content-box;）；
（2）盒模型： 内容(content)、填充(padding)、边界(margin)、 边框(border)；
（3）区 别： IE的content部分把 border 和 padding计算了进去;

## 什么是响应式设计？响应式设计的基本原理是什么？如何兼容低版本的IE？
> [思否](https://segmentfault.com/a/1190000009189966)

## ::before 和 :after中双冒号和单冒号 有什么区别？解释一下这2个伪元素的作用。

- 单冒号(:)用于CSS3伪类，双冒号(::)用于CSS3伪元素。（伪元素由双冒号和伪元素名称组成）
- 双冒号是在当前规范中引入的，用于区分伪类和伪元素。不过浏览器需要同时支持旧的已经存在的伪元素写法，
  - 比如:first-line、:first-letter、:before、:after等，
- 而新的在CSS3中引入的伪元素则不允许再支持旧的单冒号的写法。
- 想让插入的内容出现在其它内容前，使用::before，否者，使用::after；
- 在代码顺序上，::after生成的内容也比::before生成的内容靠后。
- 如果按堆栈视角，::after生成的内容会在::before生成的内容之上

## 如何修改chrome记住密码后自动填充表单的黄色背景 ？
```css
input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill {
  background-color: rgb(250, 255, 189); /* #FAFFBD; */
  background-image: none;
  color: rgb(0, 0, 0);
}
```

## 你对line-height是如何理解的？
> [博客](https://www.zhangxinxu.com/wordpress/2009/11/css%E8%A1%8C%E9%AB%98line-height%E7%9A%84%E4%B8%80%E4%BA%9B%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3%E5%8F%8A%E5%BA%94%E7%94%A8/)

## 设置元素浮动后，该元素的display值是多少？
**自动变成了 display:block**

## 怎么让Chrome支持小于12px 的文字？
- 用图片：如果是内容固定不变情况下，使用将小于12px文字内容切出做图片，这样不影响兼容也不影响美观。
- 使用12px及12px以上字体大小：为了兼容各大主流浏览器，建议设计美工图时候设置大于或等于12px的字体大小，如果是接单的这个时候就需要给客户讲解小于12px浏览器不兼容等事宜。
- 继续使用小于12px字体大小样式设置：如果不考虑chrome可以不用考虑兼容，同时在设置小于12px对象设置-webkit-text-size-adjust:none，做到最大兼容考虑。
- 使用12px以上字体：为了兼容、为了代码更简单 从新考虑权重下兼容性。

## 让页面里的字体变清晰，变细用CSS怎么做？
**-webkit-font-smoothing: antialiased;**

## font-style属性可以让它赋值为“oblique” oblique是什么意思？
**倾斜的字体样式**

## position:fixed;在IOS下无效怎么处理？
fixed的元素是相对整个页面固定位置的，你在屏幕上滑动只是在移动这个所谓的viewport，原来的网页还好好的在那，fixed的内容也没有变过位置，所以说并不是iOS不支持fixed，只是fixed的元素不是相对手机屏幕固定的。
```css
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"/>
```

## 如果需要手动写动画，你认为最小时间间隔是多久，为什么？

**多数显示器默认频率是60Hz，即1秒刷新60次，所以理论上最小间隔为1/60 ＊ 1000 ms ＝ 16.7ms**

## display:inline-block 什么时候会显示间隙？
**移除空格、使用margin负值、使用font-size:0、letter-spacing、word-spacing**

## overflow: scroll时不能平滑滚动的问题怎么处理？
> [简书](https://www.jianshu.com/p/1f4693d0ad2d)

## 有一个高度自适应的div，里面有两个div，一个高度100px，希望另一个填满剩下的高度。
> [segmentfault](https://segmentfault.com/q/1010000000762512)

## png、jpg、gif 这些图片格式解释一下，分别什么时候用。有没有了解过webp？
> [知乎](https://www.zhihu.com/question/20028452)

> [webp](https://github.com/IvyLian/test/wiki/%E5%89%8D%E7%AB%AF%E9%9D%A2%E8%AF%95%E9%A2%98%EF%BC%8D%EF%BC%8D%E7%AD%94%E6%A1%88%E8%A1%A5%E5%85%85)

## 什么是Cookie 隔离？（或者说：请求资源的时候不要让它带cookie怎么做）
如果静态文件都放在主域名下，那静态文件请求的时候都带有的cookie的数据提交给server的，非常浪费流量，
所以不如隔离开。

因为cookie有域的限制，因此不能跨域提交请求，故使用非主要域名的时候，请求头中就不会带有cookie数据，
这样可以降低请求头的大小，降低请求时间，从而达到降低整体请求延时的目的。

同时这种方式不会将cookie传入Web Server，也减少了Web Server对cookie的处理分析环节，
提高了webserver的http请求的解析速度。

## style标签写在body后与body前有什么区别？
> [知乎](https://www.zhihu.com/question/39840003)

## 什么是CSS 预处理器 / 后处理器？
- 预处理器例如：LESS、Sass、Stylus，用来预编译,Sass或less，增强了css代码的复用性，还有层级、mixin、变量、循环、函数等，具有很方便的UI组件模块化开发能力，极大的提高工作效率。

- 后处理器例如：PostCSS，通常被视为在完成的样式表中根据CSS规范处理CSS，让其更有效；目前最常做的是给CSS属性添加浏览器私有前缀，实现跨浏览器兼容性的问题。

## rem布局的优缺点

> [布局](https://segmentfault.com/a/1190000010211016)

> [优缺点](https://www.cnblogs.com/qieguo/p/5386565.html)