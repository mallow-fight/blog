---
title: 专题
order: 9
type: js
---

## 理解prototype、proto和constructor等关系

- [参考博客](https://alexzhong22c.github.io/2017/08/08/js-proto/)

## new创建对象的过程发生了什么

### 通用观点

- 用来实例化一个类，从而在内存中分配一个实例对象

### 例子
```js
function Person(name) {
  this.name = name;
}
Person.hairColor = 'black';
Person.prototype.say = function() {
  console.log('my name is ' + this.name);
}
var john = new Person('john');
john.name // John
john.hairColor // undefined
john.height // undefined
john.say() // my name is john
Person.name // Person
Person.hairColor // black
Person.say() // Person.say is not a function
```

- JS引擎在执行这段代码：`var john = new Person('john')`时，在内部做了很多工作，用伪代码模拟就是：
```js
var obj = {};
obj.__proto__ = Person.prototype; // 此时建立了obj对象的原型链
// obj -> Person.prototype -> Object.prototype -> null
var result = Person.call(obj, 'John'); // 相当于obj.Person('John')
return typeof result === 'object' ? result : obj; // 如果无返回值或者返回一个非对象值，则将obj返回作为新对象
```