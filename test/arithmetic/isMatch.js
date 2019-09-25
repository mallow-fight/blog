// 给你一个字符串 s 和一个字符规律 p，请你来实现一个支持 '.' 和 '*' 的正则表达式匹配。

// '.' 匹配任意单个字符
// '*' 匹配零个或多个前面的那一个元素
// 所谓匹配，是要涵盖 整个 字符串 s的，而不是部分字符串。

// 说明:

// s 可能为空，且只包含从 a-z 的小写字母。
// p 可能为空，且只包含从 a-z 的小写字母，以及字符 . 和 *。
// 示例 1:

// 输入:
// s = "aa"
// p = "a"
// 输出: false
// 解释: "a" 无法匹配 "aa" 整个字符串。
// 示例 2:

// 输入:
// s = "aa"
// p = "a*"
// 输出: true
// 解释: 因为 '*' 代表可以匹配零个或多个前面的那一个元素, 在这里前面的元素就是 'a'。因此，字符串 "aa" 可被视为 'a' 重复了一次。
// 示例 3:

// 输入:
// s = "ab"
// p = ".*"
// 输出: true
// 解释: ".*" 表示可匹配零个或多个（'*'）任意字符（'.'）。
// 示例 4:

// 输入:
// s = "aab"
// p = "c*a*b"
// 输出: true
// 解释: 因为 '*' 表示零个或多个，这里 'c' 为 0 个, 'a' 被重复一次。因此可以匹配字符串 "aab"。
// 示例 5:

// 输入:
// s = "mississippi"
// p = "mis*is*p*."
// 输出: false

/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
	let matched = true;
	const stateMachine = (target) => {
		const rule = p.split('');
		let start = 0;
		let targetStart = 0;
		const payload = {};
		let next = payload;
		while(rule[start]) {
			console.log('targetStart', targetStart, target[targetStart]);
			console.log('ruleStart', start, rule[start]);
			next.next = {};
			next.node = rule[start];
			// 0：'.' 匹配任意单个字符
			// 1：'*' 匹配零个或多个前面的那一个元素
			// 2：正常文本
			next.type = rule[start] === '.' ? 0 : (rule[start] === '*' ? 1 : 2)
			if (next.type === 0) {
				targetStart++;
			} else if (next.type === 1) {
				let temp = target[targetStart - 1];
				if (rule[start - 1] === '.') {
					temp = target[targetStart]
				}
				while(target[targetStart] === temp) {
					targetStart++;
				}
				// 如果*后面跟着*之前相同的值，减去相同值的个数
				let sameAfterType1Start = start;
				while(rule[sameAfterType1Start + 1] === temp && temp) {
					sameAfterType1Start++;
				}
				targetStart = targetStart - (sameAfterType1Start - start);
			} else if (target[targetStart] !== next.node) {
				if (rule[start + 1] !== '*') {
					matched = false;
					start = rule.length + 1;
				} else {
					start++;
				}
				// todo
			} else if (target[targetStart] === next.node) {
				targetStart++;
			}
			next = next.next;
			start++;
		}
		if (targetStart !== target.length) {
			matched = false;
		}
	}
	stateMachine(s.split(''));
	return matched;
};

module.exports = isMatch;