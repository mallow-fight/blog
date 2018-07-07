---
title: HTML入门知识
type: html
order: 1
---

## 定义

**HTML 是用超文本标记语言（一套标记标签）来描述网页的一种语言，它不是一种编程语言。**

## HTML5新增内容

> [参考资料](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/HTML5)

**通常，html5、css3和js在一起统称为HTML5**

### 语义
**能够让你更恰当地描述你的内容是什么**
- 字段和提纲：`<section>`, `<article>`, `<nav>`, `<header>`, `<footer>`, `<aside>`, `<hgroup>`
- 音频和视频：`<audio>`, `<video>`
- 表单：强制验证`required`，一些新的属性，`<input>`属性`type`的一些新值，新的`<output>`元素
- 语义元素：`<mark>`, `<figure>`, `<figcaption>`, `<data>`, `<time>`, `<output>`, `<progress>`, `<meter>`和`<main>`
- 改进`<iframe>`：使用`sandbox`, `seamless`, `srcdoc`属性，现在可以精确的控制`<iframe>`元素的安全级别以及期望的渲染
- MathML：允许直接嵌入数学公式

### 连通性
**能够让你和服务器之间通过创新的新技术方法进行通信**
- web sockets：允许在页面和服务器之间建立持久连接并通过这种方法来交换非HTML数据
- server-sent events：允许服务器向客户端推送事件，而不是仅在响应客户端请求时服务器才能发送数据的传统范式
- webRTC：RTC代表即时通信，允许连接到其他人，直接在浏览器中控制视频会议，而不需要一个插件或是外部的应用程序

### 离线 & 存储
**能够让网页在客户端本地存储数据以及更高效地离线运行**
- 离线资源（应用程序缓存）：火狐全面支持HTML5离线资源规范，其他大多数针对离线资源仅提供了某种程度上的支持
- 在线和离线事件：Firefox 3支持WHATWG在线和离线事件，这可以让应用程序和扩展检测是否存在可用的网络连接，以及在连接建立和断开时能感知到
- DOM存储：客户端会话和持久化存储让web应用程序能够在客户端存储结构化数据
- IndexedDB：为了能够在浏览器中存储大量结构化数据，并且能够在这些数据上使用索引进行高性能检索的Web标准
- 选择使用本地文件：对新的 `HTML5` 文件 `API` 的支持已经被添加到 `Gecko` 中，从而使 `Web` 应用程序可以访问由用户选择的本地文件。这包括使用 `type = file` 的 `<input>` 元素的新的 `multiple` 属性针对多文件选择的支持。 还有 `FileReader`。

### 多媒体
**使video和audio成为了在所有web中的一等公民**
- 使用HTML5音视频：`<audio>`和`<video>`元素嵌入并支持新的多媒体操作内容的操作
- WebRTC：允许连接到其他人，在浏览器中直接控制视频会议，而不需要一个插件或是外部的应用程序
- Camera：允许使用，操作计算机摄像头，并从中存储图像
- Track & WebVTT：`<track>`元素支持字幕和章节，`WebVTT`是一个文本轨道格式

### 2D/3D 绘图 & 效果
**提供了一个更加分化范围的呈现选择**
- canvas
- WebGL：非常符合OpenGL ES2.0并且可以用在HTML5`<canvas>`元素中的API给web带来了3D图像功能
- SVG：基于XML可以直接嵌入到HTML中的矢量图像格式

