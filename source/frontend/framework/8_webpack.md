---
title: 原理窥探
order: 8
type: framework
---

## 准备工作

## 概念

- 本质上是一个js应用程序的静态模块打包器

- 处理程序时，会递归的构建一个依赖关系图，包含应用程序需要的每个模块，然后将这些模块打包成一个或多个bundle

### 核心

- 入口：entry
- 输出：output
- 装载机：loader
- 插件：plugins

### 配置

- 基本配置：
```js
var path = require('path')
module.exports = {
	mode: 'development',
	entry: './foo.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'foo.bundle.js'
	}
}
```

- 导出为一个函数
```bash
webpack --env.produciton
webpack --env.paltform=web
```
```js
module.exports = function (env, argv) {
	return {
		mode: env.production ? 'production' : 'development',
		devtool: env.production ? 'source-maps' : 'eval',
		plugins: [
			new webpack.optimize.UglifyJsPlugin({
				compress: argv['optimize-minimize']
			})
		]
	}
}
```

## 入口：entry

- 指示webpack应该使用哪个模块来作为构建其内部依赖图的开始。进入入口起点后，webpack会找出有哪些模块和库是入口起点，无论是直接还是间接依赖的。

- 每个依赖项随即被处理，最后输出称之为bundles的文件中。

- 用法：

```js
// webpack.config.js
module.exports = {
    entry: './path/file.js'
}
```

### 单个入口和多个入口

```js
// webpack.config.js
const config = {
	entry: './path/file.js'
}
// the same as
const config = {
	entry: {
		main: './path/file.js'
	}
}
```

> 当向entry传入一个文件路径的数组时将创建多个主入口

> 入口文件数组不能重名

### 对象语法

- 用法：

```js
// webpack.config.js
const config = {
	entry: {
		app: './src/app.js',
		vendors: './src/vendors.js'
	}
}
```

> 可扩展的webpack配置：可重用并且可以与其他配置组合使用。用于将关注点从环境、构建目标、运行时中分离。然后使用专门的工具（如webpack-merge）将他们合并。

- 场景：
	- 正如上面的用法：从表面上看，这告诉我们webpack从app.js和vendors.js开始创建依赖图。这些依赖图彼此完全分离、互相独立
	- 此设置允许你使用CommonsChunkPlugin从应用程序bundle中提取vendor引用到vendor bundle，并把引用vendor的部分替换为__webpack_require_()调用

### 多页面应用程序

- 用法：

```js
// webpack.config.js
const config = {
	entry: {
		pageOne: './src/pageOne/index.js',
		pageTwo: './src/pageTwo/index.js',
		pageThree:
		'./src/pageThree/index.js'
	}
}
```

- 意义：这一段告诉我们webpack需要3个独立分离的依赖图，在多页应用中，服务器将为你获取一个新的HTML文档。页面重新加载新文档，并且资源被重新下载。这给了我们特殊的机会取做很多事情：
	- 使用CommonsChunkPlugin为每个页面间的应用程序共享代码创建bundle。由于入口起点增多，多页应用能够复用入口起点之间的大量代码/模块

## 出口：output

- 告诉`webpack`在哪里输出它所创建的`bundles`，以及如何命名这些文件，默认值是`./dist`。整个应用程序结构，都会被编译到你指定的输出路径的文件夹中。

- 用法：

```js
// webpack.config.js
const path = require('path')
module.exports = {
	entry: './path/file.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'test.bundle.js'
	}
}
```

> 如果入口是一个数组，出口是一个bundle，bundle会按照顺序执行入口数组

> 如果是production-mode，会进行一系列的优化，包括但不限于 减少作用域的查询（会把一些常量直接编译成最终结果，减少了变量的查询）、代码压缩等等

### 多个入口起点

- 如果配置创建了多个单独的chunk，应该使用占位符来确保每个文件具有唯一的名称：

```js
{
	entry: {
		app: './src/app.js',
		search: './src/search.js'
	},
	output: {
		filename: '[name],js',
		path: __dirname + '/dist'
	}
}
```

### 高级进阶

- 使用CDN和资源hash的复杂示例：

```js
{
	output: {
		path: "/home/[hash]",
		publicPath: "http://cdn.example.com/assets/[hash]/"
	}
}
```

- 在编译时不知道最终输出文件的publicPath的情况下，publicPath可以留空，并且在入口起点运行时动态设置。如果你在编译时不知道publicPath，可以先忽略它，并且在入口起点设置__webpack_public_path__

```js
__webpack_public_path__ = myRuntimePublicpath
```

## 装载机：loader

- 让webpack能够去处理那些非js文件（webpack本身只理解js）。可以将所有类型的文件转换为webpack能够处理的有效模块，然后可以利用webpack的打包能力，对它们进行处理。

