---
type: v3/client
order: 3
title: js重点
---

## todos

- [ ] [深/浅拷贝](https://segmentfault.com/a/1190000016672263)
- [ ] 为什么数组访问速度比对象快
- [ ] [如何编写高性能的Javascript](https://segmentfault.com/a/1190000007604645)
- [ ] [内存泄漏](https://www.jianshu.com/p/763ba9562864)
- [ ] [Script 标签 放在页面的最底部的body封闭之前 和封闭之后有什么区别](https://www.zhihu.com/question/20027966)
- [ ] [函数节流和防抖](https://www.cnblogs.com/fsjohnhuang/p/4147810.html)## Redux是如何做到可预测呢？
- [ ] [Redux将React组件划分为哪两种？Redux是如何将state注入到React组件上的](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_three_react-redux.html)
- [ ] [请描述一次完整的 Redux 数据流](https://alisec-ued.github.io/2016/11/23/%E5%9B%BE%E8%A7%A3Redux%E6%95%B0%E6%8D%AE%E6%B5%81(%E4%B8%80)/)
- [ ] [React的批量更新机制 BatchUpdates？](https://zhuanlan.zhihu.com/p/28532725)
- [ ] [React与Vue，各自的组件更新进行对比，它们有哪些区别？](https://www.zhihu.com/question/266656197)

## 原型链

### prototype

#### 表现行为

1. 每个普通函数都有一个`prototype`属性。
2. `es6`的箭头函数没有`prototype`属性。
3. `prototype`是一个对象，默认有一个`constructor`属性，这个属性值等同于函数本身，对`constructor`的操作相当于对函数本身进行操作。

##### 示例
```js
function Foo() { }

// 默认的prototype是一个对象，默认有一个constructor属性
Foo.prototype // {constructor: f}

// constructor默认等于构造函数本身，所以Foo和Foo.prototype.constructor表现形式一样，都有name、caller、length、arguments等属性
Foo.prototype.constructor === Foo // true

// 可以为prototype添加一些属性
Foo.prototype.test = 'peter'
Foo.prototype // {test: 'peter', constructor: f}

// 同样可以通过constructor为添加和修改属性
Foo.prototype.constructor.prototype.test1 = 'mallow'
Foo.prototype.constructor.prototype.test = 'lucy'
Foo.prototype // {test: 'lucy', test1: 'mallow', constructor: f}

// 所以说Foo和Foo.prototype.constructor是全等的，保存的都是同一个对象索引，所以只需要继续对Foo.prototype研究就行了
// 因为Foo.prototype是一个对象，所以它是没有prototype的，到此结束，这就是普通函数的所有prototype结构
Foo.prototype.prototype // undefined

// 注意：es6的箭头函数没有prototype，所以这也导致了它没有constructor，继而不能作为构造函数
const baz = () => {}
baz.prototype // undefined
```

#### Q&A

- 为什么普通函数有`prototype`属性而箭头函数没有？
  - 这得上升到浏览器层面，箭头函数和普通函数的实现不一样
  - 流行的babel翻译箭头函数也只是作为一个普通函数而已，可以看出浏览器还没有完全实现箭头函数

- 普通函数和箭头函数的差异？
  - 不绑定`this`，通过`call`、`apply`只会传递参数，第一个绑定`this`的参数会被忽略
  - 不绑定`arguments`
  - 不能用作构造器，不能使用`new`
  - 没有`prototype`属性
  - 不能用作生成器，即`yield`关键字不能在箭头函数中使用
  - 递归，`a => b => c`

### `__proto__`

#### 表现行为 

1. 除了`null`和`undefined`，其他基本类型和引用类型都有`__proto__`属性。
2. 相当于继承了某个构造函数的`prototype`

#### 示例
```js
// 从下面的例子可以看出，不管是什么样的对象，最终肯定都继承自`null`。
function Foo(a) { this.a = a }

// 首先我们看看Foo的__proto__，显示是一个对象
Foo.__proto__ // ƒ () { [native code] }

// 可以看到，Foo也是一个对象，继承了名为Function的构造函数的原型
Foo.__proto__ === Function.prototype // true

// 所以说修改Foo.__proto__就相当于修改Function.prototype，这样就会影响Function构造函数，继而影响所有实例函数，这样是很危险的
// 这也是为什么禁止直接修改__proto__的原因
Foo.__proto__.a = 1
Foo.prototype // { a: 1, ... }

// Function.prototype.constructor就是Function本身，跟prototype表现行为一致
Function.prototype.constructor // ƒ Function() { [native code] }
Function.prototype.constructor === Function // true

// 所以说因为Function.prototype是一个对象，所以它也继承了Object构造函数的prototype
// 这个地方有点混淆，其实Function.prototype就是一个普通的object
Function.prototype.__proto__ === Object.prototype
Function.prototype.__proto__ === new Object().__proto__

// 注意不能这样访问
{}.__proto__
// 可以这样访问
const a = {};
a.__proto__;

// ok 到此为止，问题都转化为了关于Object构造函数的问题

Foo.prototype._a = 'this is _a'

// 首先创造一个Foo的实例，Foo函数中调用this会将属性挂载在实例对象上，而prototype中的属性会挂载在__proto__对象上
const foo = new Foo('this is a')

//可以看到创造的实例是这样子的，包括创建过程中赋值给实例对象和一个__proto__属性
foo // {a: 'this is a', __proto__: {_a: 'this is _a', constructor: ƒ Foo, __proto__: Object}}

// 继续往下看，foo.__proto__没什么好解释，可以看到foo.__proto__还有一个__proto__属性
// 下面这行代码说明，foo.__proto__只是一个普通的对象，是由Object函数构造的，所以它继承了Object.prototype的属性
foo.__proto__.__proto__ === Object.prototype // true
// 所以可以得到如下结果，所有的对象都继承了Object构造函数的prototype，Object只是一个构造函数，没什么好神秘的
foo.__proto__.__proto__ === new Object({}).__proto__ // true

// 可以看到，Object只是一个构造函数
Object // ƒ Object() { [native code] }

// ok，既然Object是一个构造函数，那它肯定有一个prototype属性，具有constructor和一些内置属性
Object.prototype // {constructor: ƒ Object(), hasOwnProperty, ....}

// 不解释
Object.prototype.constructor === Object

// 天地无常，万法归null
Object.prototype.__proto__ === null
```

#### Q&A

- 为什么`null`和`undefined`没有`__proto__`属性
  - 因为`Booleand`、`Strings`和`Numbers`都有对应的构造函数，当你试图去访问这些基本类型的属性时，它们会被自动转换成一个对象值
  - 但是`undefined`和`null`，没有这样的构造函数，所以访问`__proto__`就会报错

- 各种对象的`__proto__`属性中每个属性代表什么含义、有什么作用
  - [标准内置对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects)
- `null`和`undefined`有什么区别
  - 没什么区别，历史遗留问题，有些语义化区别
  - 使用`typeof`结果不一样，`null`是`object`，`undefined`是`undefined`
- `{}.__proto__`为什么不能这样访问
  - 语法错误，可以这样`{}['__proto__']`

### constructor

1. 理解了`prototype`和`__proto__`，这个就不难理解了，`constructor`只会出现在`__proto__`和`prototype`对象中
2. 在`__proto__`中，指代的是这个对象是由什么函数构造的，指向构造它的函数，不管是`Foo`也好，内置的`Object`也好
3. 在`prototype`中，指代的就是构造函数本身

### new

- 用来实例化一个类，从而在内存中分配一个实例对象

#### 例子

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

#### 伪代码模拟过程

```js
var obj = {};
obj.__proto__ = Person.prototype; // 此时建立了obj对象的原型链
// obj -> Person.prototype -> Object.prototype -> null
var result = Person.call(obj, 'John'); // 相当于obj.Person('John')
return typeof result === 'object' ? result : obj; // 如果无返回值或者返回一个非对象值，则将obj返回作为新对象
```

#### Q&A

- 直接返回对象和不返回对象的区别？
```js
// 直接返回对象产生的实例的`__proto__`的`constructor`是`Object`。
function Foo() {
  return { a: 1 };
}
const foo = new Foo();
foo // {a: 1, __proto__: { constructor: Object }}

// 不返回对象产生的实例的`__proto__`的`constructor`是构造函数本身。
function Baz() {
  this.a = 1;
}
const baz = new Baz();
baz // {a: 1, __proto__: { constructor: Baz }}

function Cab() {
  this.a = 1;
}
Cab.prototype.a = 2;
const cab = new Cab();
cab // {a: 1, __proto__: { a: 2, constructor: Baz }}
```

## 继承

### 基于prototype

```js
function Foo() {
}
Foo.prototype.name = 'i am foo';
const foo = new Foo();
console.log(foo.name); // i am foo
```

### 基于`__proto__`

```js
const parent = {
  a: 1,
  b: 2
}
const kid = Object.create(parent);
console.log(kid) // { __proto__: { a: 1, b: 2 } }
```

### Object.create

#### 原理

```js
function create(proto) {
  function foo() {

  }
  foo.prototype = proto;
  return new foo();
}
```

#### 参数

```js
Object.create(proto, [propertiesObject])
```

1. proto：新创建对象的原型对象。
2. propertiesObject：可选。如果没有指定为 undefined，则是要添加到新创建对象的可枚举属性（即其自身定义的属性，而不是其原型链上的枚举属性）对象的属性描述符以及相应的属性名称。这些属性对应Object.defineProperties()的第二个参数。

## 检测类型

- 只能使用`Object.prototype.toString.call(var)`，因为`Object.toString`和它不是一个函数，其他的构造函数如`Array`等继承的是它们自己定义的函数。
- 在toString方法被调用时,会执行下面的操作步骤:
- es5
  1. 获取this对象的[[class]]属性的值.
  2. 计算出三个字符串"[object ", 第一步的操作结果Result(1), 以及 "]"连接后的新字符串.
  3. 返回第二步的操作结果Result(2).
- es6
  1. [[class]]内部属性没有了，取而代之的是另一个内部属性[[NativeBrand]]（该属性的值对应一个标志值，可以用来区分原生对象的类型）
```js
const a_string = 'i am a string'
const a_number = 1111
const a_null = null
const a_undefined = undefined
const a_boolean = false
const a_symbol = Symbol()
const a_regxp = /abc/
const a_object = {a: 1}
const a_array = [1, 2, 3]
const a_function = function () {
}

function whichType(vars) {
  let type = typeof vars
  if(type === 'object') {
    type = Object.prototype.toString.call(vars)
    type = type.slice(8, type.length - 1).toLowerCase()
    // or: type = type.replace(/\[(\w+)\s(\w+)\]/, '$2')
  }
  console.log(type)
}

whichType(a_string)
whichType(a_number)
whichType(a_null)
whichType(a_undefined)
whichType(a_boolean)
whichType(a_symbol)
whichType(a_regxp)
whichType(a_object)
whichType(a_array)
whichType(a_function)
```

## 隐式绑定
- 上下文只会取上一层，不会一直往上取。
```js
const a = {
 b: {
   c() {
     console.log(this) // { c: [Function: c], d: 2 }
     console.log(this.e) // undefined
   },
   d: 2
 },
 e: 1
}
a.b.c()
```

## 柯里化

```js
function add(num1) {
  // 也可以挂载在this上，这里的this就是window，可以事先bind一个this
  let total = num1;
  function sum(a) {
    total += a;
    return sum;
  }
  sum.getTotal = function() {
    return total;
  }
  return sum;
}
const sum = add(1)(2)(3)(4)
console.log(sum.getTotal())
// 打印的时候会自动调用函数的toString方法
function test() {

}
test.toString = function() {
  return 'haha'
}
console.log(test) // haha
```

## 类数组对象转化为数组

```js
function foo(){
  var arr = Array.prototype.slice.call(arguments)
  // es6
  // var arr = Array.from(arguments)
  arr.push('bam')
  console.log(arr)
}
foo('bar', 'baz'); // ['bar', 'baz', 'bam']
```

## 变量和函数提升

- 例子1

```js
a = 2
var a
console.log(a) // 2

// 等价于

var a
a = 2
console.log(a)
```

- 例子二

```js
console.log(a) // undefined
var a = 2

// 等价于

var a
console.log(a)
a = 2
```

- 例子三

```js
// 如果a声明了变量和函数，那么打印出来的一直都会是函数，而不是变量值，这个地方页体现了函数优先
console.log(a) // function a...
var a = 1
function a() {

}
```

- 在你的代码任何部分被执行之前，所有的声明，变量和函数都会被首先处理，全局作用域和每个局部作用域都会进行这种处理。
- 先有声明，后有赋值。
- 函数声明优先提升，然后再到变量声明（函数表达式也是一种变量声明）。

## 上下文

**上下文`this`实际上是在函数被调用时建立的一个绑定，它指向什么完全由函数被调用的调用点来决定的**

### 调用点

**调用栈和调用点的展示：**

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

### 四大规则

- 默认绑定（没有其它规则适用时的默认规则）

  - 独立函数调用，一般`this`指向了全局对象

  - `strict mode`下指向全局对象不合法，所以`this`将被设置为`undefined`
  
- 隐含绑定，例：

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

  - 隐含丢失，一个隐含绑定丢失了它的绑定，通常意味着它会回退到默认绑定，例：

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

### 规则的顺序&判定this

1. 函数是通过`new`被调用的吗？如果是，`this`就是新构建的对象：`var bar = new foo()`

2. 函数是通过`call`或`apply`被调用的吗，甚至是隐藏在`bind`硬绑定之中吗？如果是，`this`就是那个被明确指定的对象： `var bar = foo.call( obj )`

3. 函数是通过环境对象（拥有者或容器对象）被调用的吗？如果是，`this`就是那个环境对象：`var bar = obj.foo()`

4. 否则，使用默认的`this`。如果在严格模式下，就是`undefined`，否则是`global`对象：`var bar = foo()`

## 绑定上下文

### 硬绑定

- 硬绑定是显式绑定中的一种，通常情况下是通过调用函数的apply()、call()或者ES5里提供的bind()方法来实现硬绑定的。

### 软绑定

```js
if(!Function.prototype.softBind){
    Function.prototype.softBind=function(obj){
        var fn=this;
        var args=Array.prototype.slice.call(arguments,1);
        var bound=function(){
            return fn.apply(
                (!this||this===(window||global))?obj:this,
                args.concat.apply(args,arguments)
            );
        };
        bound.prototype=Object.create(fn.prototype);
        return bound;
    };
}
```

### bind polyfill

```js
if (!Function.prototype.bind) {
  Function.prototype.bind = function(oThis) {
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    var aArgs   = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP    = function() {},
        fBound  = function() {
          // this instanceof fNOP === true时,说明返回的fBound被当做new的构造函数调用
          return fToBind.apply(this instanceof fNOP
                 ? this
                 : oThis,
                 // 获取调用时(fBound)的传参.bind 返回的函数入参往往是这么传递的
                 aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    // 维护原型关系
    if (this.prototype) {
      // Function.prototype doesn't have a prototype property
      fNOP.prototype = this.prototype; 
    }
    // 下行的代码使fBound.prototype是fNOP的实例,因此
    // 返回的fBound若作为new的构造函数,new生成的新对象作为this传入fBound,新对象的__proto__就是fNOP的实例
    fBound.prototype = new fNOP();

    return fBound;
  };
}
```

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

## 手写ajax请求
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

## Object.assign
**这玩意会改变原始对象**
```js
const a = {name: 'a'}
const b = {gender: 1}
console.log(Object.assign(a, b) === a); // true
console.log(a); // {name: 'a', gender: 1}
console.log(b); // {gender: 1}
```

## Debounce

> [如何用js实现防抖](https://github.com/lishengzxc/bblog/issues/7)

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

## 函数参数
1. 如果参数o是一个对象或者数组，那么在函数体里面的修改会导致函数外面o的修改，这里的o是对象的引用，共享同一个o对象
1. o对象里面的对象作为参数传入同样会使得o对象发生改变
1. 如果对这个参数对象进行重新赋值，那么会新创建一个o类型的值，这个值的改变不会影响外面的o
1. 修改o的属性会使得o发生变化，修改的还是对象的引用
```js
function foo(o) {
  o.a = 1 // o: { a: 1 }
  o = 1
  console.log(o) // 1
}
const o = {}
foo(o)
o // o: { a: 1 }
```

## 不正确的数组下标问题
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

## `var a = a || b`这样写的问题
- 如果a是false类型的值，则会丢失该类型的值，取b值

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

## Javascript中，有一个函数，执行时对象查找时，永远不会去查找原型，这个函数是？
hasOwnProperty

- javaScript中hasOwnProperty函数方法是返回一个布尔值，指出一个对象是否具有指定名称的属性。此方法无法检查该对象的原型链中是否具有该属性；该属性必须是对象本身的一个成员。
- 使用方法：
 object.hasOwnProperty(proName)
 其中参数object是必选项。一个对象的实例。
 proName是必选项。一个属性名称的字符串值。
 如果 object 具有指定名称的属性，那么JavaScript中hasOwnProperty函数方法返回 true，反之则返回 false。

## JSON
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

## js延迟加载

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

## Ajax解决浏览器缓存问题
1、在ajax发送请求前加上 anyAjaxObj.setRequestHeader("If-Modified-Since","0")。

2、在ajax发送请求前加上 anyAjaxObj.setRequestHeader("Cache-Control","no-cache")。

3、在URL后面加上一个随机数： "fresh=" + Math.random();。

4、在URL后面加上时间戳："nowtime=" + new Date().getTime();。

5、如果是使用jQuery，直接这样就可以了 $.ajaxSetup({cache:false})。这样页面的所有ajax都会执行这条语句就是不需要保存缓存记录。

## 同步和异步

同步的概念应该是来自于OS中关于同步的概念:不同进程为协同完成某项工作而在先后次序上调整(通过阻塞,唤醒等方式).同步强调的是顺序性.谁先谁后.异步则不存在这种顺序性.

同步：浏览器访问服务器请求，用户看得到页面刷新，重新发请求,等请求完，页面刷新，新内容出现，用户看到新内容,进行下一步操作。

异步：浏览器访问服务器请求，用户正常操作，浏览器后端进行请求。等请求完，页面不刷新，新内容也会出现，用户看到新内容。

## AMD & CMD

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

## 检测浏览器版本版本
功能检测、userAgent特征检测
比如：navigator.userAgent
//"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/537.36
(KHTML, like Gecko) Chrome/41.0.2272.101 Safari/537.36"

## Object.keys怪异行为
- 数字键值优先
```js
const a = {c: 'c', 0: 'a', 1: '2'}
Object.keys(a) // ["0", "1", "c"]
```

## Module的加载实现

- 如果脚本体积很大，下载和执行的时间就会很长，因此造成浏览器堵塞，用户会感觉到浏览器卡死了，没有任何响应。
```html
<script src="path/to/myModule.js" defer></script>
<script src="path/to/myModule.js" async></script>
```

- `<script>`标签打开`defer`或`async`属性，脚本就会异步加载。渲染引擎遇到这一行命令，就会开始下载外部脚本，但不会等它下载和执行，而是直接执行后面的命令

- `defer`和`async`的区别是：`defer`要等到整个页面在内存中正常渲染结束（DOM结构完全生成，以及其他脚本执行完成），才会执行；`async`一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后，再继续渲染。

- `defer`是渲染完再执行，`async`是下载完就执行，如果有多个`defer`脚本，会按照它们在页面出现的顺序加载，而多个`async`脚本是不能保证加载顺序的