start-arithmetic:
	pm2 kill
	pm2 start ./examples/arithmetics/index.js --watch
	pm2 logs
start-examples:
	pm2 kill
	pm2 start ./examples/index.js --watch
	pm2 logs