const typeAngular = require('./angular/type.js');
const phoneAngular = require('./angular/phone.js');
const numberAngular = require('./angular/number.js');
const curry = require('./arithmetics/curry');
function code() {
  const {
    simpleCurry,
    complexCurry
  } = curry;
  console.log(simpleCurry(1)(2)(3));
  // console.log((new complexCurry()).input(1)(2)(3));
  const complexInstance = new complexCurry(1)
  complexInstance.input(1, 2, 3)(4)(5, 6, 7);
  complexInstance.output();
  complexInstance.init();
  complexInstance.output();
}

const http = require('http');

const hostname = '127.0.0.1';
const port = 30000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World!\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  console.log('<-- code start -->')
  code()
  console.log('<-- code end -->')
});
