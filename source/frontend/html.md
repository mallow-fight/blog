---
title: 介绍
type: html
order: 1
---

## 什么是HTML？

HTML 是用来描述网页的一种语言。

- HTML 指的是超文本标记语言 (Hyper Text Markup Language)
- HTML 不是一种编程语言，而是一种标记语言 (markup language)
- 标记语言是一套标记标签 (markup tag)
- HTML 使用标记标签来描述网页

## HTML和HTML5的区别

**HTMl**（HyperText Markup Language）: 超文本标记语言，一种纯文本类型的语言。特点有：

- 可以用来设计网页的标记语言
- 用该语言编写的文件，以.html或者.htm为后缀
- 由浏览器解释执行
- HTML表面上，可以嵌套用脚本语言编写的程序段，如：VBScript，JavaScript
- 与第一个纯文本的页面相比，Html页面引入了标签的概念，也是说，Html是文本+标签的形式

**Html5**广义上来说包含了html5、css和JavaScript三个部分，不仅仅是根据第一印象的html5，html5让网页制作从布局到细节处理都更加的灵活，可以创建更好的网页结构，拥有更加丰富的标签，对媒体播放、编辑、存储等有更好的支持方式，兼容性更强。

**相同点**

都是网页的基础，用来构建Web页面的“骨架”2、具有基本相同的标签，如div，form，p等等 

**不同点**

- 各个浏览器对HTML5的渲染或支持程度不同，但对HTML的支持或渲染已经很稳定
- html5正在发展，相当于于html的升级版本3、 html5用户可以编辑网页的部分内容
- html5中元素可以使图像脚本更灵活
- html5中 新的API让页面程序开发更简单
- html5改进页面表单操作
- html5新增加了很多新的标签，如footer等
- 在文档类型声明上html:
```html
<!-- html -->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<!-- html5 -->
<!doctype html>
```
由这两者对比可见：在文档声明上，html有很长的一段代码，并且很难记住这段代码，想必很多人都是靠工具直接生成的吧？而html5却是不同，只有简简单单的声明，这也方便人们的记忆。
- 在结构语义上
  - html:没有体现结构语义化的标签，我们通常都是这样来命名的`<id="header">`，这样表示网站的头部。
  - html5:在语义上却有很大的优势。提供了一些新的标签，比如:`<header>``<articale>``<footer>`。


## HTML标签

HTML 标记标签通常被称为 HTML 标签 (HTML tag)。

- HTML 标签是由尖括号包围的关键词，比如 `<html>`
- HTML 标签通常是成对出现的，比如 `<b>` 和 `</b>`
- 标签对中的第一个标签是开始标签，第二个标签是结束标签
- 开始和结束标签也被称为开放标签和闭合标签

## HTML 文档 = 网页

- HTML 文档描述网页
- HTML 文档包含 HTML 标签和纯文本
- HTML 文档也被称为网页

## 例子

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>My test page</title>
  </head>
  <!-- 。 -->
  <body>
    <p>This is my page</p>
  </body>
