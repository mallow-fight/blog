---
title: hexo
type: hexo
order: 1
---

<p class="tip">本篇文章通篇在`mac-os`环境下运行。

## 介绍

`Hexo`是一个快速、简洁且高效的博客框架。Hexo 使用 Markdown（或其他渲染引擎）解析文章，在几秒内，即可利用靓丽的主题生成静态网页。
>[Hexo官网](https://hexo.io/zh-cn/docs/index.html)

## hexo初始化

```bash
$ hexo init [folder]
```

<p class="tip">如果没有设置 folder ，Hexo 默认在目前的文件夹建立网站。</br>如果设置了folder，则folder必须为空文件夹。</br>可通过`$ mkdir [folder-name]`来创建空文件夹。

## 配置package.json

- **给`package.json`设置以下`script`：**
```js
"scripts": {
  "start": "hexo server",
  "build": "hexo clean && hexo generate",
  "deploy": "npm run build && hexo deploy"
}
```
> `npm run start` - 开启服务，默认端口4000，开启后可在本地4000端口查看静态文件，刷新可更新本地资源的更新。
> `npm run build` - 删除`public`文件夹并且重新生成`public`静态资源文件夹。
> `npm run deploy` - 重新生成静态文件夹`public`并且将它以指定方式发布（这个项目使用的是`git`方式，后面会讲）。

## 配置`_config.yml`

- **可参考[官网](https://hexo.io/zh-cn/docs/configuration.html)**进行配置，这一部分官网还是很详细的。