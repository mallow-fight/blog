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

## 递归

1. 若一个对象部分地包含它自己，或用它自己定义自己，则称这个对象是递归的，若一个过程直接或间接调用它自己，则称这个过程是递归的过程。

## 链表

1. 采用顺序存储结构，内存的存储密度高；当节点等长时，可以随机存取表中的结点。但是，在顺序表中进行插入和删除结点的运算时，往往会造成大量节点的移动，效率较低；顺序表的存储空间常采用静态分配，在程序运行前就必须明确规定它的存储规模。估计过大将导致空间的浪费，估计小了，随着结点的不断插入，所需的存储空间超出了预先分配的存储空间，就会发生空间溢出。
2. 链接存储适合于结点插入或删除频繁，存储空间需求不能预先确定的情形。
3. 链接存储不仅可以用来存储线性表，而且也可以用来存储各种非线性结构。树形结构、图结构等都可以采用链表来进行存储。

### 单链表

1. 用单链表来表示线性表时，每个数据元素占用一个结点。每个结点均由两个域组成：一个域存放数据元素；另一个域存放指向结点后继的指针。终端结点没有后继，其next域为空。另外还需要一个表头指针head

## 参考资料

> 数据结构（周颜军）