---
title: css
order: 3
type: questions
---
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

### 移动端1px像素显示模糊
[参考资料](https://segmentfault.com/a/1190000007604842)
- boder-image：图片实现
- background-image：渐变实现
- viewport + rem：调整设备像素比
- box-shadow：阴影实现
- transform: scale(0.5)

### 消除1px宽度问题/宽度适配
box-sizing 属性可以被用来调整这些表现:
- content-box：默认值。如果你设置一个元素的宽为100px，那么这个元素的内容区会有100px宽，并且任何边框和内边距的宽度都会被增加到最后绘制出来的元素宽度中。
- border-box：告诉浏览器去理解你设置的边框和内边距的值是包含在width内的。也就是说，如果你将一个元素的width设为100px,那么这100px会包含其它的border和padding，内容区的实际宽度会是width减去border + padding的计算值。大多数情况下这使得我们更容易的去设定一个元素的宽高。

### 选择器权重
**`!important` > `style`属性 > `ID`选择器 > 类选择器 > 元素选择器**
一个选择器具有专用性的量是用四种不同的值（或组件）来衡量的：
- 千位：`style`属性
- 百位：`ID`选择器
- 十位：类选择器、属性选择器、伪类
- 个位：元素选择器、伪元素

### float高度塌陷问题
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

### flex布局
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
