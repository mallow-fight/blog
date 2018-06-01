---
title: husky
type: git
order: 1
---

**这个插件可以用来在提交或者推送代码前执行`npm`命令，所以可以用它来在推送代码时完成项目的发布。**
- 仓库：[husky](https://github.com/typicode/husky)
- 安装: `npm install husky@next --save-dev`
- 用法：
```js
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm test",
      "pre-push": "npm test",
      "...": "..."
    }
  }
}
```