</html>
```
> `<!DOCTYPE html>`是最短的有效的文档声明
> `<html>`元素。这个元素包裹了整个完整的页面，是一个根元素
> `<head>`元素. 这个元素是一个容器，它包含了所有你想包含在HTML页面中但不想在HTML页面中显示的内容。这些内容包括你想在搜索结果中出现的关键字和页面描述，CSS样式，字符集声明等等。以后的章节能学到更多关于`<head>`元素的内容
> `<meta charset="utf-8">`这个元素设置文档使用utf-8字符集编码，utf-8字符集包含了人类大部分的文字。基本上他能识别你放上去的所有文本内容。毫无疑问要使用它，并且它能在以后避免很多其他问题
> `title`设置页面标题，出现在浏览器标签上，当你标记/收藏页面时它可用来描述页面
> `body`包含了你访问页面时所有显示在页面上的内容，文本，图片，音频，游戏等等

# 元素

## html元素组成

- 开始标签 - `<p>`
- 结束标签 - `</p>`
- 内容 - 开始标签和结束标签之间的文本以及嵌套元素
- 元素 - 由开始标签/内容/结束标签组成的整个元素

## 嵌套元素

- 放置在其它元素之中的元素

## 块级元素

- 块级元素
  - 以块的形式展现
  - 独占一行
  - 不会和内联嵌套成一行

## 内联元素

- 通常出现在块级元素中
- 包括文档内容的一小部分
- 不建议包括一整个段落或者一组内容
- 不会导致文本换行
- 高度、行高和顶以及底边距一般都不可改变
  - `<button>`是内联元素，但是可以设置这些
- 常见内联元素
  - `<a>`
  - `<em>`
  - `<span>`
  - `<strong>`

## 空元素

- 只有一个标签
  - `<img>`

## 属性

- 属性前有一个空格
- 属性名后有一个`=`号
- 属性值用`""`引起来

## 布尔属性

- 只能有跟他属性名一样的属性值
  - `<input disabled>`这种形式是`true`
  - `<input disabled="disabled">`

## 包围属性的引号

- 省略
  - 不建议
- 建议双引号

# 标签

## 结构化网站的标签

- 标题: `<header>`
- 导航栏: `<nav>`
- 主要内容: `<main>`, 具有代表性的内容段落主题可以使用 `<article>`, `<section>`, 和 `<div>` 元素
- 侧栏: `<aside>`; 经常嵌套在 `<main>` 中
- 页脚: `<footer>`

## 没有特定语义的装饰元素

- `span`是一个行内无语义元素，你应该仅仅当无法找到更好的语义元素包含内容时使用，或者不想增加特定的含义

- `div`是一个块级无语义元素，你应该仅仅当找不到更好的块级元素时使用，或者不想增加特定的意义
<p class="tip">警告: `div`用起来非常便利以至于很容易被滥用。因为它们不携带语义值，所以会让你的HTML代码变的混乱。要小心的使用它们，只有当没有更好的语义解决方案才能使用，而且要尽可能把它的使用量降到最低，否则，当你升级和维护你的文档时会非常困难。</p>

## 换行

- `<br>`在一个段落中创建一个换行
- `<hr>`在文档中生成一条水平分割线

## figure

```html
<figure>
  <img src="images/dinosaur.jpg"
       alt="The head and torso of a dinosaur skeleton;
            it has a large head with long sharp teeth"
       width="400"
       height="341">

  <figcaption>A T-Rex on display in the Manchester University Museum.</figcaption>
</figure>
```

>如果图像对您的内容里有意义，则应使用HTML图像。 如果图像纯粹是装饰，则应使用CSS背景图片。

# 统一资源定位器(URL)与路径(path)

## 指向相同目录

```html
<a href="contacts.html">contacts page</a>
```

## 指向子目录

```html
<a href="projects/child.html">go to child</a>
```

## 指向上级目录

```html
<a href="../parent/parent.html">go to parent</a>
```

## 文档片段

```html
<!-- 当前页面跳转到指定元素 -->
<a href="#test"> go to test</a>
<p id="test">this is test</p>

<!-- 跳转到不同页面的指定元素 -->
<a href="test.html#test">
<!-- test.html -->
<p id="test">this is test.html #test</p>
```

## 绝对链接

指向由其在`Web`上的绝对位置定义的位置，包括 **协议** 和 **域名**
像下面的例子,如果`index.html` 页面上传到`projects`这一个目录
- `projects`位于`web`服务站点的根目录
- `web`站点的域名为`http://www.example.com`
- 这个页面可以通过
`http://www.example.com/projects/index.html`访问 
( 或者仅仅通过`http://www.example.com/projects/`来访问
- 因为大多数`web`服务通过访问`index.html`这样的页面来加载，如果没有特定的`URL`的话)

>绝对URL总是指向相同的位置，不管它在哪里使用。

## 相对链接

