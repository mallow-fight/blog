---
title: 微信相关
type: wechat
order: 1
---
## 小程序webview
**每个`pages`都可以有一个`webview`组件，所以一些静态化和用户无关的界面可以使用`html`链接代替。**

## 小程序生命周期 $$

> 测试环境：`"mpVue": "^1.0.10"`。
> 不要使用`mpVue`自带的生命周期，有时候会出现各种预料之外的`bug`，而且小程序自带的生命周期可以完全满足需求。

### 运行机制
前台、后台定义： 当用户点击左上角关闭，或者按了设备 Home 键离开微信，小程序并没有直接销毁，而是进入了后台；当再次进入微信或再次打开小程序，又会从后台进入前台。需要注意的是：只有当小程序进入后台一定时间，或者系统资源占用过高，才会被真正的销毁。

关闭小程序（基础库版本1.1.0开始支持）： 当用户从扫一扫、转发等入口(场景值为1007, 1008, 1011, 1025)进入小程序，且没有置顶小程序的情况下退出，小程序会被销毁。

小程序启动会有两种情况，一种是「冷启动」，一种是「热启动」。 假如用户已经打开过某小程序，然后在一定时间内再次打开该小程序，此时无需重新启动，只需将后台态的小程序切换到前台，这个过程就是热启动；冷启动指的是用户首次打开或小程序被微信主动销毁后再次打开的情况，此时小程序需要重新加载启动。

### 更新机制

小程序冷启动时如果发现有新版本，将会异步下载新版本的代码包，并同时用客户端本地的包进行启动，即新版本的小程序需要等下一次冷启动才会应用上。 如果需要马上应用最新版本，可以使用 wx.getUpdateManager API 进行处理。

### 销毁机制

小程序没有重启的概念
当小程序进入后台，客户端会维持一段时间的运行状态，超过一定时间后（目前是5分钟）会被微信主动销毁
当短时间内（5s）连续收到两次以上收到系统内存告警，会进行小程序的销毁

### 再次打开逻辑

基础库 1.4.0 开始支持，低版本需做兼容处理

用户打开小程序的预期有以下两类场景：

A. 打开首页： 场景值有 1001, 1019, 1022, 1023, 1038, 1056

B. 打开小程序指定的某个页面： 场景值为除 A 以外的其他

当再次打开一个小程序逻辑如下：

上一次的场景 | 当前打开的场景 | 效果
--- | --- | ---
A | A	| 保留原来的状态
B |	A |	清空原来的页面栈，打开首页（相当于执行 wx.reLaunch 到首页）
A 或 B |	B |	清空原来的页面栈，打开指定页面（相当于执行 wx.reLaunch 到指定页）

### App()

> 以下钩子函数执行顺序仅限于同步调用，异步调用尽量不要耦合不同钩子函数，会出现依赖失败的情况

- `onLaunch`: 全局只触发一次，注意：
  - 这里面的异步操作不能耗时过长，不然会出现`pages-onLoad`和`pages-onShow`先于异步操作触发
- `onShow`: 同步操作，先于`onLaunch`触发，小程序从后台进入前台显示时，会触发
- `onHide`: 小程序从前台进入后台显示时，会触发
- `onError`: 参数就是报错信息，脚本错误或api调用失败时触发
- `onPageNotFound`: 打开的页面不存在时触发

顺序：
- 首次进入：`onShow` -> `onLaunch`
- 进入后台：`onHide`
- 再次进入：`onShow`
- 页面卸载：
- 再次进入：同首次进入

### Page

- `onLoad`: 第一个触发，有`options`，监听页面加载，一个页面只会调用一次，可以在 onLoad 中获取打开当前页面所调用的 query 参数。
- `onShow`: 第二个触发，监听页面显示，每次打开页面都会调用一次。
- `onReady`: 第三个触发，监听页面初次渲染完成，一个页面只会调用一次，代表页面已经准备妥当，可以和视图层进行交互。对界面的设置如`wx.setNavigationBarTitle`请在onReady之后设置。
- `onHide`: 先于App()的`onHide`事件触发，当navigateTo或底部tab切换时调用。
- `onUnload`: 监听页面卸载，一般情况下，不存在页面的卸载，除了长时间未进入小程序，或者删掉小程序，当redirectTo或navigateBack的时候调用，使用其它跳转不会使页面卸载，相反，可能存在缓存，点击左上角返回按钮或者手机上的返回按钮，不会触发这个事件。
- `onPullDownRefresh`: 下拉动作，需要先配置可下拉
- `onReachBottom`: 上拉触底事件的回调
- `onShareAppMessage`: 右上角转发
- `onPageScroll`: 页面滚动触发
- `onTabItemTap`: tab页点击tab时触发

顺序：
- 首次进入：`onLoad` -> `onShow` -> `onReady`
- 进入后台：`onHide`
- 再次进入：`onShow`
- 页面卸载：`onUnload`
- 再次进入：同首次进入

### component

- `onLoad`: 监听组件加载，有`options`
- `onReady`: 监听组件初次渲染完成，注意：只会在初次渲染完成后触发一次，如果没有卸载这个组件，则不会再次触发该事件，所以说这个事件和`onShow`不会同时触发，如果没有卸载这个组件，则会触发`onShow`事件
- `onHide`: 监听组件从前台进入后台
- `onShow`: 监听组件从后台进入前台，注意：首次渲染不触发这个事件，切换回这个组件才会触发这个事件
- `onUnload`: 监听组件卸载，当redirectTo或navigateBack的时候调用

顺序：
- 首次加载：`onLoad` -> `onReady`
- 进入后台：`onHide`
- 再次进入：`onShow`
- 卸载：`onUnload`
- 再次进入：同首次加载