### 性能 & 集成
**提供了非常显著的性能优化和更有效的计算机硬件使用**
- web workers：能够把js计算委托给后台线程，通过允许这些活动以防止使交互型事件变得缓慢
- XMLHttpRequest Level 2：允许异步读取页面的某些部分，允许其显示动态内容，根据时间和用户行为而有所不同。这是在Ajax背后的技术
- 即时编译的js引擎：新一代的js引擎功能更强大，性能更杰出
- History：允许对浏览器历史记录进行操作，这对于那些交互地加载新信息的页面尤其有用
- contentEditable属性：把你的网站变成wiki
- 拖放：支持在网站内部和网站之间拖放项目，同时也提供了一个更简单的供扩展和基于Mozilla的应用程序使用的API
- 焦点管理：支持`activeElement`和`hasFoces`属性
- 基于Web的协议处理程序：你现在可以使用`navigator.registerProtocolHandler()`方法把web应用程序注册成一个协议处理程序
- requestAnimationFrame：允许控制动画渲染以获得更优性能
- 全屏：为一个网页或者应用程序控制使用整个屏幕，而不显示浏览器界面
- 指针锁定：允许锁定到内容的指针，这样游戏或者类似的应用程序在指针到达窗口限制时也不会失去焦点
- 在线和离线事件：为了构建一个良好的具有离线功能的web应用程序，你需要知道什么时候你的应用程序确实离线了，顺便提一句，在你的应用程序又再回到在线状态时你也需要知道

### 设备访问 Device Access
**能够处理各种输入和输出设备**
- camera：允许使用和操作计算机的摄像头，并从中存取照片。
- 触控事件：对用户按下触控屏的事件做出反应的处理程序。
- 使用地理位置定位：让浏览器使用地理位置服务定位用户的位置。
- 检测设备方向：让用户在运行浏览器的设备变更方向时能够得到信息，这可以被用作一种输入设备或者使页面的布局跟屏幕的方向相适应
- 指针锁定：允许锁定到内容的指针，这样游戏或者类似的应用程序在指针到达窗口限制时也不会失去焦点

## 样式设计：创作更加复杂的主题
**CSS已经扩展到能够以一个更加复杂的方法给元素设置样式，这通常被称为CSS3，尽管CSS已经不再是很难触动的规范，并且不同的模块并不全部位于level3：其中一些位于level1而另一些位于level4，覆盖了所有中间的层次**
- 新的背景样式特性：现在可以使用`box-shadow`给逻辑框设置一个阴影，而且可以设置多背景
- 更精美的边框：现在不仅可以使用图像来格式化边框，使用`border-image`和它关联的普通属性，而且可以通过`border-radius`属性来支持圆角边框
- 为你的样式设置动画：使用CSS Transitions以在不同的状态间设置动画，或者使用CSS Animations在页面的某些部分设置动画而不需要一个触发事件，你现在可以在页面中控制移动元素了
- 排版方面的改进：不但可以控制`text-overflow`和`hyphenation`，还可以给它设置一个阴影或者更精细地控制它的`decorations`。感谢新的`@font-face`规则，现在我们可以下载并应用自定义的字体了
- 新的展示性布局：为了提高设计的灵活性，已经有两种新的布局被添加了进来：CSS多栏布局，以及CSS灵活方框布局

## 标签
**即标记标签**
- 由尖括号包围的关键词，比如 `<html>`
- 通常是成对出现的，比如 `<b>` 和 `</b>`
- 标签对中的第一个标签是开始标签，第二个标签是结束标签
- 开始和结束标签也被称为开放标签和闭合标签

### 结构化网站
- 标题: `<header>`
- 导航栏: `<nav>`
- 主要内容: `<main>`, 具有代表性的内容段落主题可以使用 `<article>`, `<section>`, 和 `<div>` 元素
- 侧栏: `<aside>`; 经常嵌套在 `<main>` 中
- 页脚: `<footer>`

### 没有特定语义
- `span`是一个`行内无语义元素`，你应该仅仅当`无法找到更好的语义元素包含内容`时使用，或者`不想增加特定的含义`
- `div`是一个`块级无语义元素`，你应该仅仅当`找不到更好的块级元素`时使用，或者`不想增加特定的含义`
<p class="tip">`div`用起来非常便利以至于很容易被滥用。因为它们不携带语义值，所以会让你的HTML代码变的混乱。要小心的使用它们，只有当没有更好的语义解决方案才能使用，而且要尽可能把它的使用量降到最低，否则，当你升级和维护你的文档时会非常困难。</p>

