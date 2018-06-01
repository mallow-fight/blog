---
title: 第三方插件
type: hexo
order: 6
---

## algolia

静态网站搜索引擎，可以免费使用

## NexT

基于`hexo`的主题，[官网](https://theme-next.iissnan.com/getting-started.html)
这上面可以找到一些三方服务，比如搜索、评论等。

## hexo-algolia

如果使用了docsearch，应该就不需要使用这个插件了，这个插件需要多做：
  - 搜索框
  - 更新db.json
所以还是最好不要使用这个东西，直接使用docsearch

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

```bash
$ export HEXO_ALGOLIA_INDEXING_KEY=82fdcfac2e888595cb2807aa60aaad58
$ hexo algolia
```

<p class="tip">before is my search key, you should replace with your search key.</p>

## docsearch

[官网](https://community.algolia.com/docsearch/)
这玩意可以每隔24小时自动抓取网站内容，可以是algolia生成docsearch使用的数据格式，并且可以定制搜索样式，需要先填写邮箱验证，需要等一段时间。
- 限制：网站必须建立完全，初期不健全的网站竟然被拒绝了，待我完成第一版博客后，在去提交资料。

## 用户数据分析

比较流行的
使用谷歌的数据分析
[官网](https://analytics.google.com/)
注册之后就可以使用啦
拿到网站的id，在`<head>`里面放置一段脚本就ok了

## 内容分享服务

## 评论系统