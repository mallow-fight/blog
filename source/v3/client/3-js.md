---
title: js
order: 3
type: v3/client
---

> [进阶](https://github.com/yygmind/blog/issues/13)

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

### class

#### constructor

1. 相当于普通函数体内执行的代码块。
2. 可以使用super来调用一个父类的构造方法。
3. 如果不指定一个constructor，则会使用一个默认的constructor。
4. 在派生类（即有继承其他类的类），必须先调用super()才能使用this，注意：如果有参数，super需要传入参数。

#### 原型方法

1. 定义在类的prototype上的方法，可以被实例继承。

#### 静态方法

1. 定义在类上的静态方法，不可以被实例继承（因为不在prototype上），可以通过类直接访问，就相当于在函数上直接定义了一个对象。
2. 因为普通函数是Function构造出来的，所以就是一对象，继而可以在上面定义静态方法。

#### Q&A

- 不指定constructor会发生什么，为什么必须先调用super？
  - 不指定constructor会调用默认的constructor，返回类的实例。
  - 先调用super是因为防止你在子类中访问了父类的属性，以及更好的控制传入父类的参数。

## Set&Map

### Set

#### 去重

```js
const s = new Set();
[2, 333, 2, 3, 2, 1].forEach(item => s.add(item))
for(let item of s) {
  console.log(item)
}
// 2, 333, 3, 1

// 去重数组
[...new Set(array)];
Array.from(new Set(array));

// 去重字符串
[...new Set('ababbc').join('')]
```

#### prototype

- add：添加元素
- has：是否有该项元素
- clear：清空集合
- delete：删除某个元素
- entries：用来访问实例，Set的键和值相同
- forEach：用来遍历实例
- keys：访问实例key
- size：集合大小
- values：访问实例值

### WeakSet

- 类似Set，只能存放对象

### Map

- 类似于对象，也是键值对的集合，但是键的范围不限于字符串，各种类型的值都可以当作键。
- `Object`提供了字符串-值的对应，而`Map`提供了值-值的对应，是一种更完善的`Hash`结构实现。

### WeakMap

- 只接受对象作为键名（null除外），不接受其他类型的值作为键名。

## Reflect

- 将Object对象的一些明显属于语言内部的方法（比如Object.defineProperty），放到Reflect对象上。现阶段，某些方法同时在Object和Reflect对象上部署，未来的新方法将只部署在Reflect对象上。也就是说，从Reflect对象上可以拿到语言内部的方法。
- 修改某些Object方法的返回结果，让其变得更合理。比如，Object.defineProperty(obj, name, desc)在无法定义属性时，会抛出一个错误，而Reflect.defineProperty(obj, name, desc)则会返回false。

### get(target, name, receiver)

```js
const test = {
  a: 1,
  b: 2,
  get c() {
    return this.a + this.b
  }
}
Reflect.get(test, 'a') // 1
Reflect.get(test, 'b') // 2
Reflect.get(test, 'c') // 3
test.c // 3
// 第三个参数是调用上下文
Reflect.get(test, 'c', {a: 4, b: 4}) // 8
Reflect.get(test, 'c', {a: 4}) // NaN
```

### set(target, name, value, receiver)

```js
const test = {
  a: 1,
  b: 2,
  get c() {
    return this.a + this.b
  }
}
Reflect.set(test, 'd', 3)
console.log(test) // { a: 1, b: 2, c: [Getter], d: 3 }
Reflect.set(test, 'e', 4, {a: 4, b: 4})
console.log(test) // { a: 1, b: 2, c: [Getter], d: 3 }
Reflect.set(test, 'e', 4)
console.log(test) // { a: 1, b: 2, c: [Getter], d: 3, e: 4 }
```

### has(obj, name)

```js
const test = {
  a: 1,
  b: 2,
  get c() {
    return this.a + this.b
  }
}
console.log(Reflect.get(test, 'a')) // 1
```

### deleteProperty(obj, name)

```js
// 等同于delete obj[name]，用于删除对象的属性
const test = {
  a: 1,
  b: 2,
  get c() {
    return this.a + this.b
  }
}
Reflect.deleteProperty(test, 'a')
console.log(test) // { b: 2, c: [Getter] }
```

### construct(target, [array]args)

```js
// 等同于 new target(...args)
const instance = Reflect.construct(foo, ['mallow'])
console.log(instance) // foo { name: 'mallow' }
```

### getPrototypeOf(obj)

- 这个获取的是对象的`__proto__`属性。

```js
const test = {
  a: 1,
  b: 2,
  get c() {
    return this.a + this.b
  }
}
console.log(Reflect.getPrototypeOf(test)) // 同Object.prototype
```

### setPrototypeOf(obj, newProto)

- 这个设置的是对象的`__proto__`上的属性，所以node环境中有可能打印不出来。
- 这个东西会带来性能负担，最好不要使用它，可以使用Object.create来替代。
> 警告: 由于现代 JavaScript 引擎优化属性访问所带来的特性的关系，更改对象的 [[Prototype]]在各个浏览器和 JavaScript 引擎上都是一个很慢的操作。其在更改继承的性能上的影响是微妙而又广泛的，这不仅仅限于 obj.__proto__ = ... 语句上的时间花费，而且可能会延伸到任何代码，那些可以访问任何[[Prototype]]已被更改的对象的代码。如果你关心性能，你应该避免设置一个对象的 [[Prototype]]。相反，你应该使用 Object.create()来创建带有你想要的[[Prototype]]的新对象。

```js
const test = {
  a: 1,
  b: 2,
  get c() {
    return this.a + this.b
  }
}
Reflect.setPrototypeOf(test, {
  d: 1
})
console.log(test.d) // 1
```

### apply(func, context, args[arrayLike])

```js
Reflect.apply(Object.prototype.toString, {}, [1]) // [object Object]
```

### defineProperty(target, propertyKey, attributes)

```js
const o = {};
Reflect.defineProperty(o, 'a', {
  configurable: true,
  enumerable: true,
  writable: true,
  value: 1
})
Reflect.defineProperty(o, 'b', {
  configurable: false,
  enumerable: true,
  writable: false,
  value: 2
})
let cvalue;
Reflect.defineProperty(o, 'c', {
  configurable: true,
  enumerable: true,
  get: function () {
    return cvalue;
  },
  set: function (value) {
    cvalue = value
  }
})
console.log(o) // { a: 1, b: 2, c: [Getter/Setter] }
o.a = 2
o.b = 3
console.log(o) // { a: 2, b: 2, c: [Getter/Setter] }
delete o.a
delete o.b
console.log(o) // { b: 2, c: [Getter/Setter] }
console.log(o.c) // undefined
o.c = '5';
console.log(o.c) // 5
```

 | configurable(可配置性) | enumerable(可枚举性) | value(值) | writable(可写性) | get(获取值) | set(设置值)
--- | --- | --- | --- | --- | --- | --- | ---
数据描述符 | Yes | Yes | Yes | Yes | No | No
存取描述符 | Yes | Yes | No | No | Yes | Yes

### getOwnPropertyDescriptor(target, propertykey)

```js
// 接上例子
console.log(Reflect.getOwnPropertyDescriptor(o, 'b')) // { value: 2, writable: false, enumerable: true, configurable: false}
console.log(Reflect.getOwnPropertyDescriptor(o, 'c')) // { get: [Function: get], set: [Function: set], enumerable: true, configurable: true }
```

### isExtensible(target)

- 返回一个布尔值，表示当前对象是否可扩展

```js
const f = Object.freeze({a: 1})
console.log(Reflect.isExtensible(f)) // false
```

### preventExtensions(target)

```js
Reflect.preventExtensions(o);
o.test = 'test'; // 无效，没有设置成功test
```

### ownKeys(target)

- 获取对象的所有属性

```js
console.log(Reflect.ownKeys(o)) // ['b', 'c']
```

## Proxy

1. 用于修改某些操作的默认行为，等同于在语言层面做出修改，属于一种’元编程‘。
2. 格式：`new Proxy(target, handler)`，`handler`对应`reflect`中的每个属性。

### revocable

```js
const target = {};
const handler = {};
const {proxy, revoke} = Proxy.revocable(target, handler);
proxy.foo = 123;
console.log(proxy.foo) // 123
revoke();
console.log(proxy.foo) // TypeError: Cannot perform 'get' on a proxy that has been revoked
```

### this

- 在`Proxy`代理的情况下，目标对象内部的`this`关键字会指向`Proxy`代理。

```js
const target = {
 m: function() {
   console.log(this === proxy)
 }
}
const handler = {};
const proxy = new Proxy(target, handler);
target.m() // false
proxy.m() // true
```

## Generator

> [参考资料](https://es6.ruanyifeng.com/#docs/generator)

## Decorator

> [参考资料](https://es6.ruanyifeng.com/#docs/decorator)

1. 修饰器只能修饰类或者类的方法。
2. 默认参数和`Reflect.defineProperty`一样，可以在它外面包裹函数达到传递参数的目的。
3. 不能用于函数的原因是存在函数提升，使得修饰器不能用于函数。而类是不会提升的，所以就没有这方面的问题。
4. 修饰函数可以采用高阶函数的形式，就是把一个函数作为参数传入修饰器函数，这样就可以对函数的`prototype`进行修改了。
5. 执行顺序：先从上到下按顺序执行获得最终需要执行的修饰器函数，然后从下到上执行修饰器函数。反正首先获取需要执行的修饰器函数，然后在一个个执行，这也是包裹修饰器函数达到传参的意图。

### 例子

```js
const logger = (target, key, desc) => {
  target.prototype.log = logInfo => console.log(logInfo);
};
const move = (target, key, desc) => {
  const returnValue = desc.value();
  desc.value = () => returnValue + 1;
};

const bigbig = () => {
  console.log('bigbig');
  return (target, key, desc) => {
    console.log('big', target, key, desc);
  };
};

const big = (target, key, desc) => {
  console.log('big', target, key, desc);
};

const smallsmall = () => {
  console.log('smallsmall');
  return (target, key, desc) => {
    console.log('small', target, key, desc);
  };
};

const small = (target, key, desc) => {
  console.log('small', target, key, desc);
};

@logger
class Foo {
  getName() {
    this.log('this is getName.');
  }

  @move
  @move
  willMove(step) {
    return 0;
  }

  @bigbig()
  // @big
  // @small
  @smallsmall()
  apple() {

  }
}
const foo = new Foo();
```

## 基础

### 类型

>[参考](https://mallow-fight.github.io/frontend/js/2_types&grammar.html)

### 原型链

>[参考](https://mallow-fight.github.io/special/1_%E5%8E%9F%E5%9E%8B.html)

### 事件队列

>[参考](https://segmentfault.com/a/1190000010913949)
>[参考](https://segmentfault.com/a/1190000011198232)
>[参考](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)

### 闭包

>[参考](https://mallow-fight.github.io/frontend/js/3_scope&closures.html)

### 上下文

>[参考](https://mallow-fight.github.io/frontend/js/4_this&prototype.html)

## 分类

### es5

- 通用的js版本

### es6

- 下一代高效js版本

## 转译工具

### babel

- 将es6翻译成es5
- 解决了浏览器不认识es6或者es7的问题

## 检测类型

- 只能使用`Object.prototype.toString.call(var)`，因为`Object.toString`和它不是一个函数，其他的构造函数如`Array`等继承的是它们自己定义的函数。
- 在toString方法被调用时,会执行下面的操作步骤:
- es5
  1. 获取this对象的[[class]]属性的值.
  2. 计算出三个字符串"[object ", 第一步的操作结果Result(1), 以及 "]"连接后的新字符串.
  3. 返回第二步的操作结果Result(2).
- es6
  1. [[class]]内部属性没有了，取而代之的是另一个内部属性[[NativeBrand]]（该属性的值对应一个标志值，可以用来区分原生对象的类型）

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

## 深/浅拷贝

>[wiki](https://segmentfault.com/a/1190000016672263)

## 进入编程

### 编程构建块

- 你需要 `操作符` 来在值上实施动作。

- 你需要 `值` 和 `类型` 来试试不同种类的动作，比如在 `number` 上做数学，或者使用 `string` 输出。

- 你需要 `变量` 在你程序执行的过程中存储数据（也就是 `状态` ）。

- 你需要 `条件`，比如`if`语句来做决定。

- 你需要 `循环` 来重复任务，直到一个条件不再成立。

- 你需要 `函数` 来将你的代码组织为有逻辑的和可复用的块儿。

> 代码注释是一种编写更好可读性代码的有效方法，它是你的代码更容易理解和维护。

## 核心机制

- 值

- 类型

- 闭包

- this

- 原型

## 前景

**js的未来是光明的，例：es6、node等等，用途广泛，功能强大。**

## 类型

### 内建类型

- 基本类型

  - `symbol`：独一无二的值，是一个函数，参数是对当前symbol值的描述，通常用于对象的健值
    
    - [参考](http://es6.ruanyifeng.com/#docs/symbol)

  - `undefined`

  - `boolean`

  - `number`

  - `string`

  - `null`：和`typeof`操作符组合时是有`bug`的，例：`typeof null ==== 'object'; // true`，因为有太多的已经存在的`web`内容依存着这个`bug`的行为，修复这个`bug`会制造更多的`bug`并毁掉许多`web`软件，所以这个原有的`bug`应该永远不会被修复了，其实`null`才是它自己的基本类型

- 非基本类型(引用类型)

  - `object`

    - [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

    - [defineProperty](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

  - `function`：这是`typeof`可以返回的第七种字符串值，它是`object`的子类型，一个函数被称为可调用对象，一个拥有内部属性、允许被调用的对象，它可以拥有属性

    - [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

> [函数式编程](http://taobaofed.org/blog/2017/03/16/javascript-functional-programing/)

> `function` 是对象的一种子类型（技术上讲，叫做“可调用对象”）。函数在 `JS` 中被称为“头等（`first class`）”类型，是因为它们基本上就是普通的对象（附带有可调用的行为语义），而且它们可以像其他普通的对象那样被处理。

> 数组也是一种形式的对象，带有特别的行为。数组在内容的组织上要稍稍比一般的对象更加结构化。

<p class="tip">简单基本类型自身不是对象（null也不是），一个常见的错误论断：js中一切都是对象，明显不对</p>

### 函数判断变量的所有类型

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

### 值作为类型

- 变量没有类型，值才有类型，变量可以在任何时候，持有任何值，也就是没有类型强制，引擎不坚持认为一个变量总是持有与它开始存在时相同的初始类型的值

- `undefined`是指一个变量已经被声明但是没有别赋值或者赋值为`undefined`，`undeclared`是指一个未被声明的变量，有的浏览器统一按照`undefined`处理是不准确的。使用`typeof`会统一返回`undefined`，这是一种安全防护特性，防止环境对未声明的变量报错

## 值

### Array

- 值的容器，这些值可以是任意类型

- 使用`delete`将会从这个`array`上移除一个植槽，它不会更新`length`属性

- 它也是对象，可以在它上面添加属性，但是这些属性不会更新`length`属性，注意不要使用字符串数字，会被强制转换为数组项

#### 方法

> [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/toLocaleString)

### 类Array

**将类似数组的对象转化为数组**

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

### String
- 和`Array`有一些相同的方法和属性，例：`indexOf`、`concat`、`length`、`join`、`map`、`reverse`等

- 是不可变的，但是`array`时可变的，`string`上没有一个方法时可以原地修改它的内容的，而是创建并返回一个新的`string`，所以在变异一个`string`很困难时，试试看使用数组方法变异它，或者首先使用`split`方法将它切分成一个字符的数组，一顿操作后，使用`join`方法转化为字符串（怀疑是不是因为这个原因导致每次对字符串操作都会返回新的字符串）

#### 方法

> [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf)

### Number

> [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/NaN)

- 只有一种数字类型：number，包含`整数`值和小数值，但是`js`没有真正的整数，一个整树只是没有小数部分的小数值（`42.0 === 42`)，实现基于`IEEE 754`标准

- 小数的整数部分如果是`0`，或者小数部分是`0`，可以选择不写：`0.42 === .42`，`42.0 === 42 === 42.`

- `toFixed`：保留多少位小数位，`toPrecision`：保留多少位有效数字，它们都会四舍五入的保留

- 所有使用IEEE754的语言都有的问题：`.1 + .2 === .3 // false`，正确的应该是： `.1 + .2 === 0.30000000000000004 // true`
  - 使用容差值
  ```js
  // es6自带，下面是polyfill
  if (!Number.EPSILON) {
    Number.EPSILON = Math.pow(2,-52);
  }
  ```
  - 转化为整数进行对比

### 不是值的值

- `null`是一个空值，它曾经有过值，但现在没有；`undefined`是一个丢失的值，它还没有值

- `null`是一个特殊的关键字，不是一个标识符，因此不能将它作为一个变量对待来给它赋值；`undefined`不是一个标识符，因此可以给它赋值，但是千万不要给它赋值

- 使用`void`操作符的表达式的结果总是值`undefined`，使用场景
  ```js
  function doSomething() {
    // 注意：`APP.ready` 是由我们的应用程序提供的
    if (!APP.ready) {
        // 稍后再试一次
        return void setTimeout( doSomething, 100 );
    }

    var result;

    // 做其他一些事情
        return result;
  }

  // 我们能立即执行吗？
  if (doSomething()) {
      // 马上处理其他任务
  }
  ```

### 不是数字的数字

**`NaN`是唯一一个与它自己不相等的值，其它的值都总是等于它自己**

```js
NaN === NaN // false
typeof NaN === 'number' // true
```
测试一个值是不是`NaN`，使用`isNaN`，其实它真正的作用应该是判断一个值是不是就是`NaN`，而不是针对字符串也返回`true`，可以参考以下方式修补这个缺陷：
```js
// es6自带isNaN
if (!Number.isNaN) {
    Number.isNaN = function(n) {
        return (
            typeof n === "number" &&
            window.isNaN( n )
        );
    };
}
// or
if (!Number.isNaN) {
    Number.isNaN = function(n) {
        return n !== n;
    };
}
var a = 2 / "foo";
var b = "foo";

Number.isNaN( a ); // true
Number.isNaN( b ); // false -- 咻!
```

### 无穷
```js
Number.isNaN(Infinity/Infinity) === true // true
0 === -0 // true
```

### 特殊等价
```js
// es6自带
var a = 2 / "foo";
var b = -3 * 0;

Object.is( a, NaN );    // true
Object.is( b, -0 );        // true

Object.is( b, 0 );        // false
if (!Object.is) {
    Object.is = function(v1, v2) {
        // 测试 `-0`
        if (v1 === 0 && v2 === 0) {
            return 1 / v1 === 1 / v2;
        }
        // 测试 `NaN`
        if (v1 !== v1) {
            return v2 !== v2;
        }
        // 其他情况
        return v1 === v2;
    };
}
```

### 值与引用

**js没有指针，不能拥有一个从一个js变量到另一个js变量的引用，js的引用指向一个共享的值，例：**

```js
var a = 2;
var b = a; // `b` 总是 `a` 中的值的拷贝
b++;
a; // 2
b; // 3

var c = [1,2,3];
var d = c; // `d` 是共享值 `[1,2,3]` 的引用
d.push( 4 );
c; // [1,2,3,4]
d; // [1,2,3,4]
```

**简单值总是通过`值拷贝`来赋予/传递：null、undefined、string、number、boolean以及symbol**

**复合值（object）和function总是在赋值或传递时创建一个引用的拷贝**

**有这样的困惑：**

```js
function foo(x) {
  x.push(4);
  x; // [1, 2, 3, 4]

  // 稍后
  x = [4, 5, 6];
  x.push(7);
  x; // [4, 5, 6, 7]
}
var a = [1, 2, 3]
foo(a)
a; // [1, 2, 3, 4]
```

**要想改变a来使它拥有内容为[4, 5, 6, 7]的值，可以这样做：**

```js
function foo(x) {
    x.push( 4 );
    x; // [1,2,3,4]

    // 稍后
    x.length = 0; // 原地清空既存的数组
    x.push( 4, 5, 6, 7 );
    x; // [4,5,6,7]
}

var a = [1,2,3];

foo( a );

a; // [4,5,6,7] 不是 [1,2,3,4]
```

> 记住： 你不能直接控制/覆盖值拷贝和引用拷贝的行为 - 这些语义完全由当前值的类型来控制的

**可以使用如下方法来浅拷贝数组：**

```js
foo(a.slice())
```

> 注意：底层的基本标量值（string、number等）是不可改变的

## 原生类型

**最常用的原生类型：**

- String()

- Number()

- Boolean()

- Array()

- Object()

- Function()

- RegExp()

- Date()

- Error()

- Symbol()

**实际上它们都是内建函数，创建值的构造器形式结果都是一个基本类型值的包装器对象，例：**

```js
var a = new String( "abc" );
typeof a; // "object" ... 不是 "String"
a instanceof String; // true
Object.prototype.toString.call( a ); // "[object String]"
a.toString(); // "abc"
a === 'abc'; //false
```

## 内部[[class]]

**不存在`Null()`和`Undefined()`原生类型的构造器**

```js
Object.prototype.toString.call( null );            // "[object Null]"
Object.prototype.toString.call( undefined );    // "[object Undefined]"
```

**对于像`string`、`number`、`boolean`这样的简单基本类型，会启动一种叫“封箱”的行为：**

```js
Object.prototype.toString.call( "abc" );    // "[object String]"
Object.prototype.toString.call( 42 );        // "[object Number]"
Object.prototype.toString.call( true );        // "[object Boolean]"
```

### 封箱包装器

- 基本类型值没有属性或方法，所以为了访问`.length`或`.toString()`你需要这个

- 一般来说，基本上没有理由直接使用对象形式。让封箱在需要的地方隐含地发生会更好。换句话说，永远也不要做 `new String("abc")`、`new Number(42)` 这样的事情 —— 应当总是偏向于使用基本类型字面量 `"abc"` 和 `42`

- 对象包装器的坑

```js
var a = new Boolean( false );

if (!a) {
    console.log( "Oops" ); // 永远不会运行
}
```

> 因为对象是真，所以该条件永远都是假

### 开箱

**如果你有一个包装器对象，而你想要取出底层的基本类型值，可以使用`valueOf()`方法：**

```js
var a = new String( "abc" );
var b = new Number( 42 );
var c = new Boolean( true );

a.valueOf(); // "abc"
b.valueOf(); // 42
c.valueOf(); // true
```

**当以一种查询基本类型值的方式使用对象包装器时，开箱也会隐含地发生。这个处理的过程（强制转换）将会在第四章中更详细地讲解，但简单地说：**

```js
var a = new String( "abc" );
var b = a + ""; // `b` 拥有开箱后的基本类型值"abc"

typeof a; // "object"
typeof b; // "string"
```

### 空值槽数组

**创建一组包含`undefined`数组**

```js
// good
Array.apply(null, { length: 3 })
// bad
Array(3)
```

### 强制转换

**表现为`falsy`值列表(使用`==`的情况下，只是等于，不是全等于)：**

- undefined

- null

- false

- +0, -0, NaN

- ""

**一般最好不要使用强制转换，除非一些假值条件判断，直接使用假值要更简便一点**

## 文法

### 语句和表达式

**举例：**

```js
var a = 3 * 6;
var b = a;
b;
```

- 在这个代码段中，`3 * 6`是一个表达式（求值得值18）。而第二行的a也是一个表达式，第三行的b也一样。对表达式a和b求值都会得到在那一时刻存储在这些变量中的值，也就偶然是18。

- 这三行的每一行都是一个包含表达式的语句。`var a = 3 * 6`和`var b = a`称为“声明语句（declaration statments）”因为它们每一个都声明了一个变量（并选择性地给它赋值）。赋值`a = 3 * 6`和`b = a`（除去var）被称为赋值表达式（assignment expressions）。

- 第三行仅仅含有一个表达式b，但是它本身也是一个语句（虽然不是非常有趣的一个！）。这一般称为一个“表达式语句（expression statement）”。

### 语句完成值

- 所有的语句都有完成值`undefined`，函数如果没有返回值就会返回`undefined`

- 使用`var a = b = 42`时，需要注意提前声明b，不然会创建一个全部变量b

## 正则表达式

> [参考资料](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions)

- 注意自带方法的使用（一般使用`replace`替换字符）
- 注意标志的使用（如`/g`全局搜索）

### 手机号码中间替换成星号

```js
function formatPhone(phone) {
  return phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
}
```

### 函数柯里化

#### 第一版

- 这一版只支持传入两个参数

```js
function curry(fn) {
  const args = Array.prototype.slice.call(arguments, 1)
  return function () {
    const wrapArgs = args.concat(Array.prototype.slice.call(arguments))
    return fn.apply(this, wrapArgs)
  }
}
function add(a, b) {
  return a + b
}
const addCurry1 = curry(add, 1, 2)
console.log(addCurry1())
const addCurry2 = curry(add, 1)
console.log(addCurry2(2))
const addCurry3 = curry(add)
console.log(addCurry3(1, 2))
```

#### 第二版

```js
function Curry () {
  function curryAdd () {
    const slice = Array.prototype.slice
    const args = slice.call(arguments)
    curryAdd.trigger(args)
    return curryAdd
  }
  curryAdd.sum = 0
  curryAdd.trigger = function (nums) {
    for(let i = 0; i < nums.length; i++) {
      curryAdd.sum += nums[i]
    }
  }
  curryAdd.init = function () {
    curryAdd.sum = 0
  }
  return curryAdd
}
const curryAdd = Curry()
curryAdd(1, 2, 3)(4)(10)(24)
console.log(curryAdd.sum)
curryAdd.init()
curryAdd(1)(2)(3)(4)
console.log(curryAdd.sum)
const curryAdd1 = Curry()
curryAdd1(1)(2)
console.log(curryAdd1.sum)
```

## 作用域

### 编译器理论

**js一般被划分到“动态”或“解释型”语言的范畴，但其实它是一个编译型语言。**

### 传统的编译型语言

- 分词/词法分析：将一连串字符打断成有意义的片段，称为token（记号）

- 解析：将一个token流转换为一个嵌套元素的树（抽象语法树，AST），它综合地表示了程序的语法结构。

- 代码生成：将AST转换为可执行代码

### 编译器术语

- LHS（left-hand side）：找到变量容器本身，以便可以赋值

- RHS（right-hand side）：取得它的源（值）

- LHS 和 RHS 引用查询都从当前执行中的 作用域 开始，如果它们在这里没能找到它们要找的东西，它们会在嵌套的 作用域 中一路向上，一次一个作用域（层）地查找这个标识符，直到它们到达全局作用域（顶层）并停止，既可能找到也可能没找到。

### 词法作用域

**作用域是由编写时函数被声明的位置决策定义的**

- 有两种方式可以欺骗词法作用域：`eval`和`with`，它们压制了引擎在作用域查询上进行编译器优化的能力，不要使用它们。

### 变量和函数提升

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

## 闭包

**在js中闭包无所不在，你只是必须认出它并接纳它**

### 定义

**闭包就是函数能够记住并访问它的词法作用域，即使当这个函数在它的词法作用域之外执行时。**

### 问题

**为什么出现上下文的丢失，因为setTimeout的第一个参数做了一个赋值操作，所以导致它的上下文隐形绑定了外层的this，导致这样的结果。**

```js
var obj = {
    id: "awesome",
    cool: function coolFn() {
        console.log( this.id );
    }
};

var id = "not awesome";

obj.cool(); // awesome

setTimeout( obj.cool, 100 ); // not awesome, is undefined when in strict mode.
```

## 定义

**上下文`this`实际上是在函数被调用时建立的一个绑定，它指向什么完全由函数被调用的调用点来决定的**

## 调用点

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

## 四大规则

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

## 规则的顺序&判定this

1. 函数是通过`new`被调用的吗？如果是，`this`就是新构建的对象：`var bar = new foo()`

1. 函数是通过`call`或`apply`被调用的吗，甚至是隐藏在`bind`硬绑定之中吗？如果是，`this`就是那个被明确指定的对象： `var bar = foo.call( obj )`

1. 函数是通过环境对象（拥有者或容器对象）被调用的吗？如果是，`this`就是那个环境对象：`var bar = obj.foo()`

1. 否则，使用默认的`this`。如果在严格模式下，就是`undefined`，否则是`global`对象：`var bar = foo()`

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

- 在 `foo()` 中创建的箭头函数在词法上捕获 `foo()` 被调用时的 `this`，不管它是什么。因为 `foo()` 被 `this` 绑定到 `obj1`，`bar`（被返回的箭头函数的一个引用）也将会被 `this` 绑定到 `obj1`。一个箭头函数的词法绑定是不能被覆盖的（就连 `new` 也不行！）。

- `ES6` 的箭头方法使用词法作用域来决定 `this` 绑定，这意味着它们采用封闭他们的函数调用作为 `this` 绑定（无论它是什么）。它们实质上是 `ES6` 之前的 `self = this` 代码的语法替代品。

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

- 仅使用词法作用域并忘掉虚伪的 `this` 风格代码。

- 完全接受 `this` 风格机制，包括在必要的时候使用 `bind(..)`，并尝试避开 `self = this` 和箭头函数的“词法 `this`”技巧。

    - 通常一个程序可以接受两种风格（词法和`this`），但是一个函数内部应该只有一种风格

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

> 在js中，它们实际上仅仅是内建函数，每一个都可以作为构造器，仅仅在你需要使用额外的选项时使用构建形式，否则使用字面形式

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

  - `JSON` 安全的对象（也就是，可以被序列化为一个 `JSON` 字符串，之后还可以被重新解析为拥有相同的结构和值的对象）可以简单地这样 复制：`var newObj = JSON.parse( JSON.stringify( someObj ) );`

  - `var newObject = Object.assign({}, oldObject)`

## 属性描述符（es5新增）

- 可写性（`Writable`）：`writable` 控制着你改变属性值的能力。

- 可配置性（`Configurable`）：只要属性当前是可配置的，我们就可以使用相同的 `defineProperty(..)` 工具，修改它的描述符定义。

- 可枚举性（`Enumerable`）：控制着一个属性是否能在特定的对象-属性枚举操作中出现

- 不可变性（`Immutability`）：有时我们希望将属性或对象（有意或无意地）设置为不可改变的。所有 这些方法创建的都是浅不可变性。也就是，它们仅影响对象和它的直属属性的性质。如果对象拥有对其他对象（数组、对象、函数等）的引用，那个对象的 内容 不会受影响，任然保持可变。

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

- `Object.seal(..)` 创建一个“封印”的对象，这意味着它实质上在当前的对象上调用 `Object.preventExtensions(..)`，同时也将它所有的既存属性标记为 `configurable:false`。

- 所以，你既不能添加更多的属性，也不能重新配置或删除既存属性（虽然你依然 可以 修改它们的值）。

### 冻结

- Object.freeze(..) 创建一个冻结的对象，这意味着它实质上在当前的对象上调用 Object.seal(..)，同时也将它所有的“数据访问”属性设置为 writable:false，所以它们的值不可改变。

### Getters&Setters

- 当你将一个属性定义为拥有 getter 或 setter 或两者兼备，那么它的定义就成为了“访问器描述符”（与“数据描述符”相对）。对于访问器描述符，它的 value 和 writable 性质因没有意义而被忽略，取而代之的是 JS 将会考虑属性的 set 和 get 性质（还有 configurable 和 enumerable）。

## 类

- 类是一种设计模式。许多语言提供语法来启用自然而然的面向类的软件设计。JS 也有相似的语法，但是它的行为和你在其他语言中熟悉的工作原理 有很大的不同。

**类意味着拷贝。**

- 当一个传统的类被实例化时，就发生了类的行为向实例中拷贝。当类被继承时，也发生父类的行为向子类的拷贝。

- 多态（在继承链的不同层级上拥有同名的不同函数）也许看起来意味着一个从子类回到父类的相对引用链接，但是它仍然只是拷贝行为的结果。

- JavaScript 不会自动地 （像类那样）在对象间创建拷贝。

- mixin 模式常用于在 某种程度上 模拟类的拷贝行为，但是这通常导致像显式假想多态那样（OtherObj.methodName.call(this, ...)）难看而且脆弱的语法，这样的语法又常导致更难懂和更难维护的代码。

- 明确的 mixin 和类 拷贝 又不完全相同，因为对象（和函数！）仅仅是共享的引用被复制，不是对象/函数自身被复制。不注意这样的微小之处通常是各种陷阱的根源。

- 一般来讲，在 JS 中模拟类通常会比解决当前 真正 的问题埋下更多的坑。

## 原型

- 由于各种原因，不光是前面提到的术语，“继承”（和“原型继承”）与所有其他的 OO 用语，在考虑 JavaScript 实际如何工作时都没有道理。

- 相反，“委托”是一个更确切的术语，因为这些关系不是 拷贝 而是委托 链接。

## 行为委托

- 在你的软件体系结构中，类和继承是你可以 选用 或 不选用 的设计模式。多数开发者理所当然地认为类是组织代码的唯一（正确的）方法，但我们在这里看到了另一种不太常被提到的，但实际上十分强大的设计模式：行为委托。

- 行为委托意味着对象彼此是对等的，在它们自己当中相互委托，而不是父类与子类的关系。JavaScript 的 [[Prototype]] 机制的设计本质，就是行为委托机制。这意味着我们可以选择挣扎着在 JS 上实现类机制，也可以欣然接受 [[Prototype]] 作为委托机制的本性。

- 当你仅用对象设计代码时，它不仅能简化你使用的语法，而且它还能实际上引领更简单的代码结构设计。

- OLOO（链接到其他对象的对像）是一种没有类的抽象，而直接创建和关联对象的代码风格。OLOO 十分自然地实现了基于 [[Prototype]] 的行为委托。

## 异步与稍后

### fetch、ajax区别

> [github(https://github.com/camsong/blog/issues/2)

### promise、generator、async的区别

> [你不知道的JS](https://github.com/getify/You-Dont-Know-JS/blob/1ed-zh-CN/async%20&%20performance/README.md)

### ajax请求

**永远不要发起同步Ajax请求，它将锁定浏览器的UI而且阻止用户与任何东西互动。**

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

### 调试

**因为不同浏览器的`console`触发机制有可能不同，所以最好采用断点调试（debugger）或者使用`JSON.stringify`**

### 事件轮询

**程序通常被打断成许多小的代码块儿，它们一个接一个地在事件轮询队列中执行。而且从技术上说，其他与你的程序没有直接关系的事件也可以穿插在队列中。**
**ES6改变了事件轮询队列在何处被管理的性质。这主要是一个正式的技术规范，ES6现在明确地指出了事件轮询应当如何工作，这意味着它技术上属于JS引擎应当关心的范畴内，而不仅仅是 宿主环境。这么做的一个主要原因是为了引入ES6的Promises（我们将在第三章讨论），因为人们需要有能力对事件轮询队列的排队操作进行直接，细粒度的控制**

**有一个通过while循环来表现的持续不断的循环，这个循环的每一次迭代称为一个“tick”。在每一个“tick”中，如果队列中有一个事件在等待，它就会被取出执行。这些事件就是你的函数回调。没有一般的方法可以插队和跳到队列的最前方。**

### Jobs

- 在ES6中，在事件轮询队列之上引入了一层新概念，称为“工作队列（Job queue）”。

- 事件轮询队列就像一个游乐园项目，一旦你乘坐完一次，你就不得不去队尾排队来乘坐下一次。而工作队列就像乘坐完后，立即插队乘坐下一次。

- 一个Job还可能会导致更多的Job被加入同一个队列的末尾。所以，一个在理论上可能的情况是，Job“轮询”（一个Job持续不断地加入其他Job等）会无限地转下去，从而拖住程序不能移动到一下一个事件轮询tick。这与在你的代码中表达一个长时间运行或无限循环（比如while (true) ..）在概念上几乎是一样的。

### 复习

- 一个JavaScript程序总是被打断为两个或更多的代码块儿，第一个代码块儿 现在 运行，下一个代码块儿 稍后 运行，来响应一个事件。虽然程序是一块儿一块儿地被执行的，但它们都共享相同的程序作用域和状态，所以对状态的每次修改都是在前一个状态之上的。

- 不论何时有事件要运行，事件轮询 将运行至队列为空。事件轮询的每次迭代称为一个“tick”。用户交互，IO，和定时器会将事件在事件队列中排队。

- 在任意给定的时刻，一次只有一个队列中的事件可以被处理。当事件执行时，他可以直接或间接地导致一个或更多的后续事件。

- 并发是当两个或多个事件链条随着事件相互穿插，因此从高层的角度来看，它们在 同时 运行（即便在给定的某一时刻只有一个事件在被处理）。

- 在这些并发“进程”之间进行某种形式的互动协调通常是有必要的，比如保证顺序或防止“竞合状态”。这些“进程”还可以 协作：通过将它们自己打断为小的代码块儿来允许其他“进程”穿插。

## 回调

- 回调是JS中异步的基础单位。但是随着JS的成熟，它们对于异步编程的演化趋势来讲显得不够。

- 首先，我们的大脑用顺序的，阻塞的，单线程的语义方式规划事情，但是回调使用非线性，非顺序的方式表达异步流程，这使我们正确推理这样的代码变得非常困难。不好推理的代码是导致不好的Bug的不好的代码。

- 我们需要一个种方法，以更同步化，顺序化，阻塞的方式来表达异步，正如我们的大脑那样。

- 第二，而且是更重要的，回调遭受着 控制反转 的蹂躏，它们隐含地将控制权交给第三方（通常第三方工具不受你控制！）来调用你程序的 延续。这种控制权的转移使我们得到一张信任问题的令人不安的列表，比如回调是否会比我们期望的被调用更多次。

- 制造特殊的逻辑来解决这些信任问题是可能的，但是它比它应有的难度高多了，还会产生更笨重和更难维护的代码，而且在bug实际咬到你的时候代码会显得在这些危险上被保护的不够。

- 我们需要一个 所有这些信任问题 的一般化解决方案。一个可以被所有我们制造的回调复用，而且没有多余的模板代码负担的方案。

- 我们需要比回调更好的东西。目前为止它们做的不错，但JavaScript的 未来 要求更精巧和强大的异步模式。本书的后续章节将会深入这些新兴的发展变化。

## Promises

- `Promise.all([...])`返回的结果顺序和传入的数组顺序一致

## Generator

- generator是一种ES6的新函数类型，它不像普通函数那样运行至完成。相反，generator可以暂停在一种中间完成状态（完整地保留它的状态），而且它可以从暂停的地方重新开始。

- 这种暂停/继续的互换是一种协作而非抢占，这意味着generator拥有的唯一能力是使用yield关键字暂停它自己，而且控制这个generator的 迭代器 拥有的唯一能力是继续这个generator（通过next(..)）。

- yield/next(..)的对偶不仅是一种控制机制，它实际上是一种双向消息传递机制。一个yield ..表达式实质上为了等待一个值而暂停，而下一个next(..)调用将把值（或隐含的undefined）传递回这个暂停的yield表达式。

- 与异步流程控制关联的generator的主要好处是，在一个generator内部的代码以一种自然的同步/顺序风格表达一个任务的各个步骤的序列。这其中的技巧是我们实质上将潜在的异步处理隐藏在yield关键字的后面——将异步处理移动到控制generator的 迭代器 代码中。

- 换句话说，generator为异步代码保留了顺序的，同步的，阻塞的代码模式，这允许我们的大脑更自然地推理代码，解决了基于回调的异步产生的两个关键问题中的一个。

## 程序性能

- 异步编码模式给了你编写更高效代码的能力，这通常是一个非常重要的改进。但是异步行为也就能帮你这么多，因为它在基础上仍然使用一个单独的事件轮询线程。

- Web Worker让你在一个分离的线程上运行一个JS文件（也就是程序），使用异步事件在线程之间传递消息。对于将长时间运行或资源密集型任务挂载到一个不同线程，从而让主UI线程保持相应来说，它们非常棒。

- SIMD提议将CPU级别的并行数学操作映射到JavaScript API上来提供高性能数据并行操作，比如在大数据集合上进行数字处理。

- 最后，asm.js描述了一个JavaScript的小的子集，它回避了JS中不易优化的部分（比如垃圾回收与强制转换）并让JS引擎通过主动优化识别并运行这样的代码。asm.js可以手动编写，但是极其麻烦且易错，就像手动编写汇编语言。相反，asm.js的主要意图是作为一个从其他高度优化的程序语言交叉编译来的目标——例如，[Emscripten](https://github.com/kripken/emscripten/wiki)可以将C/C++转译为JavaScript。

- 在很早以前的有关JavaScript的讨论中存在着更激进的想法，包括近似地直接多线程功能（不仅仅是隐藏在数据结构API后面）。无论这是否会明确地发生，还是我们将看到更多并行机制偷偷潜入JS，但是在JS中发生更多程序级别优化的未来是可以确定的。

## 基准分析与调优

- 有效地对一段代码进行性能基准分析，特别是将它与同样代码的另一种写法相比较来看哪一种方式更快，需要小心地关注细节。

- 与其运行你自己的统计学上合法的基准分析逻辑，不如使用Benchmark.js库，它会为你搞定。但要小心你如何编写测试，因为太容易构建一个看起来合法但实际上有漏洞的测试了——即使是一个微小的区别也会使结果歪曲到完全不可靠。

- 尽可能多地从不同的环境中得到尽可能多的测试结果来消除硬件/设备偏差很重要。jsPerf.com是一个用于大众外包性能基准分析测试的神奇网站。

- 许多常见的性能测试不幸地痴迷于无关紧要的微观性能细节，比如比较x++和++x。编写好的测试意味着理解如何聚焦大局上关注的问题，比如在关键路径上优化，和避免落入不同JS引擎的实现细节的陷阱。

- 尾部调用优化（TCO）是一个ES6要求的优化机制，它会使一些以前在JS中不可能的递归模式变得可能。TCO允许一个位于另一个函数的 尾部位置 的函数调用不需要额外的资源就可以执行，这意味着引擎不再需要对递归算法的调用栈深度设置一个随意的限制了。

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

### `var a = a || b`这样写有什么问题
如果a是false类型的值，则会丢失该类型的值，取b值

### Object.assgin
```js
const a = {name: 'a'}
const b = {gender: 1}
console.log(Object.assign(a, b) === a); // true
console.log(a); // {name: 'a', gender: 1}
console.log(b); // {gender: 1}
```

> [正则表达式](http://www.runoob.com/regexp/regexp-syntax.html)

> [其它问题1](http://www.imooc.com/article/14292)

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

> [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof)

instanceof 运算符用来测试一个对象在其原型链中是否存在一个构造函数的 prototype 属性。

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

> [博客](http://www.cnblogs.com/humin/p/4556820.html)

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

## 如何编写高性能的Javascript？

> [博客](https://segmentfault.com/a/1190000007604645)

## 那些操作会造成内存泄漏？

> [博客](https://www.jianshu.com/p/763ba9562864)

## 把 Script 标签 放在页面的最底部的body封闭之前 和封闭之后有什么区别？浏览器会如何解析它们？

> [知乎](https://www.zhihu.com/question/20027966)

## 那些操作会造成内存泄漏？
内存泄漏指任何对象在您不再拥有或需要它之后仍然存在。
垃圾回收器定期扫描对象，并计算引用了每个对象的其他对象的数量。如果一个对象的引用数量为 0（没有其他对象引用过该对象），或对该对象的惟一引用是循环的，那么该对象的内存即可回收。

setTimeout 的第一个参数使用字符串而非函数的话，会引发内存泄漏。
闭包、控制台日志、循环（在两个对象彼此引用且彼此保留时，就会产生一个循环）

## Node.js的适用场景？

> [知乎](https://www.zhihu.com/question/19653241)

## 什么是“前端路由”?什么时候适合使用“前端路由”? “前端路由”有哪些优点和缺点?

> [csdn](https://blog.csdn.net/weixin_39717076/article/details/80650506)

## 知道什么是webkit么? 知道怎么用浏览器的各种工具来调试和debug代码么?

WebKit 是一个谷歌的浏览器引擎 
1）Drosera    可以调试任何WebKit程序，不仅仅是Safari浏览器。
2)Dragonfly
源代码视图有语法高亮，可以设置断点。强大的搜索功能，支持正则表达式。
3）Getfirebug
可以在任何网页编辑、调试和实时监视CSS、HTML和JavaScript。
4)Venkman
Venkman是Mozilla的JavaScript调试器名称。它旨在为以Mozilla为基础的浏览器（Firefox, Netscape 7.x/9.x and SeaMonkey）提供一个强大的JavaScript调试环境

## 前端templating(Mustache, underscore, handlebars)是干嘛的, 怎么用?

> [博客](http://web.jobbole.com/84420/)

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

## 函数节流和防抖？
> [cnblog](https://www.cnblogs.com/fsjohnhuang/p/4147810.html)

## Object.is() 与原来的比较操作符“ ===”、“ ==”的区别？
  两等号判等，会在比较时进行类型转换；
  三等号判等(判断严格)，比较时不进行隐式类型转换,（类型不同则会返回false）；

  Object.is 在三等号判等的基础上特别处理了 NaN 、-0 和 +0 ，保证 -0 和 +0 不再相同，
  但 Object.is(NaN, NaN) 会返回 true.

  Object.is 应被认为有其特殊的用途，而不能用它认为它比其它的相等对比更宽松或严格。

## ES6是如何实现编译成ES5的？

> [知乎](https://zhuanlan.zhihu.com/p/27289600)

## css-loader的原理？

> [webpack: css-loader](https://webpack.docschina.org/loaders/css-loader/)

## 当组件的setState函数被调用之后，发生了什么？

React会做的第一件事就是把你传递给setState的参数对象合并到组件原先的state。这个事件会导致一个“reconciliation”（调和）的过程。reconciliation的最终目标就是，
尽可能以最高效的方法，去基于新的state来更新UI。为了达到这个目的，React会构建一个React元素树（你可以把这个想象成一个表示UI的一个对象）。一旦这个树构建完毕，
React为了根据新的state去决定UI要怎么进行改变，它会找出这棵新树和旧树的不同之处。React能够相对精确地找出哪些位置发生了改变以及如何发生了什么变化，
并且知道如何只通过必要的更新来最小化重渲染。
为什么循环产生的组件中要利用上key这个特殊的prop？

Keys负责帮助React跟踪列表中哪些元素被改变/添加/移除。React利用子元素的key在比较两棵树的时候，快速得知一个元素是新的还是刚刚被移除。没有keys，React也就不知道当前哪一个的item被移除了。

## React-router 路由的实现原理？

> [github](https://github.com/youngwind/blog/issues/109)

## 说说React Native,Weex框架的实现原理？

> [简书](https://www.jianshu.com/p/5cc61ec04b39)

## 受控组件(Controlled Component)与非受控组件(Uncontrolled Component)的区别

> [](https://blog.csdn.net/m0_37566424/article/details/78863566)

## refs 是什么?
Refs是能访问DOM元素或组件实例的一个函数；

## React为什么自己定义一套事件体系呢，与浏览器原生事件体系有什么关系？

> [知乎专栏](https://zhuanlan.zhihu.com/p/27132447)

## 什么时候应该选择用class实现一个组件，什么时候用一个函数实现一个组件？
组件用到了state或者用了生命周期函数，那么就该使用Class component。其他情况下，应使用Functional component。

## 什么是HoC（Higher-Order Component）？适用于什么场景？
高阶组件就是一个 React 组件包裹着另外一个 React 组件

## 并不是父子关系的组件，如何实现相互的数据通信？
使用父组件，通过props将变量传入子组件（如通过refs，父组件获取一个子组件的方法，简单包装后，将包装后的方法通过props传入另一个子组件）

## Redux是如何做到可预测呢？

> [知乎](https://www.zhihu.com/question/38591713)

## Redux将React组件划分为哪两种？Redux是如何将state注入到React组件上的？

> [阮一峰](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_three_react-redux.html)

## 请描述一次完整的 Redux 数据流

> [github](https://alisec-ued.github.io/2016/11/23/%E5%9B%BE%E8%A7%A3Redux%E6%95%B0%E6%8D%AE%E6%B5%81(%E4%B8%80)/)

## React的批量更新机制 BatchUpdates？

> [知乎](https://zhuanlan.zhihu.com/p/28532725)

## React与Vue，各自的组件更新进行对比，它们有哪些区别？

> [知乎](https://www.zhihu.com/question/266656197)

## let和const

### let

- let所声明的变量，只在let命令所在的代码块内有效

- for循环
  - 如果使用var声明i，由于全局只有一个变量i，会导致每次循环引用的变量i都是同一个，这个仅限于循环内部有函数引用或者有延时操作，正常函数内部打印i还是ok的，例子：
  ```js
  var a = []
  for(var i = 0; i < 10; i++) {
    a[i] = function () {
      console.log(i)
    }
    console.log(i) // 0 ~ 9
  }
  a[9]() // 10
  i // 10：因为要做 i < 10 的判断，所以i肯定是10
  ```
  - 如果使用let，声明的变量仅在块级作用域内有效，每一次循环都是一个新的变量。js引擎内部会记住上一轮循环的值，初始化本轮变量i时，就是在上一轮循环的基础上进行计算
  - 特殊之处：设置循环变量的部分是一个父作用域，而循环体内部是一个单独的子作用域
  ```js
  for(let i = 0; i < 3; i++) {
    // console.log(i) i is not defined
    let i = 'mallow'
    console.log(i) // mallow
  }
  ```

- 不存在变量提升：使用var会发生变量提升的现象，值为undefined，let改变了语法行为，它所声明的对象一定要在声明后使用

- 暂时性死区：只要块级作用域内存在let或const命令，它所声明的变量就绑定了这个区域，不再受外部的影响，同上面的for循环特殊之处
```js
var tmp = 123
if (true) {
  tmp = 'abc' // ReferenceError: tmp is not defined
  let tmp
}
```

- 不允许重复声明
```js
function func(arg) {
  let arg // SyntaxError: Identifier 'arg' has already been declared
}
function func(arg) {
  {
    let arg
  }
}
```

### 块级作用域

- es5只有全局作用域和函数作用域，没有块级作用域，带来的不合理场景：
  - 内层变量可能会覆盖外层变量：变量提升导致的
  ```js
  var tmp = new Date()
  function f() {
    console.log(tmp)
    if(false) {
      var tmp = 'hello world'
    }
  }
  f()
  ```
  - 用来计数的循环变量泄漏为全局变量
  ```js
  var s = 'hello'
  for(var i = 0; i < s.length; i++) {
    console.log(s[i])
  }
  console.log(i)
  ```

- es6的块级作用域
  - let实际上为js新增了块级作用域
  - 允许块级作用域的任意嵌套
  - 内层作用域可以定义外层作用域的同名变量
  - 块级作用域的出现，实际上使得广泛应用的立即执行函数表达式（IIFE）不再必要了
  ```js
  // IIFE 写法
  (function () {
    var tmp = 'xxx'
  }())

  // 块级作用域写法
  {
    let tmp = 'xxx'
  }
  ```

### 块级作用域和函数声明

- 考虑到环境导致的行为差异太大，应该避免在块级作用域内声明函数。如果确实需要，也应该写成函数表达式，而不是函数声明语句

### const

- 声明一个只读的常量，一旦声明，值就不能改变

- 作用域和let相同：只在声明所在的块级作用域内有效

- 声明的常量也不提升，同样存在暂时性死区

- 不可重复声明

#### 本质

- const 实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动。

- 对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量

- 对于复合类型的数据（数组、对象），变量指向的是内存地址，保存的只是一个指向实际数据的指针，const 只能保证这个指针是固定的，至于它指向的数据结构是不是可变的，就完全不能控制了
  - 如果真想将对象冻结，应该使用Object.freeze方法：
  ```js
  const foo = Object.freeze({})
  // 常规模式时，下面一行不起作用
  // 严格模式时，该行会报错
  foo.prop = 123
  ```
  - 除了将对象本身冻结，对象的属性也应该被冻结，如：
  ```js
  function freeze(obj) {
    Object.freeze(obj)
    Object.keys(obj).forEach(key => {
      if(typeof obj[key] === 'object') {
        freeze(obj[key])
      }
    })
  }
  ```

### 声明对象的六种方法

- es5声明变量的方法：var、function
- es6：let、const、import、class

### 顶层对象的属性

- 在浏览器环境指的是window对象，在Node指的是global对象。ES5之中，顶层对象的属性和全局变量是等价的

- ES6为了改变这一点，一方面规定，为了保持兼容性，var命令和function命令声明的全局变量，依旧是顶层对象的属性；另一方面规定：let、const、class命令声明的全局对象，不属于顶层对象的属性。全局变量将逐步和顶层对象的属性脱钩

### global对象

- 不同环境的global对象不一样，垫片库 system.global 模拟了这个提案，可以在所有环境拿到global

## 变量的解构赋值

### 数组

```js
// before
let a = 1
let b = 2
let c = 3

// now
let [a, b, c] = [1, 2, 3]
```

#### 模式匹配

```js
let [a, [b, c]] = [1, [2, 3]]
let [ , , e] = [1, 2, 3]
let [f, , g] = [1, , 3]
let [h, ...j] = [1, 2, 3, 4] // j: [2, 3, 4]
let [x, y, ...z] = [1] // x: 1; y: undefined; z: []
```

#### 不完全解构

```js
let [x, y] = [1, 2, 3]
x // 1
y // 2

let [a, [b], d] = [1, [2, 3], 4]
a // 1
b // 2
d // 4
```

#### 不可遍历结构

```js
// 报错
let [foo] = 1
let [foo] = false
let [foo] = NaN
let [foo] = undefined
let [foo] = null
let [foo] = {}
```

#### Set结构

```js
let [x, y, z] = new Set(['a', 'b', 'c'])
x // 'a'

// 只要某种数据结构具有Iterator接口，都可以采用数组形式的解构赋值
function* fibs() {
  let a = 0
  let b = 1
  while (true) {
    yield a; // 这个地方必须要有分号
    [a, b] = [b, a + b];
  }
}
let [one, two, three, four, five, six] = fibs()
six // 5
```

#### 默认值

```js
let [foo = true] = []
foo // true
let [x, y = 'b'] = ['a'] // x: a; y: b
let [x, y = 'b'] = ['a', undefined] // x: a; y: b
// 只有undefined，默认值才生效
let [x = 1] = [null] // x: null

// 默认值是表达式
function f() {
  console.log('aaa')
}
let [x = f()] = [1] // 因为x能取到值，所以表达式是惰性求值的，即只有在用到的时候才会求值
```

#### 引用其他变量

> 变量必须提前声明

```js
let [x = 1, y = x] = [] // x: 1; y: 1
let [x = 1, y = x] = [2] // x: 2; y: 2
let [x = 1, y = x] = [1, 2] // x: 1; y: 2
let [x = y, y = 1] = [] // ReferenceError: y is not defined
```

### 对象

- 数组元素是按次序排列的，变量取值由它的位置决定的；而对象的属性没有次序，变量必须和属性同名，才能取到正确的值
```js
let {bar, foo, baz} = { foo: 'aaa', bar: 'bbb' }
foo // aaa
bar // bbb
baz // undefined
```

#### 变量名和属性名不一致

```js
let { foo: baz } = { foo: 'aaa', bar: 'bbb' }
baz // 'aaa'

let obj = { first: 'hello', last: 'world' }
let { first: f, last: l } = obj
f // 'hello'
l // 'world'
```

- 实际上，对象的解构赋值是下面形式的简写
```js
let { foo: foo, bar: bar } = { foo: 'aaa', bar: 'bbb' }
```

- 也就是说，是先找到同名属性，然后再赋值给对应的变量。
```js
let { foo: baz } = { foo: 'aaa', bar: 'bbb' }
baz // aaa
foo // error: foo is not defined
```

#### 嵌套结构的对象

```js
let obj = {
  p: [
    'hello',
    { y: 'World' }
  ]
}
let { p: [x, { y }] } = obj
x // 'Hello'
y // 'World'

// 将p作为变量赋值
let { p, p: [x, { y }] } = obj
x // Hello
y // World
p // [Hello, {y: World}]

// 解构到对象或数组
let obj = {}
let arr = []
// 这个地方必要要有()，避免js将其解释为代码块
({ foo: obj.prop, bar: arr[0] } = { foo: 123, bar: true })
obj // {prop: 123}
arr // [true]
```

#### 默认值

- 同样：默认值生效的条件是，对象的属性值严格等于undefined

```js
let {x = 3} = {}
let {x: y = 4} = {x: 5} // y: 5
```

#### 对数组进行对象属性的解构

```js
let arr = [1, 2, 3]
let {0: first, [arr.length - 1] : last} = arr
first // 1
last // 3
```

### 字符串

```js
const [a, b, c, d, e] = 'hello'
a // h
b // e
c // l
d // l
e // o

let {length: len} = 'hello'
len // 5
```

### 数值和布尔值

```js
let {toString: s} = 123
s === Number.prototype.toString // true
let {toString: s} = true
s === Boolean.prototype.toString // true

let { prop: x } = undefined // TypeError
let { prop: y } = null // TypeError
```

### 函数参数

```js
function add([x, y]) {
  return x + y
}
add([1, 2]) // 3

function move({x = 0, y = 0} = {}) {
  return [x, y]
}
move({x: 3, y: 8}) // [3, 8]
move({x: 3}) // [3, 0]
move({}) // [0, 0]
move() // [0, 0]
```

### 圆括号

- 尽量不要使用圆括号

- 可以使用圆括号的情况只有一种：赋值语句的非模式部分
```js
[(b)] = [3]
({ p: (d) } = {})
[(parseInt.prop)] = [3]
```

### 用途

- 交换变量的值
```js
let x = 1
let y = 2
[x, y] = [y, x]
```

- 从函数返回多个值
```js
function example() {
  return [1, 2, 3]
}
let [a, b, c] = example()

function exmaple() {
  return {
    foo: 1,
    bar: 2
  }
}
let { foo, bar } = exmaple()
```

- 函数参数的定义
```js
// 参数是一组有次序的值
function f([x, y, z]) {}
f([1, 2, 3])

// 参数是一组无次序的值
function f({x, y, z}) {}
f({z: 3, y: 2, x: 1})
```

- 提取JSON数据
```js
let json = {
  id: 42,
  status: 'ok',
  data: [111, 222]
}
let { id, status, data: numbers } = json
console.log(id, status, numbers)
```

- 函数参数的默认值
```js
function foo(a = 1, b = 2, c = false) {}
```

- 遍历Map解构：任何部署了Iterator接口的对象，都可以用for...of循环遍历。Map解构原生支持Iterator接口，配合变量的解构赋值，获取键名和键值就非常方便
```js
const map = new Map()
map.set('first', 'hello')
map.set('second', 'world')
for(let [key, value] of map) {
  console.log(key + ' is ' + value)
}
for(let [key] of map) {}
for(let [, value] of map) {}
```

### 输入模块的制定方法
```js
const { a, b } = require('ModuleName')
```

## 字符串的扩展

### Unicode表示法

- js允许采用\uxxxx形式表示一个字符，其中xxxx表示字符的Unicode码点

- 这种表示法只限于码点在\u0000~\uFFFF之间的字符，超出这个范围的字符，必须用两个双字节的形式表示

```js
"\u0061" // "a"

"\uD842\uDFB7" // 𠮷

"\u20BB7" // " 7" js会理解成\u20BB+7
```

- es6的改进：只要将码点放入大括号，就能正确解读该字符

```js
"\u{20BB7}" // "𠮷"
"\u{41}\u{42}\u{43}"
// "ABC"

let hello = 123;
hell\u{6F} // 123

'\u{1F680}' === '\uD83D\uDE80'
// true
```

- 6中方法表示一个字符

```js
'\z' === 'z' // true
'\172' === 'z' // true
'\x7A' === 'z' // true
'\u007A' === 'z' // true
'\u{7A}' === 'z' // true
```

### codePointAt

```js
var s = "𠮷";

s.length // 2
s.charAt(0) // ''
s.charAt(1) // ''
s.charCodeAt(0) // 55362
s.charCodeAt(1) // 57271
```

```js
let s = '𠮷a';

s.codePointAt(0) // 134071
s.codePointAt(1) // 57271

s.codePointAt(2) // 97

// 十六进制的值
let s = '𠮷a';

s.codePointAt(0).toString(16) // "20bb7"
s.codePointAt(2).toString(16) // "61"

let s = '𠮷a';
for (let ch of s) {
  console.log(ch.codePointAt(0).toString(16));
}
// 20bb7
// 61

function is32Bit(c) {
  return c.codePointAt(0) > 0xFFFF;
}

is32Bit("𠮷") // true
is32Bit("a") // false
```

### String.fromCodePoint

```js
String.fromCharCode(0x20BB7)
// "ஷ"

String.fromCodePoint(0x20BB7)
// "𠮷"
String.fromCodePoint(0x78, 0x1f680, 0x79) === 'x\uD83D\uDE80y'
// true
```

### 遍历器接口

```js
for (let codePoint of 'foo') {
  console.log(codePoint)
}
// "f"
// "o"
// "o"

let text = String.fromCodePoint(0x20BB7);

for (let i = 0; i < text.length; i++) {
  console.log(text[i]);
}
// " "
// " "

for (let i of text) {
  console.log(i);
}
// "𠮷"
```

### normalize

```js
'\u01D1'==='\u004F\u030C' //false

'\u01D1'.length // 1
'\u004F\u030C'.length // 2

// 用来将字符的不同表示方法统一为同样的形式，称为Unicode正规化
'\u01D1'.normalize() === '\u004F\u030C'.normalize()
// true
```

- normalize方法可以接受一个参数来指定normalize的方式，参数的四个可选值如下。
  - NFC，默认参数，表示“标准等价合成”（Normalization Form Canonical Composition），返回多个简单字符的合成字符。所谓“标准等价”指的是视觉和语义上的等价。
  - NFD，表示“标准等价分解”（Normalization Form Canonical Decomposition），即在标准等价的前提下，返回合成字符分解的多个简单字符。
  - NFKC，表示“兼容等价合成”（Normalization Form Compatibility Composition），返回合成字符。所谓“兼容等价”指的是语义上存在等价，但视觉上不等价，比如“囍”和“喜喜”。（这只是用来举例，normalize方法不能识别中文。）
  - NFKD，表示“兼容等价分解”（Normalization Form Compatibility Decomposition），即在兼容等价的前提下，返回合成字符分解的多个简单字符。
  ```js
  '\u004F\u030C'.normalize('NFC').length // 1
  '\u004F\u030C'.normalize('NFD').length // 2
  ```

### includes()、startsWith()、endsWith()

- includes(): 返回布尔值，表示是否找到了参数字符串
- startsWith(): 返回布尔值，表示参数字符串是否在原字符串的头部
- endsWith(): 返回布尔值，表示参数字符串是否在原字符串的尾部

```js
let s = 'Hello world!'
s.startsWidth('Hello') // true
s.endsWith('!') // true
s.includes('o') // true

// 支持第二个参数，表示开始搜索的位置
let s = 'Hello world!';
s.startsWith('world', 6) // true
s.endsWith('Hello', 5) // true
s.includes('Hello', 6) // false
```

### repeat()

- 返回一个新字符串，表示将原字符串重复n次
```js
'x'.repeat(3) // 'xxx'
'hello'.repeat(2) // 'hellohello'
'na'.repeat(0) // ''
'na'.repeat(2.9) // 'nana'
'na'.repeat(Infinity) // RangeError
'na'.repeat(-1) // RangeError
'na'.repeat(-0.9) // ''
'na'.repeat(NaN) // ''
'na'.repeat('na') // ''
'na'.repeat('3') // 'nanana'
```

### padStart()、padEnd()

- es2017引入了字符串补全长度的功能。如果某个字符串不够指定长度，会在头部或尾部补全

```js
'x'.padStart(5, 'ab') // 'ababx'
'x'.padStart(4, 'ab') // 'abax'

'x'.padEnd(5, 'ab') // 'xabab'
'x'.padEnd(4, 'ab') // 'xaba'

'xxx'.padStart(2, 'ab') // 'xxx'
'xxx'.padEnd(2, 'ab') // 'xxx'

'abc'.padStart(10, '0123456789') // '0123456abc'

'x'.padStart(4) // '    x'
'x'.padEnd(4) // 'x    '

// 用途：为数值补全指定位数
'1'.padStart(10, '0') // '0000000001'
'12'.padStart(10, '0') // '0000000012'
'123456'.padStart(10, '0') // '0000123456'

// 用途：提示字符串格式
'12'.padStart(10, 'YYYY-MM-DD') // 'YYYY-MM-12'
'09-12'.padStart(10, 'YYYY-MM-DD') // 'YYYY-09-12'
```

### matchAll()

- 返回一个正则表达式在当前字符串的所有匹配

### 模版字符串

```js
// 所有的空格和缩进都会被保留在输出之中
`
<ul>
  <li>first</li>
  <li>second</li>
</ul>
`
// 如果不想用<ul>标签前面的换行，可以使用trim方法消除它
```

- 需要将变量名写在`${}`之中

- 还能嵌套：
```js
`${`${var2}`var1}`
```

### 模版编译

- [vue和react都有使用](http://es6.ruanyifeng.com/#docs/string#%E5%AE%9E%E4%BE%8B%EF%BC%9A%E6%A8%A1%E6%9D%BF%E7%BC%96%E8%AF%91)

### 标签模版

```js
alert`123`
// 等同于
alert(123)

let a = 5;
let b = 10;

tag`Hello ${ a + b } world ${ a * b }`;
// 等同于
tag(['Hello ', ' world ', ''], 15, 50);

function tag(stringArr, value1, value2){
  // ...
}

// 等同于

function tag(stringArr, ...values){
  // ...
}
```

## RegExp构造函数

- [参考地址](http://es6.ruanyifeng.com/#docs/regex)

## 数值的扩展

- [参考地址](http://es6.ruanyifeng.com/#docs/number)

### Number.isFinite()，Number.isNaN()

- 和传统的全局方法isFinite()和isNaN的区别：传统方法先调用Number()将非数值的值转为数值，再进行判断，而这两个新方法只对数值有效，Number.isFinite()对于非数值一律返回false，Number.isNaN()对NaN返回true，非NaN一律返回false

```js
isFinite(25) // true
isFinite("25") // true
Number.isFinite(25) // true
Number.isFinite("25") // false

isNaN(NaN) // true
isNaN("NaN") // true
Number.isNaN(NaN) // true
Number.isNaN("NaN") // false
Number.isNaN(1) // false
```

### Number.isInteger()

- 用来判断一个数值是否为整数
```js
Number.isInteger(25) // true
Number.isInteger(25.1) // false
Number.isInteger(25.0) // false
Number.isInteger() // false
Number.isInteger(null) // false
Number.isInteger('15') // false
Number.isInteger(true) // false
Number.isInteger(3.0000000000000002) // true
Number.isInteger(5E-324) // false
Number.isInteger(5E-325) // true
```

### Math对象的扩展

#### Math.trunc()
- 去除一个数的小数部分，返回整数部分
```js
Math.trunc(4.1) // 4
Math.trunc(4.9) // 4
Math.trunc(-4.1) // -4
Math.trunc(-4.9) // -4
Math.trunc(-0.1234) // -0
```

- 对于非数值，内部会使用Number方法将其先转为数值
```js
Math.trunc('123.456') // 123
Math.trunc(true) //1
Math.trunc(false) // 0
Math.trunc(null) // 0
```

- 对于空值和无法截取整数的值，返回NaN
```js
Math.trunc(NaN);      // NaN
Math.trunc('foo');    // NaN
Math.trunc();         // NaN
Math.trunc(undefined) // NaN
```

#### Math.sign()

- 用来判断一个数到底是正数、负数还是零。对于非数值，会先将其转换为数值
  - 参数为正数，返回+1
  - 参数为负数，返回-1
  - 参数为0，返回0
  - 参数为-0，返回-0
  - 其他值，返回NaN

```js
Math.sign(-5) // -1
Math.sign(5) // +1
Math.sign(0) // +0
Math.sign(-0) // -0
Math.sign(NaN) // NaN

Math.sign('')  // 0
Math.sign(true)  // +1
Math.sign(false)  // 0
Math.sign(null)  // 0
Math.sign('9')  // +1
Math.sign('foo')  // NaN
Math.sign()  // NaN
Math.sign(undefined)  // NaN
```

#### 指数运算符

```js
2 ** 2 // 4
2 ** 3 // 8

2 ** 3 ** 2 // 相当于 2 ** (3 ** 2) = 512
```

## 函数的扩展

### 参数的默认值

```js
// before es6
function log(x, y) {
  y = y || 'World';
  console.log(x, y);
}

log('Hello') // Hello World
log('Hello', 'China') // Hello China
log('Hello', '') // Hello World

// after es6
function log(x, y = 'World') {
  console.log(x, y);
}

log('Hello') // Hello World
log('Hello', 'China') // Hello China
log('Hello', '') // Hello

function Point(x = 0, y = 0) {
  this.x = x;
  this.y = y;
}

const p = new Point();
p // { x: 0, y: 0 }
```

- 阅读代码的人，可以立刻意识到哪些参数是可以省略的，不用查看函数体或文档
- 有利于将来的代码优化，即使未来版本在对外接口中，彻底拿掉这个参数，也不会导致以前的代码无法运行

- 参数变量是默认声明的，所以不能用let或const再次声明。

```js
function foo(x = 5) {
  let x = 1; // error
  const x = 2; // error
}
```

- 使用参数默认值时，函数不能有同名参数。

```js
// 不报错
function foo(x, x, y) {
  // ...
}

// 报错
function foo(x, x, y = 1) {
  // ...
}
// SyntaxError: Duplicate parameter name not allowed in this context
```

- 参数默认值不是传值的，而是每次都重新计算默认值表达式的值。也就是说，参数默认值是惰性求值的。

```js
let x = 99;
function foo(p = x + 1) {
  console.log(p);
}

foo() // 100

x = 100;
foo() // 101
```

- 和解构赋值默认值结合使用

```js
function foo({x, y = 5}) {
  console.log(x, y)
}
foo({}) // undefined 5
foo({x: 1}) // 1 5
foo({x: 1, y: 2}) // 1 2
foo() // TypeError

function foo({x, y = 5} = {}) {
  console.log(x, y);
}

foo() // undefined 5

function fetch(url, { body = '', method = 'GET', headers = {} }) {
  console.log(method);
}

fetch('http://example.com', {})
// "GET"

fetch('http://example.com')
// 报错

function fetch(url, { body = '', method = 'GET', headers = {} } = {}) {
  console.log(method);
}

fetch('http://example.com')
// "GET"
```

- 练习
```js
// 写法一
function m1({x = 0, y = 0} = {}) {
  return [x, y];
}

// 写法二
function m2({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}

// 函数没有参数的情况
m1() // [0, 0]
m2() // [0, 0]

// x 和 y 都有值的情况
m1({x: 3, y: 8}) // [3, 8]
m2({x: 3, y: 8}) // [3, 8]

// x 有值，y 无值的情况
m1({x: 3}) // [3, 0]
m2({x: 3}) // [3, undefined]

// x 和 y 都无值的情况
m1({}) // [0, 0];
m2({}) // [undefined, undefined]

m1({z: 3}) // [0, 0]
m2({z: 3}) // [undefined, undefined]
```

- 参数默认值的位置
```js
// 例一
function f(x = 1, y) {
  return [x, y];
}

f() // [1, undefined]
f(2) // [2, undefined])
f(, 1) // 报错
f(undefined, 1) // [1, 1]

// 例二
function f(x, y = 5, z) {
  return [x, y, z];
}

f() // [undefined, 5, undefined]
f(1) // [1, 5, undefined]
f(1, ,2) // 报错
f(1, undefined, 2) // [1, 5, 2]

function foo(x = 5, y = 6) {
  console.log(x, y);
}

foo(undefined, null)
// 5 null
```

### length属性

- 指定了默认值以后，函数的length属性，将返回没有指定默认值的参数个数。也就是说，指定了默认值后，length属性将失真

### 作用域

```js
// example-1
var x = 1;

function f(x, y = x) {
  console.log(y);
}

f(2) // 2

// example-2
let x = 1;

function f(y = x) {
  let x = 2;
  console.log(y);
}

f() // 1

// example-3
function f(y = x) {
  let x = 2;
  console.log(y);
}

f() // ReferenceError: x is not defined

// example-4
var x = 1;

function foo(x = x) {
  // ...
}

foo() // ReferenceError: x is not defined

// example-5
let foo = 'outer';

function bar(func = () => foo) {
  let foo = 'inner';
  console.log(func());
}

bar(); // outer

// example-6
function bar(func = () => foo) {
  let foo = 'inner';
  console.log(func());
}

bar() // ReferenceError: foo is not defined

// example-7
var x = 1;
function foo(x, y = function() { x = 2; }) {
  var x = 3;
  y();
  console.log(x);
}

foo() // 3
x // 1

// example-8
var x = 1;
function foo(x, y = function() { x = 2; }) {
  x = 3;
  y();
  console.log(x);
}

foo() // 2
x // 1

// 指定某一个参数不得省略，如果省略就抛出一个错误
function throwIfMissing() {
  throw new Error('Missing parameter');
}

function foo(mustBeProvided = throwIfMissing()) {
  return mustBeProvided;
}

foo()
// Error: Missing parameter

// 将参数默认值设为undefined，表明这个参数可以省略的
function foo(optional = undefined) { ··· }
```

### rest参数

- 用于获取函数的多余参数，这样就不需要使用arguments对象了，rest参数搭配的变量是一个数组，该变量将多余的参数放入数组中
```js
function add(...values) {
  let sum = 0
  for (var val of values) {
    sum += val
  }
  return sum
}
add(2, 5, 3) // 10
```

- example:
```js
// arguments变量的写法
function sortNumbers() {
  return Array.prototype.slice.call(arguments).sort();
}

// rest参数的写法
const sortNumbers = (...numbers) => numbers.sort();

function push(array, ...items) {
  items.forEach(function(item) {
    array.push(item);
    console.log(item);
  });
}

var a = [];
push(a, 1, 2, 3)
```

- rest参数之后不能再有其他参数
```js
// 报错
function f(a, ...b, c) {
  // ...
}
```

- 函数的length属性，不包括rest参数
```js
(function(a) {}).length  // 1
(function(...a) {}).length  // 0
(function(a, ...b) {}).length  // 1
```

### 严格模式

- 从es5开始，函数内部可以设定为严格模式

- es6做了一点修改，规定只要函数参数使用了默认值、解构赋值、扩展运算符，那么函数内部就不能显式设定为严格模式，否则会报错

### name属性

- 函数的name属性，返回该函数的函数名

```js
function foo() {}
foo.name // 'foo'

var f = function () {};

// ES5
f.name // ""

// ES6
f.name // "f"

const bar = function baz() {};

// ES5
bar.name // "baz"

// ES6
bar.name // "baz"

(new Function).name // "anonymous"

function foo() {};
foo.bind({}).name // "bound foo"

(function(){}).bind({}).name // "bound "
```

### 箭头函数

- 基本用法

```js
var f = v => v;

// 等同于
var f = function (v) {
  return v;
};

var f = () => 5;
// 等同于
var f = function () { return 5 };

var sum = (num1, num2) => num1 + num2;
// 等同于
var sum = function(num1, num2) {
  return num1 + num2;
};

var sum = (num1, num2) => { return num1 + num2; }

// 报错
let getTempItem = id => { id: id, name: "Temp" };

// 不报错
let getTempItem = id => ({ id: id, name: "Temp" });

let foo = () => { a: 1 };
foo() // undefined

// 箭头函数只有一行语句，且不需要返回值
let fn = () => void doesNotReturn();

const full = ({ first, last }) => first + ' ' + last;

// 等同于
function full(person) {
  return person.first + ' ' + person.last;
}

const isEven = n => n % 2 == 0;
const square = n => n * n;

// 正常函数写法
[1,2,3].map(function (x) {
  return x * x;
});

// 箭头函数写法
[1,2,3].map(x => x * x);

// 正常函数写法
var result = values.sort(function (a, b) {
  return a - b;
});

// 箭头函数写法
var result = values.sort((a, b) => a - b);

const numbers = (...nums) => nums;

numbers(1, 2, 3, 4, 5)
// [1,2,3,4,5]

const headAndTail = (head, ...tail) => [head, tail];

headAndTail(1, 2, 3, 4, 5)
// [1,[2,3,4,5]]
```

#### 注意点

- 函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象，不能使用call、apply、bind这些方法去改变this的指向

- 不可以当作构造函数，也就是说不可以使用new命令，否则会抛出一个错误

- 不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用rest参数代替。也不存在super、new.target

- 不可以使用yield命令，因此箭头函数不能用作Generator函数

### 双冒号运算符

```js
foo::bar
// 等同于
bar.bind(foo)

foo::bar(...arguments)
// 等同于
bar.apply(foo, arguments)
```

### 尾调用优化

> es6的尾递归优化只在严格模式下开启，正常模式是无效的，因为在正常模式下，函数内部有两个变量，可以跟踪函数的调用栈：func.arguments、func.caller

- 是函数式编程的一个重要概念，指某个函数的最后一步是调用另一个函数
```js
function f(x) {
  return g(x)
}
```

- 尾调用由于是函数的最后一步操作，所以不需要保留外层函数的调用帧，因为调用位置、内部变量等信息都不会再用到了，只要直接用内层函数的调用帧，取代外层函数的调用帧就可以了
```js
function f() {
  let m = 1;
  let n = 2;
  return g(m + n);
}
f();

// 等同于
function f() {
  return g(3);
}
f();

// 等同于
g(3);
```

- 只有不再用到外层函数的内部变量，内层函数的调用帧才会取代外层函数的调用帧，否则就无法进行“尾调用优化”
```js
function addOne(a) {
  var one = 1
  function inner(b) {
    return b + one
  }
  return inner(a)
}
```

- 非尾递归的 Fibonacci 数列实现如下。
```js
function Fibonacci (n) {
  if ( n <= 1 ) {return 1};

  return Fibonacci(n - 1) + Fibonacci(n - 2);
}

Fibonacci(10) // 89
Fibonacci(100) // 堆栈溢出
Fibonacci(500) // 堆栈溢出
```

- 尾递归优化过的 Fibonacci 数列实现如下。
```js
function Fibonacci2 (n , ac1 = 1 , ac2 = 1) {
  if( n <= 1 ) {return ac2};

  return Fibonacci2 (n - 1, ac2, ac1 + ac2);
}

Fibonacci2(100) // 573147844013817200000
Fibonacci2(1000) // 7.0330367711422765e+208
Fibonacci2(10000) // Infinity
```

- es6第一次明确规定，所有ECMAScript的实现，都必须部署尾递归，这样就不会发生栈溢出，相对节省内存。

- 函数柯里化
```js
function currying(fn, n) {
  return function (m) {
    return fn.call(this, m, n);
  };
}

function tailFactorial(n, total) {
  if (n === 1) return total;
  return tailFactorial(n - 1, n * total);
}

const factorial = currying(tailFactorial, 1);

factorial(5) // 120

// 采用es6的函数默认值
function factorial(n, total = 1) {
  if (n === 1) return total;
  return factorial(n - 1, n * total);
}

factorial(5) // 120
```

#### 尾递归优化的实现

- 蹦床函数
```js
function trampoline(f) {
  while (f && f instanceof Function) {
    f = f()
  }
  return f
}
```

- 真正的实现
```js
function tco(f) {
  var value
  var active = false
  var accumulated = []
  return function accumulator() {
    accumulated.push(arguments)
    if(!active) {
      active = false
      while (accumulated.length) {
        value = f.apply(this, accumulated.shift())
      }
      active = false
      return value
    }
  }
}

var sum = tco(function(x, y) {
  if(y > 0) {
    return sum(x + 1, y -1)
  } else {
    return x
  }
})

sum(1, 100000)
```

- 上面代码中，tco函数是尾递归优化的实现，它的奥妙就在于状态变量active。默认情况下，这个变量是不激活的。一旦进入尾递归优化的过程，这个变量就激活了。然后，每一轮递归sum返回的都是undefined，所以就避免了递归执行；而accumulated数组存放每一轮sum执行的参数，总是有值的，这就保证了accumulator函数内部的while循环总是会执行。这样就很巧妙地将“递归”改成了“循环”，而后一轮的参数会取代前一轮的参数，保证了调用栈只有一层。

## 数组的扩展

### 扩展运算符

```js
...[1, 2, 3]
// 1 2 3

// 函数调用
function push(array, ...items) {
  array.push(...items)
}

function add(x, y) {
  return x + y
}

const numbers = [4, 38]
add(...numbers) // 42
```

- 该方法可以替代函数的apply方法

- 应用
```js
// 复制数组，是一种浅拷贝
const a1 = [1, 2]
const a2 = [...a1]
const [...a2] = a1

// 合并数组
const a1 = [1, 2]
const a2 = [3]
const a3 = [4, 5]

// es5
a1.concat(a2, a3)

// es6
[...a1, ...a2, ...a3]
```

- 将字符串转为真正的数组
```js
[...'hello']
// ['h', 'e', 'l', 'l', 'o']
```

### Array.from()

- 用于将两类对象转为真正的数组：类似数组的对象和可遍历对象（Set、Map）
```js
let arrayLike = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3
}
// es5
var arr1 = [].slice.call(arrayLike) // ['a', 'b', 'c']

// es6
var arr2 = Array.from(arrayLike) // ['a', 'b', 'c']
```

- 只要是部署了Iterator接口的数据结构，Array.from都能将其转为数组
```js
Array.from('hello')
let nameSet = new Set(['a', 'b'])
Array.from(nameSet) // ['a', 'b']
```

- 任何有length属性的对象，都可以通过Array.from方法转为数组
```js
Array.from({ length: 3 })
```

- polyfill
```js
const toArray = (() => {
  Array.from ? Array.from : obj => [].slice.call(obj)
})()
```

- 第二个参数：类似数组的map方法
```js
Array.from(arrayLike, x => x * x);
// 等同于
Array.from(arrayLike).map(x => x * x);

Array.from([1, 2, 3], (x) => x * x)
// [1, 4, 9]
```

### Array.of()

- 将一组值，转换为数组
```js
Array.of(3, 11, 8) // [3, 11, 8]
Array.of(3) // [3]
Array.of(3).length // 1
```

### copyWithin

- 在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。使用这个方法，会修改当前数组

### find()、findIndex()

- find用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。如果没有符合条件的成员，则返回undefined

- 数组实例的findIndex方法的用法与find方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1。

- 这两个方法都可以接受第二个参数，用来绑定回调函数的this对象

### fill

```js
// 填充数组
new Array(3).fill(7)
[7, 7, 7]

// 制定填充的起始位置和结束位置
['a', 'b', 'c'].fill(7, 1, 2) // ['a', 7, 'c']

// 注意，如果填充的类型为对象，那么被赋值的是同一个内存地址的对象，而不是深拷贝对象。

let arr = new Array(3).fill({name: "Mike"});
arr[0].name = "Ben";
arr
// [{name: "Ben"}, {name: "Ben"}, {name: "Ben"}]

let arr = new Array(3).fill([]);
arr[0].push(5);
arr
// [[5], [5], [5]]
```

### entries()、keys()、values()

```js
for (let index of ['a', 'b'].keys()) {
  console.log(index);
}
// 0
// 1

for (let elem of ['a', 'b'].values()) {
  console.log(elem);
}
// 'a'
// 'b'

for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}
// 0 "a"
// 1 "b"

// 如果不使用for...of循环，可以手动调用遍历器的next方法，进行遍历
let letter = ['a', 'b', 'c'];
let entries = letter.entries();
console.log(entries.next().value); // [0, 'a']
console.log(entries.next().value); // [1, 'b']
console.log(entries.next().value); // [2, 'c']
```

### includes
```js
[1, 2, 3].includes(2)     // true
[1, 2, 3].includes(4)     // false
[1, 2, NaN].includes(NaN) // true
```

### flat、flatMap
```js
[1, 2, [3, 4]].flat()
// [1, 2, 3, 4]

// flat()默认只会“拉平”一层，如果想要“拉平”多层的嵌套数组，可以将flat()方法的参数写成一个整数，表示想要拉平的层数，默认为1。

[1, 2, [3, [4, 5]]].flat()
// [1, 2, 3, [4, 5]]

[1, 2, [3, [4, 5]]].flat(2)
// [1, 2, 3, 4, 5]

// flatMap()方法对原数组的每个成员执行一个函数（相当于执行Array.prototype.map()），然后对返回值组成的数组执行flat()方法。该方法返回一个新数组，不改变原数组。

// flatMap()只能展开一层数组。

// 相当于 [[2, 4], [3, 6], [4, 8]].flat()
[2, 3, 4].flatMap((x) => [x, x * 2])
// [2, 4, 3, 6, 4, 8]
```

### 数组的空位

- es6明确将空位转为undefined

## 对象的扩展

### 属性的简洁表示法
```js
function f(x, y) {
  return {x, y};
}

// 等同于

function f(x, y) {
  return {x: x, y: y};
}

f(1, 2) // Object {x: 1, y: 2}

const o = {
  method() {
    return "Hello!";
  }
};

// 等同于

const o = {
  method: function() {
    return "Hello!";
  }
};
```

### 属性名表达式
```js
// es5
var obj = {
  foo: true,
  abc: 123
}

// es6
let propKey = 'foo'
let obj = {
  [propKey]: true,
  ['a' + 'bc']: 123
}

// 定义方法名
let obj = {
  ['h' + 'ello']() {
    return 'hi'
  }
}
obj.hello()

// 注意，属性名表达式如果是一个对象，默认情况下会自动将对象转为字符串[object Object]，这一点要特别小心。
const keyA = {a: 1};
const keyB = {b: 2};

const myObject = {
  [keyA]: 'valueA',
  [keyB]: 'valueB'
};

myObject // Object {[object Object]: "valueB"}
```

### 方法的name属性

```js
const person = {
  sayName() {
    console.log('hello!');
  },
};

person.sayName.name   // "sayName"


const obj = {
  get foo() {},
  set foo(x) {}
};

obj.foo.name
// TypeError: Cannot read property 'name' of undefined

const descriptor = Object.getOwnPropertyDescriptor(obj, 'foo');

descriptor.get.name // "get foo"
descriptor.set.name // "set foo"

(new Function()).name // "anonymous"

var doSomething = function() {
  // ...
};
doSomething.bind().name // "bound doSomething"

const key1 = Symbol('description');
const key2 = Symbol();
let obj = {
  [key1]() {},
  [key2]() {},
};
obj[key1].name // "[description]"
obj[key2].name // ""
```

### Object.is

- 行为和`===`基本类似，不同之处：
```js
+0 === -0 //true
NaN === NaN // false

Object.is(+0, -0) // false
Object.is(NaN, NaN) // true
```

### Object.assign()

> 这是浅拷贝

```js
const target = { a: 1 };

const source1 = { b: 2 };
const source2 = { c: 3 };

Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}

// 如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。

const target = { a: 1, b: 1 };

const source1 = { b: 2, c: 2 };
const source2 = { c: 3 };

Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}

// 如果只有一个参数，Object.assign会直接返回该参数。

const obj = {a: 1};
Object.assign(obj) === obj // true
```

### 属性的可枚举性和遍历

- 可枚举性
```js
let obj = { foo: 123 }
Object.getOwnPropertyDescriptor(obj, 'foo')
// {
//   value: 123,
//   writable: true,
//   enumerable: true,
//   configurable: true
// }
```

### 属性的遍历

- es6一共有5中方法可以遍历对象的属性
  - for...in：遍历对象自身的和继承的可枚举属性（不含Symbol属性）
  - Object.keys(obj)：返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含Symbol属性）的键名
  - Object.getOwnPropertyNames(obj)：返回一个数组，包含对象自身的所有属性（不含Symbol属性，但是包括不可枚举属性）的键名
  - Object.getOwnPropertySymbols(obj)：返回一个数组，包含对象自身的所有Symbol属性的键名
  - Reflect.ownKeys(obj)：返回一个数组，包含对象自身的所有键名，不管键名是Symbol或字符串，也不管是否可枚举
  - 遵守同样的属性遍历次序规则：
    - 首先遍历所有数值键，按照数值升序排列
    - 其次遍历所有字符串键，按照加入时间升序排列
    - 最后遍历所有Symbol键，按照加入时间升序排列

### Object.getOwnPropertyDescriptors()

- Object.getOwnPropertyDescriptor方法会返回某个对象属性的描述对象，es7引入了这个方法来返回指定对象所有自身属性（非继承属性）的描述对象

- 引入的目的主要是为了解决Object.assign()无法正确拷贝get属性和set属性的问题
```js
const source = {
  set foo(value) {
    console.log(value)
  }
}
const target1 = {}
Object.assign(target1, source)

Object.getOwnPropertyDescriptor(target1, 'foo')
// {
//   value: undefined,
//   writable: true,
//   enumerable: true,
//   configurable: true
// }
```

- 正确的拷贝：
```js
const source = {
  set foo(value) {
    console.log(value);
  }
};

const target2 = {};
Object.defineProperties(target2, Object.getOwnPropertyDescriptors(source));
Object.getOwnPropertyDescriptor(target2, 'foo')
// { get: undefined,
//   set: [Function: set foo],
//   enumerable: true,
//   configurable: true }
```

### __proto__、Object.setPrototypeOf()、Object.getPrototypeOf()

#### __proto__

- 用来读取或设置当前对象的prototype对象。目前，所有浏览器（包括IE11）都部署了这个属性
```js
// es5
const obj = {
  method: function () {}
}
obj.__proto__ = someOtherObj

// es6
var obj = Object.create(someOtherObj)
obj.method = function () {}
```

- 标准明确规定，只有浏览器必须部署这个属性，其他运行环境不一定需要部署，而且新的代码最好认为这个属性是不存在的。因此，无论从语义的角度，还是从兼容性的角度，都不要使用这个属性，而是使用下面的Object.setPrototypeOf()（写操作）、Object.getPrototypeOf()（读操作）、Object.create()（生成操作）代替。

#### Object.setPrototypeOf()

- Object.setPrototypeOf方法的作用与__proto__相同，用来设置一个对象的prototype对象，返回参数对象本身
```js
let proto = {};
let obj = { x: 10 };
Object.setPrototypeOf(obj, proto);

proto.y = 20;
proto.z = 40;

obj.x // 10
obj.y // 20
obj.z // 40
```

#### Object.getPrototypeOf()

- 该方法与Object.setPrototypeOf方法配套，用于读取一个对象的原型对象。
```js
Object.getPrototypeOf(obj);
```

### super关键字

- 我们知道，this关键字总是指向函数所在的当前对象，es6又新增了另一个类似的关键字super，指向当前对象的原型对象
```js
const proto = {
  foo: 'hello'
}

const obj = {
  foo: 'world',
  find() {
    return super.foo
  }
}

Object.setPrototypeOf(obj, proto)
obj.find() // 'hello'
```

### Object.keys()、Object.values()、Object。entries()

#### Object.keys()
- 返回一个数组，成员是参数对象自身的不含继承的所有可遍历属性的键名
```js
var obj = { foo: 'bar', baz: 42 }
Object.keys(obj)

let {keys, values, entries} = Object;
let obj = { a: 1, b: 2, c: 3 };

for (let key of keys(obj)) {
  console.log(key); // 'a', 'b', 'c'
}

for (let value of values(obj)) {
  console.log(value); // 1, 2, 3
}

for (let [key, value] of entries(obj)) {
  console.log([key, value]); // ['a', 1], ['b', 2], ['c', 3]
}
```

#### Object.values()

- 返回一个数组，成员是参数对象自身的不含继承的所有可遍历属性的键值
```js
const obj = { foo: 'bar', baz: 42 };
Object.values(obj)
// ["bar", 42]
```

#### Object.entries

- 返回一个数组，成员是参数对象自身的不含继承的所有可遍历属性的键值对数组
```js
const obj = { foo: 'bar', baz: 42 };
Object.entries(obj)
// [ ["foo", "bar"], ["baz", 42] ]
```

- 如果原对象的属性名是一个Symbol值，该属性会被忽略
```js
Object.entries({ [Symbol()]: 123, foo: 'abc' });
// [ [ 'foo', 'abc' ] ]
```

- 基本用途：
```js
// 遍历对象的属性
let obj = { one: 1, two: 2 };
for (let [k, v] of Object.entries(obj)) {
  console.log(
    `${JSON.stringify(k)}: ${JSON.stringify(v)}`
  );
}
// "one": 1
// "two": 2

// 将对象转为真正的Map结构
const obj = { foo: 'bar', baz: 42 };
const map = new Map(Object.entries(obj));
map // Map { foo: "bar", baz: 42 }
```

### 扩展运算符

#### 解构赋值
```js
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
x // 1
y // 2
z // { a: 3, b: 4 }
```

- 不能复制继承自原型对象的属性

#### 属性拷贝
```js
let z = { a: 3, b: 4 };
let n = { ...z };
n // { a: 3, b: 4 }
```

#### 完整的克隆一个对象

```js
const clone1 = {
  __proto__: Object.getPrototypeOf(obj),
  ...obj
}

const clone2 = Object.assign(
  Object.create(Object.getPrototypeOf(obj)),
  obj
)

const clone3 = Object.create(
  Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptors(obj)
)
```

## Symbol

### 概述
```js
let s = Symbol()
typeof s // 'symbol'
```
- 变量s是一个独一无二的值
- Symbol函数前不能使用new命令，否则会报错，因为生成的Symbol是一个原始类型的值，不是对象。由于Symbol值不是对象，所以不能添加属性

### 接受一个字符串为参数
```js
let s1 = Symbol('foo')
let s2 = Symbol('bar')

s1 // Symbol(foo)
s2 // Symbol(bar)

s1.toString() // 'Symbol(foo)'
s2.toString() // 'Symbol(bar)'
```

- 如果 Symbol 的参数是一个对象，就会调用该对象的toString方法，将其转为字符串，然后才生成一个 Symbol 值。

```js
const obj = {
  toString() {
    return 'abc';
  }
};
const sym = Symbol(obj);
sym // Symbol(abc)
```

- 注意，Symbol函数的参数只是表示对当前 Symbol 值的描述，因此相同参数的Symbol函数的返回值是不相等的。
```js
// 没有参数的情况
let s1 = Symbol();
let s2 = Symbol();

s1 === s2 // false

// 有参数的情况
let s1 = Symbol('foo');
let s2 = Symbol('foo');

s1 === s2 // false
```

- Symbol值不能和其他类型的值进行运算，会报错
```js
let sym = Symbol('My symbol');

"your symbol is " + sym
// TypeError: can't convert symbol to string
`your symbol is ${sym}`
// TypeError: can't convert symbol to string
```

- Symbol值可以显式转为字符串
```js
let sym = Symbol('My symbol');

String(sym) // 'Symbol(My symbol)'
sym.toString() // 'Symbol(My symbol)'
```

- Symbol值可以转为布尔值，但不能转为数值
```js
let sym = Symbol();
Boolean(sym) // true
!sym  // false

if (sym) {
  // ...
}

Number(sym) // TypeError
sym + 2 // TypeError
```

### 作为属性名的Symbol

- 由于每一个Symbol值都是不相等的，意味着Symbol值可以作为标识符，用于对象的属性名，能保证不会出现同名的属性。这对于一个对象由多个模块构成的情况非常有用，能防止某一个键被不小心改写或覆盖。
```js
let mySymbol = Symbol();

// 第一种写法
let a = {};
a[mySymbol] = 'Hello!';

// 第二种写法
let a = {
  [mySymbol]: 'Hello!'
};

// 第三种写法
let a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });

// 以上写法都得到同样结果
a[mySymbol] // "Hello!"
```

- Symbol值作为对象属性名时，不能用点运算符，在对象的内部，使用Symbol值定义属性时，Symbol值必须放在方括号中
```js
const mySymbol = Symbol()
const a = {}

a.mySymbol = 'hello!'
a[mySymbol] // undefined
a['mySymbol'] // 'hello!'

let s = Symbol()
let obj = {
  [s]: function (arg) {},
  [b](arg) {}
}
obj[s](123)
```

- Symbol类型还可以用于定义一组常量，保证这组常量的值都是不相等的
```js
const log = {}

log.levels = {
  DEBUG: Symbol('debug'),
  INFO: Symbol('info'),
  WARN: Symbol('warn')
}

console.log(log.levels.DEBUG, 'debug message');
console.log(log.levels.INFO, 'info message');
```

- Symbol值作为属性名时，该属性还是公开属性，不是私有属性

### 遍历

- Symbol作为属性名，不会出现在for..in、for...of循环中，也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回。它也不是私有属性，可以通过Object.getOwnPropertySymbols方法，获取指定对象的所有Symbol属性名

- Reflect.ownKeys可以返回所有类型的键名，包括常规键名和Symbol键名

### Symbol.for()、Symbol.keyFor()

- Symbol.for方法可以重新使用同一个Symbol值，它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的Symbol值。如果有，就返回这个Symbol值，否则就新建并返回一个以该字符串为名称的Symbol值
```js
let s1 = Symbol.for('foo')
let s2 = Symbol.for('foo')

s1 === s2 // true
```

- Symbol.keyFor方法返回一个已登记的Symbol类型值的key
```js
let s1 = Symbol.for('foo')
Symbol.keyFor(s1) // foo

let s2 = Symbol('foo')
Symbol.keyFor(s2) // undefined
```

### 内置的Symbol值

- Symbol.hasInstance：当其他对象使用instanceof运算符，判断是否为该对象的实例时，会调用这个方法
```js
class MyClass {
  [Symbol.hasInstance](foo) {
    return foo instanceof Array
  }
}

[1, 2, 3] instanceof new MyClass() // true
```

- Symbol.isConcatSpreadable：等于一个布尔值，表示该对象用于Array.prototype.concat()时，是否可以展开
```js
let arr1 = ['c', 'd'];
['a', 'b'].concat(arr1, 'e') // ['a', 'b', 'c', 'd', 'e']
arr1[Symbol.isConcatSpreadable] // undefined

let arr2 = ['c', 'd'];
arr2[Symbol.isConcatSpreadable] = false;
['a', 'b'].concat(arr2, 'e') // ['a', 'b', ['c','d'], 'e']
```

- Symbol.species：实例对象在运行过程中，需要再次调用自身的构造函数时，会调用该属性指定的构造函数。

- Symbol.match：指向一个函数，当执行str.match(myObject)时，如果该属性存在，会调用它，返回该方法的返回值

- Symbol.replace：指向一个方法，当该对象被String.prototype.replace方法调用时，会返回该方法的返回值

- Symbol.search：指向一个方法，当该对象被String.prototype.search方法调用时，会返回该方法的返回值

- Symbol.split：指向一个方法，当该对象被String.prototype.split方法调用时，会返回该方法的返回值

- Symbol.iterator：指向该对象的默认遍历器方法
```js
const myIterable = {};
myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};
[...myIterable] // [1, 2, 3]
```

- Symbol.toPrimitive：指向一个方法。该对象被转为原始类型的值时，会调用这个方法，返回该对象对应的原始类型值。Symbol.toPrimitive被调用时，会接受一个字符串参数，表示当前运算的模式，一共有三种模式。
  - Number：该场合需要转成数值
  - String：该场合需要转成字符串
  - Default：该场合可以转成数值，也可以转成字符串
```js
let obj = {
  [Symbol.toPrimitive](hint) {
    switch (hint) {
      case 'number':
        return 123;
      case 'string':
        return 'str';
      case 'default':
        return 'default';
      default:
        throw new Error();
     }
   }
};

2 * obj // 246
3 + obj // '3default'
obj == 'default' // true
String(obj) // 'str'
```

- Symbol.toStringTag：对象的Symbol.toStringTag属性，指向一个方法。在该对象上面调用Object.prototype.toString方法时，如果这个属性存在，它的返回值会出现在toString方法返回的字符串之中，表示对象的类型。也就是说，这个属性可以用来定制[object Object]或[object Array]中object后面的那个字符串。
```js
// 例一
({[Symbol.toStringTag]: 'Foo'}.toString())
// "[object Foo]"

// 例二
class Collection {
  get [Symbol.toStringTag]() {
    return 'xxx';
  }
}
let x = new Collection();
Object.prototype.toString.call(x) // "[object xxx]"
```

- Symbol.unscopables：指向一个对象，该对象指定了使用with关键字时，哪些属性会被with环境排除

## Set和Map数据结构

### Set

- 类似于数组，但是成员的值都是唯一的，没有重复的值
- 本身是一个构造函数，用来生成Set数据结构
```js
const s = new Set()
[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x))
for(let i of s) {
  console.log(i) // 2 3 5 4
}
```
- 可以接受一个数组（或者具有iterable接口的其他数据结构）作为参数来初始化
```js
const set = new Set([1, 2, 3, 4, 4]);
[...set] // [1, 2, 3, 4]

const items = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
items.size // 5
```
- 数组去重
```js
const set = new Set([1, 1, 1]) // Set {1}
[...set] // [1]

set.size // 1
```
- 向Set加入值的时候，不会发生类型转换，所以5和'5'是两个不同的值，NaN是同一个值，两个对象总是不相等的
```js
let set = new Set();
let a = NaN;
let b = NaN;
set.add(a);
set.add(b);
set // Set {NaN}

set.add({})
set.size // 2

set.add({})
set.size // 3
```

#### 实例的属性和方法

- Set.prototype.constructor: 构造函数，默认就是Set函数
- Set.prototype.size: 返回Set实例的成员总和
- add(value): 添加某个值，返回Set结构本身
- delete(value): 删除某个值，返回一个布尔值，表示删除是否成功
- has(value): 返回一个布尔值，表示该值是否为Set的成员
- clear(): 清除所有成员，没有返回值
```js
s.add(1).add(2).add(2);
s.size // 2
s.has(1) // true
s.has(2) // true
s.has(3) // false

s.delete(2)
s.has(2) // false
```
- 去除数组重复成员的另一种方法
```js
function dedupe(array) {
  return Array.from(new Set(array))
}
dedupe([1, 1, 2, 3]) // [1, 2, 3]
```

#### 遍历操作

- Set结构的实例有四个遍历方法：
  - keys(): 返回键名的遍历器
  - values(): 返回键值的遍历器
  - entries(): 返回键值对的遍历器
  - forEach(): 使用回调函数遍历每个成员

#### 遍历应用

```js
let set = new Set(['red', 'green', 'blue']);
let arr = [...set]; // ['red', 'green', 'blue']

let arr = [3, 3, 3, 3];
let unique = [...new Set(arr)]; // [3]

let set = new Set([1, 2, 3]);
set = new Set([...set].map(x => x * 2));// {2, 4, 6}

let set = new Set([1, 2, 3, 4, 5])
set = new Set([...set].filter(x => (x % 2) == 0)); // {2, 4}
```

- 并集、交集、差集
```js
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(x => b.has(x))); // Set {2, 3}

// 差集
let difference = new Set([...a].filter(x => !b.has(x))); // Set {1}
```

- 如果想在遍历操作中，同步改变原来的 Set 结构，目前没有直接的方法，但有两种变通方法。一种是利用原 Set 结构映射出一个新的结构，然后赋值给原来的 Set 结构；另一种是利用Array.from方法。
```js
// 方法一
let set = new Set([1, 2, 3]);
set = new Set([...set].map(val => val * 2));
// set的值是2, 4, 6

// 方法二
let set = new Set([1, 2, 3]);
set = new Set(Array.from(set, val => val * 2));
// set的值是2, 4, 6
```

### weakSet

- 含义：结构和Set类似，也是不重复值的集合，和Set的区别
  - 成员只能是对象，不能是其他类型的值（如Number、Symbol等）
  - 成员对象都是弱引用，即垃圾回收机制不考虑WeakSet对该对象的引用，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收改对象所占用的内存，不考虑该对象还存在于WeakSet之中
  - 这是因为垃圾回收机制依赖引用计数，如果一个值的引用次数不为0，垃圾回收机制就不会释放这块内存。结束使用该值之后，有时会忘记取消引用，导致内存无法释放，进而可能会引发内存泄漏。WeakSet 里面的引用，都不计入垃圾回收机制，所以就不存在这个问题。因此，WeakSet 适合临时存放一组对象，以及存放跟对象绑定的信息。只要这些对象在外部消失，它在 WeakSet 里面的引用就会自动消失。
  - 由于上面这个特点，WeakSet 的成员是不适合引用的，因为它会随时消失。另外，由于 WeakSet 内部有多少个成员，取决于垃圾回收机制有没有运行，运行前后很可能成员个数是不一样的，而垃圾回收机制何时运行是不可预测的，因此 ES6 规定 WeakSet 不可遍历。
  - 这些特点同样适用于WeakMap结构

### Map

- js的对象，本质上是键值对的集合（Hash结构），但是传统上只能用字符串当作键
- 为了解决这个问题，ES6提供了Map数据结构，类似于对象，也是键值对的集合，但是键的范围不限于字符串，各种类型的值（包括对象）都可以当作键
- Object结构提供了“字符串-值”的对应，Map结构提供了“值-值”的对应，是一种更完善的Hash结构实现。如果你需要“键值对”的数据结构，Map比Object更合适
```js
const m = new Map();
const o = {p: 'Hello World'};

m.set(o, 'content');
m.get(o); // 'content'

m.has(o); // true
m.delete(o); // true
m.has(o); // false
```
- Map也可以接受一个数组作为参数，该数组的成员是一个个表示键值对的数组
```js
const map = new Map([
  ['name', 'mallow'],
  ['title', 'test']
])
map.size // 2
map.has('name') // true
map.get('name') // mallow
map.has('title') // true
map.get('title') // test
```
- 事实上，不仅仅是数组，任何具有Iterator接口、且每个成员都是一个双元素数组的数据结构都可以当作map构造函数的参数。也就是说，Set和Map都可以用来生成新的Map
```js
const set = new Set([
  ['foo', 1],
  ['bar', 2]
]);
const m1 = new Map(set);
m1.get('foo') // 1

const m2 = new Map([['baz', 3]]);
const m3 = new Map(m2);
m3.get('baz') // 3
```
- 如果对同一个键多次赋值，后面的值将覆盖前面的值
```js
const map = new Map();

map.set(1, 'aaa').set(1, 'bbb');

map.get(1) // 'bbb'
```
- 读取未知的键
```js
new Map().get('fsdlfjasdjf') // undefined
```
- 只用对同一个对象的引用，Map结构才将其视为同一个键，内存地址不一样不会视为同一个键
```js
const map = new Map();
map.set(['a'], 555);
map.get(['a']); // undefined

const map = new Map();
const k1 = ['a'];
const k2 = ['a'];
map.set(k1, 111).set(k2, 222);

map.get(k1); // 111
map.get(k2); // 222
```
- Map 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键。这就解决了同名属性碰撞（clash）的问题，我们扩展别人的库的时候，如果使用对象作为键名，就不用担心自己的属性与原作者的属性同名。
- 如果 Map 的键是一个简单类型的值（数字、字符串、布尔值），则只要两个值严格相等，Map 将其视为一个键，比如0和-0就是一个键，布尔值true和字符串true则是两个不同的键。另外，undefined和null也是两个不同的键。虽然NaN不严格相等于自身，但 Map 将其视为同一个键。
```js
let map = new Map();

map.set(-0, 123);
map.get(+0); // 123

map.set(true, 1);
map.set('true', 2);
map.get(true) // 1

map.set(undefined, 3);
map.set(null, 4);
map.get(undefined); // 3

map.set(NaN, 123);
map.get(NaN) // 123
```

### WeakMap
- 使用方法上和WeakSet类似
- 用途：
  - DOM节点作为键名，一旦这个DOM节点删除，该状态就会自动消失，不存在内存泄露风险
  - 部署私有属性，如果删除实例，他们也就随之消失，不会造成内存泄露

## Proxy
- 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”，即对编程语言进行编程
- 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写
```js
const obj = new Proxy({}, {
  get: function (target, key, receiver) {
    console.log(`getting ${key}!`)
    return Reflect.get(target, key, receiver)
  },
  set: function (target, key, value, receiver) {
    console.log(`setting ${key}!`)
    return Reflect.set(target, key, value, receiver)
  }
})
obj.test // getting test!
obj.test = 1 // setting test!
```

- ES6原生提供Proxy构造函数，用来生成Proxy实例
```js
// target参数表示所要拦截的目标对象，handler参数也是一个对象，用来定制拦截行为
var proxy = new Proxy(target, handler);
const proxy = new Proxy({}, {
  get: function() {
    return 35
  }
})
console.log(proxy.time) // 35

// 如果handler没有设置任何拦截，那就等同于直接通向原对象

const target = {};
const handler = {};
const proxy = new Proxy(target, handler);
proxy.a = 'b';
target.a // 'b'
```

- 技巧
```js
// 将Proxy对象，设置到object.proxy属性，从而可以在object对象上调用
const object = { proxy: new Proxy(target, handler) };

// Proxy实例也可以作为其他对象的原型对象
const proxy = new Proxy({}, {
  get: function(target, property) {
    return 35;
  }
});

let obj = Object.create(proxy);
obj.time // 35
```
- 设置拦截多个操作
```js
const handler = {
  get: function(target, name) {
    if (name === 'prototype') {
      return Object.prototype;
    }
    return 'Hello, ' + name;
  },
  apply: function(target, thisBinding, args) {
    return args[0];
  },
  construct: function(target, args) {
    return {value: arge[1]};
  }
};

const fproxy = new Proxy(function(x, y) {
  return x + y;
}, handler);

fproxy(1, 2) // 1
new fproxy(1, 2) // {value: 2}
fproxy.prototype === Object.prototype // true
fproxy.foo === 'Hello, foo' // true
```
- Proxy支持的拦截操作一览：
  - get(target, propKey, receiver)：拦截对象属性的读取，比如proxy.foo和proxy['foo']
  - set(target, propKey, value, receiver)：拦截对象属性的设置，比如proxy.foo=v或proxy['foo']=v，返回一个布尔值
  - has(target, propKey)：拦截propKey in proxy的操作，返回一个布尔值
  - deleteProperty(target, propKey)：拦截delete proxy[propKey]的操作，返回一个布尔值
  - ownKeys(target)：拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in循环，返回一个数组。该方法返回目标对象所有自身属性的属性名，而Object.keys()的返回结果仅包括目标对象自身的可遍历属性
  - getOwnPropertyDescriptor(target, propKey)：拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象
  - defineProperty(target, propKey, propDesc)：拦截Object.defineProperty(proxy, propKey, propDesc)、Object.defineProperties(proxy, propDescs)，返回一个布尔值
  - preventExtensions(target)：拦截Object.preventExtensions(proxy)，返回一个布尔值
  - getPrototypeOf(target)：拦截Object.getPrototypeOf(proxy)，返回一个对象
  - isExtensible(target)：拦截Object.isExtensible(proxy)，返回一个布尔值
  - setPrototypeOf(target, proto)：拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外的操作可以拦截
  - apply(target, object, args)：拦截Proxy实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)
  - construct(target, args)：拦截Proxy实例作为构造函数调用的操作，比如new proxy(...args)
- Proxy实例方法
  - get()：用于拦截某个属性的读取操作，可以接受三个参数，依次为目标对象、属性名和操作行为所针对的对象，其中最后一个参数可选
  ```js
  const person = {
    name: '张三'
  };
  const proxy = new Proxy(person, {
    get: function(target, property) {
      if (property in target) {
        return target[property];
      } else {
        throw new ReferenceError(`Property ${property} does not exist.`);
      }
    }
  });
  proxy,name // '张三'
  proxy.age // 抛出一个错误
  ```
  - get方法可以继承：
  ```js
  let proto = new Proxy({}, {
    get(target, propertyKey, receiver) {
      console.log('GET ' + propertyKey);
      return target[propertyKey];
    }
  });
  let obj = Object.create(proto);
  obj.foo // 'GET foo'
  ```
  - 使用get拦截，实现数组负数的索引
  ```js
  function createArray(...elements) {
    const handler = {
      get(target, propKey, receiver) {
        let index = Number(propKey);
        if (index < 0) {
          propKey = String(target.length + index);
        }
        return Reflect.get(target, propKey, receiver);
      }
    };
    let target = [];
    target.push(...elements);
    return new Proxy(target, handler);
  }
  let arr = createArray('a', 'b', 'c');
  const a = arr[-1] // c
  ```
  - 利用Proxy，可以将读取属性的操作（get），转变为执行某个函数，从而实现属性的链式操作
  ```js
  // 这个只适合在最外层window环境下运行
  var pipe = (function () {
    return function (value) {
      var funcStack = [];
      var oproxy = new Proxy({} , {
        get : function (pipeObject, fnName) {
          if (fnName === 'get') {
            return funcStack.reduce(function (val, fn) {
              return fn(val);
            },value);
          }
          funcStack.push(window[fnName]);
          return oproxy;
        }
      });
      return oproxy;
    }
  }());
  var double = n => n * 2;
  var pow    = n => n * n;
  var reverseInt = n => n.toString().split("").reverse().join("") | 0;
  pipe(3).double.pow.reverseInt.get; // 63
  ```
  - proxy对象的getReceiver属性是由proxy对象提供的，所以receiver指向proxy对象
  ```js
  const proxy = new Proxy({}, {
    get: function (target, property, receiver) {
      return receiver;
    }
  });
  const d = Object.create(proxy);
  d.a === d; // true
  ```
  - 如果一个属性不可配置且不可写，则Proxy不能修改该属性，否则通过Proxy对象访问该属性会报错
  ```js
  const target = Object.defineProperties({}, {
    foo: {
      value: 123,
      writable: false,
      configurable: false
    }
  })
  const handler = {
    get(target, propKey) {
      return 'abc'
    }
  }
  const proxy = new Proxy(target, handler);
  proxy.foo
  ```
  - set(): 用来拦截某个属性的赋值操作，可以接受四个参数，依次为目标对象、属性名、属性值、Proxy实例本身，其中最后一个参数可选
  ```js
  let validator = {
    set: function(obj, prop, value) {
      if(prop === 'age') {
        if(!Number.isInteger(value)) {
          throw new TypeError('The age is not an integer');
        }
        if(value > 200) {
          throw new RangeError('The age seems invalid');
        }
      }
      obj[prop] = value;
    }
  }
  let person = new Proxy({}, validator);
  person.age = 100;
  person.age // 100
  person.age = 'young' // 报错
  person.age = 300 // 报错
  ```
  - 属性名的第一个字符使用下划线开头，表示这些属性不应该被外部使用
  ```js
  const handler = {
    get (target, key) {
      invariant(key, 'get')
      return target[key]
    },
    set (target, key, value) {
      invariant(key, 'set')
      target[key] = value
      return true
    }
  }
  function invariant(key, action) {
    if (key[0] === '_') {
      throw new Error(`Invalid attempt to ${action} private "${key}" property`)
    }
  }
  const target = {}
  const proxy = new Proxy(target, handler)
  proxy._prop
  proxy._prop = 'c'
  ```

#### apply()
- 拦截函数的调用、call和apply操作
- 接受三个参数，分别是目标对象、目标对象的上下文对象（this）和目标对象的参数数组
```js
const handler = {
  apply (target, ctx, args) {
    return Reflect.apply(...arguments)
  }
}

const target = function () {
  return 'I am the target'
}
const handler = {
  apply: function () {
    return 'I am the proxy'
  }
}
const p = new Proxy(target, handler)
p() // I am the proxy
```

## Reflect

### 概述
- Reflect对象和Proxy对象一样，也是ES6为了操作对象而提供的新API，目的：
  - 将Object对象的一些明显属于语言内部的方法（如Object.defineProperty），放到Reflect对象上。现阶段，某些方法同时在Object和Reflect对象上部署，未来的新方法将只部署在Reflect对象上，从Reflect对象上可以拿到与眼内不到方法
  - 修改某些Object方法的返回结果，如Object.defineProperty(obj, name, desc)在无法定义属性时，会抛出一个错误，而Reflect.defineProperty(obj, name, desc)则会返回false
  ```js
  // old
  try {
    Object.defineProperty(target, property, attributes)
  } catch (e) {

  }

  // new
  if (Reflect.defineProperty(target, property, attributes)) {

  } else {

  }
  ```
  - 让Object操作都变成函数行为
  ```js
  // old
  'assign' in Object // true
  
  // new
  Reflect.has(Object, 'assign') // true
  ```
  - Reflect对象的方法和Proxy对象的方法一一对应，只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法，让Proxy对象可以方便的调用对应的Reflect方法，完成默认行为，总可以在Reflect上获取默认行为
  ```js
  Proxy(target, {
    set: function(target, name, value, receiver) {
      const success = Reflect.set(target, name, value, receiver)
      if (success) {
        log(`property ${name} on ${target} set to ${value}`);
      }
      return success;
    }
  })
  ```

### Reflect.get(target, name, receiver)

- 查找并返回target对象的name属性，如果没有该属性，则返回undefined
```js
const myObject = {
  foo: 1,
  bar: 2,
  get baz() {
    return this.foo + this.bar
  }
}

Reflect.get(myObject, 'foo') // 1
Reflect.get(myObject, 'bar') // 2
Reflect.get(myObject, 'baz') // 3

// 第一个参数必须是对象
Reflect.get(1, 'foo') // error
Reflect.get(false, 'foo') // error
```

### Reflect.set(target, name, value, receiver)
- 如果name属性设置了赋值函数，则赋值函数的this绑定receiver
```js
const myObject = {
  foo: 4,
  set bar(value) {
    return this.foo = value
  }
}
const myReceiverObject = {
  foo: 0
}
Reflect.set(myObject, 'bar', 1, myReceiverObject)
myObject.foo // 4
myReceiverObject.foo // 1
```

### 简单的观察者模式

```js
const queuedObservers = new Set();

const observe = fn => queuedObservers.add(fn);
const observable = obj => new Proxy(obj, {set});

function set(target, key, value, receiver) {
  const result = Reflect.set(target, key, value, receiver);
  queuedObservers.forEach(observer => observer());
  return result;
}
```

## Promise对象

- 比回调函数和事件：更合理和强大
- 就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。
- 特点：
  - 对象的状态不受外界影响，代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejeced（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态
  - 一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：从pending变为fulfilled和从pending变为rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为resolved（已定型）。

### 基本用法

```js
const promise = new Promise(function(resolve, reject) {
  if(success) {
    resolve(value)
  } else {
    reject(error)
  }
})
```

- resolve函数作用：将Promise对象的状态从未完成变为成功（pending->resolved)，在异步操作成功时调用，并将异步操作的结果，作为参数传递出去
- reject函数作用：将Promise对象状态从未完成变为失败（pending->rejected)，在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去
- Promise新建后就会立即执行
```js
const promise = new Promise(function(resolve, reject) {
  console.log('promise')
  resolve(console.log('resolve1'))
})
promise.then(function() {
  console.log('resolve2')
})
console.log('hi')
// promise
// resolve1
// hi
// resolve2
```
- 异步加载图片
```js
function loadImageAsync(url) {
  return new Promise(function(resolve, reject) {
    const image = new Image()
    image.onload = function() {
      resolve(image)
    }
    image.onerror = function() {
      reject(new Error(`Could not load image at ${url}`))
    }
    image.src = url
  })
}
```
- 用Promise对象实现的Ajax操作的例子
```js
const getJSON = function(url) {
  const promise = new Promise(function(resolve, reject) {
    const handler = function() {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response)
      } else {
        reject(new Error(this.statusText))
      }
    }
    const client = new XMLHttpRequest()
    client.open('GET', url)
    client.onreadystatechange = handler
    client.responseType = 'json'
    client.setRequestHeader('Accept', 'application/json')
    client.send()
  })
  return promise
}
getJSON('/posts.json').then(function(json) {
  console.log('Contents: ' + json)
}, function(error) {
  console.error('出错了', error)
})
```
- 执行顺序：如果出现reject，那么之后的then里面的resolve和reject都不会执行，但是同步操作还是会执行，catch只会捕获第一个报错，后面的报错不会捕获，可以在当前promise加上catch来捕获错误
```js
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error('fail')), 3000)
}).catch(e => console.log(e))
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve(p1), 1000)
})
const p3 = new Promise((resolve, reject) => {
  resolve('i am p3')
})
p2.then(res2 => console.log(res2))
  .then(res3 => p3)
  .catch(error => console.log(error))
```
- 一般来说，调用resolve或reject之后，Promise的使命就完成了，后继操作应该放到then方法里面，而不应该直接写在resolve或reject的后面，所以，最好在他们前面加上return语句，这样就不会有意外
```js
new Promise((resolve, reject) => {
  return resolve(1)
})
```
- Promise.prototype.then()：then方法定义在Promise.prototype上

- Promise.prototype.catch()：是.then(null, rejection)的别名，用于指定发生错误时的回调函数

- 跟传统的try/catch代码块不同的是，如果没有使用catch方法制定错误处理的回调函数，Promise对象抛出的错误不会传递到外层代码，即不会有任何反应
```js
const someAsyncThing = function() {
  return new Promise(function(resolve, reject) {
    resolve(x + 2)
  })
}
```
- 这个脚本放在服务器执行，退出码就是0（表示执行成功），Node有一个unhandledRejection事件，专门监听未捕获的reject错误，上面的脚本会触发这个事件的监听函数
```js
process.on('unhandledRejection', function (err, p) {
  throw err
})
```

- Promise.all()：将多个Promise实例，包装成一个新的Promise实例
```js
const p = Promise.all([p1, p2, p3])
```
- p的状态由p1、p2、p3决定，分成两种情况：
  - 只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值按照数组的顺序组成一个数组，传递给p的回调函数
  - 只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数，如果实例自己定义了catch方法，那么它一旦被rejected，并不会触发Promise.all()的catch方法

- Promise.race()：返回率先改变的Promise实例的返回值

- 立即resolve的Promise对象，是在本轮时间循环的结束时，而不是在下一轮事件循环的开始时
```js
setTimeout(function () {
  console.log('three')
}, 0)
Promise.resolve().then(function () {
  console.log('two')
})
console.log('one')

// one
// two
// three
```

- Promise.reject()：返回一个新的Promise实例，该实例的状态为rejected
```js
const p = Promise.reject('error')

// same as
const p = new Promise((resolve, reject) => reject('error'))

p.then(null, function (s) {
  console.log(s)
})
```

- Generator函数和Promise的结合：
```js
function getFoo () {
  return new Promise(function (resolve, reject) {
    resolve('foo')
  })
}
const g = function* () {
  try {
    const foo = yield getFoo()
    console.log(foo)
  } catch(e) {
    console.log(e)
  }
}
function run(generator) {
  const it = generator()
  function go(result) {
    if(result.done) return result.value
    return result.value.then(function (value) {
      return go(it.next(value))
    }, function (error) {
      return go(it.throw(error))
    })
  }
  go(it.next())
}
run(g)
```
- Promise.try()：不知道或者不想区分，函数f是同步函数还是异步操作，但是想用Promise来处理它。这样就可以不管f是否包含异步操作，都用then方法指定下一步流程，用catch方法处理f抛出的错误

## Iterator和for...of循环

### Iterator的概念

- js原有的表示集合的数据结构，主要是数组和对象，es6又添加了Map和Set

- Iterator就是这样一种机制，它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署Iterator接口，就可以完成遍历操作

- Iterator作用：
  - 为各种数据结构，提供一个统一的、简便的访问接口
  - 使得数据结构的成员能够按某种次序排列
  - es6创造了一种新的遍历命令for...of循环，Iterator接口主要供for...of消费

- Iterator遍历过程：
  - 创建一个指针对象，指向当前数据结构的起始位置。遍历器对象本质上，就是一个指针对象
  - 第一次调用指针对象的next方法，指针就指向数据结构的第一个成员
  - 第二次调用指针对象的next方法，指针就指向数据结构的第二个成员
  - 不断调用指针对象的next方法，直到它指向数据结构的结束位置

- 每一次调用next方法，都会返回数据结构的当前成员的信息。返回一个包含value和done两个属性的对象。value属性是当前成员的值，done属性是一个布尔值，表示遍历是否结束，模拟next方法：
```js
const it = makeIterator(['a', 'b'])
it.next() // { value: 'a', done: false }
it.next() // { value: 'b', done: false }
it.next() // { value: undefined, done: true }
function makeIterator(array) {
  let nextIndex = 0
  return {
    next: function() {
      return nextIndex < array.length ? 
      {value: array[nextIndex++], done: false} :
      {value: undefined, done: true}
    }
  }
}
```
- 对于遍历器对象来说，done: false和value: undefined 属性都是可以省略的，因此上面的makeIterator函数可以简写成下面的形式
```js
function makeIterator(array) {
  let nextIndex = 0;
  return {
    next: function() {
      return nextIndex < array.length ?
        {value: array[nextIndex++]} :
        {done: true};
    }
  };
}
```

### 默认Iterator接口

- 为所有的数据结构，提供了统一的访问机制，即for...of循环。当使用for...of循环遍历某种数据结构时，该循环会自动去寻找Iterator接口
- 一种数据结构只要部署了Iterator接口，我们就称这种数据结构是可遍历的
- 默认的Iterator接口部署在数据结构的Symbol.iterator属性，这个属性本身是一个函数，就是当前数据结构默认的遍历器生成函数
```js
const obj = {
  [Symbol.iterator]: function() {
    return {
      next: function() {
        return {
          value: 1,
          done: true
        }
      }
    }
  }
}
```
- 一个对象如果具备可被for...of循环调用的Iterator接口，就必须在Symbol.iterator的属性上部署遍历器生成方法
```js
class RangeIterator {
  constructor(start, stop) {
    this.value = start
    this.stop = stop
  }
  [Symbol.iterator]() { return this; }
  next() {
    let value = this.value
    if(value < this.stop) {
      this.value++
      return {done: false, value}
    }
    return {done: true, value: undefined}
  }
}
function range(start, stop) {
  return new RangeIterator(start, stop)
}
for(let value of range(0, 3)) {
  console.log(value) // 0, 1, 2
}
```

### 调用Iterator接口的场合

- for...of循环

- 解构赋值
```js
let set = new Set().add('a').add('b').add('c');
let [x, y] = set; // x='a'; y='b'
let [first, ...rest] = set; // first='a'; rest=['b', 'c']
```

- 扩展运算符
```js
let str = 'hello';
[...str] // ['h', 'e', 'l', 'l', 'o']

let arr = ['b', 'c'];
['a', ...arr, 'd'] // ['a', 'b', 'c', 'd']
```

- `yield*`后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口
```js
let generator = function* () {
  yield 1;
  yield* [2, 3, 4];
  yield 5;
}
const iterator = generator();

iterator.next() // { value: 1, done: false }
iterator.next() // { value: 2, done: false }
iterator.next() // { value: 3, done: false }
iterator.next() // { value: 4, done: false }
iterator.next() // { value: 5, done: false }
iterator.next() // { value: undefined, done: true }
```

- 其他：
  - for...of
  - Array.from()
  - Map(), Set(), WeakMap(), WeakSet()（比如new Map([['a',1],['b',2]])）
  - Promise.all()
  - Promise.race()

### 字符串的Iterator接口
```js
let someString = 'hi'
typeof someString[Symbol.iterator] // function
let iterator = someString[Symbol.iterator]();

iterator.next()  // { value: "h", done: false }
iterator.next()  // { value: "i", done: false }
iterator.next()  // { value: undefined, done: true }
```

### 对象
- 对于普通的对象，for...of结构不能直接使用，会报错，必须部署了Iterator接口后才能使用，这种情况下，for...in循环依然可以用来遍历键名

- 解决方法
```js
for (let key of Object.keys(someObject)) {
  console.log(key)
}

// or
function* entries(obj) {
  for (let key of Object.keys(obj)) {
    yield [key, obj[key]]
  }
}
for (let [key, value] of entries(obj)) {
  console.log(key, '->', value)
}
```

- for...of不同于forEach方法，可以与break、continue、return配合使用

## Generator函数的语法

### 基本概念

- 特征：
  - function关键字和函数名之间有一个星号
  - 函数体内部使用yield（意思：产出）表达式，定义不同的内部状态
  ```js
  function* helloWorldGenerator() {
    yield 'hello'
    yield 'world'
    return 'ending'
  }
  const hw = helloWorldGenerator
  ```

- yield表达式
  - 由于Generator函数返回的遍历器对象，只有调用next方法才会遍历下一个内部状态，所以其实提供了一种可以暂停执行的函数，yield表达式就是暂停标志
  - next方法的运行逻辑：
    - 遇到yield表达式，就暂停执行后面的操作，并将紧跟在yield后面的那个表达式的值，作为返回对象的value属性值
    - 下一次调用next方法时，再继续往下执行，直到遇到下一个yield表达式
    - 如果没有再遇到新的yield表达式，就一直运行到函数结束，直到return语句为止，并将return语句后面的表达式的值，作为返回的对象的value属性值
    - 如果该函数没有return语句，则返回的对象的value属性值为undefined
  - yield表达式后面的表达式，只有当调用next方法、内部指针指向该语句时才会执行，因此等于为js提供了手动的惰性求值
  ```js
  function* gen() {
    yield 123 + 456;
  }
  ```
  - yield表达式如果用在另一个表达式之中，必须放在圆括号里面
  ```js
  function* demo() {
    console.log('Hello' + yield) // SyntaxError
    console.log('Hello' + yield 123) // SyntaxError

    console.log('Hello' + (yield)) // ok
    console.log('Hello' + (yield 123)) // ok
  }
  ```
  - yield表达式用作函数参数或放在赋值表达式的右边，可以不加括号
  ```js
  function* demo() {
    foo(yield 'a', yield 'b') // ok
    let input = yield // ok
  }
  ```
  - 与Iterator接口的关系
  ```js
  const myIterable = {};
  myIterable[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
  };
  [...myIterable] // [1, 2, 3]
  ```

### next方法的参数

- `yield`表达式本身没有返回值，或者说总是返回`undefined`。`next`方法可以带一个参数，该参数就会被当作上一个`yield`表达式的返回值
```js
function* f() {
  for(var i = 0; true; i++) {
    var reset = yield i;
    if(reset) { i= -1; }
  }
}
const g = f();
g.next();
g.next();
g.next(true);
```
- 这个功能有很重要的语法意义。Generator函数从暂停状态到恢复运行，它的上下文状态是不变的。通过next方法的参数，就有办法在Generator函数开始运行之后，继续向函数体内部注入值。也就是说，可以在Generator函数运行的不同阶段，从外部向内部注入不同的值，从而调整函数行为
```js
function* foo(x) {
  let y = 2 * (yield (x + 1));
  let z = yield (y / 3);
  return (x + y + z);
}

let a = foo(5);
a.next()
a.next()
a.next()

let b = foo(5)
b.next()
b.next(12)
b.next(13)
```
- 向Generator函数内部输入值的例子
```js
function* dataConsumer() {
  console.log('start')
  console.log(`${yield}`)
  console.log(`${yield}`)
  return 'result'
}
const it = dataConsumer()
it.next() // start
it.next('a') // a
it.next('b') // b
```
- 如果想要第一次调用next方法时，就能够输入值，可以在Generator函数外面再包一层
```js
function wrapper(generatorFunction) {
  return function (...args) {
    let generatorObject = generatorFunction(...args);
    generatorObject.next();
    return generatorObject;
  };
}
const wrapped = wrapper(function* () {
  console.log(`First input: ${yield}`);
  return 'DONE';
})
wrapped().next('hello!')
```

### for...of循环
- for...of循环可以自动遍历Generator函数时生成的Iterator对象，且此时不再需要调用next方法
```js
function* foo() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
  return 6;
}
for(let v of foo()) {
  console.log(v) // 1 2 3 4 5
}
```

- 利用Generator函数和for...of循环，实现斐波那契数列
```js
function* fibonacci() {
  let [prev, curr] = [0, 1]
  for(;;) {
    yield curr
    [prev, curr] = [curr, prev + curr]
  }
}
for(let n of fibonacci()) {
  if (n > 1000) break;
  console.log(n)
}
```
- 利用for...of循环，可以写出遍历任意对象的方法。原生的js对象没有遍历接口
```js
function* objectEntries(obj) {
  let propKeys = Reflect.ownKeys(obj)
  for(let propKey of propKeys) {
    yield [propKey, obj[propKey]]
  }
}
let jane = { first: 'Jane', last: 'Doe' }
for (let [key, value] of ObjectEntries(jane)) {
  console.log(`${key}: ${value}`)
}
// first: Jane
// last: Doe
```
- 其他遍历器接口
```js
function* numbers () {
  yield 1
  yield 2
  return 3
  yield 4
}
// 扩展运算符
[...numbers()] // [1, 2]

// Array.from
Array.from(numbers()) // [1, 2]

// 解构赋值
let [x, y] = numbers()

// for...of 循环
for (let n of numbers()) {
  console.log(n)
}
```

### Generator.prototype.throw()

```js
const g = function* () {
  try {
    yield
  } catch (e) {
    console.log('inside', e)
  }
}
const it = g()
it.next()
try {
  it.throw('a') // 被generator捕获
  it.throw('b') // 被外面的catch捕获
  it.throw(new Error('ds')) // 被吞掉
} catch(e) {
  console.log('outside', e)
}
it.throw(new Error('c')) // 会报错
```
- 如果Generator函数内部和外部，都没有部署try...catch代码块，那么程序将报错，直接中断执行
- throw方法抛出的错误要被内部捕获，前提是必须至少执行过一次next方法
```js
function* gen() {
  try {
    yield 1
  } catch (e) {
    console.log('inside')
  }
}
const g = gen()
g.throw(1)
```
- throw方法被捕获之后，会附带执行下一条yield表达式，也就是说，会附带执行一次next方法
```js
const gen = function* () {
  try {
    yield console.log('a')
  } catch (e) {
    console.log('inside')
  }
  yield console.log('b')
  yield console.log('c')
}
const it = gen()
it.next() // a
it.throw() // b
it.next() // c
```
- 一旦Generator执行过程中抛出错误，且没有被内部捕获，就不会再执行下去了。如果此后还调用next方法，将返回一个value属性等于undefined、done属性等于true的对象，即js引擎认为这个Generator已经运行结束了
```js
function* g() {
  yield 1;
  console.log('throwing an exception');
  throw new Error('generator broke!');
  yield 2;
  yield 3;
}

function log(generator) {
  var v;
  console.log('starting generator');
  try {
    v = generator.next();
    console.log('第一次运行next方法', v);
  } catch (err) {
    console.log('捕捉错误', v);
  }
  try {
    v = generator.next();
    console.log('第二次运行next方法', v);
  } catch (err) {
    console.log('捕捉错误', v);
  }
  try {
    v = generator.next();
    console.log('第三次运行next方法', v);
  } catch (err) {
    console.log('捕捉错误', v);
  }
  console.log('caller done');
}

log(g());
// starting generator
// 第一次运行next方法 { value: 1, done: false }
// throwing an exception
// 捕捉错误 { value: 1, done: false }
// 第三次运行next方法 { value: undefined, done: true }
// caller done
```

### Generator.prototype.return()

- 可以返回给定的值，并且终结遍历Generator函数
```js
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}
const it = gen();
it.next();
it.return('foo');
it.next();
```

### yield* 表达式
- 如果在Generator函数内部，调用另一个Generator函数，默认情况下是没有效果的
- 用这个表达式来在一个Generator函数里面执行另一个Generator函数

### 上下文
```js
function* gen() {
  this.a = 1;
  yield this.b = 2;
  yield this.c = 3;
}
function F() {
  return gen.call(gen.prototype);
}
const f = new F();
f.next(); // Object {value: 2, done: false}
f.next(); // Object {value: 3, done: false}
f.next(); // Object {value: undefined, done: true}
f.a // 1
f.b // 2
f.c // 3
```

### Generator和状态机
- 更简洁、更安全（状态不会被非法篡改）、更符合函数式编程的思想、在写法上更优雅。之所以可以不用外部变量保存状态，是因为本身包含了一个状态信息，即目前是否处于暂停态
```js
const clock = function* () {
  while(true) {
    console.log('Tick')
    yield
    console.log('Tock')
    yield
  }
}
const it = clock()
it.next()
it.next()
it.next()
for(let i = 0; i < 10; i++) {
  it.next()
}
```

### Generatro和协程
- 协程是一种程序运行的方式，既可以用单线程实现，也可以用多线程实现。

## Generator函数的异步应用

### 传统方法

- 回调函数
- 事件监听
- 发布/订阅
- Promise对象

### 概念

- 异步：一个任务不是连续完成的，可以理解成该任务被人为分成两段，先执行第一段，然后转而执行其他任务，等做好了准备，再回过头执行第二段
  - 例子：有一个任务是读取文件进行处理，任务的第一段是向操作系统发出请求，要求读取文件。然后，程序执行其他任务，等到操作系统返回文件，再接着执行任务的第二段（处理文件）。这种不连续的执行，就叫做异步
- 同步：连续的执行，不能插入其他任务，所以操作系统从硬盘读取文件的这段时间，程序只能干等着
- 回调函数：把任务的第二段单独写在一个函数里面，等到重新执行这个任务的时候，就直接调用这个函数
  - 例子：
  ```js
  fs.readFile('/etc/passwd', 'utf-8', function (err, data) {
    if (err) throw err;
    console.log(data);
  })
  ```
- Promise：为了解决回调函数地狱问题，允许将回调函数的嵌套，改成链式调用
- Generator：
  - 协程：多个线程互相协作，完成异步任务
    - 运行流程：
      - 第一步：协程A开始执行
      - 第二步：协程A执行到一半，进入暂停，执行权转移到协程B
      - 第三步：一段时间后协程B交还执行权
      - 第四步：协程A恢复执行
    - 例子：
    ```js
    function* asyncJob() {
      const f = yield readFile(fileA);
    }
    ```
    - 优点：代码的写法非常像同步操作，如果去除yield命令，简直一模一样
  - 实现：最大特点是可以交出函数的执行权（暂停执行）
    - 整个Generator函数就是一个封装的异步任务，或者说异步任务的容器。异步操作需要暂停的地方，都用yield语句注明：
    ```js
    function* gen(x) {
      const y = yield x + 2;
      return y
    }
    const g = gen(1);
    g.next() // { value: 3, done: false }
    g.next() // { value: undefined, done: true }
    ```
    - 调用Generator函数，会返回一个内部指针（遍历器）g，这是Generator函数不同于普通函数的另一个地方，即执行它不会返回结果，返回的是指针对象。调用指针g的next方法，会移动内部指针
  - 数据交换和错误处理
    - Generator函数可以暂停执行和恢复执行，是它能封装异步任务的根部原因
  - 异步任务的封装
  ```js
  const fetch = require('node-fetch');
  function* gen(){
    const url = 'http://api.github.com/users/github';
    const result = yield fetch(url);
    console.log(result.bio);
  }
  ```
  - 执行：(流程管理不方便))
  ```js
  const g = gen();
  const result = g.next();
  result.value.then(function(data){
    return data.json();
  }).then(function(data){
    g.next(data);
  });
  ```

### Thunk函数

- 传名调用（参数用到时才计算）

### co函数
```js
const fs = require('fs');

const readFile = function (fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, function(error, data) {
      if(error) return reject(error);
      resolve(data);
    })
  })
}

const gen = function* () {
  const f1 = yield readFile('/etc/fstab');
  const f2 = yield readFile('/etc/shells');
}

const g = gen();
g.next().value.then(function(data) {
  g.next(data).value.then(function(data){
    g.next(data);
  })
})
```

## async函数

- 是Generator函数的语法糖

- async函数对Generator函数的改进，体现在以下四点
  - 内置执行器：Generator函数的执行必须靠执行器，而async函数自带执行器
  - 更好的语义：比起星号和yield，语义更清楚了。async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果
  - 更广的适用性：async函数的await命令后面，可以是Promise对象和原始类型的值（数值、字符串和布尔值，这时等同于同步操作）
  - 返回值是Promise：async函数的返回值是Promise对象，这比Generator函数的返回值是Iterator对象方便多了

### 基本用法

- async函数返回一个Promise对象，可以使用then方法添加回调函数。当函数执行的时候，一旦遇到await就会先返回，等到异步操作完成，再接着执行函数体后面的语句
```js
async function getStockPriceByName(name) {
  const symbol = await getStockSymbol(name);
  const stockPrice = await getStockPrice(symbol);
  return stockPrice;
}

getStockPriceByName('goog').then(function (result) {
  console.log(result);
})
```

### 语法

- 返回Promise对象：async函数返回一个Promise对象，async函数内部return语句返回的值，会成为then方法回调函数的参数

```js
async function f() {
  return 'hello world';
}
f().then(v => console.log(v));
```

- Promise对象的状态变化：async函数返回的Promise对象，必须等到内部所有await命令后面的Promise对象执行完，才会发生状态改变，除非遇到return语句或者抛出错误。也就是说，只有async函数内部的异步操作执行完，才会执行then方法指定的回调函数

- await命令后面的Promise对象如果变为reject状态，则reject的参数会被catch方法的回调函数接收到
```js
async function f() {
  await Promise.reject('出错了');
}
f()
.then(v => console.log(v))
.catch(e => console.log(e)) // 出错了
```

- 只要一个await语句后面的Promise变为reject，那么整个async函数都会中断执行
```js
async function f() {
  await Promise.reject('出错了');
  await Promise.resolve('hello world'); // 不会执行
}
```

- 可以使用try...catch来捕获await操作是否失败，这样不管这个异步操作是否成功。第二个await都会执行
```js
async function f() {
  try {
    await Promise.reject('出错了');
  } catch(e) {
    console.log(e)
  }
  return await Promise.resolve('hello world');
}
f().then(v => console.log(v)); // hello world
```

### 错误处理

- 如果await后面的异步操作出错，那么等同于async函数返回的Promise对象被reject
```js
async function f() {
  await new Promise(function (resolve, reject) {
    throw new Error('出错了');
  })
}

f()
.then(v => console.log(v))
.catch(e => console.log(e)) // Error: 出错了
```

### async函数的实现原理
- 将Generator函数和自动执行器，包装在一个函数里
```js
async function fn(args) {

}

// the same as
 
function fn(args) {
  return spawn(function* () {

  });
}
```

- spawn函数的实现：
```js
function spawn(genF) {
  return new Promise(function(resolve, reject) {
    const gen = genF();
    function step(nextF) {
      let next;
      try {
        next = nextF();
      } catch (e) {
        return reject(e);
      }
      if(next.done) {
        return resolve(next.value);
      }
      Promise.resolve(next.value).then(function(v) {
        step(function () { return gen.next(v); });
      }, function(e) {
        step(function() { return gen.throw(e); })
      });
    }
    step(function() { return gen.next(undefined); });
  })
}
```

## Class的基本语法

### 传统方法

- 构造函数：
```js
function Point(x, y) {
  this.x = x;
  this.y = y;
}
Point.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')';
}
const p = new Point(1, 2);
```

- class语法糖改写：
```js
// 定义类
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
```

- 类的数据类型就是函数，类本身就指向构造函数
```js
class Point {
  getWidth() {
    return 123;
  }
}

typeof Point // function
Point === Point.prototype.constructor // true

const b = new Point();
b.getWidth();
```

- 类的内部所有定义的方法，都是不可枚举的
```js
class Point {
  constructor(x, y) {

  }
  toString() {

  }
}
Object.keys(Point.prototype); // []
Object.getOwnPropertyNames(Point.prototype);// ['constructor', 'toString']
```

### constructor方法

- 类的默认方法，通过new命令生成对象实例时，自动调用该方法。一个类必须有constructor方法，如果没有显示定义，一个空的constructor方法会被默认添加
```js
class Point {

}
// 等同于
class Point {
  constructor() {}
}
```

- constructor 方法返回实例对象（即this），完全可以指定返回另外一个对象
```js
class Foo {
  constructor() {
    return Object.create(null);
  }
}

new Foo() instanceof Foo; // false
```

- 类必须使用new调用，否则会报错。这是它跟普通构造函数的一个主要区别，后者不用new也可以执行

### Class表达式

- 类也可以使用表达式的形式定义，类的名字是MyClass，Me只在Class内部代码可用，指代当前类
```js
const MyClass = class Me {
  getClassName() {
    return Me.name;
  }
};
let inst = new MyClass();
inst.getClassName() // Me
Me.name // ReferenceError: Me is not defined.
```

- 如果类的内部没用到的话，可以省略Me
```js
const MyClass = class {};
```

- 立即执行的Class
```js
let person = new class {
  constructor(name) {
    this.name = name;
  }
  sayName() {
    console.log(this.name);
  }
}('张三');
person.sayName(); // '张三'
```

- 不存在变量提升
```js
new Foo(); // ReferenceError
class Foo {}
```

- 不存在变量提升的原因是与继承有关，必须保证子类在父类之后定义
```js
{
  let Foo = class {};
  class Bar extends Foo {

  }
}
```
- 上面的代码不会报错，因为Bar继承Foo的时候，Foo已经有定义了。但是，如果存在class的提升，上面代码就会报错，因为class会被提升到代码头部，而let命令是不提升的，所以导致Bar继承Foo的时候，Foo还没有定义。


### 私有方法和属性

- 现有的方法
```js
// 命名上加以区分
class Widget {
  // 公有方法
  foo (baz) {
    this._bar(baz);
  }
  // 私有方法
  _bar(baz) {
    return this.snaf = baz;
  }
}

// 将私有方法移出模块，因为模块内部的所有方法都是对外可见的
class Widget {
  foo (baz) {
    bar.call(this, baz);
  }
}

function bar(baz) {
  return this.snaf = baz;
}

// 利用Symbol值的唯一性，将私有方法的名字命名为一个Symbol值
const bar = Symbol('bar');
const snaf = Symbol('snaf');

export default class myClass{
  // 公有方法
  foo(baz) {
    this[bar](baz);
  }
  // 私有方法
  [bar](baz) {
    return this[snaf] = baz;
  }
};
```

### 静态方法

- 如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用

- 如果静态方法包含this关键字，这个this指的是类，而不是实例

- 静态方法可以和非静态方法重名

- 父类的静态方法，可以被子类继承

- 静态方法可以从super对象上调用的

## Class的继承

- Class 可以通过extends关键字实现继承，这比ES5的通过修改原型链实现继承

```js
class Point {

}
class ColorPoint extends Point {

}
```

```js
class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y);
    this.color = color;
  }
  toString() {
    return this.color + ' ' + super.toString()
  }
}
```

### super

- [参考资料](https://www.jb51.net/article/126399.htm)

- super只能在有继承的class的constructor中使用
- 作用：
  - 参数的入口，用来初始化父类的this
  - 将父类的方法和this继承过来
  - 可以当作函数使用来初始化父类，进行参数的传递，也可以当作对象使用，通过它来调用父组件的方法

- 子类必须在constructor方法中调用super方法，否则新建实例时会报错。这是因为子类自己的this对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。如果不调用super方法，子类就得不到this对象。
```js
class Point {

}
class ColorPoint extends Point {
  constructor() {}
}
const cp = new ColorPoint(); // ReferenceError
```

- 如果子类不写constructor方法，默认会调用super方法

- 可以使用`...args`来解构参数给super

- 在子类的构造函数中，只有调用super之后，才可以使用this关键字，否则会报错。这是因为子类实例的构建，基于父类实例，只有super方法才能调用父类实例

- 父类的静态方法，也会被子类继承
```js
class A {
  static hello() {
    console.log('hello world');
  }
}

class B extends A {

}

B.hello() // hello world
```

- 判断一个类是否继承了另一个类
```js
Object.getPrototypeOf(ColorPoint) === Point;
```

### 类的prototype属性和__proto__属性

- `__proto__`属性是可以间接访问到，`prototype`属性是构造函数需要继承的

- 子类的__proto__属性，表示构造函数的继承，总是指向父类

- 子类的prototye属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性
```js
class A {

}
class B extends A {

}
B.__proto__ === A // true
B.prototype.__proto__ === A.prototype // true
```

- 类的继承是按照下面的模式实现的
```js
class A {

}
class B {

}
// B的实例继承A的实例
Object.setPrototypeof(B.prototype, A.prototype);

// B继承A的静态属性
Object.setPrototypeOf(B, A);
const b = new B();
```

- `Object.setPrototypeOf`方法的实现
```js
Object.setPrototypeOf = function (obj, proto) {
  obj.__proto__ = proto;
  return obj;
}
```

## 修饰器

- 基本形式
```js
@test
class MyTest {

}
function test(target) {
  target.name = 'test';
}
console.log(MyTest.name);
```

- 多个参数
```js
@test(1, 2)
class MyTest {

}
function test(num1, num2) {
  return function (target) {
    target.num1 = num1;
    target.num2 = num2;
  }
}
```

- 修饰器对类的行为的改变，是代码编译时发生的，而不是在运行时。意味着，修饰器能在编译阶段运行代码。本质就是编译时执行的函数

- 除了添加静态属性，还可以为添加实例属性
```js
function testable(target) {
  target.prototype.isTestable = true;
}
@testable
class MyTestableClass {}
const obj = new MyTestableClass();
obj.isTestable; // true
```

- 方法的修饰
```js
function readonly(target, name, descriptor) {
  descriptor.writable = false;
  return descriptor;
}
readonly(Person.prototype, 'name', descriptor);

// 类似于
// Object.defineProperty(Person.ptototype, 'name', descriptor);

class Person {
  @readonly
  name() { return `${this.first} ${this.last}`}
}
```

- 如果同一个方法有多个修饰器，会像剥洋葱一样，先从外到内进入，然后由内向外执行
```js
function dec(id) {
  console.log('evaluated', id);
  return (target, property, descriptor) => console.log('executed', id);
}
class Example {
  @dec(1)
  @dec(2)
  method(){}
}
// evaluated 1
// evaluated 2
// executed 2
// executed 1
```

- 修饰器只能用于类和类的方法，不能用于函数，因为存在函数提升，类是不会提升的，所以就没有这方面的问题

## Module语法

- CommonJS用于服务器，AMD用于浏览器

- `export default`导出文件的默认值，只能有一个

- `export default`后面不能变量声明语句

- `export default`命令的本质是将后面的值，赋给`default`变量

## Module的加载实现

- 如果脚本体积很大，下载和执行的时间就会很长，因此造成浏览器堵塞，用户会感觉到浏览器卡死了，没有任何响应。
```html
<script src="path/to/myModule.js" defer></script>
<script src="path/to/myModule.js" async></script>
```

- `<script>`标签打开`defer`或`async`属性，脚本就会异步加载。渲染引擎遇到这一行命令，就会开始下载外部脚本，但不会等它下载和执行，而是直接执行后面的命令

- `defer`和`async`的区别是：`defer`要等到整个页面在内存中正常渲染结束（DOM结构完全生成，以及其他脚本执行完成），才会执行；`async`一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后，再继续渲染。

- `defer`是渲染完再执行，`async`是下载完就执行，如果有多个`defer`脚本，会按照它们在页面出现的顺序加载，而多个`async`脚本是不能保证加载顺序的

### ES6模块和CommonJS模块的差异

- CommonJS模块输出的是一个值的拷贝，ES6模块输出的是值的引用

- CommonJS模块是运行时加载，ES6模块是编译时输出接口

- CommonJS加载的是一个对象（module.exports属性），该对象只有在脚本运行完才会生成。而ES6模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成

