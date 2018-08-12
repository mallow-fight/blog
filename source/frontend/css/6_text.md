---
title: 文字样式
order: 6
type: css
---

## 字体

- color
- font-family 字体种类
>网络安全字体：有几个字体通常可以应用到所有系统，可以无所顾忌的使用。

字体名称 | 字体类型
--- | ---
Arial | sans-serif
Courier New | monospace
Georgia | serif
Times New Roman | serif
Trebuchet MS | sans-serif
Verdana | sans-serif

## 默认字体

**css定义了5个常用的字体名称：**

1. serif
1. sans-serif
1. monospace
1. cursive
1. fantasy

## 字体栈

**使浏览器有多种字体选择**

```css
p {
  font-family: 'Trebuchet MS', Verdana, sans-serif;
}
```

## 字体大小

- 单位：px、em、rem
- 浏览器的`font-size`标准设置的值为`16px`

## 其它字体属性

- font-style：用来打开和关闭文本斜体
- font-weight：设置文字的粗体大小
- text-transform：允许你设置要转换的字体
- text-decoration：设置/取消字体上的文本装饰
- text-shadow：对文本应用阴影：可以用逗号分隔开阴影值，将多个阴影应用于同一文本

## 文本布局

- 文本对齐：text-align
- 行高：line-height
- 字母和字间距：letter-spacing和word-spacing