- 本质上，它将所有类型的文件，转换为应用程序的依赖图（和最终的bundle）可以直接引用的模块。

- 用法：

```js
// webpack.config.js
module.exports = {
	output: {
		filename: 'test.bundle.js'
	},
	module: {
		rules: [
			{ test: /\.txt$/, use: 'raw-loader' }
		]
	}
}
```

- 用于对模块的源代码进行转换
- 可以是你在import或加载模块时预处理文件
- 类似于其他构建工具中任务（task）
- 可以将文件从不同的语言（如ts）转换为js
- 将内联图像转换为data URL
- 允许直接在js模块中import css文件

- 用法：预处理css和ts

```bash
npm i css-loader -D
npm i ts-loader -D
```

```js
// webpack.config.js
module.exports = {
	module: {
		rules: [
			{ test: /\.css$/, use: 'css-loader' },
			{ test: /\.ts$/, use: 'ts-loader' }
		]
	}
}
```

### 使用方式

- 配置：推介使用，简明简洁
```js
module: {
	rules: [
		{ test: /\.css$/ },
		use: [
			{ loader: 'style-loader' },
			{ 
				loader: 'css-loader',
				options: {
					modules: true
				}
			}
		]
	]
}
```

- 内联：如下

```js
import Styles from 'style-loader!css-loader?modules!./styles.css';
```

- CLI：如下会对.jade文件使用jade-loader，对.css文件使用style-loader和css-loader

```bash
webpack --module-bind jade-loader --module-bind 'css=style-loader!css-loader'
```

- loader 支持链式传递。能够对资源使用流水线(pipeline)。一组链式的 loader 将按照相反的顺序执行。loader 链中的第一个 loader 返回值给下一个 loader。在最后一个 loader，返回 webpack 所预期的 JavaScript。

- loader 可以是同步的，也可以是异步的。

- loader 运行在 Node.js 中，并且能够执行任何可能的操作。

- loader 接收查询参数。用于对 loader 传递配置。

- loader 也能够使用 options 对象进行配置。

- 除了使用 package.json 常见的 main 属性，还可以将普通的 npm 模块导出为 loader，做法是在 package.json 里定义一个 loader 字段。

- 插件(plugin)可以为 loader 带来更多特性。

- loader 能够产生额外的任意文件。

## 插件：plugins

- loader被用于转换某些类型的模块，而插件可以用于执行范围更广的任务。它的范围包括：打包优化、压缩、重新定义环境中的变量

- 插件需要添加到plugins数组中。多数插件可以通过选项（option）自定义。可以在一个配置文件中因为不同的目的而多次使用同一个插件，这时需要通过使用new操作符来创建它的一个实例

- 用法：

```js
// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const config = {
	module: {
		rules: [
			{ test: /\.txt$/, use: 'raw-loader' }
		]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin(),
		new HtmlWebpackplugin({template: './src/index.html'})
	]
}
module.exports = config
```

## 模式

- 用法：

```js
module.exports = {
	mode: 'production' // development
}
```

- 区别：production应该会有一些代码和图片压缩之类的优化插件

- development打包之后的代码中使用了eval，而production则没有

> [详情](https://www.webpackjs.com/concepts/mode/)

## 模块

- 在模块化编程中，开发者将程序分解成离散功能块
- 每个模块具有比完整小程序更小的接触面，使得校验、调试、测试轻而易举。精心编写的模块提供了可靠的抽象和封装界限，使得应用程序中每个模块都具有条理清楚的设计和明确的目的

### 概念

- 对比node.js模块，webpack模块能够以各种方式表达它们的依赖关系，例如：
	- ES2015 import 语句
	- CommonJS require 语句
	- AMD define 和 require 语句
	- css/sass/less 文件中的 @import 语句
	- 样式（url(...))或HTML文件（<img src=...>）中的图片链接（image url）

### 解析

- 规则：
	- 绝对路径：
	```js
	import "/home/me/file"
	import "C:\\Users\\me\\file"
	```
	- 相对路径：
	```js
	import "../src/file1"
	import "./file2"
	```
	- 模块路径：
	```js
	import "module"
	import "module/lib/file"
	```

## 依赖图

- 任何时候，一个文件依赖于另一个文件，webpack 就把此视为文件之间有依赖关系。这使得 webpack 可以接收非代码资源(non-code asset)（例如图像或 web 字体），并且可以把它们作为_依赖_提供给你的应用程序。

- webpack 从命令行或配置文件中定义的一个模块列表开始，处理你的应用程序。 从这些入口起点开始，webpack 递归地构建一个依赖图，这个依赖图包含着应用程序所需的每个模块，然后将所有这些模块打包为少量的 bundle - 通常只有一个 - 可由浏览器加载。

