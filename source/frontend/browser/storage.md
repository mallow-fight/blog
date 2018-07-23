---
title: 缓存
order: 2
type: browser
---

**浏览器只能对非httpOnly的cookie进行操作。**
**httpOnly的cookie只能由服务器操作。**
**不要在缓存中存储敏感信息，服务器需要对缓存数据进行校验。**

## cookie
**服务器发送到用户浏览器并保存在本地的一小块数据，它用于告知服务端两个请求是否来自同一浏览器**

### 用处
- 会话状态管理：用户登录状态，购物车，游戏分数等
- 个性化设置：用户个性化设置,主题等
- 浏览器行为跟踪：跟踪分析用户行为等

### 缺点
由于服务器指定`Cookie`后，浏览器的每次请求都会携带`Cookie`数据，会带来额外的性能开销（尤其是在移动环境下）

### 大小限制
4KB左右

### 存在时间
如果不在浏览器中设置过期时间，`cookie`被保存在内存中，生命周期随浏览器的关闭而结束，这种`cookie`简称会话`cookie`。如果在浏览器中设置了`cookie`的过期时间，`cookie`被保存在硬盘中，关闭浏览器后，`cookie`数据仍然存在，直到过期时间结束才消失。

### 如何清除
```js
/**
 * 设置cookie
 * @param {string} name  键名
 * @param {string} value 键值
 * @param {integer} days cookie周期
 */
function setCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }else{
        var expires = "";
    }
    document.cookie = name+"="+value+expires+"; path=/";
}
// 获取cookie
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
// 删除cookie
function deleteCookie(name) {
    setCookie(name,"",-1);
}
```

## localstorage

### 存在时间
除非被清除，否则永久保存

## 大小限制
一般为5MB

## 注意
- 不同浏览器无法共享localStorage或sessionStorage中的信息。
- 相同浏览器的不同页面间可以共享相同的localStorage（**页面属于相同域名和端口**）
- 不同页面或标签页间无法共享sessionStorage的信息。这里需要注意的是，页面及标签页仅指顶级窗口，如果一个标签页包含多个iframe标签且他们属于同源页面，那么他们之间是可以共享sessionStorage的。

## sessionstorage

### 存在时间
页面会话结束——也就是说当页面被关闭时，数据存储在 `sessionStorage` 会被清除，页面刷新不会被删除。

### 大小限制
一般为5MB
