---
title: 排版
type: html
order: 6
---

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