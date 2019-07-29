---
title: 堆栈
order: 4
type: v2/theory/dataStructure
---

>[wiki](https://zh.wikipedia.org/wiki/%E5%A0%86%E6%A0%88)

## 定义

1. 又称为栈或堆叠，是计算机科学中的一种抽象数据类型，只允许在有序的线性数据集合的一端进行加入数据和移除数据的运算。
2. 按照后进先出的原理运作，常用一维数组或链表来实现。

## 操作

1. 推入：将数据放入堆栈顶端，堆栈顶端移到新放入的数据。
2. 弹出：将堆栈顶端数据移除，堆栈顶端移到移除后的下一笔数据。

## 实现

### 数组

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

### 链表

```js
function StackList() {
	this.stack = {
		content: null,
		next: null
	};
	this.push = function (item) {
		let start = this.stack;
		while(start.next) {
			start = start.next
		}
		start.next = {
			content: item,
			next: null
		}
		return this.stack;
	}
	this.pop = function () {
		let end = this.stack;
		while(end.next && end.next.next) {
			end = end.next;
		}
		end.next = null;
		return this.stack;
	}
	this.get = () => console.log(JSON.stringify(this.stack));
}
// example
const stack = new StackList();
stack.push('mallow');
stack.push('julia');
stack.push('lucy');
stack.get()
stack.pop()
stack.get()
stack.pop()
stack.get()
stack.pop()
stack.get()
```