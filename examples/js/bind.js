module.exports = function createBindSimulate() {
  Function.prototype.bindSimulate = function(bindContext) {
    const _this = this;
    if (typeof _this !== 'function') {
      throw Error('bind target must be a function.')
    }
    const args = Array.prototype.slice(arguments, 1);

    function noop() {
      
    }
    if (_this.prototype) {
      noop.prototype = _this.prototype;
    }
    const noopIns = new noop();

    function bindedFn () {
      _this.apply(bindContext, args);
    }
    bindedFn.prototype = noopIns;
    return bindedFn;
  }
}