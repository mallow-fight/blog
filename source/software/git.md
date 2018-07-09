---
title: git工具
type: software
order: 3
---

## 提交信息标准

格式

```html
<type>(<scope>): <subject>
// 空一行
<body>
// 空一行
<footer>
```

每次提交包括三个部分，`Headers`、`Body`和`Footer`。
Header 是必需的，Body 和 Footer 可以省略。

Header部分只有一行，包括三个字段：type（必需）、scope（可选）和subject（必需）。


### type

- feat：新功能（feature）
- fix：修补bug
- docs：文档（documentation）
- style： 格式（不影响代码运行的变动）
- refactor：重构（即不是新增功能，也不是修改bug的代码变动）
- test：增加测试
- chore：构建过程或辅助工具的变动

### scope

用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。

### subject

`commit`目的的简短描述，不超过`50`个字符。

- 以动词开头，使用第一人称现在时，比如change，而不是changed或changes
- 第一个字母小写
- 结尾不加句号（.）

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

## github markdown 语法

### 标题

```
# - h1 tag
## - h2 tag
###### - h6 tag
```

### 加重

```
*斜体*
_斜体_

**粗体**
__粗体__

_斜体**斜粗体**斜体_
```

### 列表

```
* 无序列表
* 无序列表
  * 无序列表
  * 无序列表

1. 有序列表
1. 有序列表
  1.有序列表
  1.有序列表
```

### 图片

```
![test](https://ss1.bdstatic.com/5eN1bjq8AAUYm2zgoY3K/r/www/cache/static/protocol/https/home/img/qrcode/zbios_x2_9d645d9.png)
```

### 链接

```
http://github.com - test
[github](http://github.com)
```

### 引用文字

```
> blockquotes
> text
```

### 行内代码

```
test`*addr*`test
test`<p>`test
```

### 语法高亮

```js
Object.create({test: 'prototype'})
```

### 任务列表

```
- [x] task1
- [x] task2
- [x] task3
- [ ] task4
```

### 表格

```txt
header one | header two | header three
---------- | ---------- | ------------
content one | content two | content five
content three | content four | content six
```

### SHA references

```txt
Any reference to a commit’s SHA-1 hash will be automatically converted into a link to that commit on GitHub.for example:

16c999e8c71134401a78d4d46435517b2271d6ac
mojombo@16c999e8c71134401a78d4d46435517b2271d6ac
mojombo/github-flavored-markdown@16c999e8c71134401a78d4d46435517b2271d6ac

```

### Issue references within a repository

```
Any number that refers to an Issue or Pull Request will be automatically converted into a link.for example:****

#1
mojombo#1
mojombo/github-flavored-markdown#1
```

### Username @mentions

Typing an @ symbol, followed by a username, will notify that person to come and view the comment. This is called an “@mention”, because you’re mentioning the individual. You can also @mention teams within an organization.

### Automatic linking for URLs

