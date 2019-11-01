function SinglyLinkedList() {
	this.list = {}
	this.set = function({pointer, value, nextPointer}) {
		this.list[pointer] = {
			value,
			next: nextPointer
		}
	}
	this.get = function(pointer) {
		const value = this.list[pointer];
		return this.log(value);
	}
	this.getNext = function(pointer) {
		const value = this.list[this.list[pointer].next];
		return this.log(value);
	}
	this.log = function(value) {
		console.log(JSON.stringify(value))
	}
}

module.exports = SinglyLinkedList;