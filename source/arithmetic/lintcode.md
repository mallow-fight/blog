---
title: lintcode笔记
order: 1
type: arithmetic
---

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
正常：首先从大到小排序(冒泡排序pass，太慢了，使用插入排序也不行，只能试试快速排序)，如果数组长度 === k，则返回k
```js

```