## manifest

- 在使用webpack构建的典型应用程序或站点中，有三种主要的代码类型：
	- 你或你的团队编写的源码
	- 你的源码会依赖的任何第三方的library或vendor代码
	- webpack的runtime和manifest，管理所有模块的交互

### Runtime

- 在浏览器运行时，webpack用来连接模块化的应用程序的所有代码。包括：在模块交互时，连接模块所需的家在和解析逻辑。包括浏览器中的已加载模块的连接，以及懒加载模块的执行逻辑

### Manifest

- 一旦你的应用程序中，形如index.html文件、一些bundle和各种资源加载到浏览器中，你的/src目录中的文件结构就不存在了

- 当编译器开始执行、解析和映射应用程序时，他会保留所有模块的详细要点。当完成打包并发送到浏览器时，会在运行时通过Manifest来解析和加载模块。无论使用哪种模块语法，那些import或require语句现在都已经转换为__webpack_require__方法，此方法指向模块标识符。通过使用mainfest中的数据，runtime将能够查询模块标识符，检索出背后对应的模块

## 构建目标

```js
var path = require('path')
var serverConfig = {
	target: 'node',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'lib.node.js'
	}
	//...
}
var clientConfig = {
	target: 'web', // default value
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'lib.js'
	}
}
module.exports = [ serverConfig, clientConfig ]
```

## 模块热替换

- 会在应用程序运行过程中替换、添加或删除模块，而无需家在整个页面。主要是：
	- 保留在完全重新加载页面时丢失的应用程序状态
	- 只更新变更内容，节省开发时间
	- 调整样式更加快速：几乎相当于在浏览器调试器中更改样式

### 运行

- 在应用程序中
	- 代码要求HMR runtime检查更新
	- HMR runtime （异步）下载更新，然后通知应用程序代码
	- 代码要求HMR runtime应用更新
	- HMR runtime（异步）应用更新
	- 可以设置HMR，使得此进程自动触发更新，或者你可以选择要求在用户交互时进行更新
- 在编译器中
	- 除了普通资源，编译器需要发出update，以允许更新之前的版本到新的版本。update由两部分组成：
		- 更新后的manifest（json）
		- 一个或多个更新后的chunk（js）
- 在模块中
	- HMR是可选功能，只会影响包含HMR代码的模块。通过style-loader为style样式追加样式。为了运行追加补丁，style-loader实现了HMR接口；当它通过HMR接收到更新，它会使用新的样式替换旧的样式
- 在HMR Runtime中
	- 对于模块系统的 runtime，附加的代码被发送到 parents 和 children 跟踪模块。在管理方面，runtime 支持两个方法 check 和 apply。
	- check 发送 HTTP 请求来更新 manifest。如果请求失败，说明没有可用更新。如果请求成功，待更新 chunk 会和当前加载过的 chunk 进行比较。对每个加载过的 chunk，会下载相对应的待更新 chunk。当所有待更新 chunk 完成下载，就会准备切换到 ready 状态。
	- apply 方法将所有被更新模块标记为无效。对于每个无效模块，都需要在模块中有一个更新处理函数，或者在它的父级模块们中有更新处理函数。否则，无效标记冒泡，并也使父级无效。每个冒泡继续直到到达应用程序入口起点，或者到达带有更新处理函数的模块（以最先到达为准）。如果它从入口起点开始冒泡，则此过程失败。
	- 之后，所有无效模块都被（通过 dispose 处理函数）处理和解除加载。然后更新当前 hash，并且调用所有 "accept" 处理函数。runtime 切换回闲置状态，一切照常继续。

## 源码解析

- 入口：通过查看`package.json`可以看到`"main": "lib/webpack.js",`，得知这个仓库上传到`npm`上的入口是`lib/webpack.js`，所以从这里开始看起

### webpack's lib/webpack.js

