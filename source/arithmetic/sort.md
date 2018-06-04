---
title: 排序
order: 1
type: arithmetic
---

## 插入排序

```js
function InsertSort(array, direction) {
  for(let i = 1; i < array.length; i++) {
    let flag = array[i]
    let j = i - 1
    const condition = direction ? flag < array[j] : flag > array[j]
    while(j >= 0 && condition) {
      array[j + 1] = array[j]
      j--
    }
    array[j + 1] = flag
  }
  return array
}
```