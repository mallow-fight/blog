---
title: wechat
order: 5
type: questions
---

## 公众号登录流程
- 建议公众号开发者使用中控服务器统一获取和刷新Access_token，其他业务逻辑服务器所使用的access_token均来自于该中控服务器，不应该各自去刷新，否则容易造成冲突，导致access_token覆盖而影响业务；
- 目前Access_token的有效期通过返回的expire_in来传达，目前是7200秒之内的值。中控服务器需要根据这个有效时间提前去刷新新access_token。在刷新过程中，中控服务器可对外继续输出的老access_token，此时公众平台后台会保证在5分钟内，新老access_token都可用，这保证了第三方业务的平滑过渡；
- Access_token的有效时间可能会在未来有调整，所以中控服务器不仅需要内部定时主动刷新，还需要提供被动刷新access_token的接口，这样便于业务服务器在API调用获知access_token已超时的情况下，可以触发access_token的刷新流程。

## 小程序底层原理

> [腾讯云社区](https://cloud.tencent.com/developer/article/1029663)
> [知乎](https://www.zhihu.com/question/50920642)

### 架构

- 微信小程序的框架包含两部分View视图层、App Service逻辑层
  - View层用来渲染页面结构
  - AppService层用来逻辑处理、数据请求、接口调用
  - 它们在两个进程（两个Webview）里运行
- 视图层和逻辑层通过系统层的JSBridage进行通信，逻辑层把数据变化通知到视图层，触发视图层页面更新，视图层把触发的事件通知到逻辑层进行业务处理

![小程序架构图](../../images/mpFramework.png)

- 小程序启动时会从CDN下载小程序的完整包，一般是数字命名的,如：_-2082693788_4.wxapkg

### 实现

> [什么是webview](https://juejin.im/entry/573441971ea4930060c97cd2)

- 小程序的UI视图和逻辑处理是用多个webview实现的，逻辑处理的JS代码全部加载到一个Webview里面，称之为AppService，整个小程序只有一个，并且整个生命周期常驻内存。
- 而所有的视图（wxml和wxss）都是单独的Webview来承载，称之为AppView。
- 所以一个小程序打开至少就会有2个webview进程，正式因为每个视图都是一个独立的webview进程，考虑到性能消耗，小程序不允许打开超过5个层级的页面，当然同是也是为了体验更好。

#### AppService

可以理解AppService即一个简单的页面，主要功能是负责逻辑处理部分的执行，底层提供一个WAService.js的文件来提供各种api接口，主要是以下几个部分：
- 消息通信封装为WeixinJSBridge
  - 开发环境：window.postMessage
  - IOS：WKWebview的window.webkit.messageHandlers.invokeHandler.postMessage
  - android：WeixinJSCore.invokeHandler）
- 日志组件Reporter封装
- wx对象下面的api方法
- 全局的App,Page,getApp,getCurrentPages等全局方法
- 还有就是对AMD模块规范的实现

然后整个页面就是加载一堆JS文件，包括小程序配置config，上面的WAService.js（调试模式下有asdebug.js），剩下就是我们自己写的全部的js文件，一次性都加载。

#### AppView

类似于h5的页面，提供UI渲染，底层提供一个WAWebview.js来提供底层的功能,具体如下：
- 消息通信封装为WeixinJSBridge（同AppService）
- 日志组件Reporter封装
- wx对象下的api，这里的api跟WAService里的还不太一样，有几个跟那边功能差不多，但是大部分都是处理UI显示相关的方法
- 小程序组件实现和注册
- VirtualDOM，Diff和Render UI实现
- 页面事件触发

在此基础上，AppView有一个html模板文件，通过这个模板文件加载具体的页面，这个模板主要就一个方法：$gwx，主要是返回指定page的VirtualDOM，而在打包的时候，会事先把所有页面的WXML转换为ViirtualDOM放到模板文件里，而微信自己写了2个工具wcc（把WXML转换为VirtualDOM）和wcsc（把WXSS转换为一个JS字符串的形式通过style标签append到header里）。

#### service和view通信

使用消息`publish`和`subscribe`机制实现两个`Webview`之间的通信，实现方式就是统一封装一个`WeixinJSBridge`对象，而不同的环境封装的接口不一样，具体实现的技术如下：

- windows
  - 通过window.postMessage实现（使用chrome扩展的接口注入一个contentScript.js，它封装了postMessage方法，实现webview之间的通信，并且也它通过chrome.runtime.connect方式，也提供了直接操作chrome native原生方法的接口）
  - 发送消息：window.postMessage(data, ‘*’);，// data里指定 webviewID
  - 接收消息：window.addEventListener(‘message’, messageHandler); // 消息处理并分发，同样支持调用nwjs的原生能力。
  - appservice也是通过一个webview实现的，实现原理上跟view一样，只是处理的业务逻辑不一样。
- ios
  - 通过 WKWebview的window.webkit.messageHandlers.NAME.postMessage实现微信navite代码里实现了两个handler消息处理器：
    - invokeHandler: 调用原生能力
    - publishHandler: 消息分发

![iosJsBridge](../../images/iosJsBridge.png)

- Android
  - 通过WeixinJSCore.invokeHanlder实现，这个WeixinJSCore是微信提供给JS调用的接口（native实现）
    - invokeHandler: 调用原生能力
    - publishHandler: 消息分发

### 总结
**小程序底层还是基于`webview`实现的，基于`web`规范，只需要了解框架规范便可以进行快速开发。**

- MSSM：对逻辑和UI进行了完全隔离，这个跟当前流行的react，agular，vue有本质的区别，小程序逻辑和UI完全运行在2个独立的Webview里面，而后面这几个框架还是运行在一个webview里面的，如果你想，还是可以直接操作dom对象，进行ui渲染的。

- 组件机制：引入组件化机制，但是不完全基于组件开发，跟vue一样大部分UI还是模板化渲染，引入组件机制能更好的规范开发模式，也更方便升级和维护。

- 多种节制：不能同时打开超过5个窗口，打包文件不能大于2M，dom对象不能大于16000个等，这些都是为了保证更好的体验。
