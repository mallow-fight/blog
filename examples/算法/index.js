const Vector = require('./data-structure/Vector');
const Stack = require('./data-structure/Stack');
const StackList = require('./data-structure/StackList');
const fibonacci = require('./data-structure/fibonacci');
const yhsj = require('./data-structure/杨辉三角');
const QueueArray = require('./data-structure/QueueArray');
const QueueList = require('./data-structure/QueueList');
const SinglyLinkedList = require('./data-structure/SinglyLinkedList');
const DoubleLinkedList = require('./data-structure/DoubleLinkedList');
const Tree = require('./data-structure/Tree');
const longestSubString = require('./data-structure/longestSubString');
const findMedianSortedArrays = require('./data-structure/findMedianSortedArrays');
const reverse  = require('./arithmetic/reverse');
const atoi = require('./arithmetic/atoi');
const isMatch = require('./arithmetic/isMatch');
function code() {
  
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
