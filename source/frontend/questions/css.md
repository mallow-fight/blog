---
title: css
order: 3
type: questions
---

## css
### 垂直水平居中

> [参考资料](https://github.com/hawx1993/tech-blog/issues/12)

**flex:**
```html
<!-- 有兼容性问题 -->
<div class="parent">
  <div class="child">Demo</div>
</div>

<style>
  .parent {
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /*垂直居中*/
  }
</style>
```

**table水平垂直居中：**
```html
<div class="parent">
  <div class="child">Demo</div>
</div>

<style>
  .parent {
    text-align: center;//水平居中
    display: table-cell;
    vertical-align: middle;//垂直居中
  }
  .child {
    display: inline-block;//防止块级元素宽度独占一行，内联元素可不设置
  }
</style>
<!-- vertical-align的百分比值不是相对于字体大小或者其他什么属性计算的，而是相对于line-height计算的。 -->
```

**absolute+transform 水平垂直居中：**
```html
<div class="parent">
  <div class="child">Demo</div>
</div>

<style>
  .parent {
    position: relative;
  }
  .child {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
</style>
```

**relative+absolute + negative margin:（需设置子元素宽高）**
```css
.parent{
    position:relative;
}
.child{
     width: 100px;
     height: 100px;
     position: absolute;
     top: 50%;
     left: 50%;
     margin: -50px 0 0 -50px;
}
```

**绝对定位方式+四个方向置0：**
```css
.parent{
    position:relative
}
.child{
    margin:auto;
    height: 100px;
    width: 100px;
    position: absolute;
    top: 0; left: 0; bottom: 0; right: 0;
}
```

**line-height+text-align文本水平垂直居中:**
```html
<div class="parent">
    <div class="child">Demo</div>
</div>
<style>
.child{
    text-align: center;
    width: 100px;
    height: 100px;
    line-height: 100px;
    /*display: inline-block;*/内联元素设置
}
</style>
```

**子元素未知宽高的水平垂直居中(IE 不支持 box-pack 和 box-align 属性):**
```css
.parent{
    position: relative;
    top: 0; left: 0; right: 0; bottom: 0;
    display: -webkit-box;
    -webkit-box-align: center;
    -webkit-box-pack: center;
}
.child{
    -webkit-box-flex: 0;
}
```

### 外边距塌陷

> [MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing)
> [解决方式](https://segmentfault.com/a/1190000011075163)

**块的顶部外边距和底部外边距有时被组合（折叠）为单个边框，其大小是组合到其中的最大外边距，这种行为称为外边距塌陷（合并）**

**发生外边距塌陷的三种情况：**
1. 相邻的兄弟姐妹元素
1. 块级父元素与其第一个/最后一个子元素
1. 空块元素

**解决方案：**
1. 设置padding或者border
1. 触发BFC
    - 根元素
    - float属性不为none
    - position为absolute或fixed
    - display为inline-block、table-cell、table-caption、flex、inline-flex
    - overflow不为vidible

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
