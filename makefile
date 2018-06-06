run-node:
	pm2 kill
	pm2 start ./practice/index.js --watch
	pm2 logs