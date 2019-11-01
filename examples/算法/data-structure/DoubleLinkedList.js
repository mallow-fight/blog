function DoubleLinkedList() {
	this.list = {};
	this.set = function({previousPointer, pointer, value, nextPointer}) {
		this.list[pointer] = {
			value,
			previousPointer,
			nextPointer
		};
	}
	this.get = function(pointer) {
		this.log(this.list[pointer])
	}
	this.getNext = function(pointer) {
		this.log(this.list[this.list[pointer].nextPointer])
	}
	this.getPrevious = function(pointer) {
		this.log(this.list[this.list[pointer].previousPointer])
	}
	this.log = function(value) {
		console.log(JSON.stringify(value));
	}
}

module.exports = DoubleLinkedList;