### 换行
- `<br>`在一个段落中创建一个换行
- `<hr>`在文档中生成一条水平分割线

### figure(描绘)
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

## HTML5示例
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>My test page</title>
  </head>
  <body>
    <p>This is my page</p>
  </body>
</html>
```
- `<!DOCTYPE html>`是最短的有效的文档声明
- `<html>`：包裹了整个完整的页面，是一个根元素
- `<head>`：是一个容器，它包含了所有你想包含在HTML页面中但不想在HTML页面中显示的内容。这些内容包括你想在搜索结果中出现的关键字和页面描述，CSS样式，字符集声明等等
- `<meta charset="utf-8">`：设置文档使用`utf-8`字符集编码，`utf-8`字符集包含了人类大部分的文字，使用它能避免很多问题
- `<title>`：设置页面标题，出现在浏览器标签上，当你`标记/收藏`页面时它可用来描述页面
- `<body>`：包含了你访问页面时所有显示在页面上的内容，文本，图片，音频，游戏等等

## 元素
### 组成
- 开始标签，例：`<p>`
- 结束标签，例：`</p>`
- 内容：`开始标签` + `结束标签`之间的`文本` + `嵌套元素`
- 元素：`开始标签` + `内容` + `结束标签` 组成的整个元素

### 嵌套
**元素可以放置在其它元素中**

### 种类

#### 块级元素
```css
div {
  display: block;
}
```
- 每个块级元素独占一行
- 元素的`height`、`width`、`line-height`、`margin-top`、`margin-bottom`都可设置
- 元素宽度在不设置的情况下，是它本身父容器的100%，除非设定一个宽度
- 超出内容不会换行，会一直增加宽度

#### 内联元素
```css
div {
  display: inline;
}
```
- 和其他元素都在一行上
- 元素的`height`、`width`、`margin-top`、`margin-bottom`都不可设置
- 元素的宽度就是它包含的文字或图片的宽度，不可改变
- 超出内容不会换行，会一直增加宽度
- 多个内联元素的宽度超过行宽时，会自动换行

#### 内联块状元素
```css
div {
  display: inline-block;
}
```
- 和其他元素都在一行上
- 元素的`height`、`width`、`line-height`、`margin-top`、`margin-bottom`都可设置
- 超出的内容会被忽略
- 多个内联块状元素的宽度超过行宽时，会自动换行

#### 空元素
**开始标签和结束标签之间内容和嵌套元素不生效的元素，例：`<img>`、`<input>`等**

### 属性
**标准结构：一个空格 + 属性名 + `=` + 带双引号的属性值**

### 布尔属性
**可以设置布尔值的属性，例：`<button disabled>`，不设置属性值，默认是`true`**

### 包围属性的引号
**可以不写，可以单引号，也可以双引号，但是强烈建议使用双引号，单引号留给脚本文件，这是业界默认标准**

## 统一资源定位器(URL)与路径(path)

### 指向相同目录
```html
<a href="contacts.html">contacts page</a>
```

### 指向子目录
```html
<a href="projects/child.html">go to child</a>
```

### 指向上级目录
```html
<a href="../parent/parent.html">go to parent</a>
```

### 文档片段
```html
<!-- 当前页面跳转到指定元素 -->
<a href="#test"> go to test</a>
<p id="test">this is test</p>

<!-- 跳转到不同页面的指定元素 -->
<a href="test.html#test">
<!-- test.html -->
<p id="test">this is test.html #test</p>
```

### 绝对链接

**指向由其在`Web`上的绝对位置定义的位置，包括 **协议** 和 **域名** **
**像下面的例子,如果`index.html` 页面上传到`projects`这一个目录**
- `projects`位于`web`服务站点的根目录
- `web`站点的域名为`http://www.example.com`
- 这个页面可以通过 `http://www.example.com/projects/index.html` 访问
- 或者仅仅通过 `http://www.example.com/projects/` 来访问，因为大多数`web`服务通过访问`index.html`这样的页面来加载，如果没有特定的`URL`的话

