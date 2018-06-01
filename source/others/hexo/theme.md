---
title: 主题
type: hexo
order: 3
---

- `hexo`拥有丰富的主题，可前往[官网](https://hexo.io/themes/)查看。
- 我在写这个项目之前，发现`Vue`的官网也是使用`hexo`的，而且是开源的，[Vue的`hexo`项目地址](https://github.com/vuejs/cn.vuejs.org)
- `Vue`的官网主题在我看来是非常适合技术博客的，而且很美观，所以下面以接入`Vue`官网的主题为例：

## 修改`_config.yml`

- **将`theme`修改为`Vue`**

## 建立Vue主题

- 在`theme`文件夹下新建一个主题文件夹，我这里用的是`mallow`
- 在`mallow`文件夹下新建`layout`文件夹，这里面放的是布局文件，[详情见](/layout.html)
- 在`mallow`文件夹下新建`source`文件夹，这里面存放的是js和css以及字体和图片等，可直接从`Vue`仓库拷贝一份
- 在`mallow`文件夹下新建`_config.yml`文件，这个文件用来存放一些可供layout中的页面访问的常量或者对象，访问方式`<%- url_for(theme.name) %>`
<p class="tip">`<%- %>`书写方式参考[ejs](https://ejs.bootcss.com/)</p>

## `yml`定义常量或者变量

```yml
# 常量
name: mallow
# 对象
people:
- name: mallow
  age: 100
```