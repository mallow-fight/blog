---
title: 队列
order: 3
type: v2/theory/dataStructure
---

## 队列

1. 是一种运算受限的线性表，只允许在表的一端进行插入，而在表的另一端进行删除，允许插入的一端称为队尾，允许删除的一端称为队头。
2. 使用js实现的话可以用数组作为载体，这样实现队列的入队、出队等操作就很方便了。

## 杨辉三角

```js
function yhsj(line) {
	if (line < 1) return console.log('line must >= 1');
	const index = line - 1;
	const session = [];
	for(let i = 0; i <= index; i++) {
		if (i === 0) {
			session.push([1, 1])
			console.log(session[i]);
		} else {
			const temp = [];
			for(let j = 0; j <= i + 1; j++) {
				const top = session[i - 1];
				const top_left_item = top[j - 1];
				const top_right_item = top[j];
				if (!top_left_item || !top_right_item) {
					temp.push(1);
				} else {
					const value = top_left_item + top_right_item;
					temp.push(value);
				}
			}
			session.push(temp);
			console.log(temp);
		}
	}
	return session;
}
```