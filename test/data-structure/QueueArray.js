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

module.exports = QueueArray;