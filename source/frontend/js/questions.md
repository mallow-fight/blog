---
title: 问题
order: 7
type: js
---
## 箭头函数和普通函数的区别

> [简书](https://www.jianshu.com/p/eca50cc933b7)

### 不绑定this
- 在箭头函数出现之前，每个新定义的函数都有其自己的 this 值
```js
var myObject = {
  value:1,
  getValue:function(){
    console.log(this.value)
  },
  double:function(){
    return function(){
      console.log(this.value = this.value * 2); 
    }
  }
}

myObject.double()();  //希望value乘以2
myObject.getValue();  //1
```
  在ECMAscript5中将this赋给一个变量来解决：
  ```js
  var myObject = {
    value:1,
    getValue:function(){
      console.log(this.value)
    },
    double:function(){
      var that = this;
      return function(){
        console.log(that.value = that.value * 2); 
      }
    }
  }

  myObject.double()();  //2
  myObject.getValue();  //2
  ```
  除此之外，还可以使用 bind 函数，把期望的 this 值传递给 double() 函数。
  ```js
  var myObject = {
    value:1,
    getValue:function(){
      console.log(this.value)
    },
    double:function(){
      return function(){
        console.log(this.value = this.value * 2); 
      }.bind(this)
    }
  }

  myObject.double()();  //2
  myObject.getValue();  //2
  ```
  箭头函数会捕获其所在上下文的 this 值，作为自己的 this 值，因此下面的代码将如期运行。
  ```js
  var myObject = {
    value:1,
    getValue:function(){
      console.log(this.value)
    },
    double:function(){
      //回调里面的 `this` 变量就指向了期望的那个对象了
      return ()=>{
        console.log(this.value = this.value * 2); 
      }
    }
  }

  myObject.double()();  
  myObject.getValue();  
  ```

### 使用call()和apply()调用

由于 this 已经在词法层面完成了绑定，通过 call() 或 apply() 方法调用一个函数时，只是传入了参数而已，对 this 并没有什么影响：
```js
var myObject = {
  value:1,
  add:function(a){
    var f = (v) => v + this.value;
    return f(a);
  },
  addThruCall:function(a){
    var f = (v) => v + this.value;
    var b = {value:2};
    return f.call(b,a);
    
  }
}

console.log(myObject.add(1));    //2
console.log(myObject.addThruCall(1));    //2
```

### 箭头函数不绑定arguments,取而代之用rest参数解决
```js
var foo = (...args) => {
  return args[0]
}

console.log(foo(1))    //1
```

### 使用new操作符
箭头函数不能用作构造器，和 new 一起用就会抛出错误。
```js
var Foo = () => {};
var foo = new Foo();  //Foo is not a constructor
```

### 使用原型属性
箭头函数没有原型属性。
```js
var foo = () => {};
console.log(foo.prototype) //undefined
```

### 不能简单返回对象字面量
因为`{}`会和函数作用域冲突
```js
var func = () => {  foo: 1  };
// Calling func() returns undefined!
var func = () => {  foo: function() {}  };
// SyntaxError: function statement requires a name
//如果要返回对象字面量,用括号包裹字面量
var func = () => ({ foo: 1 });
```

### 箭头函数当方法使用的时候this隐式绑定了外面一层this
```js
var obj = {
  value:1,
  add:() => console.log(this.value),
  double:function(){
    console.log(this.value * 2)
  }
}

obj.add();  //undefined
obj.double(); //2
```

### 箭头函数不能换行
```js
var func = ()
           => 1; // SyntaxError: expected expression, got '=>'
```

## 为什么数组访问速度比对象快
估计是对象的键值比较复杂，没有规律，但是数据的键值简单且有规律。

## web workers
> [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Using_web_workers)

**Web Worker为Web内容在后台线程中运行脚本提供了一种简单的方法。线程可以执行任务而不干扰用户界面。此外，他们可以使用XMLHttpRequest执行 I/O  (尽管responseXML和channel属性总是为空)。一旦创建， 一个worker 可以将消息发送到创建它的JavaScript代码, 通过将消息发布到该代码指定的事件处理程序（反之亦然）。**

## js的基本数据类型
- Undefined
- Null
- Boolean
- Number
- String
- Symbol

## js的内置对象
- Object 是 JavaScript 中所有对象的父对象
- 数据封装类对象：Object、Array、Boolean、Number、String
- 其他对象：Function、Arguments、Math、Date、RegExp、Error

## js基本规范
- 不要在同一行声明多个变量。
- 请使用 ===/!==来比较true/false或者数值
- 使用对象字面量替代new Array这种形式
- 不要使用全局函数。
- Switch语句必须带有default分支
- 函数不应该有时候有返回值，有时候没有返回值。
- For循环必须使用大括号
- If语句必须使用大括号
- for-in循环中的变量 应该使用var关键字明确限定作用域，从而避免作用域污染。

## 什么是instanceof
todo

## js原型，原型链，特点
- 每个对象都会在其内部初始化一个属性，就是prototype(原型)，当我们访问一个对象的属性时，
- 如果这个对象内部不存在这个属性，那么他就会去prototype里找这个属性，这个prototype又会有自己的prototype，
- 于是就这样一直找下去，也就是我们平时所说的原型链的概念。关系：instance.constructor.prototype = instance.__proto__
- 特点：
  - JavaScript对象是通过引用来传递的，我们创建的每个新对象实体中并没有一份属于自己的原型副本。当我们修改原型时，与之相关的对象也会继承这一改变。
  - 当我们需要一个属性的时，Javascript引擎会先看当前对象中是否有这个属性， 如果没有的话，就会查找他的Prototype对象是否有这个属性，如此递推下去，一直检索到 Object 内建对象。
  ```js
 	function Func(){}
 	Func.prototype.name = "Sean";
 	Func.prototype.getInfo = function() {
 	  return this.name;
 	}
 	var person = new Func();//现在可以参考var person = Object.create(oldObject);
 	console.log(person.getInfo());//它拥有了Func的属性和方法
 	//"Sean"
 	console.log(Func.prototype);
 	// Func { name="Sean", getInfo=function()}
   ```

## js有几种类型的值，内存图。

- 栈：原始数据类型（Undefined、Null、Boolean、Number、String）
- 堆：引用数据类型（对象、数组、函数）

- 区别：存储位置不同
  - 原始数据类型直接存储在栈(stack)中的简单数据段，占据空间小、大小固定，属于被频繁使用数据，所以放入栈中存储；
  - 引用数据类型存储在堆(heap)中的对象,占据空间大、大小不固定。如果存储在栈中，将会影响程序运行的性能；引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址。当解释器寻找引用值时，会首先检索其在栈中的地址，取得地址后从堆中获得实体

## 如何将字符串转化为数字
- parseFloat：保留小数位
- 正则表达式：'12.3b'.match(/(\d)+(\.)?(\d)+/g)[0] * 1
- 使用split将字符串转化为数组，再对数组进行过滤

## 如何将浮点数点左边的数每三位添加一个逗号，如12000000.11转化为『12,000,000.11』?
```js
function commafy(num){
  return num && num
    .toString()
    .replace(/(\d)(?=(\d{3})+\.)/g, function($1, $2){
      return $2 + ',';
    });
}
```

## 如何实现数组的随机排序？
### 方法一：
```js
var arr = [1,2,3,4,5,6,7,8,9,10];
function randSort1(arr){
  for(var i = 0,len = arr.length;i < len; i++ ){
    var rand = parseInt(Math.random()*len);
    var temp = arr[rand];
    arr[rand] = arr[i];
    arr[i] = temp;
  }
  return arr;
}
console.log(randSort1(arr));
```

### 方法二：
```js
var arr = [1,2,3,4,5,6,7,8,9,10];
function randSort2(arr){
  var mixedArray = [];
  while(arr.length > 0){
    var randomIndex = parseInt(Math.random()*arr.length);
    mixedArray.push(arr[randomIndex]);
    arr.splice(randomIndex, 1);
  }
  return mixedArray;
}
console.log(randSort2(arr));
```

### 方法三：
```js
var arr = [1,2,3,4,5,6,7,8,9,10];
arr.sort(function(){
  return Math.random() - 0.5;
})
console.log(arr);
```

## js如何实现继承
- 构造继承
- 原型继承
- 实例继承
- 拷贝继承

```js
function Parent(){
  this.name = 'wang';
}

function Child(){
  this.age = 28;
}
Child.prototype = new Parent();//继承了Parent，通过原型

var demo = new Child();
alert(demo.age);
alert(demo.name);//得到被继承的属性
```

## 继承的实现
todo

## js创建对象的几种方式
**javascript创建对象简单的说,无非就是使用内置对象或各种自定义对象，当然还可以用JSON；但写法有很多种，也能混合使用。**
1. 对象字面量的方式
```js
var person = {
  firstname:"Mark",
  lastname:"Yun",
  age:25,
  eyecolor:"black"
};
```
1. 用function来模拟无参的构造函数
```js
function Person(){}
var person = new Person();//定义一个function，如果使用new"实例化",该function可以看作是一个Class
person.name = "Mark";
person.age = "25";
person.work = function(){
  alert(person.name+" hello...");
}
person.work();
```

1. 用function来模拟参构造函数来实现（用this关键字定义构造的上下文属性）
```js
function Pet(name,age,hobby){
  this.name=name;//this作用域：当前对象
  this.age=age;
  this.hobby=hobby;
  this.eat = function(){
    alert("我叫"+this.name+",我喜欢"+this.hobby+",是个程序员");
  }
}
var maidou =new Pet("麦兜",25,"coding");//实例化、创建对象
maidou.eat();//调用eat方法
```
1. 用工厂方式来创建（内置对象）
```js
var wcDog =new Object();
wcDog.name="旺财";
wcDog.age=3;
wcDog.work=function(){
  alert("我是"+wcDog.name+",汪汪汪......");
}
wcDog.work();
```

1. 用原型方式来创建
```js
function Dog(){

}
Dog.prototype.name="旺财";
Dog.prototype.eat=function(){
alert(this.name+"是个吃货");
}
var wangcai =new Dog();
wangcai.eat();
```

1. 用混合方式来创建
```js
function Car(name,price){
  this.name=name;
  this.price=price;
}
Car.prototype.sell=function(){
  alert("我是"+this.name+"，我现在卖"+this.price+"万元");
}
var camry =new Car("凯美瑞",27);
camry.sell();
```

## 作用域链域
**全局函数无法查看局部函数的内部细节，但局部函数可以查看其上层的函数细节，直至全局细节。当需要从局部函数查找某一属性或方法时，如果当前作用域没有找到，就会上溯到上层作用域查找，直至全局函数，这种组织形式即使作用域链。**

## this 对像
**this总是指向函数的直接调用者（而非间接调用者）；如果有new关键字，this指向new出来的那个对象；在事件中，this指向触发这个事件的对象，特殊的是，IE中的attachEvent中的this总是指向全局对象Window；**

## eval
**它的功能是把对应的字符串解析成JS代码并运行；应该避免使用eval，不安全，非常耗性能（2次，一次解析成js语句，一次执行）。由JSON字符串转换为JSON对象的时候可以用eval，var obj =eval('('+ str +')');**

## 什么是window对象？什么是document对象？
- window：浏览器打开的窗口
- document：Documentd对象（HTML文档对象）的一个只读引用，window对象的一个属性

## null，undefined 的区别？
- null：表示一个对象是“没有值”的值，也就是值为“空”；
- undefined：表示一个变量声明了没有初始化(赋值)；
- undefined不是一个有效的JSON，而null是；
- undefined的类型(typeof)是undefined；
- null的类型(typeof)是object；
- Javascript将未赋值的变量默认值设为undefined；
- Javascript从来不会将变量设为null。它是用来让程序员表明某个用var声明的变量时没有值的。
- typeof undefined //"undefined"
 	undefined :是一个表示"无"的原始值或者说表示"缺少值"，就是此处应该有一个值，但是还没有定义。当尝试读取时会返回 undefined；
 	例如变量被声明了，但没有赋值时，就等于undefined
  typeof null
    //"object"
    null : 是一个对象(空对象, 没有任何属性和方法)；
    例如作为函数的参数，表示该函数的参数不是对象；
  注意：
    在验证null时，一定要使用　=== ，因为 == 无法分别 null 和　undefined
    null == undefined // true
    null === undefined // false
  再来一个例子：
    null
    Q：有张三这个人么？
    A：有！
    Q：张三有房子么？
    A：没有！
    undefined
    Q：有张三这个人么？
    A：有！
    Q: 张三有多少岁？
    A: 不知道（没有被告诉）

## 通用的事件侦听器
```js
markyun.Event = {
  // 页面加载完成后
  readyEvent : function(fn) {
    if (fn==null) {
      fn=document;
    }
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
      window.onload = fn;
    } else {
      window.onload = function() {
        oldonload();
        fn();
      };
    }
  },
  // 视能力分别使用dom0||dom2||IE方式 来绑定事件
  // 参数： 操作的元素,事件名称 ,事件处理程序
  addEvent : function(element, type, handler) {
    if (element.addEventListener) {
      //事件类型、需要执行的函数、是否捕捉
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent('on' + type, function() {
        handler.call(element);
      });
    } else {
      element['on' + type] = handler;
    }
  },
  // 移除事件
  removeEvent : function(element, type, handler) {
    if (element.removeEventListener) {
      element.removeEventListener(type, handler, false);
    } else if (element.datachEvent) {
      element.detachEvent('on' + type, handler);
    } else {
      element['on' + type] = null;
    }
  },
  // 阻止事件 (主要是事件冒泡，因为IE不支持事件捕获)
  stopPropagation : function(ev) {
    if (ev.stopPropagation) {
      ev.stopPropagation();
    } else {
      ev.cancelBubble = true;
    }
  },
  // 取消事件的默认行为
  preventDefault : function(event) {
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
  },
  // 获取事件目标
  getTarget : function(event) {
    return event.target || event.srcElement;
  },
  // 获取event对象的引用，取到事件的所有信息，确保随时能使用event；
  getEvent : function(e) {
    var ev = e || window.event;
    if (!ev) {
      var c = this.getEvent.caller;
      while (c) {
        ev = c.arguments[0];
        if (ev && Event == ev.constructor) {
          break;
        }
        c = c.caller;
      }
    }
    return ev;
  }
};
```

## ["1", "2", "3"].map(parseInt) 答案是多少？
- parseInt() 函数能解析一个字符串，并返回一个整数，需要两个参数 (val, radix)，其中 radix 表示要解析的数字的基数。【该值介于 2 ~ 36 之间，并且字符串中的数字不能大于radix才能正确返回数字结果值】;
- 但此处 map 传了 3 个 (element, index, array),我们重写parseInt函数测试一下是否符合上面的规则。
```js
function parseInt(str, radix) {
    return str+'-'+radix;
};
var a=["1", "2", "3"];
a.map(parseInt);  // ["1-0", "2-1", "3-2"] 不能大于radix
```
- 因为二进制里面，没有数字3,导致出现超范围的radix赋值和不合法的进制解析，才会返回NaN，所以["1", "2", "3"].map(parseInt) 答案也就是：[1, NaN, NaN]

## IE与火狐的事件机制有什么区别？ 如何阻止冒泡？
1. 我们在网页中的某个操作（有的操作对应多个事件）。例如：当我们点击一个按钮就会产生一个事件。是可以被 JavaScript 侦测到的行为。
1. 事件处理机制：IE是事件冒泡、Firefox同时支持两种事件模型，也就是：捕获型事件和冒泡型事件；
1. ev.stopPropagation();（旧ie的方法 ev.cancelBubble = true;）

## javascript 代码中的"use strict";是什么意思 ? 使用它区别是什么？
- use strict是一种ECMAscript 5 添加的（严格）运行模式,这种模式使得 Javascript 在更严格的条件下运行,使JS编码更加规范化的模式,消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为。
- 默认支持的糟糕特性都会被禁用，比如不能用with，也不能在意外的情况下给全局变量赋值;全局变量的显示声明,函数必须声明在顶层，不允许在非函数代码块内声明函数,arguments.callee也不允许使用；消除代码运行的一些不安全之处，保证代码运行的安全,限制函数中的arguments修改，严格模式下的eval函数的行为和非严格模式的也不相同;
- 提高编译器效率，增加运行速度；
- 为未来新版本的Javascript标准化做铺垫。

## 如何判断一个对象是否属于某个类？
使用instanceof （待完善）
if(a instanceof Person){
    alert('yes');
}

## new操作符具体干了什么呢?
1、创建一个空对象，并且 this 变量引用该对象，同时还继承了该函数的原型。
2、属性和方法被加入到 this 引用的对象中。
3、新创建的对象由 this 所引用，并且最后隐式的返回 this 。

## 用原生JavaScript的实现过什么功能吗？
todo

## Javascript中，有一个函数，执行时对象查找时，永远不会去查找原型，这个函数是？
hasOwnProperty

- javaScript中hasOwnProperty函数方法是返回一个布尔值，指出一个对象是否具有指定名称的属性。此方法无法检查该对象的原型链中是否具有该属性；该属性必须是对象本身的一个成员。
- 使用方法：
 object.hasOwnProperty(proName)
 其中参数object是必选项。一个对象的实例。
 proName是必选项。一个属性名称的字符串值。
 如果 object 具有指定名称的属性，那么JavaScript中hasOwnProperty函数方法返回 true，反之则返回 false。

## JSON 的了解？
- JSON(JavaScript Object Notation) 是一种轻量级的数据交换格式。
- 它是基于JavaScript的一个子集。数据格式简单, 易于读写, 占用带宽小
如：{"age":"12", "name":"back"}

JSON字符串转换为JSON对象:
var obj =eval('('+ str +')');
var obj = str.parseJSON();
var obj = JSON.parse(str);

JSON对象转换为JSON字符串：
var last=obj.toJSONString();
var last=JSON.stringify(obj);
[].forEach.call($$("*"),function(a){a.style.outline="1px solid #"+(~~(Math.random()*(1<<24))).toString(16)}) 能解释一下这段代码的意思吗？

## js延迟加载的方式有哪些？

defer和async、动态创建DOM方式（用得最多）、按需异步载入js
Ajax 是什么? 如何创建一个Ajax？
ajax的全称：Asynchronous Javascript And XML。
异步传输+js+xml。
所谓异步，在这里简单地解释就是：向服务器发送请求的时候，我们不必等待结果，而是可以同时做其他的事情，等到有了结果它自己会根据设定进行后续操作，与此同时，页面是不会发生整页刷新的，提高了用户体验。
 (1)创建XMLHttpRequest对象,也就是创建一个异步调用对象
 (2)创建一个新的HTTP请求,并指定该HTTP请求的方法、URL及验证信息
 (3)设置响应HTTP请求状态变化的函数
 (4)发送HTTP请求
 (5)获取异步调用返回的数据
 (6)使用JavaScript和DOM实现局部刷新

## Ajax 解决浏览器缓存问题？
1、在ajax发送请求前加上 anyAjaxObj.setRequestHeader("If-Modified-Since","0")。

2、在ajax发送请求前加上 anyAjaxObj.setRequestHeader("Cache-Control","no-cache")。

3、在URL后面加上一个随机数： "fresh=" + Math.random();。

4、在URL后面加上时间戳："nowtime=" + new Date().getTime();。

5、如果是使用jQuery，直接这样就可以了 $.ajaxSetup({cache:false})。这样页面的所有ajax都会执行这条语句就是不需要保存缓存记录。

## 同步和异步的区别?

同步的概念应该是来自于OS中关于同步的概念:不同进程为协同完成某项工作而在先后次序上调整(通过阻塞,唤醒等方式).同步强调的是顺序性.谁先谁后.异步则不存在这种顺序性.

同步：浏览器访问服务器请求，用户看得到页面刷新，重新发请求,等请求完，页面刷新，新内容出现，用户看到新内容,进行下一步操作。

异步：浏览器访问服务器请求，用户正常操作，浏览器后端进行请求。等请求完，页面不刷新，新内容也会出现，用户看到新内容。

## AMD（Modules/Asynchronous-Definition）、CMD（Common Module Definition）规范区别？

AMD 规范在这里：https://github.com/amdjs/amdjs-api/wiki/AMD

CMD 规范在这里：https://github.com/seajs/seajs/issues/242

Asynchronous Module Definition，异步模块定义，所有的模块将被异步加载，模块加载不影响后面语句运行。所有依赖某些模块的语句均放置在回调函数中。

区别：

1. 对于依赖的模块，AMD 是提前执行，CMD 是延迟执行。不过 RequireJS 从 2.0 开始，也改成可以延迟执行（根据写法不同，处理方式不同）。CMD 推崇 as lazy as possible.
2. CMD 推崇依赖就近，AMD 推崇依赖前置。看代码：

// CMD
define(function(require, exports, module) {
  var a = require('./a')
  a.doSomething()
  // 此处略去 100 行
  var b = require('./b') // 依赖可以就近书写
  b.doSomething()
  // ...
})

// AMD 默认推荐
define(['./a', './b'], function(a, b) { // 依赖必须一开始就写好
  a.doSomething()
  // 此处略去 100 行
  b.doSomething()
  // ...
})

## requireJS的核心原理是什么？（如何动态加载的？如何避免多次加载的？如何 缓存的？）

参考：http://annn.me/how-to-realize-cmd-loader/
JS模块加载器的轮子怎么造，也就是如何实现一个模块加载器？

## 谈一谈你对ECMAScript6的了解？
todo

## ECMAScript6 怎么写class么，为什么会出现class这种东西?
todo

## 异步加载JS的方式有哪些？
(1) defer，只支持IE
(2) async
(3) 创建script，插入到DOM中，加载完毕后callBack

## documen.write和 innerHTML的区别
document.write只能重绘整个页面
innerHTML可以重绘页面的一部分
DOM操作——怎样添加、移除、移动、复制、创建和查找节点?
（1）创建新节点
createDocumentFragment()    //创建一个DOM片段
createElement()   //创建一个具体的元素
createTextNode()   //创建一个文本节点
（2）添加、移除、替换、插入
appendChild()
removeChild()
replaceChild()
insertBefore() //在已有的子节点前插入一个新的子节点
（3）查找
getElementsByTagName()    //通过标签名称
getElementsByName()    //通过元素的Name属性的值(IE容错能力较强，会得到一个数组，其中包括id等于name值的)
getElementById()    //通过元素Id，唯一性
.call() 和 .apply() 的区别？

例子中用 add 来替换 sub，add.call(sub,3,1) == add(3,1) ，所以运行结果为：alert(4);

注意：js 中的函数其实是对象，函数名是对 Function 对象的引用。

function add(a,b)
{
  alert(a+b);
}

function sub(a,b)
{
  alert(a-b);
}

add.call(sub,3,1);

## 数组和对象有哪些原生方法，列举一下？
todo

## JS 怎么实现一个类。怎么实例化这个类
todo

## JavaScript中的作用域与变量声明提升？
todo

## 如何编写高性能的Javascript？
todo

## 那些操作会造成内存泄漏？
todo

## 把 Script 标签 放在页面的最底部的body封闭之前 和封闭之后有什么区别？浏览器会如何解析它们？
todo

## 移动端的点击事件的有延迟，时间是多久，为什么会有？ 怎么解决这个延时？（click 有 300ms 延迟,为了实现safari的双击事件的设计，浏览器要知道你是不是要双击操作。）
todo

## 知道各种JS框架(Angular, Backbone, Ember, React, Meteor, Knockout...)么? 能讲出他们各自的优点和缺点么?
todo

## 那些操作会造成内存泄漏？
内存泄漏指任何对象在您不再拥有或需要它之后仍然存在。
垃圾回收器定期扫描对象，并计算引用了每个对象的其他对象的数量。如果一个对象的引用数量为 0（没有其他对象引用过该对象），或对该对象的惟一引用是循环的，那么该对象的内存即可回收。

setTimeout 的第一个参数使用字符串而非函数的话，会引发内存泄漏。
闭包、控制台日志、循环（在两个对象彼此引用且彼此保留时，就会产生一个循环）

## Node.js的适用场景？
todo

## (如果会用node)知道route, middleware, cluster, nodemon, pm2, server-side rendering么?
todo

## 什么是“前端路由”?什么时候适合使用“前端路由”? “前端路由”有哪些优点和缺点?
todo

## 知道什么是webkit么? 知道怎么用浏览器的各种工具来调试和debug代码么?
todo

## Chrome,Safari浏览器内核。如何测试前端代码么? 知道BDD, TDD, Unit Test么? 知道怎么测试你的前端工程么(mocha, sinon, jasmin, qUnit..)?
todo

## 前端templating(Mustache, underscore, handlebars)是干嘛的, 怎么用?
todo

## 检测浏览器版本版本有哪些方式？
功能检测、userAgent特征检测
比如：navigator.userAgent
//"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/537.36
(KHTML, like Gecko) Chrome/41.0.2272.101 Safari/537.36"

## 什么是 Polyfill?
  polyfill 是“在旧版浏览器上复制标准 API 的 JavaScript 补充”,可以动态地加载 JavaScript 代码或库，在不支持这些标准 API 的浏览器中模拟它们。
  例如，geolocation（地理位置）polyfill 可以在 navigator 对象上添加全局的 geolocation 对象，还能添加 getCurrentPosition 函数以及“坐标”回调对象，
  所有这些都是 W3C 地理位置 API 定义的对象和函数。因为 polyfill 模拟标准 API，所以能够以一种面向所有浏览器未来的方式针对这些 API 进行开发，
  一旦对这些 API 的支持变成绝对大多数，则可以方便地去掉 polyfill，无需做任何额外工作。
做的项目中，有没有用过或自己实现一些 polyfill 方案（兼容性处理方案）？

  比如： html5shiv、Geolocation、Placeholder
我们给一个dom同时绑定两个点击事件，一个用捕获，一个用冒泡。会执行几次事件，会先执行冒泡还是捕获？

## 使用JS实现获取文件扩展名？
  function getFileExtension(filename) {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
  }

  String.lastIndexOf() 方法返回指定值（本例中的'.'）在调用该方法的字符串中最后出现的位置，如果没找到则返回 -1。
  对于'filename'和'.hiddenfile'，lastIndexOf的返回值分别为0和-1无符号右移操作符(»>) 将-1转换为4294967295，将-2转换为4294967294，这个方法可以保证边缘情况时文件名不变。
  String.prototype.slice() 从上面计算的索引处提取文件的扩展名。如果索引比文件名的长度大，结果为""。

## Webpack热更新实现原理?

  1. Webpack编译期，为需要热更新的 entry 注入热更新代码(EventSource通信)
  2. 页面首次打开后，服务端与客户端通过 EventSource 建立通信渠道，把下一次的 hash 返回前端
  3. 客户端获取到hash，这个hash将作为下一次请求服务端 hot-update.js 和 hot-update.json的hash
  4. 修改页面代码后，Webpack 监听到文件修改后，开始编译，编译完成后，发送 build 消息给客户端
  5. 客户端获取到hash，成功后客户端构造hot-update.js script链接，然后插入主文档
  6. hot-update.js 插入成功后，执行hotAPI 的 createRecord 和 reload方法，获取到 Vue 组件的 render方法，重新 render 组件， 继而实现 UI 无刷新更新。

## 请介绍一下JS之事件节流？
todo

## 什么是JS的函数防抖？
todo

## Object.is() 与原来的比较操作符“ ===”、“ ==”的区别？
  两等号判等，会在比较时进行类型转换；
  三等号判等(判断严格)，比较时不进行隐式类型转换,（类型不同则会返回false）；

  Object.is 在三等号判等的基础上特别处理了 NaN 、-0 和 +0 ，保证 -0 和 +0 不再相同，
  但 Object.is(NaN, NaN) 会返回 true.

  Object.is 应被认为有其特殊的用途，而不能用它认为它比其它的相等对比更宽松或严格。

## ES6是如何实现编译成ES5的？
todo

## css-loader的原理？
todo

## 当组件的setState函数被调用之后，发生了什么？

React会做的第一件事就是把你传递给setState的参数对象合并到组件原先的state。这个事件会导致一个“reconciliation”（调和）的过程。reconciliation的最终目标就是，
尽可能以最高效的方法，去基于新的state来更新UI。为了达到这个目的，React会构建一个React元素树（你可以把这个想象成一个表示UI的一个对象）。一旦这个树构建完毕，
React为了根据新的state去决定UI要怎么进行改变，它会找出这棵新树和旧树的不同之处。React能够相对精确地找出哪些位置发生了改变以及如何发生了什么变化，
并且知道如何只通过必要的更新来最小化重渲染。
为什么循环产生的组件中要利用上key这个特殊的prop？

Keys负责帮助React跟踪列表中哪些元素被改变/添加/移除。React利用子元素的key在比较两棵树的时候，快速得知一个元素是新的还是刚刚被移除。没有keys，React也就不知道当前哪一个的item被移除了。

## React-router 路由的实现原理？
todo

## 说说React Native,Weex框架的实现原理？
todo

## 受控组件(Controlled Component)与非受控组件(Uncontrolled Component)的区别
todo

## refs 是什么?
Refs是能访问DOM元素或组件实例的一个函数；

## React为什么自己定义一套事件体系呢，与浏览器原生事件体系有什么关系？
todo

## 什么时候应该选择用class实现一个组件，什么时候用一个函数实现一个组件？
组件用到了state或者用了生命周期函数，那么就该使用Class component。其他情况下，应使用Functional component。

## 什么是HoC（Higher-Order Component）？适用于什么场景？
高阶组件就是一个 React 组件包裹着另外一个 React 组件

## 并不是父子关系的组件，如何实现相互的数据通信？
使用父组件，通过props将变量传入子组件（如通过refs，父组件获取一个子组件的方法，简单包装后，将包装后的方法通过props传入另一个子组件）

## Redux是如何做到可预测呢？
todo

## Redux将React组件划分为哪两种？
todo

## Redux是如何将state注入到React组件上的？
todo

## 请描述一次完整的 Redux 数据流
todo

## React的批量更新机制 BatchUpdates？
todo

## React与Vue，各自的组件更新进行对比，它们有哪些区别？
todo