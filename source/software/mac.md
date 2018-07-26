---
title: mac指令
type: software
order: 4
---

## 好用的插件

### CheatSheet
快捷键提示
[点击下载](https://www.mediaatelier.com/CheatSheet/))

## makefile注意事项

- 不能随便使用`tab`，要使用`enter`进行换行
- 其他的如，`make`变量的定义、赋值，`make`内定函数如`$(error "strings")`都不能以`TAB`开头，不然`make`会将其作为命令来处理！

## 配置oh-my-zsh

- 使用iterm打开：
```bash
vim ~/.zshrc
```
- 修改主题变量
```bash
ZSH_THEME="robbyrussell"
```
- 保存，然后执行
```bash
source ~/.zshrc
```

- 设置随机主题
设置了下面一行之后，每次启动终端会随机选择主题，可以设置一个随机范围通过随机范围变量
```bash
ZSH_THEME="random"
```

- 所有主题变量

> [theme](https://www.jianshu.com/p/60a11f762f62)
> [plugin](https://hufangyun.com/2017/zsh-plugin/)

## 搜狗输入法问题

- pkill -f SCIM.app
- 首先将输入法切换成美式输入法，然后打开activity monitor，将其中的中文输入法任务中止。回到输入法切换项，将输入法切换回中文输入法，即可。

## mac获取秘钥

```bash
cd ~/.ssh # 配置目录
cat id_rsa.pub # 公钥
config # 快捷登录服务器
cd /etc/nginx/conf.d # 配置nginx目录
```

## iterm(终端)操作指令

```bash
# command
command + t # 新建标签
command + w # 关闭标签
command + number # 切换标签
command + left or right # 向左/向右 切换标签
command + enter # 全屏显示
command + f # 查找
command + d # 垂直分屏
command + shift + d # 水平分屏
command + option + 方向键 # 切换屏幕
command + ; # 查看历史命令
command + shift + h # 查看剪贴板历史
command + r # 清屏

# ctrl
ctrl + u # 清除当前行
ctrl + a # 到行首
ctrl + e # 到行尾
ctrl + f/b # 前进后退，相当于左右键，可以通过iterm的`profiles` - `open` - `keys` - `+`来绑定ctrl + b 为向后跳过一个单词
ctrl + p # 上一条命令
ctrl + r # 搜索命令历史
ctrl + d # 删除当前光标的字符
ctrl + h # 删除光标之前的单个字符
ctrl + w # 删除光标之前的单词
ctrl + k # 删除到文本末尾
ctrl + t # 交换光标处文本
ctrl + l # 清屏
ctrl + u # 清空当前行，无论光标在什么位置
```

## vim

```bash
i # 进入编辑模式
esc # 退出编辑模式
: # 输入操作指令，比如
  q! # 离开vi，并放弃刚在缓冲区内编辑的内容
  wq # 将缓冲区内的资料写入磁盘中，并离开vi
  x # 同wq
  X # 文件加密
```

## 代理proxy

> [gasmask](https://github.com/2ndalpha/gasmask)

- 用gas代理本地项目到线上
- 修改手机wifi代理设置，输入mac的ip地址+8888端口
- 用charles + 8888端口代理到手机，手机即可访问

## 服务器配置

### nginx

#### 配置

- nginx配置
- 首先映射端口
- 然后重启nginx
- nginx -s reload

### 反向代理

- 在电脑网络中，反向代理是代理服务器的一种。服务器根据客户端的请求，从其关系的一组或多组后端服务器（如Web服务器）上获取资源，然后再将这些资源返回给客户端，客户端只会得知反向代理的IP地址，而不知道在代理服务器后面的服务器簇的存在[1]。
- 与前向代理不同，前向代理作为客户端的代理，将从互联网上获取的资源返回给一个或多个的客户端，服务器端（如Web服务器）只知道代理的IP地址而不知道客户端的IP地址；而反向代理是作为服务器端（如Web服务器）的代理使用，而不是客户端。客户端借由前向代理可以间接访问很多不同互联网服务器（簇）的资源，而反向代理是供很多客户端都通过它间接访问不同后端服务器上的资源，而不需要知道这些后端服务器的存在，而以为所有资源都来自于这个反向代理服务器。
- 反向代理在现时的互联网中并不少见，而另一些例子，像是CDN、SNI代理等，是反向代理结合DNS的一类延伸应用。
- 作用
  - 对客户端隐藏服务器（簇）的IP地址
  - 安全：作为应用层防火墙，为网站提供对基于Web的攻击行为（例如DoS/DDoS）的防护，更容易排查恶意软件等
  - 为后端服务器（簇）统一提供加密和SSL加速（如SSL终端代理）
  - 负载均衡，若服务器簇中有负荷较高者，反向代理通过URL重写，根据连接请求从负荷较低者获取与所需相同的资源或备援
  - 对于静态内容及短时间内有大量访问请求的动态内容提供缓存服务
  - 对一些内容进行压缩，以节约带宽或为网络带宽不佳的网络提供服务
  - 减速上传
  - 为在私有网络下（如局域网）的服务器簇提供NAT穿透及外网发布服务
  - 提供HTTP访问认证
  - 突破互联网封锁（不常用，因为反向代理与客户端之间的连接不一定是加密连接，非加密连接仍有遭内容审查进而遭封禁的风险；此外面对针对域名的关键字过滤、DNS缓存污染/投毒攻击乃至深度数据包检测也无能为力）

### 服务器和doker相关指令

```bash
# 配置登录文件
vim ~/.ssh/config
# 配置完成后可以这么登录
ssh disney
# 显示服务器上docker的容器
docker ps
# 进入这个容器
docker exec -it [contain id] bash
# 打印docker容器日志
docker logs [contain id]
# 垃圾清理
docker rmi $(docker images | grep "baidao" | awk '{print($3)}')
df -i
```

## 查询&终止端口占用

```bash
lsof -i:xxxx # 查找xxxx端口占用的pid
kill -9 $pid # 关闭指定pid
```