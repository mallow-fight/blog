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

module.exports = yhsj;