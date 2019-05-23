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