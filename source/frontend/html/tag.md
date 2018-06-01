---
title: 标签
type: html
order: 3
---

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