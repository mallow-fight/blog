---
title: markdown语法
order: 6
type: software
---

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
