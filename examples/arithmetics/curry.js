// simple way
const simpleCurry = (a) => (b) => (c) => a + b + c;
// OO
class complexCurry {
  constructor(args) {
    this.defaultSum = 0;
    this.sum = args || this.defaultSum;
    this.input = this.input.bind(this);
    this.output = this.output.bind(this);
    this.init = this.init.bind(this);
  }
  input() {
    const argsArray = Array.prototype.slice.call(arguments);
    argsArray.forEach(element => {
      this.sum += element;
    });
    return this.input;
  }
  output() {
    console.log(this.sum);
    return this.sum;
  }
  init() {
    this.sum = this.defaultSum;
  }
}
module.exports = {
  simpleCurry,
  complexCurry
}