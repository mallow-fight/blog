---
title: 标签
order: 2
type: html
---

## 定义

- 由尖括号包围的关键词，比如 `<html>`

- 通常是成对出现的，比如 `<b>` 和 `</b>`

- 标签对中的第一个标签是开始标签，第二个标签是结束标签

- 开始和结束标签也被称为开放标签和闭合标签

## 结构化网站

- 标题: `<header>`

- 导航栏: `<nav>`

- 主要内容: `<main>`, 具有代表性的内容段落主题可以使用 `<article>`, `<section>`, 和 `<div>` 元素

- 侧栏: `<aside>`; 经常嵌套在 `<main>` 中

- 页脚: `<footer>`

## 没有特定语义

- `span`是一个`行内无语义元素`，你应该仅仅当`无法找到更好的语义元素包含内容`时使用，或者`不想增加特定的含义`

- `div`是一个`块级无语义元素`，你应该仅仅当`找不到更好的块级元素`时使用，或者`不想增加特定的含义`

<p class="tip">`div`用起来非常便利以至于很容易被滥用。因为它们不携带语义值，所以会让你的HTML代码变的混乱。要小心的使用它们，只有当没有更好的语义解决方案才能使用，而且要尽可能把它的使用量降到最低，否则，当你升级和维护你的文档时会非常困难。</p>

## 换行

- `<br>`在一个段落中创建一个换行

- `<hr>`在文档中生成一条水平分割线

## figure(描绘)

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

- `<!DOCTYPE html>`：最短的有效的文档声明

- `<html>`：包裹了整个完整的页面，是一个**根元素**

- `<head>`：一个容器，它包含了所有你想包含在HTML页面中但不想在HTML页面中显示的内容。这些内容包括你想在搜索结果中出现的关键字和页面描述，CSS样式，字符集声明等

- `<meta charset="utf-8">`：设置文档使用`utf-8`字符集编码，`utf-8`字符集包含了人类大部分的文字，使用它能避免很多问题

- `<title>`：设置页面标题，出现在浏览器标签上，当你`标记/收藏`页面时它可用来描述页面

- `<body>`：包含了你访问页面时所有显示在页面上的内容，文本，图片，音频，游戏等