export default function threeSum(nums) {
  let result = [];
  const cacheOneSum = {};
  for(let i = 0; i < nums.length; i++) {
    if (!cacheOneSum[nums[i]]) {
      cacheOneSum[nums[i]] = []
    }
    cacheOneSum[nums[i]].push(i);
  }
  for(let i = 0; i < nums.length; i++) {
    for(let j = i; j < nums.length; j++) {
      const twoSum = nums[i] + nums[j];
      const oneSumArray = cacheOneSum[-twoSum];
      if (oneSumArray.length && oneSumArray.indexOf(i) === -1 && oneSumArray.indexOf(j) === -1) {
        result.push(i, j, )
      }
    }
  }
}