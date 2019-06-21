---
title: 表
order: 2
type: v2/theory/dataStructure
---

## 顺序表

### ADT

```js
ADT LinearList {
	data: [],
	operation: {
		create,
		destroy,
		isEmpty,
		length,
		find,
		search,
		insert,
		delete,
		output
	}
}
```

### 向量

1. 相当于JS中的数组，不受限的顺序表
2. 实现
```js
function Vector() {}
Vector.prototype = {
	data: [],
	output() {
		console.log(this.data);
		return this.data;
	},
	create(initData = []) {
		this.data = initData;
		return this.data;
	},
	destroy() {
		this.data = [];
		return true;
	},
	isEmpty() {
		return this.data.length;
	},
	length() {
		return this.data.length;
	},
	find(index) {
		return this.data[index];
	},
	search(value) {
		return this.data.filter(item => item === value);
	},
	insert(index, value) {
		// 1. 首先将从该位置开始的元素全部向后挪动一位
		let length = this.data.length;
		if (index > length) {
			length = index;
		}
		let start = index;
		while(start <= length) {
			start++;
			this.data[start] = this.data[start + 1];
		}
		// 2. 替换该位置的元素
		this.data[index] = value;
		// 3. 数据长度+1
		this.data.length = length + 1;
	},
	delete(index) {
		// 1. 首先将从该位置开始的之后的一个元素前部向前挪动一位
		const length = this.data.length;
		let start = index;
		while(start < length) {
			this.data[start] = this.data[start + 1];
			start++;		
		}
		// 2. 清空最后一个元素
		this.data.length = length - 1;
	}
}
```

### 栈

1. 一种运算受限的线性表。
2. 限定只能在表的同一端进行插入和删除等运算，允许运算的一端称为栈顶，而表的另一端称为栈底，当表中没有元素时称为空栈。
3. 实现
```js
function Stack(){}
Stack.prototype = {
	stack: [],
	init() {
		this.stack = []
	},
	output() {
		console.log(this.stack);
		return this.stack;
	},
	push(value) {
		const length = this.stack.length;
		this.stack[length] = value;
		return this.stack;
	},
	pop() {
		if (this.isEmpty()) return this.stack;
		const length = this.stack.length;
		this.stack.length = length - 1;
		return this.stack;
	},
	isEmpty() {
		return !this.stack.length;
	}
}
```

## 参考资料

> 数据结构（周颜军）