```js

// 这个应该是用来标记这个脚本是否结束
process.exitCode = 0;

/**
 * @param {string} command process to run
 * @param {string[]} args commandline arguments
 * @returns {Promise<void>} promise
 */
const runCommand = (command, args) => {
	const cp = require("child_process");
	return new Promise((resolve, reject) => {
		const executedCommand = cp.spawn(command, args, {
			stdio: "inherit",
			shell: true
		});

		executedCommand.on("error", error => {
			reject(error);
		});

		executedCommand.on("exit", code => {
			if (code === 0) {
				resolve();
			} else {
				reject();
			}
		});
	});
};

/**
 * @param {string} packageName name of the package
 * @returns {boolean} is the package installed?
 */
const isInstalled = packageName => {
	try {
		require.resolve(packageName);

		return true;
	} catch (err) {
		return false;
	}
};

/**
 * @typedef {Object} CliOption
 * @property {string} name display name
 * @property {string} package npm package name
 * @property {string} binName name of the executable file
 * @property {string} alias shortcut for choice
 * @property {boolean} installed currently installed?
 * @property {boolean} recommended is recommended
 * @property {string} url homepage
 * @property {string} description description
 */

/** @type {CliOption[]} */
// 通过哪种方式调用webpack指令
const CLIs = [
	{
		name: "webpack-cli",
		package: "webpack-cli",
		binName: "webpack-cli",
		alias: "cli",
		// 引入webpack-cli的npm包，如果有的话
		installed: isInstalled("webpack-cli"),
		// 推介
		recommended: true,
		url: "https://github.com/webpack/webpack-cli",
		description: "The original webpack full-featured CLI."
	},
	{
		name: "webpack-command",
		package: "webpack-command",
		binName: "webpack-command",
		alias: "command",
		// 引入webpack-command的npm包，如果有的话
		installed: isInstalled("webpack-command"),
		// 不推介
		recommended: false,
		url: "https://github.com/webpack-contrib/webpack-command",
		description: "A lightweight, opinionated webpack CLI."
	}
];

// 过滤掉没有下载安装的client
const installedClis = CLIs.filter(cli => cli.installed);

if (installedClis.length === 0) {
	// 如果没有安装任何client
	const path = require("path");
	const fs = require("fs");
	const readLine = require("readline");

	let notify =
		"One CLI for webpack must be installed. These are recommended choices, delivered as separate packages:";

	for (const item of CLIs) {
		if (item.recommended) {
			notify += `\n - ${item.name} (${item.url})\n   ${item.description}`;
		}
	}
	// 打印出推介下载的npm包，这里是webpack-cli
	console.error(notify);
	// 询问你是否想安装webpack-cli以及用啥子安装
	const isYarn = fs.existsSync(path.resolve(process.cwd(), "yarn.lock"));

	const packageManager = isYarn ? "yarn" : "npm";
	const installOptions = [isYarn ? "add" : "install", "-D"];

	console.error(
		`We will use "${packageManager}" to install the CLI via "${packageManager} ${installOptions.join(
			" "
		)}".`
	);

	let question = `Do you want to install 'webpack-cli' (yes/no): `;

	const questionInterface = readLine.createInterface({
		input: process.stdin,
		output: process.stderr
	});
	questionInterface.question(question, answer => {
		questionInterface.close();

		const normalizedAnswer = answer.toLowerCase().startsWith("y");

		if (!normalizedAnswer) {
			console.error(
				"You need to install 'webpack-cli' to use webpack via CLI.\n" +
					"You can also install the CLI manually."
			);
			process.exitCode = 1;

			return;
		}

		const packageName = "webpack-cli";

		console.log(
			`Installing '${packageName}' (running '${packageManager} ${installOptions.join(
				" "
			)} ${packageName}')...`
		);
		runCommand(packageManager, installOptions.concat(packageName))
			.then(() => {
				// 如果成功了，就将webpack-cli引入
				// 查看webpack-cli可以看到package.json里面的main是bin/cli.js，这是一个自运行函数
				require(packageName); //eslint-disable-line
			})
			.catch(error => {
				console.error(error);
				process.exitCode = 1;
				// 退出进程
			});
	});
} else if (installedClis.length === 1) {
	const path = require("path");
	const pkgPath = require.resolve(`${installedClis[0].package}/package.json`);
	// eslint-disable-next-line node/no-missing-require
	const pkg = require(pkgPath);
	// eslint-disable-next-line node/no-missing-require
	// 查看webpack-cli可以看到package.json里面的main是bin/cli.js，这是一个自运行函数，同installedClis.length === 0的情况
	require(path.resolve(
		path.dirname(pkgPath),
		pkg.bin[installedClis[0].binName]
	));
} else {
	// 如果安装了两种cli，提示删除一个
	// 这里感觉可以直接默认使用webpack-cli而不是警告
	console.warn(
		`You have installed ${installedClis
			.map(item => item.name)
			.join(
				" and "
			)} together. To work with the "webpack" command you need only one CLI package, please remove one of them or use them directly via their binary.`
	);
	process.exitCode = 1;
}
```

- 可以看到这个入口主要实现了命令行参数的获取以及校验是否安装了相关的客户端或者指令，最终目的就是引入`webpack-cli`中的`./bin/cli.js`文件，下面来看看这个文件是干嘛的

### webpack-cli's bin/cli.js

todotodo