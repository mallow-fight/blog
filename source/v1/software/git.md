---
title: git相关
type: software
order: 4
---

## github按钮功能
- watch：谨慎点击，项目变动会发送邮件给你
- star：点赞或收藏，方便查找
- fork：补充完善这个项目的内容

## 提交信息标准

### 格式

```bash
type(scope): subject
# 空一行
body
# 空一行
footer
```

- 每次提交包括三个部分，`Headers`、`Body`和`Footer`。
- `Header` 是必需的，`Body` 和 `Footer` 可以省略。
- `Header` 部分只有一行，包括三个字段： `type` （必需）、 `scope` （可选）和 `subject` （必需）。


### type

- feat：新功能（feature）
- fix：修补bug
- docs：文档（documentation）
- style： 格式（不影响代码运行的变动）
- refactor：重构（即不是新增功能，也不是修改bug的代码变动）
- test：增加测试
- chore：构建过程或辅助工具的变动

### scope

- 用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。

### subject

`commit`目的的简短描述，不超过`50`个字符。

- 以动词开头，使用第一人称现在时，比如`change`，而不是`changed`或`changes`
- 第一个字母小写
- 结尾不加句号`（.）`

## 插件

### husky

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

## git通用命令

```bash

# 常用

git help `<command>` # 显示某个指令的帮助指南

git show $id # 首先通过`git log`查询出某次提交的id，然后通过这个指令查出该次提交的具体信息

git add . # 将所有修改过的工作文件提交暂存区

git reset --hard # 恢复最近一次提交过的状态，即放弃上次提交后的所有本次修改

git ci -am "some comments" # 提交代码

git diff # 查看修改的文件

git log # 查看所有提交记录

git branch -r # 查看远程分支

git checkout `<exsit_branch>` # 切换到某个存在的分支

git checkout -b `<new_branch>` # 基于当前分支创建新的本地new_branch

git checkout $id -b `<new_branch>` # 把某次历史提交记录checkout出来，创建成一个分支

git merge `<branch>` # 将本地branch分支合并到当前本地分支

git merge origin/branch # 将远程branch分支合并到本地当前分支

git stash # 暂存

git stash apply # 恢复暂存的内容

git stash drop # 删除暂存区

git pull # 抓取远程仓库所有分支更新并合并到本地

git push origin branch # 将本地branch分支推到远程主分支

git push -u origin master # 客户端首次提交
```

### 上传本地仓库
```bash
# if not exist
echo "# image-bed" >> README.md
# else if exist .git
rm -rf .git
# else
git init
git add . # same as ga.
git commit -am "first commit" # same as gcam
git remote add origin https://github.com/mallow-fight/image-bed.git
git push -u origin master
```

### 打tag

```bash
git tag -a v1.4 -m 'my version 1.4' # 本地添加标签名
git tag # 查看所有标签名
git push origin [tagName] # 将指定的标签名推送到远程仓库上
```

### 重新使gitignore生效

>[参考资料-如何使用.gitignore](https://help.github.com/articles/ignoring-files/)

```bash
git rm -r --cached .
git add .
git commit -m ".gitignore is now working"
```

### 分支管理

- [简书](https://www.jianshu.com/p/3be4029ce854)