---
title: js
order: 4
type: questions
---

## js

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
  var a = 2
  console.log(a)
  function bar() {

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
  var a // 这里的a是undefined
  console.log(a)
  a = 2
  console.log(a)
}
```
### 正则表达式
[参考资料](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions)
- 注意自带方法的使用（一般使用`replace`替换字符）
- 注意标志的使用（如`/g`全局搜索）

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

### `var a = a || b`这样写有什么问题
如果a是false类型的值，则会丢失该类型的值，取b值
