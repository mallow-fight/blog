module.exports = function (fn, context, args) {
  const foo = function() {
    fn.apply(context, args);
  }
  foo.prototype = fn.prototype;
  foo.constructor = fn;
  return foo;
}