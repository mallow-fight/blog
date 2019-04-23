function code() {
  const test = {
    a: 1,
    b: 2,
    get c() {
      return this.a + this.b
    }
  }
  Reflect.setPrototypeOf(test, {
    d: 1
  })
  console.log(test.d)
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