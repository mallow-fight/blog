function code() {
  const t = [{a: 1, b: 2}, {a: 1, b: 3}, {a: 2, b: 2}]
  const o = t.find(_ => {
    return _.a === 1
  })
  console.log(o);
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