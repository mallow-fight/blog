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

module.exports = Stack;