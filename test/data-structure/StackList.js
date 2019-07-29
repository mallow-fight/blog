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
module.exports = StackList;