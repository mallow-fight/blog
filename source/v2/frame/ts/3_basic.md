---
title: 基础
order: 3
type: v2/frame/ts
---

## 枚举

- 如果你想通过枚举的值来访问对应的是枚举属性名，只能通过number类型的来获取，例：
```ts
enum Color {
  Red = 100,
  Green = 200,
  Blue = 300,
  Yellow = "yellowCode",
}
Color[100]
Color.Yellow // 不能通过Color['yellowCode']来获取属性名，数据结构中会把number类型的都给解析到对象上
```
- 排列顺序：如果枚举的值不是number类型的，那么从0开始排起，如果中间出现了一个number类型的，之前的从0开始排，之后的从这个number之后排，如果这个number是0，那么这个number之前的下标就没了，所以最好不要用下标取值