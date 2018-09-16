run-test:
	pm2 kill
	pm2 start ./test/index.js --watch
	pm2 logs
run-node:
	pm2 kill
	pm2 start ./practice/index.js --watch
	pm2 logs
run-webpack-test:
	cd test && npm run build && cd webpack-test/dist && node index.bundle.js