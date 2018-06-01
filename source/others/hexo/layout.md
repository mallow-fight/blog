---
title: 布局
type: hexo
order: 4
---

<p class="tip">前置知识：[ejs](https://ejs.bootcss.com/)</p>

下面以`Vue`的主题效果为例，介绍一下`theme/layout`文件夹下的内容：

## layout.ejs

- 页面整体的布局，这里按照`html5`的标准，你可以在这里：
  - 引入公共`js`
  - 引入公共`css`
  - 设置`meta`
  - 设置页面`title`和`icon`
  - ...

## index.ejs

- 网站主页，用户进入网站首先看到的页面，一般来说这里有一个导航让用户进入副页。
- 在`layout.ejs`中引入`<%- body %>`可将主页引入整体布局，可以利用`ejs`加上一些逻辑决定什么时候显示主页

## page.ejs

- 网站副页，用户通过导航进入的页面
- 原理就是通过设置在首页导航上的链接来跳转到page

## partials文件夹

- 类似于公共组件，其它页面可以通过`partial('partials/xxx')`来引用对应的公共组件
- 组件中可以以`<a href="<%- url_for("/others/hexo/") %>跳转到hexo首页</a>`跳转到`markdown`编译过后的`html`文件

## icons文件夹

- 类似于图标公共组件
- 一些`svg`图标
- 通过`<%- partial('icons/play') %>`引用