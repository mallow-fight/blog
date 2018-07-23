---
title: 布局
order: 9
type: css
---

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

## display属性

- block: 块级元素

  - 会新开始一行并尽可能撑满容器
    - exmaple：`<p>`, `<div>`, `<form>` + html5: `<header>`, `<footer>`, `<section>`

  - 设置width可以防止从左到右撑满整个容器，可以设置以下样式来使其水平居中
  - 元素会占据指定的宽度，然后剩余的宽度一分为二成为左右外边距
    - 问题：当浏览器窗口比元素的宽度还窄时，会显示一个水平滚动条来容纳页面

  - 水平居中
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

- inline：行内元素
**可以在段落中包裹一些文字而不会打乱段落的布局，exmple：`<span>`, `<a>`**

- none: 用于隐藏元素，不占据空间

## 盒模型

- 传统的盒模型

**问题：元素的边框和内边距会撑开元素**
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

## position

- static
`static`是默认值，表示不会被`positioned`

- relative
如果不添加额外的属性，表现的和`static`一样
添加了`top`、`right`、`bottom`、`left`会使其偏离正常位置，其它元素不会受该元素影响

- fixed
相对于视窗定位，脱离文档流
可以在`body`元素上加`margin-bottom`来确保有足够的空间显示它们
移动浏览器对`fixed`支持很差
[解决法案](http://bradfrostweb.com/blog/mobile/fixed-position)

- absolute

与`fixed`表现类似
不是相对于视窗，而是最近的`position`祖先元素，如果没有，相对于`body`元素

- float

可用于实现文字环绕图片
问题：高度塌陷 - 使用float的元素高度会塌陷，造成接下来的元素不能在它下方显示
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

问题：图片比元素还要高，会造成图片溢出元素范围
解决方案：

```css
.clearfix{
    overflow: auto;
    /* for ie6 */
    zoom: 1;
}
```

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

## 学习flex布局
> [知乎专栏](https://zhuanlan.zhihu.com/p/25303493)

![flex布局示意图](/images/flex.jpg)

- 示意图解读
在 `flex` 容器中默认存在两条轴，水平主轴(`main axis`) 和垂直的交叉轴(`cross axis`)，这是默认的设置，当然你可以通过修改使垂直方向变为主轴，水平方向变为交叉轴
在容器中的每个单元块被称之为 `flex item`，每个项目占据的主轴空间为 (`main size`), 占据的交叉轴的空间为 (`cross size`)。
**flex容器：**
- 首先需要指定一个flex容器
```css
.container {
    display: flex; /* or inline-flex */
}
```
分别生成一个块状或行内的 `flex` 容器盒子。简单说来，如果你使用块元素如 `div`，你就可以使用 `flex`，而如果你使用行内元素，你可以使用 `inline-flex`。
> 当设置 flex 布局之后，子元素的 float、clear、vertical-align 的属性将会失效。

- 有六种属性可以设置在容器上
  - flex-direction
    默认值：row，主轴为水平方向，起点在左端
    row-reverse：主轴为水平方向，起点在右端
    column：主轴为垂直方向，起点在上沿
    column-reverse：主轴为垂直方向，起点在下沿
  - flex-wrap: 决定容器内项目是否可换行
    默认情况下，项目都排在主轴线上，使用 flex-wrap 可实现项目的换行。
    默认值：nowrap 不换行，即当主轴尺寸固定时，当空间不足时，项目尺寸会随之调整而并不会挤到下一行。
    wrap：项目主轴总尺寸超出容器时换行，第一行在上方
    wrap-reverse：换行，第一行在下方
  - flex-flow: flex-direction 和 flex-wrap 的简写形式
    默认值为: row nowrap
  - justify-content：定义了项目在主轴的对齐方式
    建立在主轴为水平方向时测试，即 flex-direction: row
    默认值: 
      flex-start 左对齐
      flex-end：右对齐
      center：居中
      space-between：两端对齐，项目之间的间隔相等，即剩余空间等分成间隙
      space-around：每个项目两侧的间隔相等，所以项目之间的间隔比项目与边缘的间隔大一倍
  - align-items: 定义了项目在交叉轴上的对齐方式
    建立在主轴为水平方向时测试，即 flex-direction: row
    默认值为 stretch 即如果项目未设置高度或者设为 auto，将占满整个容器的高度。
      flex-start：交叉轴的起点对齐
      flex-end：交叉轴的终点对齐
      center：交叉轴的中点对齐
      baseline: 项目的第一行文字的基线对齐

  - align-content: 定义了多根轴线的对齐方式，如果项目只有一根轴线，那么该属性将不起作用
    当你 flex-wrap 设置为 nowrap 的时候，容器仅存在一根轴线，因为项目不会换行，就不会产生多条轴线。
    当你 flex-wrap 设置为 wrap  的时候，容器可能会出现多条轴线，这时候你就需要去设置多条轴线之间的对齐方式了。
    建立在主轴为水平方向时测试，即 flex-direction: row, flex-wrap: wrap
    默认值为 stretch
    当值为 stretch 时会三条轴线平分容器的垂直方向上的空间。
    值得注意的是，虽然在每条轴线上项目的默认值也为 stretch，但是由于我每个项目我都设置了高度，所以它并没有撑开整个容器。
    flex-start：轴线全部在交叉轴上的起点对齐
    flex-end：轴线全部在交叉轴上的终点对齐
    center：轴线全部在交叉轴上的中间对齐
    space-between：轴线两端对齐，之间的间隔相等，即剩余空间等分成间隙。
    space-around：每个轴线两侧的间隔相等，所以轴线之间的间隔比轴线与边缘的间隔大一倍。

### 有六种属性可运用在 item 项目上

- order: 定义项目在容器中的排列顺序，数值越小，排列越靠前，默认值为 0
- flex-basis: 定义了在分配多余空间之前，项目占据的主轴空间，浏览器根据这个属性，计算主轴是否有多余空间
    默认值：auto，即项目本来的大小, 这时候 item 的宽高取决于 width 或 height 的值。
    当主轴为水平方向的时候，当设置了 flex-basis，项目的宽度设置值会失效，flex-basis 需要跟 flex-grow 和 flex-shrink 配合使用才能发挥效果。
    当 flex-basis 值为 0 % 时，是把该项目视为零尺寸的，故即使声明该尺寸为 140px，也并没有什么用。
    当 flex-basis 值为 auto 时，则跟根据尺寸的设定值(假如为 100px)，则这 100px 不会纳入剩余空间。
- flex-grow: 定义项目的放大比例
    默认值为 0，即如果存在剩余空间，也不放大
    当所有的项目都以 flex-basis 的值进行排列后，仍有剩余空间，那么这时候 flex-grow 就会发挥作用了。
    如果所有项目的 flex-grow 属性都为 1，则它们将等分剩余空间。(如果有的话)  
    如果一个项目的 flex-grow 属性为 2，其他项目都为 1，则前者占据的剩余空间将比其他项多一倍。
    当然如果当所有项目以 flex-basis 的值排列完后发现空间不够了，且 flex-wrap：nowrap 时，此时 flex-grow 则不起作用了，这时候就需要接下来的这个属性。

- flex-shrink: 定义了项目的缩小比例
    默认值: 1，即如果空间不足，该项目将缩小，负值对该属性无效。
    这里可以看出，虽然每个项目都设置了宽度为 50px，但是由于自身容器宽度只有 200px，这时候每个项目会被同比例进行缩小，因为默认值为 1。
    同理可得：
    如果所有项目的 flex-shrink 属性都为 1，当空间不足时，都将等比例缩小。
    如果一个项目的 flex-shrink 属性为 0，其他项目都为 1，则空间不足时，前者不缩小。
- flex: flex-grow, flex-shrink 和 flex-basis的简写
- align-self: 允许单个项目有与其他项目不一样的对齐方式

### 总结
**设置 flex 布局之后，子元素的 float、clear、vertical-align 的属性将会失效。**
容器属性：
- flex-direction：控制嵌套元素排列方向，起点是左端还是右端，水平排列还是垂直排列
- flex-wrap：控制嵌套元素是否换行以及换行后第一行在上方还是下方
- justify-content：控制嵌套元素的对齐状况，左对齐还是右对齐，居中还是两端对齐，还是元素之间间隔相等
- align-items：定义了元素在交叉轴上的对齐方式，包括起点、终点、中点以及第一行文字基线
- align-content：定义了多根轴线的对齐方式，如果项目只有一根轴线，那么该属性将不起作用，也就是项目如何分隔垂直方向的空间

项目属性：
- order：定义了项目的排列顺序，数值越小，排名越靠前，最小值为0
- flex-basis：定义了在分配多余空间之前，项目占据的主轴空间，浏览器根据这个属性，计算主轴是否有多余空间
- flex-grow：定义项目的放大比例
- flex-shrink：定义了项目的缩小比例
- align-self： 允许单个项目有与其他项目不一样的对齐方式，跟`align-items`类似，一个针对容器下的所有项目，一个针对单个项目

## inline-block元素对齐
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

## float高度塌陷问题
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
