---
title: Url&Path
order: 4
type: html
---
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

**访问文件的完整链接，可以是服务器上的路径，也可以是本地路径。**

> 绝对URL总是指向相同的位置，不管它在哪里使用。
> 一般可以省略`index.html`，这是访问一个链接的默认文件名。

### 相对链接

**相对于当前文件的路径，一般较短，推荐使用。**

### 总结
- 用清晰的链接措辞
- 尽可能使用相对链接
- 链接到非html资源时，留下清晰的指示
- 在下载链接时使用下载属性
- 当您链接到要下载的资源而不是在浏览器中打开时，您可以使用下载属性来提供一个默认的保存文件名。下面是一个下载链接到`Firefox 39 Windows`版本的示例：
```html
<a href="https://download.mozilla.org/?product=firefox-39.0-SSL&os=win&lang=en-US"
   download="firefox-39-installer.exe">
  Download Firefox 39 for Windows
</a>
```