### component-child

同`component`

### 总体生命周期钩子调用顺序

> 仅在同步操作情况下
> 调用哪些钩子同上

- 首次加载：`App` -> `pages` -> `component` -> `component-child`
- 进入后台：`pages` -> `component` -> `component-child` -> `App`
- 再次进入：`App` -> `pages` -> `component` -> `componet-child`
- 卸载：`pages` -> `component` -> `componet-child`
- 再次进入：同首次加载

## 上线准备

- 后台安全域名配置
- 提审材料
- 压缩代码（有可能打包之后有些方法和样式不支持，需要排查）

## 小程序页面渲染

小程序不同于原生app应用，存在诸多性能限制，需要注意：

- 页面不能有过长的列表
- 每个列表内容不能过多
- 注意及时销毁列表项，保持列表项的项数越少越好
- socket不能连接太多，数据变化不能太快
- 频繁触发的事件需要加上锁，防止事件队列太长，导致页面瘫痪

优化点：

- 懒加载（适用于静态列表的加载）
- 事件锁
- 多页应用，保证页面可以正常承载

## 小程序分享

`pages`分享不能带有异步操作，这意味着：

- 分享弹窗事件优先
- 点击一个分享按钮之前，必须将数据准备好，不能异步获取，但可以同步调用
- 如果分享函数中携带了异步操作，会导致分享失效

## [button清除样式](https://blog.csdn.net/Wu_shuxuan/article/details/78209125)

传统的用“border:none;来去除边框”，依旧有一条细细的border
button::after{ border: none; } 来去除边框

## getCurrentPage method

可以调用getCurrentPage(), 来获取进入页面的堆栈，最先进入的在最上面

## image

fixed定位的over-view上不能放置外部http形式的图片，会导致图片不能fixed

## 微信最新版登录流程 $$

- wx.getSetting()
  - true -> wx.login() -> wx.getUserInfo() -> sso
  - false -> show user-login alert button -> get uesrInfo in button callback -> sso
- userInfo session
  - check globalData has userInfo

## 版本更新&兼容

判断api是否可用 - `wx.canIUse(String)`，根据这个执行相应的兼容策略
管理小程序更新 - `wx.getUpdateManager()`
onCheckForUpdate	callback	当向微信后台请求完新版本信息，会进行回调
onUpdateReady	callback	当新版本下载完成，会进行回调
onUpdateFailed	callback	当新版本下载失败，会进行回调
applyUpdate		当新版本下载完成，调用该方法会强制当前小程序应用上新版本并重启
检查更新操作由微信在小程序冷启动时自动触发，不需由开发者主动触发，开发者只需监听检查结果即可。

## mpVue

### 对接打点
- 首先引入`sensorsdata.min.js`，修改配置部分，实例：
```js
/* eslint-disable */
var conf = {
  test: {
    // 神策分析注册在APP全局函数中的变量名，在非app.js中可以通过getApp().sensors(你这里定义的名字来使用)
    name: 'sensors',
    // 神策分析数据接收地址
    server_url: 'xxx-test',
    // 传入的字符串最大长度限制
    max_string_length: 300,
    // 发送事件的时间使用客户端时间还是服务端时间
    use_client_time: false,
    // 是否自动采集如下事件
    autoTrack:{
      //$MPLaunch
      appLaunch:false,
      //$MPShow
      appShow:false,
      //$MPHide
      appHide:false,
      //$MPViewScreen
      pageShow:false
    }
  },
  production: {
    // 神策分析注册在APP全局函数中的变量名，在非app.js中可以通过getApp().sensors(你这里定义的名字来使用)
    name: 'sensors',
    // 神策分析数据接收地址
    server_url: 'xxx-prod',
    // 传入的字符串最大长度限制
    max_string_length: 300,
    // 发送事件的时间使用客户端时间还是服务端时间
    use_client_time: false,
    // 是否自动采集如下事件
    autoTrack:{
      //$MPLaunch
      appLaunch:false,
      //$MPShow
      appShow:false,
      //$MPHide
      appHide:false,
      //$MPViewScreen
      pageShow:false
    }
  }
};

export default conf[process.env.ENV]
```

- 在`main.js`中引入：
```js
import './utils/sensorsdata.min.js'
import {sa} from './utils/index'

Vue.prototype.$sa = sa
```

- `sa`定义：
```js
export const sa = (key, payload) => {
  return getApp().sensors.track(key, payload)
}
```

- `sa`使用方式
```js
this.$sa('whichEvent', {eventName: 'event description'})
```

### 使用process.env区分不同环境
- 首先安装`cross-env`: `cnpm i cross-env -D`
- 修改`config/dev.env.js`为：
```js
var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ENV: '"' + process.env.ENV + '"'
})
```
- 然后就可以访问`process.env.ENV`这个环境变量了
- 可修改`package.json`为：
```js
"scripts": {
  "dev": "cross-env ENV=test node build/dev-server.js", // test env
  "start": "npm run dev", // test env
  "debug": "cross-env ENV=debug node build/dev-server.js", // debug mode
  "build:local": "cross-env ENV=local node build/dev-server.js", // local env
  "build:test": "rimraf dist && cross-env ENV=test node build/build.js", // build for test
  "build:production": "rimraf dist && cross-env ENV=production node build/build.js", // build for production
  "lint": "eslint --ext .js,.vue src" // lint your files
}
```

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

### issues
- [关于编译工具报错 - 出现脚本错误或者未正确调用 Page()](https://github.com/Tencent/wepy/issues/917)
  - 解决方法：就是.wpy和.js不能重名

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