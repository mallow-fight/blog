function code() {
  function Point() {
    console.log(this.x)
  }
  Point.prototype = {
    constructor(x) {this.x = x},
    test() {}
  }
  const p = new Point(1);
  console.log(p);
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