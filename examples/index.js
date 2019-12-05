const typeAngular = require('./angular/type.js');
const phoneAngular = require('./angular/phone.js');
const numberAngular = require('./angular/number.js');
const curry = require('./arithmetics/curry');
const createBindSimulate = require('./js/bind');
const foo = require('./js/class');
const runTime = require('./js/run-time');
const promise = require('./js/promise');
function code() {
  promise();
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
