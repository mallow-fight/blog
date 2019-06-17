---
type: v3/client
order: 9
title: npm
---

## 写一个全局命令

1. 在`package.json`中加上`bin`属性：

```json
{
	"bin": {
		"clone-project": "./index.js"
	}
}
```
2. `index.js`中注意开头需要标注：

```js
#!/usr/bin/env node
```

### 例子

实现一个从`git`仓库拉取代码的工具，带有进度条：
```js
#!/usr/bin/env node

'use strict';
const commander = require('commander');
const chalk = require('chalk');
const { exec } = require('child_process');
const logErr = (errInfo) => console.log(chalk.red(`发生了错误：${errInfo}`));
const ProgressBar = require('progress');

const getBar = (total=100, timeout=100) => {
	const bar = new ProgressBar(':bar', {
		total,
		complete: chalk.bgGreen(' '),
		incomplete: chalk.bgBlue(' '),
	});
	let step = 1;
	const timer = setInterval(() => {
		bar.tick(step);
		step += parseInt(Math.random() * 10)
		if (bar.complete) {
			clearInterval(timer);
		}
	}, timeout);
	return bar;
};

new commander.Command('clone-project')
	 .arguments('<project-directory>')
   .action( async function (name) {
			console.log(chalk.blue('正在拉取远程模版仓库代码...'))
			const templateBar = getBar(100, 300);
			await exec(`git clone <git项目地址> ${name}`, async (err, stdout) => {
				if(err) {
					return logErr(err);
				}
				templateBar.tick(100);
				console.log(chalk.green(`拉取成功!`));
				console.log()
				console.log(chalk.yellow('安装依赖中，这可能会花费几分钟时间'));
				const installBar = getBar(100, 600);
				await exec(`cd ${name} && rm -rf .git && npm i`, (err) => {
					if(err) {
						return logErr(err);
					}
					installBar.tick(100);
					console.log(chalk.green('恭喜！成功安装！Bye，Bye！'))
				});
			})
	 })
	 .parse(process.argv);
```

### 用法

安装：
```bash
sudo npm i clone-project -g
```

使用：
```bash
clone-project <目录名称>
```