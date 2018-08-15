---
title: 上下文和对象原型
type: js
order: 4
---

## 定义
**`this`实际上是在函数被调用时建立的一个绑定，它指向什么完全由函数被调用的调用点来决定的**

## 调用点
调用栈和调用点的展示：
```js
function baz() {
    // 调用栈是: `baz`
    // 我们的调用点是 global scope（全局作用域）

    console.log( "baz" );
    bar(); // <-- `bar` 的调用点
}

function bar() {
    // 调用栈是: `baz` -> `bar`
    // 我们的调用点位于 `baz`

    console.log( "bar" );
    foo(); // <-- `foo` 的 call-site
}

function foo() {
    // 调用栈是: `baz` -> `bar` -> `foo`
    // 我们的调用点位于 `bar`

    console.log( "foo" );
}

baz(); // <-- `baz` 的调用点
```

## 四大规则

- 默认绑定（没有其它规则适用时的默认规则）
  - 独立函数调用，一般this指向了全局对象

  - strict mode下指向全局对象不合法，所以this将被设置为undefined
  
- 隐含绑定，例
```js
function foo() {
    console.log( this.a );
}

var obj = {
    a: 2,
    foo: foo
};

obj.foo(); // 2
```
  - 只有对象属性引用链的最后一层是影响调用点的，例：
  ```js
  function foo() {
    console.log( this.a );
  }

  var obj2 = {
      a: 42,
      foo: foo
  };

  var obj1 = {
      a: 2,
      obj2: obj2
  };

  obj1.obj2.foo(); // 42
  ```
  - 隐含丢失（一个隐含绑定丢失了它的绑定，通常意味着它会回退到默认绑定，例：
  ```js
  function foo() {
    console.log( this.a );
  }

  var obj = {
      a: 2,
      foo: foo
  };

  var bar = obj.foo; // 函数引用！

  var a = "oops, global"; // `a` 也是一个全局对象的属性

  bar(); // "oops, global"
  ```
    - 尽管 bar 似乎是 obj.foo 的引用，但实际上它只是另一个 foo 本身的引用而已。另外，起作用的调用点是 bar()，一个直白，毫无修饰的调用，因此 默认绑定 适用于这里。
    - 参数传递也是一种隐含赋值，例：`doFoo( obj.foo ) // oops, global`

- 明确绑定
  - call
  - apply（参数以数组形式传入）

- 硬绑定，例：
```js
function foo() {
    console.log( this.a );
}

var obj = {
    a: 2
};
// 其实就是桥接一层，使得函数必须明确绑定某个上下文
var bar = function() {
    foo.call( obj );
};

bar(); // 2
setTimeout( bar, 100 ); // 2

// `bar` 将 `foo` 的 `this` 硬绑定到 `obj`
// 所以它不可以被覆盖
bar.call( window ); // 2
```
  - es5内建工具
    - Funtion.prototype.bind，例：
    ```js
    function foo(something) {
      console.log( this.a, something );
      return this.a + something;
    }

    var obj = {
        a: 2
    };

    var bar = foo.bind( obj );

    var b = bar( 3 ); // 2 3
    console.log( b ); // 5
    ```
  - api调用的环境
    - 很多库中的上下文都是通过明确绑定来实现的

- new绑定

    当在函数前面被加入new调用时，也就是构造器调用时，下面这些事情会自动完成：
  - 一个全新的对象会凭空创建

  - 这个新构建的对象会被接入原型链

  - 这个新构建的对象被设置为函数调用的this绑定

  - 除非函数返回一个它自己的其他对象，否则这个被new调用的函数将自动返回这个新构建的对象

  - 如果函数返回一个其它对象，则新创建的对象就是构造函数返回的那个对象，这种情况如果不使用new关键字，就不会接入原型链

  - 新建对象的constructor属性就是构造函数

> 基本类型会存储在栈中，引用类型会存储在堆中