> 绝对URL总是指向相同的位置，不管它在哪里使用。

### 相对链接
**指向与您链接的文件相关的位置，更像我们在前面一节中所看到的位置。**
- 例如，如果我们想从示例文件链接`http://www.example.com/projects/index.html`转到相同目录下的一个`PDF`文件
- `URL`就是文件名`URL`，例：`project-brief.pdf `
- 没有其他的信息要求. 如果`PDF`文件能够在`projects`的子目录`pdfs`中访问到，相对路径就是`pdfs/project-brief.pdf` 
- 对应的绝对`URL`: `http://www.example.com/projects/pdfs/project-brief.pdf`
- 一个相对URL将指向不同的位置，这取决于它所在的文件所在的位置

### 总结
- 用清晰的链接措辞
- 尽可能使用相对链接
- 链接到非html资源时，留下清晰的指示
- 在下载链接时使用下载属性

**当您链接到要下载的资源而不是在浏览器中打开时，您可以使用下载属性来提供一个默认的保存文件名。下面是一个下载链接到`Firefox 39 Windows`版本的示例：**
```html
<a href="https://download.mozilla.org/?product=firefox-39.0-SSL&os=win&lang=en-US"
   download="firefox-39-installer.exe">
  Download Firefox 39 for Windows
</a>
```

