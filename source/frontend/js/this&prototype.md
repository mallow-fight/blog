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
    尽管 bar 似乎是 obj.foo 的引用，但实际上它只是另一个 foo 本身的引用而已。另外，起作用的调用点是 bar()，一个直白，毫无修饰的调用，因此 默认绑定 适用于这里。
    参数传递也是一种隐含赋值，例：`doFoo( obj.foo ) // oops, global`

<p class="tip">不管哪一种意外改变 this 的方式，你都不能真正地控制你的回调函数引用将如何被执行，所以你（还）没有办法控制调用点给你一个故意的绑定。我们很快就会看到一个方法，通过 固定 this 来解决这个问题。</p>

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
  - 如果函数返回一个其它对象，则新创建的对象就是构造函数返回的那个对象，这种情况可以不使用new关键字，并且不会接入原型链

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
通常一个程序可以接受两种风格（词法和this），但是一个函数内部应该只有一种风格）