Any URL (like http://www.github.com/) will be automatically converted into a clickable link.

### Strikethrough

Any word wrapped with two tildes (like ~~this~~) will appear crossed out.

### Emoji

GitHub supports emoji! :sparkles: :camel: :boom:

To see a list of every image we support, check out the [Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet/).

## git命令集合

[how to use .gitignore](https://help.github.com/articles/ignoring-files/)

## 通用命令

1. git help `<command>` # 显示command的help
1. git show # 显示某次提交的内容 git show $id
1. git checkout -- `<file>` # 抛弃工作区修改
1. git checkout . # 抛弃工作区修改
1. git add `<file>` # 将工作文件修改提交到本地暂存区
1. git add . # 将所有修改过的工作文件提交暂存区
1. git rm `<file>` # 从版本库中删除文件
1. git rm `<file>` --cached # 从版本库中删除文件，但不删除文件
1. git reset `<file>` # 从暂存区恢复到工作文件
1. git reset -- . # 从暂存区恢复到工作文件
1. git reset --hard # 恢复最近一次提交过的状态，即放弃上次提交后的所有本次修改
1. git ci `<file>` git ci . git ci -a # 将git add, 1. git rm和git ci等操作都合并在一起做
1. git ci -am "some comments" # 提交代码
1. git ci --amend # 修改最后一次提交记录
1. git revert <$id> # 恢复某次提交的状态，恢复动作本身也创建次提交对象
1. git revert HEAD # 恢复最后一次提交的状态
1. git diff # 查看文件diff
1. git diff `<id1><id2>` # 比较两次提交之间的差异
1. git diff `<branch1>..<branch2>` # 在两个分支之间比较
1. git diff --staged # 比较暂存区和版本库差异
1. git diff --cached # 比较暂存区和版本库差异
1. git diff --stat # 仅仅比较统计信息
1. git log git log `<file>` # 查看该文件每次提交记录
1. git log -p `<file>` # 查看每次详细修改内容的diff
1. git log -p -2 # 查看最近两次详细修改内容的diff
1. git log --stat #查看提交统计信息
1. git branch -r # 查看远程分支
1. git branch `<new_branch>` # 创建新的分支
1. git branch -v # 查看各个分支最后提交信息
1. git branch --merged # 查看已经被合并到当前分支的分支
1. git branch --no-merged # 查看尚未被合并到当前分支的分1. 支
1. git checkout `<branch>` # 切换到某个分支
1. git checkout -b `<new_branch> <branch>` # 基于branch创建新的new_branch
1. git checkout $id # 把某次历史提交记录checkout出来，但1. 无分支信息，切换到其他分支会自动删除
1. git checkout $id -b `<new_branch>` # 把某次历史提交记1. 录checkout出来，创建成一个分支
1. git branch -d `<branch>` # 删除某个分支
1. git branch -D `<branch>` # 强制删除某个分支 (未被合并的1. 分支被删除的时候需要强制)
1. git merge `<branch>` # 将branch分支合并到当前分支
1. git merge origin/master --no-ff # 不要Fast-Foward合并，这样可以生成merge提交
1. git rebase master `<branch>` # 将master rebase到1. branch，相当于： git co <branch> && git rebase master && git co master && git merge `<branch>`
1. git diff > ../sync.patch # 生成补丁
1. git apply ../sync.patch # 打补丁
1. git apply --check ../sync.patch #测试补丁能否成功
1. git stash # 暂存
1. git stash list # 列所有stash
1. git stash apply # 恢复暂存的内容
1. git stash drop # 删除暂存区
1. Git远程分支管理
1. git pull # 抓取远程仓库所有分支更新并合并到本地
1. git pull --no-ff # 抓取远程仓库所有分支更新并合并到本1. 地，不要快进合并
1. git fetch origin # 抓取远程仓库更新
1. git merge origin/master # 将远程主分支合并到本地当前1. 分支
1. git checkout --track origin/branch # 跟踪某个远程分1. 支创建相应的本地分支
1. git checkout -b `<local_branch>` # 基于远程分支创建本地分支
1. git push # push所有分支
1. git push origin master # 将本地主分支推到远程主分支
1. git push -u origin master # 将本地主分支推到远程(如无1. 远程主分支则创建，用于初始化远程仓库)
1. git push origin `<local_branch>`# 创建远程分支,origin是远程仓库名
1. git push origin `<local_branch>:<remote_branch>` # 创建远程分支
1. git push origin `:<remote_branch>` #先删除本地分支(git br -d `<branch>`)，然后再push删除远程分支
1. git remote -v # 查看远程服务器地址和仓库名称
1. git remote show origin # 查看远程服务器仓库状态
1. git remote add origin git@ 1. github:robbin/robbin_site.git # 添加远程仓库地址
1. git remote set-url origin git@github.com:robbin/robbin_site.git # 设置远程仓库地址(用于修改远程仓库地址) 
1. git remote rm `<repository>` # 删除远程仓库
1. git clone --bare robbin_site robbin_site.git # 用1. 带版本的项目创建纯版本仓库
1. scp -r my_project.git git@ git.csdn.net:~ # 将纯仓1. 库上传到服务器上
1. mkdir robbin_site.git && cd robbin_site.git && 1. git --bare init # 在服务器创建纯仓库
1. git remote add origin git@ 1. github.com:robbin/robbin_site.git # 设置远程仓库地1. 址
1. git push -u origin master # 客户端首次提交
1. git push -u origin develop # 首次将本地develop分支1. 提交到远程develop分支，并且track
1. git remote set-head origin master # 设置远程仓库的1. HEAD指向master分支
1. 也可以命令设置跟踪远程库和本地库
1. git branch --set-upstream master origin/master
1. git branch --set-upstream develop origin/develop

```
give:在自己的分支上
when:在自己的分支上提交代码，然后切换到dev分支
then:git fetch,git rebase(拉取dev远程自身代码)  git merge <自己的分支>:合并远程分支

give:在自己的分支上
when:在自己的分支上git stash, 然后切换到dev分支
then:git fetch,git rebase(拉取dev远程自身代码) git stash pop

give:在自己的分支上
when:git rebase有冲突
then:解决冲突后,首先 ga . ,然后git rebase --continnue
```

## 打tag

git tag -a v1.4 -m 'my version 1.4'

## makefile注意事项

- 不能随便使用tab  要enter进行换行 
- 其他的如，make变量的定义、赋值，make内定函数如$(error "strings")都不能以TAB开头，不然make会将其作为命令来处理！

## 重新使gitignore生效

```bash
git rm -r --cached .
git add .
git commit -m ".gitignore is now working"
```

## 提交代码
```bash
ga .
gcam 'you commit message'
git pull origin master
git push origin master
```