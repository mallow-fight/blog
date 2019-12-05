module.exports = function () {
  const promise = new Promise(function(resolve, reject) {
    return 'test'
  });
  promise
    .then(data => console.log('promise-success', data), error => console.log('promise-failed0', error));
  
  var x = 1;
  function *foo() {
    x++;
    yield;
    console.log("x:", x);
    return x;
  }
  function bar() {
    x++;
    return x;
  }
  var it = foo();
  console.log(it.next());
  console.log(x)
  bar();
  console.log(x)
  console.log(it.next());
}