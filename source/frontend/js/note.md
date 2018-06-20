---
title: 笔记
order: 1
type: js
---

## 参考资料
>[you-don't-konw-js](https://github.com/getify/You-Dont-Know-JS/blob/1ed-zh-CN/up%20%26%20going/ch3.md)
>[es6-阮一峰](http://es6.ruanyifeng.com/)
>[Learning JavaScript Design Patterns](https://addyosmani.com/resources/essentialjsdesignpatterns/book/)
>[Pro JavaScript Design Patterns](http://jsdesignpatterns.com/)
>[书写规范](https://github.com/airbnb/javascript)

## todos
- [ ] es5
- [ ] es6
- [ ] js设计模式
- [ ] js书写规范

## 笔记

### web监听滚动
```js
// overflow: scroll
// -webkit-overflow-scrolling: touch
// 如不设置，会导致监听事件失效
listenScroll() {
  const iframe = window.document.querySelector('.iframe')
  window.document.querySelector('.xxx').addEventListener('scroll', function (e) {
    if(e.srcElement.scrollTop > 0) {
      iframe.setAttribute('scrolling', 'no')
    }
    if(e.srcElement.scrollTop === 0) {
      iframe.setAttribute('scrolling', 'yes')
    }
    this.hasGetHeight = true
  });
}
```

### 动态设置高度，存在跨域问题，ios生效
```js
calcPageHeight(doc) {
  const cHeight = Math.max(doc.body.clientHeight, doc.documentElement.clientHeight)
  const sHeight = Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight)
  const height = Math.max(cHeight, sHeight)
  return height
},
adaptIframeHeight() {
  const ifr = window.document.querySelector('.iframe')
  ifr.onload = () => {
    const iDoc = ifr.contentDocument || ifr.document
    const height = this.calcPageHeight(iDoc)
    ifr.style.height = height + 'px'
  }
},
```

### 三元表达式
**「表达式」 `expression` 与「语句」 `statement` 的区别。条件运算符 `a ? b : c` 的后两部分必须是可用来赋值的表达式，而 `break` 是语句**

### 函数相关

#### prototype
- 所有对象（`null`不是对象）都有`__proto__`属性（即为原型链），普通对象的原型链为`{}`，`function`的原型链为`Function.prototype`(即为普通对象)，`new xxx()` 产生的实例的原型链为`xxx.prototype -> {} -> null`。
- 只有`function`函数有`prototype`属性, 这个`prototype`属性用于给函数实例继承在`__proto__`上，`function`也有`__proto__`, 值是`Funtion`对象, `this`值取决于`this`绑定的四种规则。
- 箭头函数木有，`this`指向函数外层`this`。
- 只有函数可以定义`prototype`属性，定义后可以使用`__proto__`访问原型链。
- `new Ctor(argus)` 出来的对象继承`Ctor`的`prototype`原型链，其它属性都不支持，可以传入参数给`Ctor`，然后使用`this`绑定值给`new`出来的新对象, 可以用`this`访问实例的原型链，一般在`Ctor`函数里面通过给`this`赋属性的方式初始化实例对象的常量或者方法，通过`Ctor.prototype = xxx`，初始化实例对象`__proto__`上的方法或者常量。
- `Object.create(obj)`返回将`obj`作为`prototype`的新的对象。
- `function` 相当于 `new Function` ，如果在`Function`的`prototype`上定义属性和方法，那么所有`function`函数也可以访问这些属性和方法，其实`Function`相当于一个原始的构造函数，所有`function`实例的`prototype`都是`Function`的`prototype`。
- `function` 的 `constructor`是`Function`, `Function`的`prototype`是一个对象实例，对象实例的`__proto__`是`{}`, `{}`的`__proto__`是`null`，`null`是最上层。
- 对象可以通过`__proto__`访问原型链，函数可以通过`prototype`访问原型链。
- `new xxx(name)`出来的是一个对象，`__proto__`继承`xxx的prototype`，如果`xxx`中有t`his.name=name`，`name`属性会直接作为实例的健值对，而不是继承在`__proto__`上。

### call
- 箭头函数不能使用call
- 只有传统的function函数才能使用call或者apply
- 箭头函数表达式的语法比函数表达式更短，并且不绑定自己的this，arguments，super或 new.target。这些函数表达式最适合用于非方法函数，并且它们不能用作构造函数。

### 自运行函数
**前面最好加上分号，不然的话有可能出现编译错误。**

### 慎用Object.assign
**这玩意会改变原始对象**

### 循环中使用`return`

会中断循环，相当于`break`的有：
- `for in`
- 普通的`for`循环
- `some`
- `every`

不会中断循环的有：
- `forEach`
- `map`

### 闭包
模块
在`JavaScript`中闭包最常见的用法就是模块模式。模块让你定义对外面世界不可见的私有实现细节（变量，函数），和对外面可访问的公有API。

### 循环
1. for 循环 - 可使用break跳出整个循环，continue跳出本次循环
1. forEach
    没有办法中止或者跳出 forEach 循环，除了抛出一个异常。如果你需要这样，使用forEach()方法是错误的，你可以用一个简单的循环作为替代。如果您正在测试一个数组里的元素是否符合某条件，且需要返回一个布尔值，那么可使用 Array.every 或 Array.some。如果可用，新方法 find() 或者findIndex() 也可被用于真值测试的提早终止。  
1. for in
1. for of
1. map
1. every - 检测所有数组元素是否符合条件
1. some - 检测某些数组元素是否符合条件
1. filter - 筛选某些数组元素