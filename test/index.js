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
/**
 * @description 最长回文
 * @param {string} s
 * @return {string}
 */
var longestPalindromeTimeOut = function(s) {
    s = s.split('');
    let longest = [s[0] || ''];
    const session = [];
    for(let i = 0; i < s.length; i++) {
      for(let j = i + 1; j < s.length; j++) {
        if (s[i] === s[j]) {
          let same = true;
          let start = i;
          let end = j;
          for(let t = 0; t < session.length; t++) {
            const ses = session[t];
            const [sesI, sesJ] = ses;
            if (i > sesI && i < sesI/2 && j < sesJ && j > sesJ / 2) {
              same = false;
              break;
            }
          }
          while(start < end && same) {
            start++;
            end--;
            if (s[start] !== s[end]) {
              same = false;
            }
          }
          if (same) {
            if (j - i + 1 > longest.length) {
              longest = s.slice(i, j + 1);
            }
          } else {
            session.push([i, j])
          }
        }
      }
    }
    return longest.join('');
};
var longestPalindrome = function(s) {
  let payload = s[0] || '';
  for(let i = 0; i < s.length; i++) {
    let left = i - 1;
    let right = i + 1;
    let temp = s[i];
    while(s[right] === s[i]) {
      temp += s[i];
      right++;
    }
    while (s[left] === s[right] && s[left] && s[right]) {
      temp = s[left] + temp + s[right];
      left--;
      right++;
    }
    if (temp.length > payload.length) {
      payload = temp;
    }
  }
  return payload;
}
/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function(s, numRows) {
  
};
function code() {
  console.log(convert('LEETCODEISHIRING'));
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
