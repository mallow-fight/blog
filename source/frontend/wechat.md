---
title: wechat
type: wechat
order: 1
---

## [button清除样式](https://blog.csdn.net/Wu_shuxuan/article/details/78209125)

传统的用“border:none;来去除边框”，依旧有一条细细的border
button::after{ border: none; } 来去除边框

## getCurrentPage method

可以调用getCurrentPage(), 来获取进入页面的堆栈，最先进入的在最上面

## image

fixed定位的over-view上不能放置外部http形式的图片，会导致图片不能fixed

## 微信最新版登录流程

- wx.getSetting()
  - true -> wx.login() -> wx.getUserInfo() -> sso
  - false -> show user-login alert button -> get uesrInfo in button callback -> sso
- userInfo session
  - check globalData has userInfo
  - check localStorage has userInfo && it is not invalid.

## mpVue

### something notice

- you should delete `dist` folder and rebuild when delete some file in `src`.

## wechat-request-instance

```js
/**
 * 1. 调用initBaseUrl初始化域名
 * 2. 传入路径 + options（具体参数见【https://developers.weixin.qq.com/miniprogram/dev/api/network-request.html#wxrequestobject】）
 * 3. 该实例返回一个promise，可使用asyc-await。
 */
const INSTANCE = {
  initBaseUrl (url) {
    this.baseUrl = url
  },
  initMethods (methods) {
    return methods.map(method => {
      this[method.toLowerCase()] = this.request(method)
    })
  },
  request (method) {
    return function (url, options) {
      return new Promise((resolve, reject) => {
        return wx.request({
          url: `${this.baseUrl || ''}${url}`,
          method,
          ...options,
          success (res) {
            return resolve(res)
          },
          fail (res) {
            return reject(res)
          }
        })
      })
    }
  }
}
INSTANCE.initMethods(['OPTIONS', 'GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'TRACE', 'CONNECT'])
/**
 * expose INSTANCE prototype constructor to outside, prevent outside change it.
 */
export const instance = Object.create(INSTANCE)
```

## wepy

### [关于编译工具报错 - 出现脚本错误或者未正确调用 Page()](https://github.com/Tencent/wepy/issues/917)

就是.wpy和.js不能重名

## 小程序生命周期

app.js - onLaunch

1. 里面的异步操作不会在加载首页时完全执行

1. 所以首页需要的异步信息需要在首页的onLoad中执行，再去更新app中的globalData

1. 其它需要使用到globalData中的数据的界面需要首先通过首页拿到用户信息再跳转过去

## 小程序画弧形

使用`canvas`，移动设备不兼容，待微信修复，`canvas`总是在最上层，使用`cover-view`的话不方便。
```html
<template>
  <canvas canvas-id="commonBack" class="commonBack"/>
</template>
```
```js
// 缺陷 - 层级最高不适合做背景
export default {
  props: {
    heightScale: {
      type: Number,
      default: 1.2
    },
    linerScale: {
      type: Number,
      default: 0.52
    }
  },
  name: 'common-back',
  mounted () {
    const {deviceW, deviceH} = getApp().globalData
    const ctx = wx.createCanvasContext('commonBack')
    const grd = ctx.createLinearGradient(0, 0, 0, deviceH * this.linerScale)
    grd.addColorStop(0, '#FF5640')
    grd.addColorStop(1, '#FFC896')
    ctx.arc(deviceW / 2, -deviceW / this.heightScale, deviceW * 1.6, 0, Math.PI)
    ctx.setFillStyle(grd)
    ctx.fill()
    ctx.draw()
  }
}
```

## mpVue

### $emit 失效

子组件`$emit`失效，一直报错

原因：子组件中有一个props和自定义的click事件名相同，导致报错：找不到emit的事件名

心得：遇到问题要用排除法，确定用法没有出错的情况下，得查看语法有没有错误

### getApp().globalData.appOptions.query

这个query不会完全继承链接里面的参数，应该使用`this.$root.$mp.query`