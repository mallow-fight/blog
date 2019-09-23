/**
 * @description 最长回文
 * @param {string} s
 * @return {string}
 */
var longestPalindromeTimeOut = function(s) {
	s = s.split('');
	let longest = [s[0] || ''];
	const session = [];
	for(let i = 0; i < s.length; i++) {
		for(let j = i + 1; j < s.length; j++) {
			if (s[i] === s[j]) {
				let same = true;
				let start = i;
				let end = j;
				for(let t = 0; t < session.length; t++) {
					const ses = session[t];
					const [sesI, sesJ] = ses;
					if (i > sesI && i < sesI/2 && j < sesJ && j > sesJ / 2) {
						same = false;
						break;
					}
				}
				while(start < end && same) {
					start++;
					end--;
					if (s[start] !== s[end]) {
						same = false;
					}
				}
				if (same) {
					if (j - i + 1 > longest.length) {
						longest = s.slice(i, j + 1);
					}
				} else {
					session.push([i, j])
				}
			}
		}
	}
	return longest.join('');
};
var longestPalindrome = function(s) {
let payload = s[0] || '';
for(let i = 0; i < s.length; i++) {
	let left = i - 1;
	let right = i + 1;
	let temp = s[i];
	while(s[right] === s[i]) {
		temp += s[i];
		right++;
	}
	while (s[left] === s[right] && s[left] && s[right]) {
		temp = s[left] + temp + s[right];
		left--;
		right++;
	}
	if (temp.length > payload.length) {
		payload = temp;
	}
}
return payload;
}

module.exports = longestPalindrome;