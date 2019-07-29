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

## 实现

### 数组形式

```js
function QueueArray() {
	this.queue = [];
	this.clear = function () {
		this.queue = [];
	}
	this.put = function (item) {
		this.queue.push(item);
	}
	this.poll = function (item) {
		this.queue.shift();
	}
	this.get = function() {
		console.log(JSON.stringify(this.queue));
	}
}
// example
const queue = new QueueArray();
queue.put('mallow');
queue.get();
queue.put('lucy');
queue.put('annie');
queue.get();
queue.poll();
queue.get();
```

### 链表形式

```js
function QueueList() {
	this.list = {
		content: null,
		next: null
	}
	this.put = function (item) {
		let end = this.list;
		while(end.next) {
			end = end.next;
		}
		end.next = {
			content: item,
			next: null
		};
		return this.list;
	}
	this.poll = function () {
		if (!this.list.next) {
			return '没东西给你poll了';
		}
		// 去除头指针
		this.list = this.list.next.next;
	}
	this.get = function () {
		console.log(JSON.stringify(this.list));
	}
}
// example
const queue = new QueueList();
queue.put('mallow');
queue.get();
queue.put('lucy');
queue.put('annie');
queue.get();
queue.poll();
queue.get();
```