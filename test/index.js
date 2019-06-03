function code() {
  // 问题： 有1元、3元、5元面值的硬币若干，要凑到11元需要最少几个硬币？
  const getMemo = (range, end) => {
    const memo = {};
    for(let i = 1; i <= end; i++) {
      if(!memo[i]) {
        memo[i] = [];
        range.forEach(item => {
          const last = i - item;
          if (last >= 0) {
            if (last === 0) {
              memo[i].push([item]);
            } else {
              memo[last].map(m => {
                memo[i].push([
                  item,
                  ...m
                ])
              })
            }
          }
        });
      }
    }
    return memo;
  }
  const memo = getMemo([1, 3, 5], 11);
  const memo11 = memo[11];
  let minCoins;
  memo11.forEach(item => {
    if (!minCoins) {
      minCoins = item;
    }
    if (item.length < minCoins.length) {
      minCoins = item;
    }
  })
  console.log(minCoins);
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
