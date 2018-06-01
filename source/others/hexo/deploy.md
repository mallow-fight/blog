---
title: 发布
type: hexo
order: 2
---

如何将生成的静态文件部署到服务器上是一件很重要的事。下面以部署到`git-pages`为例：

## 修改`_config.yml`

```yml
deploy:
  type: git
  repository: git@github.com:mallow-fight/mallow-fight.github.io.git
  branch: master
```
> `type`发布类型
> `repository`是`git-pages`的仓库地址
> 这里使用的是本人的github地址，需要修改成你自己的
> [如何建立git-pages](https://pages.github.com/)
> `branch`发布分支