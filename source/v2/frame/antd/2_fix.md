---
title: 修复
order: 2
type: v2/frame/antd
---

## 面包屑链接

1. 这个不仅仅有href，而且点击事件代理了
2. 需要阻止事件冒泡，需要移除自带的事件
3. 触发自定义的点击事件

```js
fixBreadLink = () => {
	const eles = document.querySelectorAll('.ant-breadcrumb-link');
	const eleA = eles[3].children[0];
	eleA.removeAttribute('href');
	eleA.addEventListener('click', (e) => {
		e.stopPropagation();
		this.handleOnClick();
	});
}
```