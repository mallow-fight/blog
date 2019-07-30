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
function code() {
  const {Tree_Traverse, Tree_Structure} = Tree;
  const tree = new Tree_Traverse({
    root: 'A',
    left: {
      root: 'B',
      left: {
        root: 'D',
        left: {
          root: 'H' 
        },
        right: {
          root: 'I'
        }
      },
      right: {
        root: 'E' 
      }
    },
    right: {
      root: 'C',
      left: {
        root: 'F'
      },
      right: {
        root: 'G',
        left: {
          root: 'J'
        },
        right: {
          root: 'K'
        }
      }
    }
  });
  tree.preorder_traversal();
  tree.inorder_traversal();
  tree.postorder_traversal();
  tree.void_traversal();
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
