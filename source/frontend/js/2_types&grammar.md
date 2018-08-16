---
title: 类型和语法
order: 2
type: js
---

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

> `function` 是对象的一种子类型（技术上讲，叫做“可调用对象”）。函数在 `JS` 中被称为“头等（`first class`）”类型，是因为它们基本上就是普通的对象（附带有可调用的行为语义），而且它们可以像其他普通的对象那样被处理。

> 数组也是一种形式的对象，带有特别的行为。数组在内容的组织上要稍稍比一般的对象更加结构化。

<p class="tip">简单基本类型自身不是对象（null也不是），一个常见的错误论断：js中一切都是对象，明显不对</p>

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
function foo{
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