> [js new 过程](https://alexzhong22c.github.io/2017/08/12/js-new-happen/)

## 规则的顺序&判定this
1. 函数是通过new被调用的吗？如果是，this就是新构建的对象：`var bar = new foo()`

1. 函数是通过call或apply被调用的吗，甚至是隐藏在bind硬绑定之中吗？如果是，this就是那个被明确指定的对象： `var bar = foo.call( obj )`

1. 函数是通过环境对象（拥有者或容器对象）被调用的吗？如果是，this就是那个环境对象：`var bar = obj.foo()`

1. 否则，使用默认的this。如果在严格模式下，就是undefined，否则是global对象：`var bar = foo()`

## 箭头函数
```js
function foo() {
  // 返回一个箭头函数
    return (a) => {
    // 这里的 `this` 是词法上从 `foo()` 采用的
        console.log( this.a );
    };
}

var obj1 = {
    a: 2
};

var obj2 = {
    a: 3
};

var bar = foo.call( obj1 );
bar.call( obj2 ); // 2, 不是3!
```
在 foo() 中创建的箭头函数在词法上捕获 foo() 被调用时的 this，不管它是什么。因为 foo() 被 this 绑定到 obj1，bar（被返回的箭头函数的一个引用）也将会被 this 绑定到 obj1。一个箭头函数的词法绑定是不能被覆盖的（就连 new 也不行！）。
ES6 的箭头方法使用词法作用域来决定 this 绑定，这意味着它们采用封闭他们的函数调用作为 this 绑定（无论它是什么）。它们实质上是 ES6 之前的 self = this 代码的语法替代品。
同：
```js
function foo() {
    var self = this; // 词法上捕获 `this`
    setTimeout( function(){
        console.log( self.a );
    }, 100 );
}

var obj = {
    a: 2
};

foo.call( obj ); // 2
```

### 风格

- 仅使用词法作用域并忘掉虚伪的 this 风格代码。

- 完全接受 this 风格机制，包括在必要的时候使用 bind(..)，并尝试避开 self = this 和箭头函数的“词法 this”技巧。
    - 通常一个程序可以接受两种风格（词法和this），但是一个函数内部应该只有一种风格

> [箭头函数和普通函数的区别](questions.html#箭头函数和普通函数的区别)

## 内建对象
- String
- Number
- Boolean
- Object
- Function
- Array
- Date
- RegExp
- Error

在js中，它们实际上仅仅是内建函数，每一个都可以作为构造器
仅仅在你需要使用额外的选项时使用构建形式，否则使用字面形式

### 属性名
```js
var wantA = true;
var myObject = {
    a: 2
};

var idx;

if (wantA) {
    idx = "a";
}

// 稍后

console.log( myObject[idx] ); // 2

var myObject = { };

myObject[true] = "foo";
myObject[3] = "bar";
myObject[myObject] = "baz";

myObject["true"];                // "foo"
myObject["3"];                    // "bar"
myObject["[object Object]"];    // "baz"

// es6新增 - 计算型属性名
var prefix = "foo";

var myObject = {
    [prefix + "bar"]: "hello",
    [prefix + "baz"]: "world"
};

myObject["foobar"]; // hello
myObject["foobaz"]; // world
```

### 复制对象

- 浅拷贝
  - JSON 安全的对象（也就是，可以被序列化为一个 JSON 字符串，之后还可以被重新解析为拥有相同的结构和值的对象）可以简单地这样 复制：`var newObj = JSON.parse( JSON.stringify( someObj ) );`

  - `var newObject = Object.assign({}, oldObject)`

## 属性描述符（es5新增）

- 可写性（Writable）：writable 控制着你改变属性值的能力。

- 可配置性（Configurable）：只要属性当前是可配置的，我们就可以使用相同的 defineProperty(..) 工具，修改它的描述符定义。

- 可枚举性（Enumerable）：控制着一个属性是否能在特定的对象-属性枚举操作中出现

- 不可变性（Immutability）：有时我们希望将属性或对象（有意或无意地）设置为不可改变的。所有 这些方法创建的都是浅不可变性。也就是，它们仅影响对象和它的直属属性的性质。如果对象拥有对其他对象（数组、对象、函数等）的引用，那个对象的 内容 不会受影响，任然保持可变。

### 对象常量

```js
var myObject = {};

Object.defineProperty( myObject, "FAVORITE_NUMBER", {
    value: 42,
    writable: false,
    configurable: false
} );
```

### 防止扩展
```js
var myObject = {
    a: 2
};

Object.preventExtensions( myObject );

myObject.b = 3;
myObject.b; // undefined
```

### 封印
Object.seal(..) 创建一个“封印”的对象，这意味着它实质上在当前的对象上调用 Object.preventExtensions(..)，同时也将它所有的既存属性标记为 configurable:false。

所以，你既不能添加更多的属性，也不能重新配置或删除既存属性（虽然你依然 可以 修改它们的值）。

### 冻结
Object.freeze(..) 创建一个冻结的对象，这意味着它实质上在当前的对象上调用 Object.seal(..)，同时也将它所有的“数据访问”属性设置为 writable:false，所以它们的值不可改变。

### Getters&Setters
当你将一个属性定义为拥有 getter 或 setter 或两者兼备，那么它的定义就成为了“访问器描述符”（与“数据描述符”相对）。对于访问器描述符，它的 value 和 writable 性质因没有意义而被忽略，取而代之的是 JS 将会考虑属性的 set 和 get 性质（还有 configurable 和 enumerable）。

## 类

类是一种设计模式。许多语言提供语法来启用自然而然的面向类的软件设计。JS 也有相似的语法，但是它的行为和你在其他语言中熟悉的工作原理 有很大的不同。

**类意味着拷贝。**

当一个传统的类被实例化时，就发生了类的行为向实例中拷贝。当类被继承时，也发生父类的行为向子类的拷贝。

多态（在继承链的不同层级上拥有同名的不同函数）也许看起来意味着一个从子类回到父类的相对引用链接，但是它仍然只是拷贝行为的结果。

JavaScript 不会自动地 （像类那样）在对象间创建拷贝。

mixin 模式常用于在 某种程度上 模拟类的拷贝行为，但是这通常导致像显式假想多态那样（OtherObj.methodName.call(this, ...)）难看而且脆弱的语法，这样的语法又常导致更难懂和更难维护的代码。

明确的 mixin 和类 拷贝 又不完全相同，因为对象（和函数！）仅仅是共享的引用被复制，不是对象/函数自身被复制。不注意这样的微小之处通常是各种陷阱的根源。

一般来讲，在 JS 中模拟类通常会比解决当前 真正 的问题埋下更多的坑。

## 原型

由于各种原因，不光是前面提到的术语，“继承”（和“原型继承”）与所有其他的 OO 用语，在考虑 JavaScript 实际如何工作时都没有道理。

相反，“委托”是一个更确切的术语，因为这些关系不是 拷贝 而是委托 链接。

## 行为委托

在你的软件体系结构中，类和继承是你可以 选用 或 不选用 的设计模式。多数开发者理所当然地认为类是组织代码的唯一（正确的）方法，但我们在这里看到了另一种不太常被提到的，但实际上十分强大的设计模式：行为委托。

行为委托意味着对象彼此是对等的，在它们自己当中相互委托，而不是父类与子类的关系。JavaScript 的 [[Prototype]] 机制的设计本质，就是行为委托机制。这意味着我们可以选择挣扎着在 JS 上实现类机制，也可以欣然接受 [[Prototype]] 作为委托机制的本性。

当你仅用对象设计代码时，它不仅能简化你使用的语法，而且它还能实际上引领更简单的代码结构设计。

OLOO（链接到其他对象的对像）是一种没有类的抽象，而直接创建和关联对象的代码风格。OLOO 十分自然地实现了基于 [[Prototype]] 的行为委托。