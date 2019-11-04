// 给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。

// 示例 1:

// 输入: 123
// 输出: 321
//  示例 2:

// 输入: -123
// 输出: -321
// 示例 3:

// 输入: 120
// 输出: 21
// 注意:

// 假设我们的环境只能存储得下 32 位的有符号整数，则其数值范围为 [−231,  231 − 1]。请根据这个假设，如果反转后整数溢出那么就返回 0。
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
	const limit = (num) => {
		const min = -(2**31);
		const max = (2**31) - 1;
		if (num < min || num > max) return 0;
		return num;
	}
	const limitNum = limit(x);
	const chip = `${limitNum}`.split('').reverse();
	console.log(chip);
	
	if (chip.length > 1) {
		let start = 0
		for(let i = 0; i < chip.length; i++) {
			if (chip[i] === '0') {
				chip.shift();
				// to fix shift reduce chip length
				i--;
			} else {
				break;
			}
		}
	}
	if (chip[chip.length - 1] === '-') {
		chip.pop();
		chip.unshift('-');
	}
	return limit(parseInt(chip.join(''), 10))
};

module.exports = reverse;