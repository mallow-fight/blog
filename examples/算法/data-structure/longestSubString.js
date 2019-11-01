module.exports = function(s) {
	const sa =  s.split('');
	let longest = [];
	for (let i = 0; i < sa.length; i++) {
		let temp = [];
		for(let j = i; j < sa.length; j++) {
			if (temp.indexOf(sa[j]) > -1) {
				break;
			} else {
				temp.push(sa[j]);
			}
		}
		if (temp.length > longest.length) {
			longest = temp;
		}
	}
	return longest.length;
}