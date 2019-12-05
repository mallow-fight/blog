// 下面的这段代码只会打印“foo 1”
module.exports = function() {
  console.log(foo, bar); // [Function: foo] [Function: bar]
  foo();
  bar();
  function foo() {
    console.log('foo 1');
    throw Error('foo error');
    console.log('foo 2');
  }
  function bar() {
    console.log('bar')
  }
}