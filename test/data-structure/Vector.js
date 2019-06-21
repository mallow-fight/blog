// create,
// destroy,
// isEmpty,
// length,
// find,
// search,
// insert,
// delete,
// output
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

module.exports = Vector;