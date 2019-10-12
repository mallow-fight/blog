---
title: vscode
order: 2
type: ide
---

## 统一配置

- 统一vscode配置在多人协作的时候有很大的作用
- 提交一个名为：.vscode的文件，内容可以有
```js
{
  "eslint.workingDirectories": [
      "./client",
      "./server"
  ],
  "eslint.autoFixOnSave": true,
  "eslint.validate": [
    "javascript", 
    {
      "language": "javascriptreact",
      "autoFix": true
    },
    "html",
    "react",
    "jsx"
  ],
  "javascript.implicitProjectConfig.experimentalDecorators": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.tslint": true
  },
  "editor.insertSpaces": true,
  "editor.tabSize": 2,
  "editor.detectIndentation": false,
  "typescript.validate.enable": true,
  "tslint.jsEnable": false,
  "prettier.printWidth": 100,
  "prettier.singleQuote": true,
  "prettier.trailingComma": "all",
}
```
- 主要实现了一下功能：
	1. 约定一些缩进等代码样式
	2. 自动修复lint问题
	3. 指定不同文件夹下面不同的eslint文件（这个需要注意，你使用的eslint配置中的插件和依赖一定要全部装上，不然配置文件会不起作用，导致不生效）