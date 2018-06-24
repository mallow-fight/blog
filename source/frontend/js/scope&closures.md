---
title: 作用域与闭包
type: js
order: 3
---

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

**LHS 和 RHS 引用查询都从当前执行中的 作用域 开始，如果它们在这里没能找到它们要找的东西，它们会在嵌套的 作用域 中一路向上，一次一个作用域（层）地查找这个标识符，直到它们到达全局作用域（顶层）并停止，既可能找到也可能没找到。**

**这就是为什么会出现以下情况**
```js
function foo() {
  console.log(a) // undefined
  var a = 1
  console.log(a) // 1
}
```

### 词法作用域
**作用域是由编写时函数被声明的位置决策定义的**
有两种方式可以欺骗词法作用域：eval和with，它们压制了引擎在作用域查询上进行编译器优化的能力，不要使用它们。

### 提升
例子1
```js
a = 2
var a
console.log(a) // 2
```
等价于
```js
var a
a = 2
console.log(a)
```

例子二
```js
console.log(a) // undefined
var a = 2
```
等价于
```js
var a
console.log(a)
a = 2
```

**在你的代码任何部分被执行之前，所有的声明，变量和函数都会被首先处理，全局作用域和每个局部作用域都会进行这种处理。**
**先有声明，后有赋值。**
**函数声明优先提升，然后再到变量声明（函数表达式也是一种变量声明）。**

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