## 页面测试以及排错
### 测试网站
- [w3c](https://validator.w3.org/)

### 测试工具
- 根据谷歌开发者工具提供的功能排查

### 测试方法
- 单元测试（测试逻辑）
- 集成测试（测试渲染状况）

### 自动化测试
**`Selenium`是最流行的浏览器自动化测试工具。最易使用的方法是使用基于`Selenium`的`WebDriver API`，它通过调用浏览器接口实现自动化，执行诸如“打开网页”、“移动网页上的元素”、“点击链接”、“查看链接是否打开URL”等。对于运行自动化测试来说是一个十分理想的方法。**

### vconsole
**适用于移动端的调试以及查看日志工具**
>[仓库地址](https://github.com/Tencent/vConsole)

## 安全问题汇总
简称 | 名称 | 发生时机 | 攻击方式 | 利用
--- | --- | --- | --- | ---
XSS | 跨站脚本 | 将用户发送的数据显示给用户或另一个用户 | 向web页面注入客户端脚本 | 用户对web站点的信任
CSRF | 跨站点请求伪造 | 将用户发送的数据显示给用户或另一个用户 | 向web页面注入客户端脚本 | 网站对其用户提供的信任

### 预防措施
- 始终检查用户发送给服务器的数据，尽量不要显示用户提供的html内容
- 执行存储用户发送的数据的清理工作
- 转义有潜在危险的字符
- 限制输入的数据量
- 沙箱上传文件（将它们存储在不同的服务器上，只允许通过不同的子域访问文件，或者通过完全不同的域名访问文件更好）

## 表单
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

### 单行文本域（input）

- input：type = text 默认值

- e-mail地址域：type = email
  - multiple属性：允许用户将多个电子邮件输入相同的输入（以逗号分隔）

- 密码域：type = password
  - 模糊输入到字段中的值

- 搜索域：type = search
  - 和文本域的区别：
    - 样式：圆角，有一个"x"可以用来清除输入的值

- 电话号码域：type = tel
  - 不会对用户输入的值作出任何限制

- url域：type = url
  - 增加了特殊的验证约束，如果输入无效的url，浏览器就会报错

**语义上的差异：移动设备上可能会出现不同的虚拟键盘**

### 多行文本域textarea

属性名 | 默认值 | 描述
--- | --- | ---
cols | 20 | 文本控件的可见宽度
rows | 2 | 控制的可见文本行数
wrap | soft | 表示控件是如何包装文本的，soft或hard

>`<input>`是空元素，不能包含子元素
>`<textarea>`是一个普通的元素，包含了一些默认的文本且只能包含文本

### 选择框
- 使用`<select>`创建
- 有一个或多个`<option>`作为子元素
- 使用`selected`属性设置默认值
- 可以嵌套`<optgroup>`创建一组带有标题的`options`

### 多选选择框
**给`<select>`添加`multiple`属性，用户可以按下`cmd/ctrl`来选择多个选项，所有支持`<select>`的浏览器同样支持`multiple`属性**

### 自动补全输入框
**你可以使用`<datalist>`元素来提供一些可以自动完成的值，例：**
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
**如果不支持`<datalist>`，可以这样使用：**
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

### 数字（ie10+）
```html
<!-- it will create a input that limit number form 1 to 10, `step` is mean how values you add or reduce once -->
<input type="number" name="age" id="age" min="1" max="10" step="2">
```

### 滑块
```html
<!-- 问题：不提供任何形式的视觉反馈 -->
<input type="range" name="beans" id="beans" min="0" max="500" step="10">
```

### 日期时间选择器（ie不支持）

- 本地时间
```html
<!-- 创建一个小部件来显示和选择一个日期，但是没有任何特定的时区信息 -->
<input type="datetime-local" name="datetime" id="datetime">
```
- 月
```html
<!-- it will show a month to select -->
<input type="month" name="month" id="month">
```
- 时间
```html
<input type="time" name="time" id="time">
```
- 星期
```html
<input type="week" name="week" id="week">
```
> 所有元素都可以使用`min`和`max`属性

### color picker（不支持ie和safari）
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

>如果使用图像按钮来提交表单，这个小部件不会提交它的值；相反，在图像上单击的X和Y坐标是被提交的，坐标被发送为两个健/值对
> [点击示例](http://xx.com?xxImage.x=123&xxImage.y=456)

### 仪表和进度条(ie不支持)
- 进度条
```html
<progress max="100" value="75">75/100</progress>
```
- 仪表
```html
<meter min="0" max="100" value="75" low="33" high="66" optimum="50">75</meter>
```

### 表单验证

#### required属性

- 验证失败虚线红框
- 验证成功黑色边框
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
#### 正则验证
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
> 使用js校验表单：控制原生错误信息的外观和感觉
> 如果需要更进一步的体验，得使用html语义化标签画出表单，并使用js控制交互。

## 多媒体与嵌入

### iframe

#### 基本要素
- allowfullscreen
- frameborder: 默认是1，会在此框架和其他框架之间绘制边框，0:删除边框
- src
- width/height
- 备选内容: 防止不支持iframe的情况
- sandbox: 提高安全性设置

**为了提高速度，在主内容完成加载后，使用js设置iframe的src属性是个好主意,这使得页面可以更快的使用，并减少您的官方页面加载时间（重要的seo指标）**

### 安全隐患
- 只有在必要时嵌入
  - 安全问题
  - 知识产权问题
- 使用https
  - https减少了远程内容在传输过程中被篡改的机会
  - https防止嵌入式内容访问您的父文档中的内容，反之亦然
- 始终使用sandbox属性
  - 沙箱：一个代码可以适当使用或用于测试的容器，但不能对其他代码库造成任何损害称为沙箱
- 配置CSP指令

### `<embed>`和`<object>`元素

**用来嵌入多种类型的外部内容的通用嵌入工具**
- java小程序
- Flash
- PDF
- 视频
- SVG
- 图像内容

> 插件是一种对浏览器原生无法读取内容提供访问权限的软件
> 现如今，浏览器已经很强大了，足以满足各种各样的开发需求了，基本上可以摆脱插件了

## 图片

### 注意事项
- 图片存储在和`HTML`页面同路径的`images`文件夹下，利于`SEO`/索引
- 搜索引擎也读取图像的文件名并把他们计入`SEO`，因此给图片取一个描述性的文件名
- 选取相对路径优于绝对路径，绝对路径会使浏览器做更多的工作，例如重新通过`DNS`寻找`ip`地址，所以通常会把`html`和图片放在同一个服务器上

### 备选文本
**内容取决于该图片想要表现的内容**

### 图片尺寸
**使用`html`属性来改变图片大小**
- 尺寸设定的太大了：图片会模糊
- 尺寸设定的太小了：下载图片时会浪费带宽
- 尺寸设定的不对：图片会扭曲

> 如果你需要改变图片尺寸，你应该使用`CSS`而不是`HTML`

### title

**没有空间时可以使用**

### 解说图片

```html
<figure>
  <img src="xxx" />
  <figcaption>a handsome dog.</figcaption>
</figure>
```

### css背景图片

**如果图像对您的内容有意义，则应使用HTML图像。如果图像纯粹是装饰，则应使用CSS背景图片。**

### 矢量图形

- 用处

**拥有较小的文件尺寸，高度可缩放，不会在镜头拉近或放大图像时像素化**

- 定义

**位图：**
**使用像素网格来定义 - 一个位图文件精确的包含了每个像素的位置和它的色彩信息。流行的位图格式：**

- `.bmp`
- `.png`
- `.jpg`
- `.gif`

**矢量图：**
**使用算法来定义 - 一个矢量图文件包含了图形和路径的定义，电脑可以根据这些定义计算出当它们在屏幕上渲染时应该呈现的样子。**
`svg`格式可以让我们创造用于`web`的精彩的矢量图形。

`svg`优点：
- 矢量图像中的文本依然可以访问（利于`seo`）
- `svg`可以很好的适应样式/脚本，因为图像的每个组件都可以通过css或js编写样式
`svg`缺点：
- 容易变得复杂
- 比图像更难创建
- 旧版浏览器不支持`svg`（`ie9+`）

### 将svg添加到桌面
例：`<img src="test.svg" />`

**优点：**
- 快速，熟悉的图像语法与alt属性中提供的内置文本等效
- 可以通过在`<a>`元素嵌套`<img>`,使图像轻松成为超链接

**缺点：**
- 无法使用js操作图像
- 若要使用css控制svg内容，必须在svg代码中包含内联css样式
- 不能用css伪类来重设图像样式

## 自适应图片

### example

```html
<img srcset="elva-fairy-320w.jpg 320w,
             elva-fairy-480w.jpg 480w,
             elva-fairy-800w.jpg 800w"
     sizes="(max-width: 320px) 280px,
            (max-width: 480px) 440px,
            800px"
     src="elva-fairy-800w.jpg" 
     alt="Elva dressed as a fairy" />
```

`srcset`定义了我们允许浏览器选择的图像集，以及每个图像的大小。在每个逗号之前，我们写：
- 一个文件名 (`elva-fairy-480w.jpg`)
- 一个空格

图像的固有宽度（以像素为单位）（`480w`）——注意到这里使用w单位，而不是你预计的`px`。这是图像的真实大小，可以通过检查你电脑上的图片文件找到（例如，在`Mac`上，你可以在`Finder`上选择这个图像，然后按 `Cmd + I` 来显示信息）。
sizes定义了一组媒体条件（例如屏幕宽度）并且指明当某些媒体条件为真时，什么样的图片尺寸是最佳选择—我们在之前已经讨论了一些提示。在这种情况下，在每个逗号之前，我们写：
一个媒体条件（`(max-width:480px)`）——你会在 `CSS` topic中学到更多的。但是现在我们仅仅讨论的是媒体条件描述了屏幕可能处于的状态。在这里，我们说 **当视窗的宽度是480像素或更少**。
当媒体条件为真时，图像将填充的槽的宽度（`440px`）
所以，有了这些属性，浏览器会：

1. 查看设备宽度
1. 检查sizes列表中哪个媒体条件是第一个为真
1. 查看给予该媒体查询的槽大小
1. 加载srcset列表中引用的最接近所选的槽大小的图像

## 视频

### 标签`（<video>）`

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

### 特性

1. width/height：`<audio>`不支持，无视觉部件
1. autoplay：自动播放
1. loop：循环播放
1. muted：默认关闭声音
1. poster：视频播放前显示的图片 `<audio>`不支持，无视觉部件
1. preload：缓冲较大的文件
  `none`: 不缓冲
  `auto`: 页面加载后缓存媒体文件
  `metadata`: 仅缓冲文件的元数据

### 音轨文本

**种类：**
1. subtitle: 翻译字幕
1. captions: 同步翻译对白, 帮助不能听音频的人
1. timed descriptions: 文字转换为音频，用于服务有视觉障碍的人

例：
```html
<video controls>
  <source src="test.mp4" type="video/mp4">
  <source src="test.webm" type="video/webm">
  <track kind="subtitles" src="subtitles_en.vtt" srclang="en">
</video>
```

## 表格

### 定义
**表格是由行和列组成的结构化数据集(表格数据)，它能够使你简捷迅速地查找某个表示不同类型数据之间的某种关系的值 。**

### 如何工作
**表格的一个特点就是严格. 通过在行和列的标题之间进行视觉关联的方法，就可以让信息能够很简单地被解读出来。**

### 局限
**HTML 表格 应该用于表格数据 ，这正是 HTML 表格设计出来的用途。不幸的是, 许多人习惯用 HTML 表格来实现网页布局。**
使用表格实现网页布局的缺点：
1. 表格布局减少了视觉受损的用户的可访问性: 屏幕阅读器, 被盲人所使用, 解析存在于 HTML 页面上的标签，然后为用户读出其中的内容。因为对于布局来说，表格不是一个正确的工具， 使用的标记比使用 CSS 布局技术更复杂, 所以屏幕阅读器的输出会让他们的用户感到困惑。
1. 表格会产生很多标签: 正如刚才提到的, 表格布局通常会比正确的布局技术涉及更复杂的标签结构，这会导致代码变得更难于编写、维护、调试.
1. 表格不能自动响应: 当你使用正确的布局容器 (比如 `<header>`, `<section>`, `<article>`, 或是 `<div>`), 它们的默认宽度是父元素的 100%. 而表格的的默认大小是根据其内容而定的。因此，需要采取额外的措施来获取表格布局样式，以便有效地在各种设备上工作。

#### 例子
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

## 排版

### 描述列表

```css
<dl>
  <dt>this is describle title</dt>
  <dd>this is describtion</dd>
  <dt>this is other describle</dt>
  <dd>this is other describtion</dd>
  <dd>describle can has many describtion</dd>
</dl>
```
- `dl`描述列表(definition list)
- `dd`描述定义(definition description)
- `dt`描述标题(definition title)

### 引用

**块引用**

如果一个块级内容（一个段落、多个段落、一个列表等），从其他地方被引用，应该使用`<blockquote>`元素包裹起来, 并且在`cite`属性里用URL来指向引用的资源

**行内引用**

和块级内容同样的工作方式，使用`<q>`元素包裹

### 缩略语

```html
<abbr title="超文本标记语言">HTML</abbr>
<p> it will explain HTML after you put pointer on it. </p>
```

### 标记联系方式

```html
<address>
  <p> you location place info. </p>
<address>
```

### 上标和下标

```html
<sup>上标</sup>
<sub>下标</sub>
```

### 展示计算机代码

```html
<code>用于标记计算机通用代码</code>
<pre>用于标记固定宽度的文本块，其中保留空格（通常是代码块）</pre>
<var>标记具体变量名</var>
<kbd>标记输入电脑的键盘（或其他类型）输入</kbd>
<samp>标记计算机程序的输出</samp>
```

### 标记时间和日期

```html
<time datetime="2018-08-08">08 xxxx xx 可供机器识别</time>
```
