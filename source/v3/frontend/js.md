---
title: js相关
order: 1
type: v3/frontend
---

## 原型链

### prototype

#### todos

- [ ] 为什么普通函数有`prototype`属性而箭头函数没有？
- [ ] 普通函数和箭头函数的差异？

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

### `__proto__`

#### todos

- [ ] 为什么null和undefined没有__proto__属性
- [ ] __proto__属性中每个属性代表什么含义、有什么作用
- [ ] null和undefined有什么区别
- [ ] {}.__proto__为什么不能这样访问

#### 表现行为 

1. 除了`null`和`undefined`，其他基本类型和引用类型都有`__proto__`属性。
2. 相当于继承了某个构造函数的prototype

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

// 首先创造一个Foo的实例
const foo = new Foo('this is a')

//可以看到创造的实例是这样子的，包括创建过程中赋值给实例对象和一个__proto__属性
foo // {a: 'this is a', __proto__: {_a: 'this is _a', constructor: ƒ Foo, __proto__: Object}}

// 继续往下看，foo.__proto__没什么好解释，可以看到foo.__proto__还有一个__proto__属性
// 下面这行代码说明，foo.__proto__只是一个普通的对象，是由Object函数构造的，所以它继承了Object.prototype的属性
foo.__proto__.__proto__ === Object.prototype // true
// 所以可以得到如下结果，所有的对象都继承了Object构造函数的prototype，Object只是一个构造函数，没什么好神秘的
foo.__proto__.__proto__ === {}.__proto__ // true

// 可以看到，只是一个构造函数
Object // ƒ Object() { [native code] }

// ok，既然Object是一个构造函数，那它肯定有一个prototype属性，具有constructor和一些内置属性
Object.prototype // {constructor: ƒ Object(), hasOwnProperty, ....}

// 不解释
Object.prototype.constructor === Object

// 天地无常，万法归null
Object.prototype.__proto__ === null
```

### constructor

- 理解了`prototype`和`__proto__`，这个就不难理解了，`constructor`只会出现在`__proto__`和`prototype`对象中

- 在`__proto__`中，指代的是这个对象是由什么函数构造的，指向构造它的函数，不管是`Foo`也好，内置的`Object`也好

- 在`prototype`中，指代的就是构造函数本身

### `new`创建对象的过程发生了什么

#### 通用观点

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

- JS引擎在执行这段代码：`var john = new Person('john')`时，在内部做了很多工作，用伪代码模拟就是：
```js
var obj = {};
obj.__proto__ = Person.prototype; // 此时建立了obj对象的原型链
// obj -> Person.prototype -> Object.prototype -> null
var result = Person.call(obj, 'John'); // 相当于obj.Person('John')
return typeof result === 'object' ? result : obj; // 如果无返回值或者返回一个非对象值，则将obj返回作为新对象
```