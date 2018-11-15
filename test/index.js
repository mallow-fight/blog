function code() {
  function Foo() {}
  Foo.prototype.test = 'my name is test'
  const f = new Foo()
  console.log(Foo.prototype)
  console.log(Foo.constructor);
  console.log(Foo.prototype.constructor);

  console.log(f.__proto__);
  console.log(f.constructor);

  f.__proto__.test = 'mallow'
  console.log(f.__proto__);

  const [a, b] = [1]
  console.log(a, b);

  const isOnEdit = false
  const canEditable = true
  const selfAdd = true
  const a1 = isOnEdit && (canEditable || selfAdd)
  const a2 = (isOnEdit && canEditable) || selfAdd
  console.log(a1, a2);
}

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

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