// target is any.
module.exports = function(target) {
  const toString = Object.prototype.toString;
  return toString.call(target).replace(/\[(\w+)\s(\w+)\]/, '$2').toLowerCase();
}