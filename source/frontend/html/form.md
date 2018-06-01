---
title: 表单
type: html
order: 8
---

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