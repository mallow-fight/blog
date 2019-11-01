arithmetic:
	pm2 kill
	pm2 start ./examples/算法/index.js --watch
	pm2 logs