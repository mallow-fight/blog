---
title: css
order: 1
type: css
---

## 介绍

### css

层叠样式表 (Cascading Style Sheets，缩写为 CSS），是一种 样式表 语言，用来描述 HTML 或 XML（包括如 SVG、XHTML 之类的 XML 分支语言）文档的呈现。CSS 描述了在屏幕、纸质、音频等其它媒体上的元素应该如何被渲染的问题。
CSS 是开放网络的核心语言之一，由 W3C 规范 进行标准化。CSS 被分为不同等级：CSS1 现已废弃， CSS2.1 是推荐标准， CSS3 分成多个小模块且正在标准化中。

>[参考](https://developer.mozilla.org/zh-CN/docs/Web/CSS)

### css3

CSS3 是层叠样式表（Cascading Style Sheets）语言的最新版本，旨在扩展CSS2.1。

它带来了许多期待已久的新特性， 例如圆角、阴影、gradients(渐变) 、transitions(过渡) 与 animations(动画) 。以及新的布局方式，如 multi-columns 、 flexible box 与 grid layouts。实验性特性以浏览器引擎为前缀（vendor-prefixed），应避免在生产环境中使用，或极其谨慎地使用，因为将来它们的语法和语义都有可能被更改。

>[参考](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS3)

## 基础知识

### 边界

元素有一个边界，它位于元素的内边距(padding)和外边距(margin)之间。默认情况下，边界的大小为0，使其不可见，但可以设置边界的粗细、样式和颜色以使其显示出来。

#### 属性

border可以分解成许多不同的属性，以获得更具体的样式需求：

border-top, border-right, border-bottom, border-left: 设置边界一侧的宽度，样式和颜色。
border-width, border-style, border-color: 设置边界宽度度、样式或颜色，但是会设置边界的四个边。
您还可以单独三个属性中的一个并且设置其中一侧边界生效。
border-top-width, border-top-style, border-top-color等。

#### 边界半径

可以设置四个角落的边界半径大小

### 阴影

我们在box-shadow属性值中有4个项：

第一个长度值是水平偏移量（horizontal offset ）——即向右的距离，阴影被从原始的框中偏移(如果值为负的话则为左)。
第二个长度值是垂直偏移量（vertical offset）——即阴影从原始盒子中向下偏移的距离(或向上，如果值为负)。
第三个长度的值是模糊半径（blur radius）——在阴影中应用的模糊度。
颜色值是阴影的基本颜色（base color）。

多个box-shadow：还可以在单个box-shadow声明中指定多个框阴影，用逗号分隔

#### Filters（过滤器）

CSS过滤器提供了一种过滤元素的方法，就好比你在诸如Photoshop这样的平面设计程序中过滤元素一样。有大量的不同的选项可以使用，你可以在filter 参考页面阅读所有相关的更多细节。在这篇文章中，我们将会向你介绍它的语法，并且向你展示将会发生多么有趣的结果。

基本上，过滤器可以应用在任何元素上，块元素（block）或者行内元素（inline）——你只需要使用filter属性，并且给他一个特定的过滤函数的值。有些可用的过滤器选项和其他CSS特性做的事情十分相似，例如drop-shadow()的工作方式以及产生的效果和 box-shadow 或text-shadow十分相似。然而过滤器真正出色的地方在于，它们作用于盒（box）内内容（content）的确切形状，而不仅仅将盒子本身作为一个大的块

#### Blend modes（混合模式）

CSS混合模式允许我们为元素添加一个混合模式 ，以当两个元素重叠时，指定一个混合的效果——最终每个像素所展示的颜色将会是原来像素中颜色和其下面一层相组合之后的结果，对于像Photoshop这样的图形程序的用户来说，混合模式应该也非常熟悉。

#### mix-blend-mode

你可以看到，多层混合（mix-blend）不仅混合了两种背景图像，还混合了在`<div>`下面的颜色。

#### -webkit-background-clip: text

另一个我们认为在继续之前会提到的新特性(目前支持Chrome、Safari和Opera,和在Firefox正在实现)是background-clip的 text 值。当与专有 -webkit-text-fill-color: transparent; 特性一起使用时，这允许您将背景图像剪贴到元素文本的形状，从而产生一些不错的效果。这不是一个正式的标准，但是已经在多个浏览器中实现了，因为它很流行，并且被开发人员广泛使用。在这种情况下，这两种属性都需要一个-webkit-供应商前缀，甚至对于非webkit/Chrome-based的浏览器来说也是如此。

### 文字样式

#### 字体

1. color

1. font-family 字体种类

>网络安全字体：有几个字体通常可以应用到所有系统，可以无所顾忌的使用。

字体名称 | 字体类型
--- | ---
Arial | sans-serif
Courier New | monospace
Georgia | serif
Times New Roman | serif
Trebuchet MS | sans-serif
Verdana | sans-serif

#### 默认字体

css定义了5个常用的字体名称：

1. serif
1. sans-serif
1. monospace
1. cursive
1. fantasy

#### 字体栈

使浏览器有多种字体选择

```css
p {
  font-family: 'Trebuchet MS', Verdana, sans-serif;
}
```

#### 字体大小

单位：px、em、rem
浏览器的`font-size`标准设置的值为`16px`

#### 其它字体属性

font-style：用来打开和关闭文本斜体
font-weight：设置文字的粗体大小
text-transform：允许你设置要转换的字体
text-decoration：设置/取消字体上的文本装饰
text-shadow：对文本应用阴影 - 可以用逗号分隔开阴影值，将多个阴影应用于同一文本

#### 文本布局

1. 文本对齐：text-align
1. 行高：line-height
1. 字母和字间距：letter-spacing和word-spacing

### css调试

#### css是宽容的

### 列表

#### 列表样式

1. `list-style-type`: 设置用于列表项目符号的类型
1. `list-style-position`: 项目符号出现在列表项内，还是出现在其外
1. `list-style-image`: 允许为项目符号使用自定义图片
1. `list-style`: 融合 ex - list-style: type imageUrl position

#### 管理列表计数

1. start：从哪个数字开始
1. reversed：将启动列表倒计数
1. value：

### 层叠和继承

#### 层叠

什么选择器在层叠中胜出取决于三个因素：
按重量级顺序排列 - 前面的一种会否决后一种

- **重要性**

在css中，有一个特别的语法可以让一条规则总是优先于其他规则：!important
使用场景：cms不能编辑核心模块/重写web开发人员的样式
一般情况下禁止使用，会导致大型样式表难以维护

- **专用性**

!important > style属性 > ID选择器 > 类选择器 > 元素选择器
一个选择器具有专用性的量是用四种不同的值（或组件）来衡量的：
千位：style属性 + 1
百位：ID选择器 + 1
十位：类选择器、属性选择器、伪类
个位：元素选择器、伪元素

- **源代码次序**

如果多个相互竞争的选择器具有相同的重要性和专用性，那么第三个因素将帮助决定哪一个规则获胜 -- 后面的规则将战胜先前的规则

#### 继承

- **控制继承**

inherit
initial
unset
revert

### 工作方式

当浏览器显示文档时，必须将文档的内容和样式相结合。分两个阶段处理文档：

1. 浏览器将html和css转化为dom（文档对象模型）。dom在计算机内存中表示文档。它把文档内容和其样式结合在一起
2. 浏览器显示dom内容

关于dom：

1. 树形结构
2. dom节点：元素、属性、文本片段

引用方式：

1. 外部样式表 - 首选
2. 内部样式表 - 次选：难以复用，多处修改
3. 内联样式 - 非必要，禁止使用：难以维护以及复用

### 布局

#### inline-block元素的对齐

```css
.align{
    vertical-align: middle;
}
```

#### 超出部分字体省略号

```css
.ignore{
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
```

#### ios下流畅的滑动

```css
.scroll{
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
}
```

### 学习css布局

#### display属性

1. block: 块级元素

会新开始一行并尽可能撑满容器，exmaple：`<p>`, `<div>`, `<form>` + html5: `<header>`, `<footer>`, `<section>`
设置width可以防止从左到右撑满整个容器，可以设置以下样式来使其水平居中
元素会占据指定的宽度，然后剩余的宽度一分为二成为左右外边距
问题：当浏览器窗口比元素的宽度还窄时，会显示一个水平滚动条来容纳页面

```css
#main{
    width: 100px;
    margin: 0 auto;
}
```

解决方案：

```css
#main{
    max-width: 100px;
    margin: 0 auto;
}
```

1. inline：行内元素

可以在段落中包裹一些文字而不会打乱段落的布局，exmple：`<span>`, `<a>`

1. none: 用于隐藏元素，不占据空间

#### 盒模型

1. 传统的盒模型

问题：元素的边框和内边距会撑开元素
解决方案: 设置一个元素为`box-sizing: border-box`,则此元素的内边距和边框不会增加它的宽度

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

#### position

1. static

static是默认值，表示不会被positioned

1. relative

如果不添加额外的属性，表现的和static一样
添加了top、right、bottom、left会使其偏离正常位置，其它元素不会受该元素影响

1. fixed

相对于视窗定位，脱离文档流
可以在body元素上加`margin-bottom`来确保有足够的空间显示它们
移动浏览器对fixed支持很差
[这里有解决法案](http://bradfrostweb.com/blog/mobile/fixed-position)

1. absolute

与fixed表现类似
不是相对于视窗，而是最近的position祖先元素，如果没有，相对于body元素

1. float

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

#### 百分比宽度

限制图片宽度，可以使用min-width和max-width

#### 媒体查询

‘响应式设计’是一种让网站针对不同的浏览器和设备呈现不同显示效果的策略。

#### inline-block

需要注意的事：

1. vertical-align属性会影响到inline-block属性
1. 需要设置每一列的宽度
1. 如果html源码中元素之间有空格，那么列与列之间会产生空隙

#### column

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

### 学习flex布局

1. [知乎链接](https://zhuanlan.zhihu.com/p/25303493)

1. ![flex布局示意图](/images/flex.jpg)

1. 示意图解读

```txt
在 flex 容器中默认存在两条轴，水平主轴(main axis) 和垂直的交叉轴(cross axis)，这是默认的设置，当然你可以通过修改使垂直方向变为主轴，水平方向变为交叉轴

在容器中的每个单元块被称之为 flex item，每个项目占据的主轴空间为 (main size), 占据的交叉轴的空间为 (cross size)。
```

1. flex容器

#### 首先需要指定一个flex容器

```css
.container {
    display: flex; /* or inline-flex */
}
```

分别生成一个块状或行内的 flex 容器盒子。简单说来，如果你使用块元素如 div，你就可以使用 flex，而如果你使用行内元素，你可以使用 inline-flex。

> 当时设置 flex 布局之后，子元素的 float、clear、vertical-align 的属性将会失效。

#### 有六种属性可以设置在容器上

```txt
1. flex-direction
默认值：row，主轴为水平方向，起点在左端
row-reverse：主轴为水平方向，起点在右端
column：主轴为垂直方向，起点在上沿
column-reverse：主轴为垂直方向，起点在下沿

2. flex-wrap: 决定容器内项目是否可换行
默认情况下，项目都排在主轴线上，使用 flex-wrap 可实现项目的换行。

默认值：nowrap 不换行，即当主轴尺寸固定时，当空间不足时，项目尺寸会随之调整而并不会挤到下一行。
wrap：项目主轴总尺寸超出容器时换行，第一行在上方
wrap-reverse：换行，第一行在下方

3. flex-flow: flex-direction 和 flex-wrap 的简写形式
默认值为: row nowrap

4. justify-content：定义了项目在主轴的对齐方式
建立在主轴为水平方向时测试，即 flex-direction: row

默认值: flex-start 左对齐
flex-end：右对齐
center：居中
space-between：两端对齐，项目之间的间隔相等，即剩余空间等分成间隙
space-around：每个项目两侧的间隔相等，所以项目之间的间隔比项目与边缘的间隔大一倍

5. align-items: 定义了项目在交叉轴上的对齐方式
建立在主轴为水平方向时测试，即 flex-direction: row

默认值为 stretch 即如果项目未设置高度或者设为 auto，将占满整个容器的高度。
flex-start：交叉轴的起点对齐
flex-end：交叉轴的终点对齐
center：交叉轴的中点对齐
baseline: 项目的第一行文字的基线对齐

6. align-content: 定义了多根轴线的对齐方式，如果项目只有一根轴线，那么该属性将不起作用
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
```

#### 有六种属性可运用在 item 项目上

1. order: 定义项目在容器中的排列顺序，数值越小，排列越靠前，默认值为 0

1. flex-basis: 定义了在分配多余空间之前，项目占据的主轴空间，浏览器根据这个属性，计算主轴是否有多余空间

默认值：auto，即项目本来的大小, 这时候 item 的宽高取决于 width 或 height 的值。
当主轴为水平方向的时候，当设置了 flex-basis，项目的宽度设置值会失效，flex-basis 需要跟 flex-grow 和 flex-shrink 配合使用才能发挥效果。
当 flex-basis 值为 0 % 时，是把该项目视为零尺寸的，故即使声明该尺寸为 140px，也并没有什么用。
当 flex-basis 值为 auto 时，则跟根据尺寸的设定值(假如为 100px)，则这 100px 不会纳入剩余空间。

1. flex-grow: 定义项目的放大比例

默认值为 0，即如果存在剩余空间，也不放大
当所有的项目都以 flex-basis 的值进行排列后，仍有剩余空间，那么这时候 flex-grow 就会发挥作用了。
如果所有项目的 flex-grow 属性都为 1，则它们将等分剩余空间。(如果有的话)  

如果一个项目的 flex-grow 属性为 2，其他项目都为 1，则前者占据的剩余空间将比其他项多一倍。

当然如果当所有项目以 flex-basis 的值排列完后发现空间不够了，且 flex-wrap：nowrap 时，此时 flex-grow 则不起作用了，这时候就需要接下来的这个属性。

1. flex-shrink: 定义了项目的缩小比例

默认值: 1，即如果空间不足，该项目将缩小，负值对该属性无效。

这里可以看出，虽然每个项目都设置了宽度为 50px，但是由于自身容器宽度只有 200px，这时候每个项目会被同比例进行缩小，因为默认值为 1。
同理可得：

如果所有项目的 flex-shrink 属性都为 1，当空间不足时，都将等比例缩小。

如果一个项目的 flex-shrink 属性为 0，其他项目都为 1，则空间不足时，前者不缩小。

1. flex: flex-grow, flex-shrink 和 flex-basis的简写

1. align-self: 允许单个项目有与其他项目不一样的对齐方式

### 数值与单位

#### 值的类型

1. 数值
1. 百分比
1. 颜色
1. 坐标位置
1. 函数

##### 数值

1. 绝对单位

像素（px）是一种绝对单位，指定的值不会变化

1. 相对单位

相对于当前元素的字号（font-size）或视口（viewport）尺寸。

`em`: 默认值`16px`, em单位会继承父元素的字体大小，所以如果在父元素上设置了不同的字体大小，em的像素值会变得复杂。web开发中最常用的相对单位。

`ex,ch`：分别是小写`x`的高度和数字`0`的宽度。并不像em那样被普遍使用或很好的被支持。

`rem`：和em以同样的方式工作，总是等于默认基础字体大小的尺寸，继承的字体大小将不起作用，旧版本ie上不被支持。

`vw,vh`：分别是视口宽度的1/100和视口高度的1/100，不像rem那样被广泛支持。

1. 无单位的值

无单位的行高：使用无单位的行高更容易，比如：`line-height: 1.5`, 为元素高度的1.5倍。

1. 动画的数值

#### 百分比

和`em`称为动态（流体）布局

#### 颜色

1. 关键词

特定的字符串代表特定的颜色

1. 十六进制值

十六进制颜色或十六进制代码：`#`+六位十六进制数（0～F）

1. RGB

RGB值
rgb函数，参数：三个0～255之间的值
比十六进制更直观

1. HSL

支持度比RGB稍微差一点的是HSL（不支持旧版本IE），这是开发者非常感兴趣而实施的——不只是红、绿和蓝色的值，该hsl()函数接受的色相、饱和度以及明度值，以与上述三种不同的方式用来区分167万种颜色：

*色调*：颜色的底色调。这个值在0到360之间，表示色轮周围的角度。
*饱和度*：饱和度是多少？这需要一个从0-100%的值，其中0是没有颜色（它将显示为灰色），100%是全彩色饱和度。
*明度*：颜色有多亮或明亮？这需要一个从0-100%的值，其中0是无光（它会出现全黑的），100%是充满光的（它会出现全白）。

1. RGBA和HSLA

可调整透明度

1. 不透明度（opacity）

使用rgba颜色设置背景色，只有一个半透明的背景
使用opacity，盒子内部所有的元素都是透明的

### css框模型(盒模型)

#### 属性

1. width\height

设置内容框的高度和宽度
设置大小约束：min-width、max-width、min-height、max-height

1. padding

表示css框的内边距 - 这一层位于内容框的外边缘与边界的内边缘之间

1. border

分隔层 - 位于内边距的外边缘以及外边距的内边缘之间

1. margin

代表css框周围的外部区域，它在布局中推开其它css框，表现和padding类似

#### 高级的框操作

1. 溢流

当使用绝对的值设置了一个框的大小（固定像素的宽高），允许的大小可能不适合放置内容，这种情况下内容会从盒子溢流。
使用overflow来控制这些属性的发生：
visible：当内容过多，溢流的内容被显示在盒子的外边（默认）
auto：当内容过多，溢流的内容被隐藏，然后出现滚动条查看所有内容
hidden：当内容过多，溢流的内容被隐藏

1. 背景裁剪

background-clip: border-box;
background-clip: padding-box;
background-clip: content-box;

1. 轮廓

outline: 和边界差不多，框边界之外，外边距区域之内

#### css框类型

1. block：定义为堆放在其他框上的框，而且可以设置宽高，适用于所有应用

1. inline：

设置宽高无效
设置padding、margin、border会更新周围文字的行内位置，不影响下一行的行内元素边距
对于周围的block-box不会有影响

1. inline-box：

可以设置宽高
保持了block-box的特性
行内空间不够会断裂

### 背景

在元素内容、内边距和边界下层的区域

#### 属性：

background-color: 为背景设置一个纯色。
background-image: 指定在元素的背景中出现的背景图像。
这可以是静态文件，也可以是生成的渐变。
background-position:指定背景应该出现在元素背景中的位置。
background-repeat: 指定背景是否应该被重复(平铺)。
background-attachment: 当内容滚动时，指定元素背景的行为，例如，它是滚动的内容，还是固定的? - 这个可以设置fixed来使得图片不跟随滚动条滚动.
background: 在一行中指定以上五个属性的缩写。
background-size: 允许动态调整背景图像的大小。

#### color

大多数元素的默认颜色不是白色，而是`transparent`

#### image

url() 函数——它以一个参数的路径作为参数——获取一个静态图像文件来插入

#### repeat

no-repeat: 图像将不会重复:它只会显示一次。
repeat-x: 图像将在整个背景中水平地重复。
repeat-y: 图像会在背景下垂直地重复。

#### position

允许我们在背景中任意位置放置背景图像。通常，该属性将使用两个通过空格分隔的值，该空间指定了图像的水平(x)和垂直(y)坐标。图像的左上角是原点(0,0)。把背景想象成一个图形，x坐标从左到右，y坐标从上到下。

不同的值类型：
像px这样的绝对值——比如 background-position: 200px 25px.
像rems 这样的相对值——比如 background-position: 20rem 2.5rem.
百分比 ——比如 background-position: 90% 25%.
关键字——比如 background-position: right center. 这两个值是直观的，可以分别取值比如 left，center， right和 top，center， bottom。

#### 渐变

渐变就是在背景中平滑的颜色过渡。动态生成的渐变是在不久之前引入的，这是因为在web设计中使用渐变是非常受欢迎的，但是使用背景图像来实现渐变是相当不灵活的。目前有两种类型的渐变——线性渐变(从一条直线到另一条直线)和径向渐变(从一个点发散出来)。

#### 背景附着

使用background-attachment属性来控制的，该属性可以使用以下值：

scroll: 这将把背景修改为页面视图，因此它将在页面滚动时滚动。注意，我们说的是视图，而不是元素——如果你滚动实际的背景设置的元素，而不是页面，背景不会滚动。
fixed: 这可以在页面的位置上固定背景，所以当页面滚动时，它不会滚动，不管你是滚动页面还是背景设置的元素，它都会保持在相同的位置。
local:这个值后来被添加了(它只在Internet Explorer 9+中得到支持，而其他的则在IE4+中得到支持)，因为scroll值相当混乱，并且在许多情况下并没有真正做您想要的事情。  local 值将背景设置为它所设置的元素的背景，因此当您滚动元素时，背景会随之滚动。

#### 多个背景

最近(自从Internet Explorer 9)，我们已经具备了将多个背景连接到单个元素的能力。这是一件好事，因为多重背景非常有用。用逗号分隔不同的背景定义：

### 语法

#### 内容组合

1. 属性

一些人类可理解的标识符，这些标识符指出你想修改哪一些样式，例如：字体、宽度、背景颜色等

1. 属性值

每个指定的属性都需要给定一个值，这个值表示你想把那些特征修改成什么样

#### css规则

与值配对的属性被称为css声明。css声明会被放置在一个css声明块中。最后，css声明块与选择器相结合形成一个css规则集

#### 层叠算法

一个给定的属性可能被多个规则设置多次。css定义了哪个规则比其它规则更具有优先级，更具优先级的规则必定被应用。

> 如果链或组中的某个选择器无效，比如使用了未知的伪元素或伪类，整个组的选择器仍然是有效的，除了这个无效的被忽略的选择器（class、id除外）

#### css语句

1. `@charset`、`@import`(元数据)
1. `@media`(只有运行浏览器的设备匹配其表达条件时才会应用)、 `@document`(只有当前页面匹配一些条件时才会应用)、`@supports`（只有浏览器确实支持被测功能时才会应用） - (条件信息)
1. `@font-face`(描述性信息)

### 选择器

#### 种类

1. 简单选择器
1. 属性选择器
1. 伪类
1. 伪元素
1. 组合器
1. 多用选择器

#### 简单选择器

基于元素的类型（或其class或id）直接匹配文档的一个或多个元素

1. 类型选择器/元素选择器：

选择器名和指定的html元素名不区分大小写的匹配

1. 类选择器：

即class选择器，`.`+className, 多个元素可以有相同类名，单个元素可以有多个className，用空格隔开

1. ID选择器：

即id选择器，`#`+idName, id唯一，重复id的行为在不同浏览器中是不可预测的。

1. 通用选择器：

`*`, 允许选择在一个页面的所有元素，通常用于初始化页面样式，比如去除html元素间隙。但大型应用中对页面性能有影响。

#### 属性选择器

attr都表示属性全名

1. 存在和值属性选择器

匹配精确的属性值：

`[attr]`：该选择器选择包含attr属性的所有元素，不论attr的值为何。
`[attr=val]`：该选择器仅选择attr属性被赋值为val的所有元素。（刚好是val）
`[attr~=val]`：该选择器仅选择attr属性的值（以空格间隔出多个值）中有包含val值的所有元素，比如位于被空格间隔的多个类（class）中的一个类。（包含val）

1. 子串值属性选择器/伪正则选择器

`[attr|=val]`：选择attr属性值是val或值以`val-`开头的元素。
`[attr^=val]`：选择attr属性的值以val开头（包括val）的元素。
`[attr$=val]`：选择attr属性的值以val结尾（包括val）的元素。
`[attr*=val]`：选择attr属性的值中包含字符串val的元素。

#### 伪类

一个冒号`:` + 关键字，当你希望样式在特定状态下才被呈现到指定的元素。
example: hover, active, visited

#### 伪元素

两个冒号`::` + 关键字，添加到选择器后面达到指定某个元素的某个部分。
example: after, before

#### 组合器

组合 | 描述
--- | ---
a, b | 匹配满足a或者b的任意元素
a b | b是a的后代子孙
a > b | b是a的孩子
a + b | b和a是相邻的兄弟
a ～ b | b和a是兄弟（任意一个）

### 线性渐变

#### 线性渐变 - 从上到下：

可使用postcss修补样式

```css
#grad {
  background: -webkit-linear-gradient(red, blue); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(red, blue); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(red, blue); /* Firefox 3.6 - 15 */
  background: linear-gradient(red, blue); /* 标准的语法 */
}
```

#### 线性渐变 - 从左到右：

```css
#grad {
  background: -webkit-linear-gradient(left, red , blue); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(right, red, blue); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(right, red, blue); /* Firefox 3.6 - 15 */
  background: linear-gradient(to right, red , blue); /* 标准的语法 */
}
```

#### 线性渐变 - 从左上角到右下角的线性渐变：

```css
#grad {
  background: -webkit-linear-gradient(left top, red , blue); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(bottom right, red, blue); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(bottom right, red, blue); /* Firefox 3.6 - 15 */
  background: linear-gradient(to bottom right, red , blue); /* 标准的语法 */
}
```

#### 使用角度

如果你想要在渐变的方向上做更多的控制，你可以定义一个角度，而不用预定义方向（to bottom、to top、to right、to left、to bottom right，等等）.
语法
background: linear-gradient(angle, color-stop1, color-stop2);
角度是指水平线和渐变线之间的角度，逆时针方向计算。换句话说，0deg 将创建一个从下到上的渐变，90deg 将创建一个从左到右的渐变。

但是，请注意很多浏览器(Chrome,Safari,fiefox等)的使用了旧的标准，即 0deg 将创建一个从左到右的渐变，90deg 将创建一个从下到上的渐变。换算公式 90 - x = y 其中 x 为标准角度，y为非标准角度。
下面的实例演示了如何在线性渐变上使用角度：
实例
带有指定的角度的线性渐变：

```css
#grad {
  background: -webkit-linear-gradient(180deg, red, blue); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(180deg, red, blue); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(180deg, red, blue); /* Firefox 3.6 - 15 */
  background: linear-gradient(180deg, red, blue); /* 标准的语法 */
}
```

#### 使用多个颜色结点

下面的实例演示了如何设置多个颜色结点：
实例
带有多个颜色结点的从上到下的线性渐变：

```css
#grad {
  background: -webkit-linear-gradient(red, green, blue); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(red, green, blue); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(red, green, blue); /* Firefox 3.6 - 15 */
  background: linear-gradient(red, green, blue); /* 标准的语法 */
}
```

尝试一下 »
下面的实例演示了如何创建一个带有彩虹颜色和文本的线性渐变：
实例:

```css
#grad {
  /* Safari 5.1 - 6.0 */
  background: -webkit-linear-gradient(left,red,orange,yellow,green,blue,indigo,violet);
  /* Opera 11.1 - 12.0 */
  background: -o-linear-gradient(left,red,orange,yellow,green,blue,indigo,violet);
  /* Firefox 3.6 - 15 */
  background: -moz-linear-gradient(left,red,orange,yellow,green,blue,indigo,violet);
  /* 标准的语法 */
  background: linear-gradient(to right, red,orange,yellow,green,blue,indigo,violet); 
}
```

#### 使用透明度（transparent）

CSS3 渐变也支持透明度（transparent），可用于创建减弱变淡的效果。
为了添加透明度，我们使用 rgba() 函数来定义颜色结点。rgba() 函数中的最后一个参数可以是从 0 到 1 的值，它定义了颜色的透明度：0 表示完全透明，1 表示完全不透明。
下面的实例演示了从左边开始的线性渐变。起点是完全透明，慢慢过渡到完全不透明的红色：
实例
从左到右的线性渐变，带有透明度：

```css
#grad {
  background: -webkit-linear-gradient(left,rgba(255,0,0,0),rgba(255,0,0,1)); /* Safari 5.1 - 6 */
  background: -o-linear-gradient(right,rgba(255,0,0,0),rgba(255,0,0,1)); /* Opera 11.1 - 12*/
  background: -moz-linear-gradient(right,rgba(255,0,0,0),rgba(255,0,0,1)); /* Firefox 3.6 - 15*/
  background: linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1)); /* 标准的语法 */
}
```

#### 重复的线性渐变

repeating-linear-gradient() 函数用于重复线性渐变：
实例
一个重复的线性渐变：

``` css
#grad {
  /* Safari 5.1 - 6.0 */
  background: -webkit-repeating-linear-gradient(red, yellow 10%, green 20%);
  /* Opera 11.1 - 12.0 */
  background: -o-repeating-linear-gradient(red, yellow 10%, green 20%);
  /* Firefox 3.6 - 15 */
  background: -moz-repeating-linear-gradient(red, yellow 10%, green 20%);
  /* 标准的语法 */
  background: repeating-linear-gradient(red, yellow 10%, green 20%);
}
```

#### CSS3 径向渐变

径向渐变由它的中心定义。
为了创建一个径向渐变，你也必须至少定义两种颜色结点。颜色结点即你想要呈现平稳过渡的颜色。同时，你也可以指定渐变的中心、形状（圆形或椭圆形）、大小。默认情况下，渐变的中心是 center（表示在中心点），渐变的形状是 ellipse（表示椭圆形），渐变的大小是 farthest-corner（表示到最远的角落）。
径向渐变的实例：

语法

```css
background: radial-gradient(center, shape size, start-color, ..., last-color);
```

径向渐变 - 颜色结点均匀分布（默认情况下）
实例
颜色结点均匀分布的径向渐变：

```css
#grad {
  background: -webkit-radial-gradient(red, green, blue); /* Safari 5.1 - 6.0 */
  background: -o-radial-gradient(red, green, blue); /* Opera 11.6 - 12.0 */
  background: -moz-radial-gradient(red, green, blue); /* Firefox 3.6 - 15 */
  background: radial-gradient(red, green, blue); /* 标准的语法 */
}
```

尝试一下 »
径向渐变 - 颜色结点不均匀分布
实例
颜色结点不均匀分布的径向渐变：

```css
#grad {
  background: -webkit-radial-gradient(red 5%, green 15%, blue 60%); /* Safari 5.1 - 6.0 */
  background: -o-radial-gradient(red 5%, green 15%, blue 60%); /* Opera 11.6 - 12.0 */
  background: -moz-radial-gradient(red 5%, green 15%, blue 60%); /* Firefox 3.6 - 15 */
  background: radial-gradient(red 5%, green 15%, blue 60%); /* 标准的语法 */
}
```

#### 设置形状
shape 参数定义了形状。它可以是值 circle 或 ellipse。其中，circle 表示圆形，ellipse 表示椭圆形。默认值是 ellipse。
实例
形状为圆形的径向渐变：

```css
#grad {
  background: -webkit-radial-gradient(circle, red, yellow, green); /* Safari 5.1 - 6.0 */
  background: -o-radial-gradient(circle, red, yellow, green); /* Opera 11.6 - 12.0 */
  background: -moz-radial-gradient(circle, red, yellow, green); /* Firefox 3.6 - 15 */
  background: radial-gradient(circle, red, yellow, green); /* 标准的语法 */
}
```

#### 不同尺寸大小关键字的使用

size 参数定义了渐变的大小。它可以是以下四个值：

  1. closest-side
  1. farthest-side
  1. closest-corner
  1. farthest-corner

实例
带有不同尺寸大小关键字的径向渐变：

```css
#grad1 {
  /* Safari 5.1 - 6.0 */
  background: -webkit-radial-gradient(60% 55%, closest-side,blue,green,yellow,black); 
  /* Opera 11.6 - 12.0 */
  background: -o-radial-gradient(60% 55%, closest-side,blue,green,yellow,black);
  /* Firefox 3.6 - 15 */
  background: -moz-radial-gradient(60% 55%, closest-side,blue,green,yellow,black);
  /* 标准的语法 */
  background: radial-gradient(60% 55%, closest-side,blue,green,yellow,black);
}
 
#grad2 {
  /* Safari 5.1 - 6.0 */
  background: -webkit-radial-gradient(60% 55%, farthest-side,blue,green,yellow,black);
  /* Opera 11.6 - 12.0 */ 
  background: -o-radial-gradient(60% 55%, farthest-side,blue,green,yellow,black);
  /* Firefox 3.6 - 15 */
  background: -moz-radial-gradient(60% 55%, farthest-side,blue,green,yellow,black);
  /* 标准的语法 */
  background: radial-gradient(60% 55%, farthest-side,blue,green,yellow,black);
}
```

#### 重复的径向渐变
__repeating-radial-gradient()__ 函数用于重复径向渐变：
- 实例 - 一个重复的径向渐变：

```css
#grad {
  /* Safari 5.1 - 6.0 */
  background: -webkit-repeating-radial-gradient(red, yellow 10%, green 15%);
  /* Opera 11.6 - 12.0 */
  background: -o-repeating-radial-gradient(red, yellow 10%, green 15%);
  /* Firefox 3.6 - 15 */
  background: -moz-repeating-radial-gradient(red, yellow 10%, green 15%);
  /* 标准的语法 */
  background: repeating-radial-gradient(red, yellow 10%, green 15%);
}
```