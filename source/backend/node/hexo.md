---
title: hexo
type: node
order: 5
---

> [Hexo官网](https://hexo.io/zh-cn/docs/index.html)

<p class="tip">本篇文章通篇在`mac-os`环境下运行。</p>

## 介绍

`Hexo`是一个快速、简洁且高效的博客框架。Hexo 使用 Markdown（或其他渲染引擎）解析文章，在几秒内，即可利用靓丽的主题生成静态网页。

## hexo初始化

```bash
$ hexo init [folder]
```

<p class="tip">如果没有设置 folder ，Hexo 默认在目前的文件夹建立网站。</br>如果设置了folder，则folder必须为空文件夹。</br>可通过`$ mkdir [folder-name]`来创建空文件夹。</p>

## 配置package.json

- **给`package.json`设置以下`script`：**
```js
"scripts": {
  "start": "hexo server",
  "build": "hexo clean && hexo generate",
  "deploy": "npm run build && hexo deploy"
}
```

- `npm run start` - 开启服务，默认端口4000，开启后可在本地4000端口查看静态文件，刷新可更新本地资源的更新。

- `npm run build` - 删除`public`文件夹并且重新生成`public`静态资源文件夹。
- `npm run deploy` - 重新生成静态文件夹`public`并且将它以指定方式发布（这个项目使用的是`git`方式，后面会讲）。

## 配置`_config.yml`

- **可参考[官网](https://hexo.io/zh-cn/docs/configuration.html)**进行配置，这一部分官网还是很详细的。

## 发布

如何将生成的静态文件部署到服务器上是一件很重要的事。下面以部署到`git-pages`为例：

### 修改`_config.yml`

```yml
deploy:
  type: git
  repository: git@github.com:mallow-fight/mallow-fight.github.io.git
  branch: master
```

- `type`：发布类型
- `repository`是`git-pages`的仓库地址
-  这里使用的是本人的github地址，需要修改成你自己的
-  [如何建立git-pages](https://pages.github.com/)
- `branch`发布分支

## 主题

- `hexo`拥有丰富的主题，可前往[官网](https://hexo.io/themes/)查看。

- 我在写这个项目之前，发现`Vue`的官网也是使用`hexo`的，而且是开源的，[Vue的`hexo`项目地址](https://github.com/vuejs/cn.vuejs.org)

- `Vue`的官网主题在我看来是非常适合技术博客的，而且很美观，所以下面以接入`Vue`官网的主题为例：

### 修改`_config.yml`

- **将`theme`修改为`Vue`**

### 建立Vue主题

- 在`theme`文件夹下新建一个主题文件夹，我这里用的是`mallow`

- 在`mallow`文件夹下新建`layout`文件夹，这里面放的是布局文件，[详情见](/layout.html)

- 在`mallow`文件夹下新建`source`文件夹，这里面存放的是js和css以及字体和图片等，可直接从`Vue`仓库拷贝一份

- 在`mallow`文件夹下新建`_config.yml`文件，这个文件用来存放一些可供layout中的页面访问的常量或者对象，访问方式`<%- url_for(theme.name) %>`

<p class="tip">`<%- %>`书写方式参考[ejs](https://ejs.bootcss.com/)</p>

### `yml`定义常量或者变量

```yml
# 常量
name: mallow
# 对象
people:
- name: mallow
  age: 100
```

## 布局

<p class="tip">前置知识：[ejs](https://ejs.bootcss.com/)</p>

下面以`Vue`的主题效果为例，介绍一下`theme/layout`文件夹下的内容：

### layout.ejs

- 页面整体的布局，这里按照`html5`的标准，你可以在这里：
  - 引入公共`js`
  - 引入公共`css`
  - 设置`meta`
  - 设置页面`title`和`icon`
  - ...

### index.ejs

- 网站主页，用户进入网站首先看到的页面，一般来说这里有一个导航让用户进入副页。

- 在`layout.ejs`中引入`<%- body %>`可将主页引入整体布局，可以利用`ejs`加上一些逻辑决定什么时候显示主页

### page.ejs

- 网站副页，用户通过导航进入的页面

- 原理就是通过设置在首页导航上的链接来跳转到page

- 左右角标只有同一类型的`md`文件出现才会出现

### post.ejs

- 根据这个文件布局`resource/_posts`中的`markdown`

### partials文件夹

- 类似于公共组件，其它页面可以通过`partial('partials/xxx')`来引用对应的公共组件

- 组件中可以以`<a href="<%- url_for("/others/hexo/") %>跳转到hexo首页</a>`跳转到`markdown`编译过后的`html`文件

### icons文件夹

- 类似于图标公共组件

- 一些`svg`图标

- 通过`<%- partial('icons/play') %>`引用

## 补充

- 至此一个基于`hexo`的博客就完成

- 修改`/partials/main_menu.ejs`来新增导航栏目，然后就可以在对应文件夹下开心的写`markdown`了

- `markdown`书写规则参考本项目，可以在`markdown`中使用`Vue`哦！

## 第三方插件

### algolia

静态网站搜索引擎，可以免费使用

### NexT

基于`hexo`的主题，[官网](https://theme-next.iissnan.com/getting-started.html)
这上面可以找到一些三方服务，比如搜索、评论等。

### hexo-algolia

- 如果使用了docsearch，应该就不需要使用这个插件了，这个插件需要多做：
  - 搜索框
  - 更新db.json

- 所以还是最好不要使用这个东西，直接使用docsearch

### Install

```bash
$ npm install --save hexo-algolia
```

### update `_config.yml`

```yml
algolia:
  applicationID: 'applicationID'
  apiKey: 'apiKey'
  indexName: '...'
```

### create and push local db.json

- 这个生成的db和docsearch的前端不兼容

- 如果要使用这个db，需要自己画前端，并且在上传代码时更新本地db

```bash
$ export HEXO_ALGOLIA_INDEXING_KEY=82fdcfac2e888595cb2807aa60aaad58
$ hexo algolia
```

<p class="tip">before is my search key, you should replace with your search key.</p>

### docsearch

> [官网](https://community.algolia.com/docsearch/)

这玩意可以每隔24小时自动抓取网站内容，可以是algolia生成docsearch使用的数据格式，并且可以定制搜索样式，需要先填写邮箱验证，需要等一段时间。

- 限制：网站必须建立完全，初期不健全的网站竟然被拒绝了，待我完成第一版博客后，在去提交资料。

- 这个审核有点严格，赶明修改一下docsearch.js，自己生成格式对应的json文件

- 照理说，docsearch分为三个部分，应该只需要使用它爬下网站内容并上传到algoria就可以了，关键是怎么使用它在本地爬网站内容并上传。

- [参考](https://github.com/algolia/docsearch-scraper)，使用它应该可以生成对应的db

### 用户数据分析

比较流行的
使用谷歌的数据分析
注册之后就可以使用啦
拿到网站的id，在`<head>`里面放置一段脚本就ok了

> [官网](https://analytics.google.com/)

### 修改docsearch.js

由于审核不通过，只能自己想办法解决搜索问题

- 已有条件
  - `docsearch`可以调的通接口，拿到搜索数据
  - 通过`hexo-algolia`爬下本地文章db上传到`algolia`
  
- 解决办法
  - 在`docsearch`格式化请求回来的数据之前，使用自定义函数将接口返回的数据格式化为`Vue`或者其它已经接入`docsearch`网站的数据格式

自定义函数如下
```js
function mallowFormatHits(hits) {
  let time = (new Date()).getTime()
  return hits.map(hit => {
    const _highlightResult = hit._highlightResult
    const {title} = hit
    const hierarchy = {
      lvl0: hit.title,
      lvl1: null,
      lvl2: null,
      lvl3: null,
      lvl4: null,
      lvl5: null,
      lvl6: null
    }
    const lvl0 = {
      "value": _highlightResult.title.value,
      "matchLevel": _highlightResult.title.matchLevel,
      "matchedWords": _highlightResult.title.matchedWords
    }
    return {
      "hierarchy": hierarchy,
      "url": hit.permalink,
      "content": null,
      "anchor": hit.title,
      "objectID": time++,
      "_highlightResult": {
        "hierarchy": {
          lvl0
        },
        "hierarchy_camel": [{
          lvl0
        }]
      }
    }
  })
}
```

### 内容分享服务

接的百度分享

>[参考](http://share.baidu.com/code/advance#toid)

悬浮的分享按钮影响美观，隐藏了，可通过首页`footer`分享
可选中分享按钮，定制样式
```js
var getShareButtonTime = setInterval(() => {
  var shareButton = window.document.querySelector(".bdshare-slide-button")
  if (shareButton) {
    clearInterval(getShareButtonTime)
    // 影响美观，暂时移除
    shareButton.style.opacity = 0
    shareButton.style.color = 'white'
    shareButton.style.background = '#42b983'
    shareButton.style.fontSize = '20rem'
    shareButton.innerText = 'Share'
  }
}, 100)
```
> 这个东西里面有很多http链接，导致页面出现不安全链接的提示

> 暂时禁止分享，以后可以考虑做个二维码，扫一扫手机访问，一般来讲，微信访问的话应该可以直接右上角分享，也可以接微信的sdk分享，不过没必要

> 可以考虑做个订阅号，把博客放进去

### 评论系统

- 接的`DISQUS`改了下布局，详情看`page.ejs`

- 这玩意没翻墙的情况下影响页面加载速度，已注释