指向与您链接的文件相关的位置，更像我们在前面一节中所看到的位置。
- 例如，如果我们想从示例文件链接
`http://www.example.com/projects/index.html`转到相同目录下的一个PDF文件
- URL就是文件名URL 
- 例如 `project-brief.pdf `
- 没有其他的信息要求. 如果PDF文件能够在projects的子目录pdfs中访问到
相对路径就是`pdfs/project-brief.pdf` (对应的绝对URL就是 `http://www.example.com/projects/pdfs/project-brief.pdf`.)
- 一个相对URL将指向不同的位置，
这取决于它所在的文件所在的位置——例如，如果我们把`index.html` 文件 从 `projects` 目录移动出来并进入`Web`站点的根目录（最高级别，而不是任何目录中）
`pdfs/project-brief.pdf` 的相对URL将会指向`http://www.example.com/pdfs/project-brief.pdf`
而不是 `http://www.example.com/projects/pdfs/project-brief.pdf`

## 总结

> 用清晰的链接措辞
> 尽可能使用相对链接
> 链接到非html资源 ——留下清晰的指示
> 在下载链接时使用下载属性

当您链接到要下载的资源而不是在浏览器中打开时，您可以使用下载属性来提供一个默认的保存文件名。下面是一个下载链接到Firefox 39 Windows版本的示例：

```html
<a href="https://download.mozilla.org/?product=firefox-39.0-SSL&os=win&lang=en-US"
   download="firefox-39-installer.exe">
  Download Firefox 39 for Windows
</a>
```

# 页面测试以及排错

## 测试网站

