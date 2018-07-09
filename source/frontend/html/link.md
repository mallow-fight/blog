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