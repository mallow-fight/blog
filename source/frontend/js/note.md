---
title: 笔记
order: 6
type: js
---

## 参考资料
>[you-don't-konw-js](https://github.com/getify/You-Dont-Know-JS/blob/1ed-zh-CN/up%20%26%20going/ch3.md)
>[es6-阮一峰](http://es6.ruanyifeng.com/)
>[Learning JavaScript Design Patterns](https://addyosmani.com/resources/essentialjsdesignpatterns/book/)
>[Pro JavaScript Design Patterns](http://jsdesignpatterns.com/)
>[书写规范](https://github.com/airbnb/javascript)

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
- `forEach`： 结束循环后，返回undefined
- `map`：结束循环后，返回相同大小长度的数组，如果回调函数没有返回值，返回的数组值是undefined

### 闭包
模块
在`JavaScript`中闭包最常见的用法就是模块模式。模块让你定义对外面世界不可见的私有实现细节（变量，函数），和对外面可访问的公有API。

### 循环
1. for 循环： 可使用break跳出整个循环，continue跳出本次循环
1. forEach：没有办法中止或者跳出 forEach 循环，除了抛出一个异常。如果你需要这样，使用forEach()方法是错误的，你可以用一个简单的循环作为替代。如果您正在测试一个数组里的元素是否符合某条件，且需要返回一个布尔值，那么可使用 Array.every 或 Array.some。如果可用，新方法 find() 或者findIndex() 也可被用于真值测试的提早终止。该方法一直返回undefined，不管回调函数有没有返回值。
1. for in： 会遍历出原型属性，不会中断循环
1. for of：不会遍历出原型属性，不会中断循环
1. map：返回新的数组，以回调函数的返回值作为每一项，没有就是undefined
1. every - 检测所有数组元素是否符合条件
1. some - 检测某些数组元素是否符合条件
1. filter - 筛选某些数组元素

### Math.max使用方法
必须将所有数组项解构成一个个参数
```js
const arr = [1, 2, 3, 4, 5]
Math.max.apply(null, arr)
// or
Math.max(...arr)
```

### 函数参数
```js
// 如果参数o是一个对象或者数组，那么在函数体里面的修改会导致函数外面o的修改，这里的o是对象的应用，共享同一个o对象
// o对象里面的对象作为参数传入同样会使得o对象发生改变
// 如果对这个参数对象进行重新赋值，那么会新创建一个o类型的值，这个值的改变不会影响外面的o
function foo(o) {
  o.a = 1 // o: { a: 1 }
  o = 1
  console.log(o) // 1
}
const o = {} // []
foo(o)
```

### Debounce
如何用js实现防抖
[参考资料](https://github.com/lishengzxc/bblog/issues/7)

```js
/**
 *
 * @param fn {Function}   实际要执行的函数
 * @param delay {Number}  延迟时间，单位是毫秒（ms）
 *
 * @return {Function}     返回一个“防反跳”了的函数
 */

function debounce(fn, delay) {

  // 定时器，用来 setTimeout
  var timer

  // 返回一个函数，这个函数会在一个时间区间结束后的 delay 毫秒时执行 fn 函数
  return function () {

    // 保存函数调用时的上下文和参数，传递给 fn
    var context = this
    var args = arguments

    // 每次这个返回的函数被调用，就清除定时器，以保证不执行 fn
    clearTimeout(timer)

    // 当返回的函数被最后一次调用后（也就是用户停止了某个连续的操作），
    // 再过 delay 毫秒就执行 fn
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay)
  }
}
```

### 不正确的数组下标问题
```js
// 这里的i会在外层作用域声明
for(var i = 0; i < 10; i++) {
  console.log(i) // 9
}
console.log(i) // 10
```
同：
```js
// 原因，触发点击事件的时候，i已经是循环之后的i了，导致重复的i值
var pAry = document.getElementsByTagName("p");   
for( var i = 0; i < pAry.length; i++ ) {   
    pAry[i].onclick = function() {   
        console.log(i);
    }
}
```

### 如何更好的mock前端数据
构建一套`mock-server`，供前端使用，只需要简单返回拼接的数据

### 变量声明
```js
var a = 1
function foo() {
  console.log(a) 
  console.log(a())
  var a = 2
  console.log(a)
  function bar() {

  }
  function a() {
    console.log('a1')
  }
  function a() {
    console.log('a2')
  }
}
foo()
```
函数里面的变量和自有函数也是会提升的
上面等价于：
```js
var a = 1 // 其实这一行并没有触发
function foo() {
  function bar() { // 函数优先提升

  }
  function a() {
    console.log('a1')
  }
  function a() {
    console.log('a2')
  }
  var a // 这里的a是undefined
  console.log(a) // Function a：如果a只是声明了，但是没有赋值，那么取最后声明的函数值
  console.log(a()) // a2
  a = 2
  console.log(a) // 2
}
```
### 正则表达式
[参考资料](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions)
- 注意自带方法的使用（一般使用`replace`替换字符）
- 注意标志的使用（如`/g`全局搜索）

### 手写ajax请求
`httpRequest.readyState`状态值：
0 (未初始化) or (请求还未初始化)
1 (正在加载) or (已建立服务器链接)
2 (加载成功) or (请求已接受)
3 (交互) or (正在处理请求)
4 (完成) or (请求已完成并且响应已准备好)
```js
// Old compatibility code, no longer needed.
if (window.XMLHttpRequest) { // Mozilla, Safari, IE7+ ...
    httpRequest = new XMLHttpRequest();
} else if (window.ActiveXObject) { // IE 6 and older
    httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
}
httpRequest.onreadystatechange = function(){
    // Process the server response here.
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        alert(httpRequest.responseText);
        // httpRequest.responseText – 服务器以文本字符的形式返回
        // httpRequest.responseXML – 以 XMLDocument 对象方式返回，之后就可以使用JavaScript来处理
      } else {
        alert('There was a problem with the request.');
      }
    }
}
// httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // only POST method
httpRequest.open('GET', 'http://www.example.org/some.file', true);
httpRequest.send(); // if POST, 参数："name=value&anothername="+encodeURIComponent(myVar)+"&so=on"

```

### `var a = a || b`这样写有什么问题
如果a是false类型的值，则会丢失该类型的值，取b值
