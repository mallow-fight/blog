---
title: 类型和语法
order: 2
type: js
---

## 类型

### 内建类型
- 基本类型
  - `symbol`(独一无二的值，是一个函数，参数是对当前symbol值的描述，通常用于对象的健值[参考](http://es6.ruanyifeng.com/#docs/symbol))
  - `undefined`
  - `boolean`
  - `number`
  - `string`
  - `null`（和`typeof`操作符组合时是有`bug`的，例：`typeof null ==== 'object'; // true`，因为有太多的已经存在的web内容依存着这个`bug`的行为，修复这个bug会制造更多的bug并毁掉许多web软件，所以这个原有的bug应该永远不会被修复了，其实null才是它自己的基本类型）

- 非基本类型(引用类型)
  - `object`
    - [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
    - [defineProperty](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

  - `function`(这是`typeof`可以返回的第七种字符串值，它是`object`的子类型，一个函数被称为可调用对象，一个拥有内部属性、允许被调用的对象，它可以拥有属性)    - [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

> - function 是对象的一种子类型（技术上讲，叫做“可调用对象”）。函数在 JS 中被称为“头等（first class）”类型，是因为它们基本上就是普通的对象（附带有可调用的行为语义），而且它们可以像其他普通的对象那样被处理。
> - 数组也是一种形式的对象，带有特别的行为。数组在内容的组织上要稍稍比一般的对象更加结构化。

<p class="tip">简单基本类型自身不是对象（null也不是），一个常见的错误论断：js中一切都是对象，明显不对</p>

### 值作为类型

- 变量没有类型，值才有类型，变量可以在任何时候，持有任何值，也就是没有类型强制，引擎不坚持认为一个变量总是持有与它开始存在时相同的初始类型的值

- `undefined`是指一个变量已经被声明但是没有别赋值或者赋值为`undefined`，`undeclared`是指一个未被声明的变量，有的浏览器统一按照`undefined`处理是不准确的。使用`typeof`会统一返回`undefined`，这是一种安全防护特性，防止环境对为声明的变量报错

## 值

### Array
- 值的容器，这些值可以是任意类型

- 使用`delete`将会从这个`array`上移除一个植槽，它不会更新`length`属性

- 它也是对象，可以在它上面添加属性，但是这些属性不会更新`length`属性，注意不要使用字符串数字，会被强制转换为数组项

#### 方法

> [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/toLocaleString)

- from（Array属性）: (伪数组对象或可迭代对象，每个元素的回调函数，执行回调函数时的上下文对象)
```js
const a = 'test'
const b = [1, 2, 3]
const c = {0: 'a', 1: 'b', length: 2}
// 也可以是可迭代对象，如Map和Set等
Array.from(a | b | c, function (x) {
    return this.name + x
}, {name: 'mallow'})

// 如果制定了上下文，那么回调函数不能为箭头函数
```

- isArray（Array属性）: 判断一个对象是不是数组
```js
Array.isArray({0: 'a', 1: 'b', length: 2}) // false
```

- of（Array属性）: 创建一个具有可变数量参数的新数组实例，而不考虑参数的数量和类型，不同于Array(7)，后者会创建一个长度为7的空数组
```js
Array.of(7) // [7]
Array.of(1, 2, 3, 4) // [1, 2, 3, 4]
```

- concat: 将数组或值连接成新的数组
```js
const newArray = [1, 2, 3].concat(1, [5], [3, 4])
// [1, 2, 3, 1, 5, 3, 4]
```

- entries: 返回一个新的Array Iterator对象，包含数组中每个索引的键/值对
```js
const arr = ['a', 'b', 'c']
const iterator = arr.entries()
iterator.next() // {value: [0, 'a'], done: false}
iterator.next() // {value: [1, 'b'], done: false}
iterator.next() // {value: [2, 'c'], done: false}
iterator.next() // {value: undefined, done: true}
```

- every: 测试数组中的所有元素是否都通过了指定函数的测试，参数（回调函数，传入的上下文）

```js
const arr = [1, 2, 3, 100]
arr.every(function(v) {
    return v < 10
})
// false
arr.every(function(v) {
    return v < 1000
})
// true
```

- fill：用一个固定值填充一个数组中从起始索引到终止索引内的全部元素，不包括终止索引，参数（用来填充数组元素的值，起始索引=0，终止索引=this.length）
```js
const arr = [1, 2, 3, 4]
// fill with 0 from position 2 until position 4
console.log(array1.fill(0, 2, 4));
// expected output: [1, 2, 0, 0]

// fill with 5 from position 1
console.log(array1.fill(5, 1));
// expected output: [1, 5, 5, 5]

console.log(array1.fill(6));
// expected output: [6, 6, 6, 6]
```

- filter: 创建一个新的数组，包含通过所提供函数实现的测试的所有元素，参数（callback（element，index，调用数组），callback执行上下文）

- find: 返回数组中满足提供的测试函数的第一个元素的值，否则返回undefined
```js
const arr1 = [5, 12, 8, 130, 44]
const found = arr1.find(function(element) {
    return element > 10
})
console.log(found) // 12
```

- findIndex: 返回数组中满足提供的测试函数的第一个元素的索引

- flat: 递归到指定深度将所有子数组连接，并返回一个新数组
```js
// 扁平化嵌套数组
var arr1 = [1, 2, [3, 4]];
arr1.flat(); 
// [1, 2, 3, 4]

var arr2 = [1, 2, [3, 4, [5, 6]]];
arr2.flat();
// [1, 2, 3, 4, [5, 6]]

var arr3 = [1, 2, [3, 4, [5, 6]]];
arr3.flat(2);
// [1, 2, 3, 4, 5, 6]

// 扁平化和空项
var arr4 = [1, 2, , 4, 5];
arr4.flat();
// [1, 2, 4, 5]
```

- forEach: 对数组的每个元素执行一次提供的函数，总是返回undefined，回调函数有返回值也是返回undefineds，第二个参数是回调函数执行上下文
```js
const arr = ['a', 'b', 'c']
arr.forEach(function(v) {
    console.log(v) // a b c
})
```

- includes: 判断一个数组是否包含一个制定的值，如果有返回true，否则返回false，第二个参数是fromIndex，从哪个索引开始查找
```js
const arr = [1, 2, 3]
arr.includes(2) // true
```

- indexOf: 返回在数组中找到一个给定元素的第一个索引，如果不存在，则返回-1，第二个参数是fromIndex，从哪个索引开始查找

- join: 将一个数组（或一个类数组对象）的所有元素连接成一个字符串并返回这个字符串，默认是`,`

- keys: 返回一个包含数组中每个索引键的Array Iterator对象

- lastIndexOf: 返回指定元素在数组中的最后一个索引，如果不存在则返回-1，从数组的后面向前查找，第二个参数fromIndex

- map: 创建一个新数组，结果是该数组中的每个元素都调用一个提供的函数的返回结果，参数（callback（currentValue，index，array），callback执行上下文）

- pop: 从数组中删除最后一个元素，并返回该元素的值，这个方法会更改数组的长度

- push: 将一个或多个元素添加到数组的末尾，并返回新数组的长度

- reduce: 对累加器和数组中的每个元素（从左到右）应用一个函数，将其减少为单个值，不仅仅适用于加法，同时适用于其它运算，不过回调函数需要有一个返回值，第二个参数作为初始值
```js
const array1 = [1, 2, 3, 4];
const reducer = (accumulator, currentValue) => accumulator + currentValue;

// 1 + 2 + 3 + 4
console.log(array1.reduce(reducer));
// expected output: 10

// 5 + 1 + 2 + 3 + 4
console.log(array1.reduce(reducer, 5));
// expected output: 15
```

- reduceRight: 跟reduce执行方向相反，reduce从左到右，这个从右到左

- reverse: 将数组中的元素位置颠倒，返回颠倒后的数组

- shift: 从数组中删除第一个元素，返回该元素的值，这个方法会更改数组的长度，如果数组为空则返回undefined

- slice: 返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象，原始数组不会被修改，这个参数下标从零开始，相当于在每个数组项之间打桩，这个桩就是下标，桩和桩之间的数组项就是slice的结果，两个参数，如果不传，默认0～length，如果第二个参数不传，默认值是length

- some: 测试数组中的某些元素是否通过提供的函数实现的测试，参数（callback（currentValue，index，array），回调函数执行上下文），对于放在空数组上的任何条件，此方法返回false，它不会改变数组，遍历范围终止于满足条件时，第二个参数，上下文
```js
var array = [1, 2, 3, 4, 5];

var even = function(element) {
  // checks whether an element is even
  return element % 2 === 0;
};

console.log(array.some(even));
// expected output: true
```

- sort: 使用in-place算法对数组的元素进行排序，并返回数组。排序不一定是稳定的。默认排序顺序是根据字符串Unicode码点，由于取决于具体实现，无法保证排序的时间和空间复杂度，参数（compareFunction（a，b））如果对比函数结果返回a-b，升序排列，否则，降序排列
```js
var months = ['March', 'Jan', 'Feb', 'Dec'];
months.sort();
console.log(months);
// expected output: Array ["Dec", "Feb", "Jan", "March"]

var array1 = [1, 30, 4, 21];
array1.sort();
console.log(array1);
// expected output: Array [1, 21, 30, 4]
```

- splice: 
    - start：指定修改的开始位置，从0开始），如果超出了数组的长度，则从数组末尾开始添加内容，如果是负值，则表示从数组末位开始的第几位（从-1计数）；如果负数的绝对值大于数组的长度，则表示开始位置为第0位。
    - deleteCount 可选
    整数，表示要移除的数组元素的个数。如果 deleteCount 是 0，则不移除元素。这种情况下，至少应添加一个新元素。如果 deleteCount 大于start 之后的元素的总数，则从 start 后面的元素都将被删除（含第 start 位）。
    如果deleteCount被省略，则其相当于(arr.length - start)。
    - item1, item2, ... 可选
    要添加进数组的元素,从start 位置开始。如果不指定，则 splice() 将只删除数组元素。
    - 返回值是由被删除的元素组成的一个数组。如果只删除了一个元素，则返回只包含一个元素的数组。如果没有删除元素，则返回空数组。

- toLocaleString: 返回一个字符串表示数组中的元素。数组中的元素将使用各自的 toLocaleString 方法转成字符串，这些字符串将使用一个特定语言环境的字符串（例如一个逗号 ","）隔开。
```js
var array1 = [1, 'a', new Date('21 Dec 1997 14:12:00 UTC')];
var localeString = array1.toLocaleString('en', {timeZone: "UTC"});

console.log(localeString);
// expected output: "1,a,12/21/1997, 2:12:00 PM",
// This assumes "en" locale and UTC timezone - your results may vary
```

- toString: 返回一个字符串，表示指定的数组及其元素
```js
var array1 = [1, 2, 'a', '1a'];

console.log(array1.toString());
// expected output: "1,2,a,1a"
```

- unshift: 将一个或多个元素添加到数组的开头，并返回新数组的长度
```js
var array1 = [1, 2, 3];

console.log(array1.unshift(4, 5));
// expected output: 5

console.log(array1);
// expected output: Array [4, 5, 1, 2, 3]
```

- values: 返回值的Array Iterator 对象

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

- length: 字符串长度

- fromCharCode: 返回指定的Unicode值序列创建的字符串
```js
console.log(String.fromCharCode(65, 66, 67))
// ABC
```

- fromCodePoint: 静态方法返回使用指定的代码点序列创建的字符串。

- charAt: 从一个字符串中返回指定的字符，参数index，一个介于0和字符串长度减1之间的整数，如果没有提供索引，默认值是0

- charCodeAt: 方法返回0到65535之间的整数，表示给定索引处的UTF-16代码单元 (在 Unicode 编码单元表示一个单一的 UTF-16 编码单元的情况下，UTF-16 编码单元匹配 Unicode 编码单元。但在——例如 Unicode 编码单元 > 0x10000 的这种——不能被一个 UTF-16 编码单元单独表示的情况下，只能匹配 Unicode 代理对的第一个编码单元) 。如果你想要整个代码点的值，使用 codePointAt()。

- codePointAt: 返回 一个 Unicode 编码点值的非负整数

- concat: 不推荐使用，性能比直接使用`+`或者`+=`差

- endsWith: 用来判断当前字符串是否是以另外一个给定的子字符串结尾的，返回true或false，参数（要搜索的字符串，作为str的长度（默认str.length））

- includes: 方法用于判断一个字符串是否包含在另一个字符串中，根据情况返回 true 或 false。第二个参数position可选。从当前字符串的哪个索引位置开始搜寻子字符串，默认值为0。

- indexOf: 方法返回调用  String 对象中第一次出现的指定值的索引，开始在 fromIndex进行搜索。

- lastIndexOf: 方法返回指定值在调用该方法的字符串中最后出现的位置，如果没找到则返回 -1。从该字符串的后面向前查找，从 fromIndex 处开始。

- match: 当一个字符串和一个正则表达式匹配时，match方法检索匹配项

- normalize: 方法会按照指定的一种 Unicode 正规形式将当前字符串正规化.

- padEnd: 方法会用一个字符串填充当前字符串（如果需要的话则重复填充），返回填充后达到指定长度的字符串。从当前字符串的末尾（右侧）开始填充。

- padStart: 方法用另一个字符串填充当前字符串(重复，如果需要的话)，以便产生的字符串达到给定的长度。填充从当前字符串的开始(左侧)应用的。

- repeat: 构造并返回一个新字符串，该字符串包含被连接在一起的指定数量的字符串的副本。

- replace: 方法返回一个由替换值替换一些或所有匹配的模式后的新字符串。模式可以是一个字符串或者一个正则表达式, 替换值可以是一个字符串或者一个每次匹配都要调用的函数。

- search: 方法执行正则表达式和 String对象之间的一个搜索匹配。

- slice: 方法提取一个字符串的一部分，并返回一新的字符串。

- split: 方法使用指定的分隔符字符串将一个String对象分割成字符串数组，以将字符串分隔为子字符串，以确定每个拆分的位置。 

- startsWith()方法用来判断当前字符串是否是以另外一个给定的子字符串“开头”的，根据判断结果返回 true 或 false。

- substr() 方法返回一个字符串中从指定位置开始到指定字符数的字符。

- substring() 方法返回一个字符串在开始索引到结束索引之间的一个子集, 或从开始索引直到字符串的末尾的一个子集。

- toLocaleLowerCase()方法根据任何特定于语言环境的案例映射，返回调用字符串值转换为小写的值。

- toLocaleUpperCase() 使用本地化（locale-specific）的大小写映射规则将输入的字符串转化成大写形式并返回结果字符串。

- toLowerCase() 会将调用该方法的字符串值转为小写形式，并返回。

- toString() 方法返回指定字符串对象的字符串形式。

- toUpperCase() 将调用该方法的字符串值转换为大写形式，并返回。

- trim() 方法会从一个字符串的两端删除空白字符。在这个上下文中的空白字符是所有的空白字符 (space, tab, no-break space 等) 以及所有行终止符字符（如 LF，CR）。

- valueOf() 方法返回一个String对象的原始值（primitive value）。

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
有这样的困惑：
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
要想改变a来使它拥有内容为[4, 5, 6, 7]的值，可以这样做：
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
记住： 你不能直接控制/覆盖值拷贝和引用拷贝的行为 - 这些语义完全由当前值的类型来控制的
可以使用如下方法来浅拷贝数组：
```js
foo(a.slice())
```
注意：底层的基本标量值（string、number等）是不可改变的

## 原生类型
最常用的原生类型：
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
实际上它们都是内建函数，创建值的构造器形式结果都是一个基本类型值的包装器对象，例：
```js
var a = new String( "abc" );
typeof a; // "object" ... 不是 "String"
a instanceof String; // true
Object.prototype.toString.call( a ); // "[object String]"
a.toString(); // "abc"
a === 'abc'; //false
```

## 内部[[class]]
不存在`Null()`和`Undefined()`原生类型的构造器
```js
Object.prototype.toString.call( null );            // "[object Null]"
Object.prototype.toString.call( undefined );    // "[object Undefined]"
```
对于像`string`、`number`、`boolean`这样的简单基本类型，会启动一种叫“封箱”的行为：
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
因为对象是真，所以该条件永远都是假

### 开箱
如果你有一个包装器对象，而你想要取出底层的基本类型值，可以使用`valueOf()`方法：
```js
var a = new String( "abc" );
var b = new Number( 42 );
var c = new Boolean( true );

a.valueOf(); // "abc"
b.valueOf(); // 42
c.valueOf(); // true
```
当以一种查询基本类型值的方式使用对象包装器时，开箱也会隐含地发生。这个处理的过程（强制转换）将会在第四章中更详细地讲解，但简单地说：
```js
var a = new String( "abc" );
var b = a + ""; // `b` 拥有开箱后的基本类型值"abc"

typeof a; // "object"
typeof b; // "string"
```

### 空值槽数组
创建一组包含`undefined`数组
```js
// good
Array.apply(null, { length: 3 })
// bad
Array(3)
```

### 强制转换

`falsy`值列表(使用`==`的情况下，只是等于，不是全等于)：
- undefined
- null
- false
- +0, -0, NaN
- ""

一般最好不要使用强制转换，除非一些假值条件判断，直接使用假值要更简便一点

## 文法

### 语句和表达式

举例：
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

