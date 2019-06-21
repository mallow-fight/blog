const Vector = require('./data-structure/Vector');
const Stack = require('./data-structure/Stack');
function code() {
  const stack = new Stack();
  stack.push('1');
  stack.output();
  stack.pop();
  stack.output();
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
