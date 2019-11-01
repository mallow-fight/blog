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

module.exports = QueueList;