- [w3c](https://validator.w3.org/)

## 测试工具

- 根据谷歌开发者工具提供的功能排查

## 测试方法

- 单元测试（测试逻辑）
- 集成测试（测试渲染状况）

## 自动化测试

Selenium是最流行的浏览器自动化测试工具。最易使用的方法是使用基于Selenium的WebDriver API，它通过调用浏览器接口实现自动化，执行诸如“打开网页”、“移动网页上的元素”、“点击链接”、“查看链接是否打开URL”等。对于运行自动化测试来说是一个十分理想的方法。

## vconsole

>[参考](https://github.com/Tencent/vConsole)

# 表单

## 发送表单数据

### 客户端

1. action

发送数据的位置

1. method

get/post

### 服务端

1. 检索数据

### 发送文件

```html
<form method="post" enctype="multipart/form-data">
  <div>
    <label for="file">choose a file</label>
    <input type="file" id="file" name="myFile">
  </div>
  <div>
    <button>send the file.</button>
  </div>
</form>
```

1. 常见的安全问题

简称 | 名称 | 发生时机 | 攻击方式 | 利用
--- | --- | --- | --- | ---
XSS | 跨站脚本 | 将用户发送的数据显示给用户或另一个用户 | 向web页面注入客户端脚本 | 用户对web站点的信任
CSRF | 跨站点请求伪造 | 将用户发送的数据显示给用户或另一个用户 | 向web页面注入客户端脚本 | 网站对其用户提供的信任

预防措施：
始终检查用户发送给服务器的数据，尽量不要显示用户提供的html内容

---
sql注入
执行存储用户发送的数据的清理工作

---
http数据头注入和电子邮件注入

---
永远不要相信你的用户

1. 转义有潜在危险的字符
1. 限制输入的数据量
1. 沙箱上传文件（将它们存储在不同的服务器上，只允许通过不同的子域访问文件，或者通过完全不同的域名访问文件更好

## 实现表单html

### 表单结构

```html
<!-- 所有属性可选，至少要设置action属性和method属性 -->
<!-- action定义了提交表单时所收集的数据位置 -->
<!-- method属性定义了发送数据的http方法（get或post） -->
<!-- input的默认值可以用value属性设置 -->
<!-- textarea默认值必须在开始和结束标记之间放置默认值 -->
<form action="/page" method="post">
  <h1>Payment form</h1>
  <p>Required fields are followed by <strong><abbr title="Required">*</abbr></strong></p>
  <fieldset>
    <legend>test</legend>
    <div>
      <label for="name">Name:</lable>
      <input type="text" id="name" name="user_name" />
      <strong><abbr style="color: red;" title="Required">*</abbr></strong>
    </div>
    <div>
      <label for="mail">E-mail:</lable>
      <input type="email" id="mail" name="user_mail" />
    </div>
    <div>
      <label for="msg">Message:</lable>
      <textarea id="msg" name="user_msg"></textarea>
    </div>
    <div>
      <!-- 提交表单数据到指定的数据位置 -->
      <button type="submit">send your message</button>
    </div>
    <div>
      <!-- 重置表单数据为默认值 -->
      <button type="reset">reset form</button>
    </div>
    <!-- 设置label标签使得html小部件变得更加可视, 而且增大了点击区域，标签也变的可点击 -->
    <p>
        <label for="taste_1">
            i like cherry
        </label>
        <input type="checkbox" id="taste_1" name="taste_cherry" value="1">
    </p>
    <p>
        <label for="taste_2">
            i like banana
        </label>
        <input type="checkbox" id="taste_2" name="taste_banana" value="2">
    </p>
  </fieldset>
</form>
```

### 单行文本域input

input：type=text 备用值

---
e-mail地址域：type=email
multiple属性：允许用户将多个电子邮件输入相同的输入（以逗号分隔）

---
密码域：type=password
模糊输入到字段中的值

---
搜索域：type=search
和文本域的区别：
样式：圆角，有一个"x"可以用来清除输入的值

---
电话号码域：type=tel
不会对用户输入的值作出任何限制
语义上的差异
移动设备上可能会出现不同的虚拟键盘

---
url域：type=url
增加了特殊的验证约束，如果输入无效的url，浏览器就会报错

### 多行文本域textarea

属性名 | 默认值 | 描述
--- | --- | ---
cols | 20 | 文本控件的可见宽度
rows | 2 | 控制的可见文本行数
wrap | soft | 表示控件是如何包装文本的，soft或hard

input is a empty element, which can't contain any child elements.
textarea is a custom element, which can contain some default text, and it can only have text.

### 选择框

it use `<select>` element created.
it has one or more `<option>` as child.
it can use 'selected' attribute to set a default value.
it can insert into `<optgroup>` to create a group options with title.

### 多选选择框

add `multiple` to `<select>`, then user can choose multiple values by press cmd/ctrl.
all brower supports `<select>` can also supports `multiple` attribute.

### 自动补全输入框

you can use `<datalist>` element to provide some autocomplete values.just like:

```html
<!-- you should notice what you input except text -->
<label for="fruit">what's your favorite fruit?</label>
<input type="text" name="fruit" id="fruit" list="mySuggestion">
<datalist id="mySuggestion">
  <option>Apple</option>
  <option>Banana</option>
  <option>pear</option>
</datalist>
```

`<datalist>`polyfill

```html
<!-- it will show a chooses when did not support datalist -->
<datalist id="xxx">
  <label for="s">xxx</label>
  <select id="s" name="xxx">
    <option>Apple</option>
    <option>Banana</option>
    <option>pear</option>
  </select>
<datalist>
```

### 复选框

```html
<!-- you can add `checked` attribute to auto choose when page onload -->
<input type="checkbox">
```

### 单选按钮

```html
<!-- you can add `checked` attribute to auto choose when page onload -->
<input type="radio">
```

### 数字 ie10+

```html
<!-- it will create a input that limit number form 1 to 10, `step` is mean how values you add or reduce once -->
<input type="number" name="age" id="age" min="1" max="10" step="2">
```

### 滑块

```html
<!-- 问题：不提供任何形式的视觉反馈 -->
<input type="range" name="beans" id="beans" min="0" max="500" step="10">
```

### 日期时间选择器, ie not support

本地时间

```html
<!-- 创建一个小部件来显示和选择一个日期，但是没有任何特定的时区信息 -->
<input type="datetime-local" name="datetime" id="datetime">
```

月

```html
<!-- it will show a month to select -->
<input type="month" name="month" id="month">
```

时间

```html
<input type="time" name="time" id="time">
```

星期

```html
<input type="week" name="week" id="week">
```

all elements can use `min` and `max` attributes.

### color picker, not support ie and safari

```html
<input type="color" name="color" id="color">
```

### 文件选择器

```html
<!-- 被接受的文件类型可以使用accept属性来约束 -->
<!-- 如果想让用户选择多个文件，可以通过添加`multiple`属性来实现 -->
<input type="file" name="file" id="file" accept="image/*" multiple>
```

### 隐藏内容

```html
<!-- hidden some values that not show to user. -->
<input type="hidden" value="838388">
```

### 图像按钮

```html
<input type="image" name="xxImage" alt="click me!" src="xx.png" width="80" height="30" />
```

如果使用图像按钮来提交表单，这个小部件不会提交它的值；相反，在图像上单击的X和Y坐标是被提交的，坐标被发送为两个健/值对

> 点击示例`http://xx.com?xxImage.x=123&xxImage.y=456`

### 仪表和进度条, ie not support

进度条

```html
<progress max="100" value="75">75/100</progress>
```

---
仪表

```html
<meter min="0" max="100" value="75" low="33" high="66" optimum="50">75</meter>
```

## 表单验证

### required属性

验证失败虚线红框
验证成功黑色边框

```html
<form>
  <label for="choose">xxx</label>
  <input id="choose" name="i_like" required>
  <button>submit</button>
</form>
```

```css
input:invalid {
  border: 2px dashed red;
}
input:valid {
  border: 2px solid black;
}
```

### 正则验证

```html
<form>
  <div>
    <label for="choose">choose what you like, banana or orange?</label>
    <input id="choose" name="i_like" required pattern="banana|orange">
  </div>
  <!-- 强制条目的长度 -->
  <div>
    <label for="chooseLength">limit string length 5 to 10.</label>
    <input id="chooseLength" name="i_length" required minlength="5" maxlength="10">
  </div>
  <div>
    <label for="chooseNum">limit number 5 to 10.</label>
    <input id="chooseNum" name="i_range" required min="5" max="10">
  <div>
    <button>submit</button>
  </div>
</form>
```

使用js校验表单：控制原生错误信息的外观和感觉

如果需要更进一步的体验，得使用html语义化标签画出表单，并使用js控制交互。

# 多媒体与嵌入

## iframe

### 基本要素

1. allowfullscreen
1. frameborder: 默认是1，会在此框架和其他框架之间绘制边框，0:删除边框
1. src
1. width/height
1. 备选内容: 防止不支持iframe的情况
1. sandbox: 提高安全性设置

为了提高速度，在主内容完成加载后，使用js设置iframe的src属性是个好主意
这使得页面可以更快的使用，并减少您的官方页面加载时间（重要的seo指标）

### 安全隐患

1. 只有在必要时嵌入
  安全问题
  知识产权问题
1. 使用https
  https减少了远程内容在传输过程中被篡改的机会
  https防止嵌入式内容访问您的父文档中的内容，反之亦然
1. 始终使用sandbox属性
  沙箱：一个代码可以适当使用或用于测试的容器，但不能对其他代码库造成任何损害称为沙箱。
1. 配置CSP指令

### `<embed>`和`<object>`元素

用来嵌入多种类型的外部内容的通用嵌入工具

1. java小程序
1. Flash
1. PDF
1. 视频
1. SVG
1. 图像内容

> 插件是一种对浏览器原生无法读取内容提供访问权限的软件
> 现如今，浏览器已经很强大了，足以满足各种各样的开发需求了，基本上可以摆脱插件了

## 图片

### 注意事项

图片存储在和`HTML`页面同路径的`images`文件夹下，利于`SEO`/索引
搜索引擎也读取图像的文件名并把他们计入`SEO`，因此给图片取一个描述性的文件名
选取相对路径优于绝对路径，绝对路径会使浏览器做更多的工作，例如重新通过`DNS`寻找`ip`地址
所以通常会把`html`和图片放在同一个服务器上

### 备选文本

内容取决于该图片想要表现的内容

### 图片尺寸

使用`html`属性来改变图片大小

1. 尺寸设定的太大了 - 图片会模糊
1. 尺寸设定的太小了 - 下载图片时会浪费带宽
1. 尺寸设定的不对 - 图片会扭曲

如果你需要改变图片尺寸，你应该使用`CSS`而不是`HTML`

### title

没有空间时可以使用

### 解说图片

```html
<figure>
  <img src="xxx" />
  <figcaption>a handsome dog.</figcaption>
</figure>
```

### css背景图片

如果图像对您的内容有意义，则应使用HTML图像。如果图像纯粹是装饰，则应使用CSS背景图片。

## 矢量图形

### 用处

拥有较小的文件尺寸，高度可缩放，不会在镜头拉近或放大图像时像素化

### 定义

位图：
使用像素网格来定义 - 一个位图文件精确的包含了每个像素的位置和它的色彩信息。
流行的位图格式：

`.bmp`
`.png`
`.jpg`
`.gif`

矢量图：
使用算法来定义 - 一个矢量图文件包含了图形和路径的定义，电脑可以根据这些定义计算出当它们在屏幕上渲染时应该呈现的样子。
`svg`格式可以让我们创造用于`web`的精彩的矢量图形。
`svg`优点：
矢量图像中的文本依然可以访问（利于`seo`）
`svg`可以很好的适应样式/脚本，因为图像的每个组件都可以通过css或js编写样式
`svg`缺点：
容易变得复杂
比图像更难创建
旧版浏览器不支持`svg`（`ie9+`）

### 将svg添加到桌面

`<img src="test.svg" />`

优点：
快速，熟悉的图像语法与alt属性中提供的内置文本等效
可以通过在`<a>`元素嵌套`<img>`,使图像轻松成为超链接

缺点：
无法使用js操作图像
若要使用css控制svg内容，必须在svg代码中包含内联css样式
不能用css伪类来重设图像样式

## 自适应图片

### example

```html
<img srcset="elva-fairy-320w.jpg 320w,
             elva-fairy-480w.jpg 480w,
             elva-fairy-800w.jpg 800w"
     sizes="(max-width: 320px) 280px,
            (max-width: 480px) 440px,
            800px"
     src="elva-fairy-800w.jpg" alt="Elva dressed as a fairy">
```

`srcset`定义了我们允许浏览器选择的图像集，以及每个图像的大小。在每个逗号之前，我们写：

一个文件名 (`elva-fairy-480w.jpg`)
一个空格
图像的固有宽度（以像素为单位）（`480w`）——注意到这里使用w单位，而不是你预计的`px`。这是图像的真实大小，可以通过检查你电脑上的图片文件找到（例如，在`Mac`上，你可以在`Finder`上选择这个图像，然后按 `Cmd + I` 来显示信息）。
sizes定义了一组媒体条件（例如屏幕宽度）并且指明当某些媒体条件为真时，什么样的图片尺寸是最佳选择—我们在之前已经讨论了一些提示。在这种情况下，在每个逗号之前，我们写：

一个媒体条件（`(max-width:480px)`）——你会在 `CSS` topic中学到更多的。但是现在我们仅仅讨论的是媒体条件描述了屏幕可能处于的状态。在这里，我们说 **当视窗的宽度是480像素或更少**。
一个空格
当媒体条件为真时，图像将填充的槽的宽度（`440px`）

所以，有了这些属性，浏览器会：

1. 查看设备宽度
1. 检查sizes列表中哪个媒体条件是第一个为真
1. 查看给予该媒体查询的槽大小
1. 加载srcset列表中引用的最接近所选的槽大小的图像

## 视频

### video 标签

1. src: 视频资源
1. controls: 控制视频的组件
1. `<video>`标签内的段落: 后备内容，当浏览器不支持该标签时，会显示出来

### 多格式支持

```html
<video controls>
  <source src="test.mp4" type="video/mp4">
  <source src="test.webm" type="video/webm">
  <p>your brower doesn't support HTML5 video. Here is a 
    <a href="test.xxx">link to the video</a>
  </p>
</video>
```

### html5`<video>`特性

1. width/height `<audio>`不支持，无视觉部件
1. autoplay
1. loop - 循环播放
1. muted - 默认关闭声音
1. poster - 视频播放前显示的图片 `<audio>`不支持，无视觉部件
1. preload - 缓冲较大的文件

`none`: 不缓冲
`auto`: 页面加载后缓存媒体文件
`metadata`: 仅缓冲文件的元数据

### 音轨文本

kinds:

1. subtitle: 翻译字幕
1. captions: 同步翻译对白, 帮助不能听音频的人
1. timed descriptions: 文字转换为音频，用于服务有视觉障碍的人

```html
<video controls>
  <source src="test.mp4" type="video/mp4">
  <source src="test.webm" type="video/webm">
  <track kind="subtitles" src="subtitles_en.vtt" srclang="en">
</video>
```

# 表格

## 表格

### 定义

表格是由行和列组成的结构化数据集(表格数据)，它能够使你简捷迅速地查找某个表示不同类型数据之间的某种关系的值 。

### 如何工作

表格的一个特点就是严格. 通过在行和列的标题之间进行视觉关联的方法，就可以让信息能够很简单地被解读出来。

### 局限

HTML 表格 应该用于表格数据 ，这正是 HTML 表格设计出来的用途. 不幸的是, 许多人习惯用 HTML 表格来实现网页布局。
使用表格实现网页布局的缺点：

1. 表格布局减少了视觉受损的用户的可访问性: 屏幕阅读器, 被盲人所使用, 解析存在于 HTML 页面上的标签，然后为用户读出其中的内容。因为对于布局来说，表格不是一个正确的工具， 使用的标记比使用 CSS 布局技术更复杂, 所以屏幕阅读器的输出会让他们的用户感到困惑。
1. 表格会产生很多标签: 正如刚才提到的, 表格布局通常会比正确的布局技术涉及更复杂的标签结构，这会导致代码变得更难于编写、维护、调试.
1. 表格不能自动响应: 当你使用正确的布局容器 (比如 `<header>`, `<section>`, `<article>`, 或是 `<div>`), 它们的默认宽度是父元素的 100%. 而表格的的默认大小是根据其内容而定的。因此，需要采取额外的措施来获取表格布局样式，以便有效地在各种设备上工作。

### 例子

```html
<table>
        <colgroup>
            <!-- span 直到某列全部应用该样式-->
            <col style="background: grey" span="6">
        </colgroup>
        <tr>
            <th>时间/星期</th>
            <!-- 占两列 -->
            <th colspan="2">星期一</th>
            <!-- 占两行 -->
            <th rowspan="2">星期二</th>
            <th>星期三</th>
            <th>星期四</th>
            <th>星期五</th>
            <th>星期六</th>
            <th>星期天</th>
        </tr>
        <tr>
            <td>上午</td>
            <td>语文</td>
            <td>数学</td>
            <td>英语</td>
            <td>化学</td>
            <td>--</td>
            <td>--</td>
            <td>体育</td>
        </tr>
        <tr>
            <td>下午</td>
            <td>语文</td>
            <td>数学</td>
            <td>英语</td>
            <td>化学</td>
            <td>--</td>
            <td>--</td>
            <!-- 嵌套表格 -->
            <td>
                <table>
                    <tr>
                        <th>体育</th>
                    </tr>
                    <tr>
                        <td>半天</td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
```

# 排版

## 描述列表

```css
<dl>
  <dt>this is describle title</dt>
  <dd>this is describtion</dd>
  <dt>this is other describle</dt>
  <dd>this is other describtion</dd>
  <dd>describle can has many describtion</dd>
</dl>
```
> `dl`描述列表(definition list)
> `dd`描述定义(definition description)
> `dt`描述标题(definition title)

## 引用

- 块引用

如果一个块级内容（一个段落、多个段落、一个列表等）从其他地方被引用
应该使用`<blockquote>`元素包裹起来, 并且在`cite`属性里用URL来指向引用的资源

- 行内引用

和块级内容同样的工作方式，使用`<q>`元素包裹

## 缩略语

```html
<abbr title="超文本标记语言">HTML</abbr>
<p> it will explain HTML after you put pointer on it. </p>
```

## 标记联系方式

```html
<address>
  <p> you location place info. </p>
<address>
```

## 上标和下标

```html
<sup>上标</sup>
<sub>下标</sub>
```

## 展示计算机代码

```html
<code>用于标记计算机通用代码</code>
<pre>用于标记固定宽度的文本块，其中保留空格（通常是代码块）</pre>
<var>标记具体变量名</var>
<kbd>标记输入电脑的键盘（或其他类型）输入</kbd>
<samp>标记计算机程序的输出</samp>
```

## 标记时间和日期

```html
<time datetime="2018-08-08">08 xxxx xx 可供机器识别</time>
```