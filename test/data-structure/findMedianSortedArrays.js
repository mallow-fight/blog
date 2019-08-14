module.exports = function(nums1, nums2) {
	let total = nums1.concat(nums2);
	total = total.sort((a, b) => a - b)
	const isEven = total.length % 2 === 0;
	console.log(isEven);
	
	if (isEven) {
			const middle = total.length/2;
			return (total[middle-1] + total[middle])/2;
	}
	const middle = Math.floor(total.length/2);
	return total[middle];
};