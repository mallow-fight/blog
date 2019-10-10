---
title: 移动端调试
order: 2
type: debug
---

## switchhost

将本地IP代理到线上域名：
```
127.0.0.1(也就是localhost)	xxx.xx.com
```

## charles

1. 点击proxy->proxy setting，端口随便设置一个，不占用其它端口就行
2. 破解：
```
在Help窗口内选择 Register Charles。

Registered Name: https://zhile.io
License Key: 48891cf209c6d32bf4
```

## 网络

1. 注意，电脑和手机必须是同一个局域网
2. 手机点击wifi的手动代理，代理地址填写电脑的IP，代理端口填写charles的端口

## nginx

```bash
brew install nginx	# 注意不能用sudo，不然由于安全原因装不上
sudo nginx	# 启动nginx
code /usr/local/etc/nginx/nginx.conf	# 修改nginx配置，此处使用的的vscode快捷打开，也可以使用vim
```
修改nginx.conf如下(在本身自带的server下面添加一个server项)：
```
server {
		listen 80;
		server_name  xxx.xx.com;

		location /{
			proxy_pass http://127.0.0.1:3000;
		}
}
```

## 注意

1. 如果node请求的静态资源中包含本地的静态资源，需要把这些静态资源指向本机的ip，这样在手机上访问的时候就可以直接访问到本机的静态资源了
2. 通过这种方法可以实现热更新，在电脑上开发可以马上热更新到手机上
3. 移动端网页添加一个vconsole效果更佳