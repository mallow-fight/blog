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
