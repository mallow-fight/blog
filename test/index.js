const Vector = require('./data-structure/Vector');
const Stack = require('./data-structure/Stack');
const StackList = require('./data-structure/StackList');
const fibonacci = require('./data-structure/fibonacci');
const yhsj = require('./data-structure/杨辉三角');
const QueueArray = require('./data-structure/QueueArray');
const QueueList = require('./data-structure/QueueList');
const SinglyLinkedList = require('./data-structure/SinglyLinkedList');
const DoubleLinkedList = require('./data-structure/DoubleLinkedList');
function code() {
  const list = new DoubleLinkedList();
  list.set({pointer: 'a', value: 'i am a value', nextPointer: 'b', previousPointer: 'c'})
  list.set({pointer: 'b', value: 'i am b value', nextPointer: 'c', previousPointer: 'a'})
  list.set({pointer: 'c', value: 'i am c value', nextPointer: 'a', previousPointer: 'b'})
  list.get('a');
  list.getNext('a');
  list.getPrevious('a');
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
