---
title: 表格
type: html
order: 9
---

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