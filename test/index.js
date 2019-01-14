function code() {
  function Foo(name) {
    this.name = name;
  }
  Foo.prototype.getName = function () {
    console.log(this.name);
    return this.name;
  }
  const foo = new Foo('mallow');
  foo.getName()
  const test = foo.getName
  test();
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