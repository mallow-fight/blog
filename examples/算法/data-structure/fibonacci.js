const session = {};
function fibonacci(n) {
	let res;
	if (n === 0) {
		res = 1;
	} else {
		res = n * (session[n - 1] || fibonacci(n - 1));
	}
	session[n] = res;
	return res;
}

module.exports = fibonacci;