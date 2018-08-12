---
title: lintcode笔记
order: 1
type: arithmetic
---
## 尾部的零
设计一个算法，计算出n阶乘中尾部零的个数
样例
11! = 39916800，因此应该返回 2
挑战
O(logN)的时间复杂度

> [csdn](https://blog.csdn.net/surp2011/article/details/51168272)

## 统计数字
统计数字
计算数字k在0到n中的出现的次数，k可能是0~9的一个值
样例
例如n=12，k=1，在 [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]，我们发现1出现了5次 (1, 10, 11, 12)
```js
/**
 * @param k: An integer
 * @param n: An integer
 * @return: An integer denote the count of digit k in 1..n
 */
const digitCounts = function (k, n) {
    let count = 0
    for(let i = 0; i <= n; i++) {
        const arr = `${i}`.split('')
        for(let j = 0; j < arr.length; j++) {
            arr[j] == k && count++
        }
    }
    return count
}
```

## 丑数

> 习惯上1是第一个丑数

设计一个算法，找出只含素因子2，3，5 的第 n 小的数。
符合条件的数如：1, 2, 3, 4, 5, 6, 8, 9, 10, 12...
样例
如果n = 9， 返回 10
挑战
要求时间复杂度为O(nlogn)或者O(n)
```js
/**
 * @param n: An integer
 * @return: the nth prime number as description.
 */
const nthUglyNumber = function (n) {
    const stack = [1]
    while(stack.length < n) {
        let next = stack[stack.length - 1] * 2
        const last = stack[stack.length - 1]
        for(let i = 0; i < stack.length; i++) {
            const thisStack = stack[i]
            const a = thisStack * 2
            const b = thisStack * 3
            const c = thisStack * 5
            a > last && a < next && (next = a)
            b > last && b < next && (next = b)
            c > last && c < next && (next = c)
        }
        stack.push(next)
    }
    return stack[stack.length - 1]
}
```

## 第k大元素
在数组中找到第k大的元素

样例
给出数组 [9,3,2,4,8]，第三大的元素是 4

给出数组 [1,2,3,4,5]，第一大的元素是 5，第二大的元素是 4，第三大的元素是 3，以此类推

挑战
要求时间复杂度为O(n)，空间复杂度为O(1)

思路
首先找最简单的实现方式，就是js自带的排序功能，在尝试自己写的排序方法，试过了冒泡，选择，插入，快速排序，都超时了，应该对不同的数组有不同的排序策略

todo: sort原理
```js
/**
 * @param n: An integer
 * @param nums: An array
 * @return: the Kth largest element
 */
const kthLargestElement = function (n, nums) {
  nums.sort((a, b) => {
    return b - a
  })
  return nums[n - 1]
}
```

## 最长回文子串

给定一个字符串，求它的最长回文子串的长度。

```js
function isPalindrome (str) {
let s = 1, i = 0, j = 2, p = null, temp = ''
while(s < str.length - 2) {
    if (str[i] !== str[j] || i < 0 || j > str.length - 1) {
    if (p) {
        temp.length < p.length && (temp = p)
        p = null
    }
    s++
    i = s - 1
    j = s + 1
    } else {
    if (!p) { p = str[s] }
    p = str[i] + p + str[i]
    i--
    j++
    }
}
console.log(temp)
}
isPalindrome('abcccbaaaaggggggggggfsdfa')
```

## 字符串的全排列
输入一个字符串，打印出该字符串中字符的所有排列。

例如输入字符串abc，则输出由字符a、b、c 所能排列出来的所有字符串

abc、acb、bac、bca、cab 和 cba。

```js
function stringQueue (str) {
    const res = []
    for(let i = 0; i < str.length; i++) {
    const s = str.charAt(i)
    for(let j = i + 1; j < str.length; j++) {
        const copyStr = str.split('')
        copyStr[i] = copyStr[j]
        copyStr[j] = s
        res.push(copyStr.join(''))
    }
    }
    console.log(res)
}
stringQueue('hkgahsfasd')
```

## 利用缓存实现fabonacci数列

```js
const cache = [0, 1]
function fabonacci(n) {
return typeof cache[n] === 'number'
        ? cache[n]
        : cache[n] = fabonacci(n - 1) + fabonacci(n - 2);
}
console.log(fabonacci(40))
```