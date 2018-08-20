---
title: CSS3新特性
order: 7
type: css
---
## 线性渐变 - 从上到下

**可使用postcss修补样式**

```css
#grad {
  background: linear-gradient(red, blue); /* 标准的语法 */
}
```

## 线性渐变 - 从左到右

```css
#grad {
  background: linear-gradient(to right, red , blue); /* 标准的语法 */
}
```

## 线性渐变 - 从左上角到右下角的线性渐变

```css
#grad {
  background: linear-gradient(to bottom right, red , blue); /* 标准的语法 */
}
```