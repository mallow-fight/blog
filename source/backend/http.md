---
title: http
order: 1
type: http
---

## http定义

http是用于传输诸如HTML的超媒体文档的应用层协议
被设计用于web浏览器和web服务器之间的通信
遵循经典的客户端-服务端模型
客户端打开一个链接以发出请求，然后等待它收到服务端响应
无状态协议，服务器不会在两个请求之间保留任何数据（状态）
通常用于TCP/IP层，但可以在任何可靠的传输层上使用，如一个不会静默丢失消息的协议，如UDP
可扩展协议

### http概述

web上进行数据交换的基础
client-server协议
请求通常是浏览器这样的接受方发起的
完整的web文档由不同的子文档拼接而成

客户端和服务端通过交换各自的消息进行交互
像浏览器这样的客户端发出的消息叫requests
被服务端回应的消息叫responses

### http组件系统

1. 客户端：user-agent

1. web服务端

1. 代理（proxies）

### http本质

1. http是简单的

1. http是可扩展的

1. http是无状态，有会话的

1. http连接

### http控制

1. 缓存

1. 开放同源限制

1. 认证

1. 代理和隧道

1. 会话

### http流

当客户端想和服务端进行信息交互时（服务端指的是最终服务器，或者是一个中间代理商 ），过程表现为下面几步：

1. 打开一个tcp连接

1. 发送一个http报文

1. 读取服务端返回的报文信息

1. 关闭连接或为后续请求重用连接

### http报文

HTTP/1.1以及更早的HTTP协议报文都是语义可读的。在HTTP/2中，这些报文被嵌入到了一个新的二进制结构，帧。帧允许实现很多优化，比如报文头部的压缩和复用。即使只有原始HTTP报文的一部分以HTTP/2发送出来，每条报文的语义依旧不变，客户端会重组原始HTTP/1.1请求。因此用HTTP/1.1格式来理解HTTP/2报文仍旧有效。

有两种HTTP报文的类型，请求与回应，每种都有其特定的格式。

1. 请求

```txt
一个HTTP的method，经常是由一个动词像GET, POST 或者一个名词像OPTIONS，HEAD来定义客户端的动作行为。通常客户端的操作都是获取资源（GET方法）或者发送HTML form表单值（POST方法），虽然在一些情况下也会有其他操作。
要获取的资源的路径，通常是上下文中就很明显的元素资源的URL，它没有protocol （http://），domain（developer.mozilla.org），或是TCP的port（HTTP一般在80端口）。
HTTP协议版本号。
为服务端表达其他信息的可选头部headers。
对于一些像POST这样的方法，报文的body就包含了发送的资源，这与回应报文的body类似。
```

1. 回应

```txt
HTTP协议版本号。
一个状态码（status code），来告知对应请求执行成功或失败，以及失败的原因。
一个状态信息，这个信息是非权威的状态码描述信息，可以由服务端自行设定。
HTTP headers，与请求头部类似。
可选项，比起请求报文，响应报文中更常见地包含获取的资源body。
```

## http发展

### 万维网的发明

```txt
一个用来表示超文本文档的文本格式，超文本标记语言（HTML）。
一个用来交换超文本文档的简单协议，超文本传输协议（HTTP）。
一个显示（以及编辑）超文本文档的客户端，即网络浏览器。第一个网络浏览器被称为 WorldWideWeb。
一个服务器用于提供可访问的文档，即 httpd 的前身。
```

### http/0.9 - 单行协议

请求由单行指令构成，以唯一可用方法get开头，其后跟目标资源路径

### http/1.0 - 构建可扩展性

协议版本信息会随着每个请求发送
状态码会在响应开始时发送，使浏览器能了解请求执行成功或失败
引入了http头的概念，无论对于请求还是响应，允许传输元数据，使协议变得非常灵活，更具扩展性
在新http头的帮助下，具备了传输除纯文本html文件以外类型文档的能力

### http/1.1 - 标准化的协议

连接可以复用，节省了多次打开tcp连接加载网页文档资源的时间
增加流水线操作，允许在第一个应答被完全发送之前就发送第二个请求，以降低通信延迟
支持响应分块
引入额外的缓存控制机制
引入内容协商机制，包括语言，编码，类型等，允许客户端和服务端之间约定以最合适的内容进行交换
host头，能够使不同域名配置在同一个ip地址服务器上

### 超过15年的扩展

1. http用于安全运输（ssl -> tls）
1. http用于复杂应用
1. 放松web的安全模型

### http/2 - 更优异的表现

与http/1.1的不同：

1. http2是二进制协议而不是文本协议。不再可读和无障碍的手动创建，改善的优化技术现在可被实施。
1. 这是一个复用协议。并行的请求能在同一个链接中处理，移除了http/1.x中顺序和阻塞的约束。
1. 压缩了headers。headers在一系列请求中常常是类似的，移除了重复和传输重复数据的成本。
1. 允许服务器在客户端缓存中填充数据，通过一个叫服务器推送的机制来提前请求。

## http消息

http消息是服务器和客户端之间交换数据的方式。
两种类型消息：
请求：由客户端发送用来触发一个服务器上的动作
响应：来自服务器的应答

http/2二进制框架机制被设计为不需要改动任何api或配置文件即可应用：它大体上对用户是透明的。

http请求和响应具有相似的结构：

1. 一行起始行用于描述要执行的请求，或者是对应的状态，成功或失败。这个起始行总是单行的。
1. 一个可选的http头集合指明请求或描述消息正文。
1. 一个空行指示所有关于请求的元数据已经发送完毕。
1. 一个可选的包含请求相关数据的正文

## http请求

### 起始行

http请求是由客户端发出的消息，用来使服务器执行动作。

1. 一个http方法，描述要执行的动作。
1. 请求目标，以请求的环境为特征，通常是一个url。

### headers

形式：健值对

1. general headers：适用于整个报文
1. request headers：进一步定义，给定上下文，进行有条件的限制。
1. entity headers：请求的body

### body

post请求或者html表单数据
single-resource bodies
multiple-resource bodies

## http响应

### 状态行

响应的起始行被称为状态行，example: HTTP/1.1 404 Not Found, contains：

1. the protocal version, usually http/1.1
1. a status code, indicating success or failure of request. like: 200, 204, or 302
1. a status text. a brief description of the status code to help a human understand the http message.

### headers and body is just like request

## 内网

tcp/ip协议中，专门保留了三个IP地址区域作为私有地址，其地址范围如下
  - 10.0.0.0/8：10.0.0.0～10.255.255.255 
  - 172.16.0.0/12：172.16.0.0～172.31.255.255 
  - 192.168.0.0/16：192.168.0.0～192.168.255.255

## 状态码

- 1xx消息——请求已被服务器接收，继续处理
- 2xx成功——请求已成功被服务器接收、理解、并接受
- 3xx重定向——需要后续操作才能完成这一请求
- 4xx请求错误——请求含有词法错误或者无法被执行
- 5xx服务器错误——服务器在处理某个正确请求时发生错误

## http-connection

in http/1.x, there are several models: short-lived connections, persistent connections, and http pipelining.

## http-session

1. establishing a connection

In client-server protocols, it is client which establishes the connection.means initiating a connection in the underlying transport layer, usually this is TCP(the default port is 80).

1. sending a client request

once the connection is established, the user-agent can send the request(a user-agent is typically a web browser).A client request consists of text directives, separated by CRLF(回车换行)

第一行包括请求方法及请求参数：
文档路径，不包括协议和域名的绝对路径 URL
使用的 HTTP 协议版本
接下来的行每一行都表示一个 HTTP 首部，为服务器提供关于所需数据的信息（例如语言，或 MIME 类型），或是一些改变请求行为的数据（例如当数据已经被缓存，就不再应答）。这些 HTTP 首部组成以一个空行结束的一个块。
最后一块是可选数据块，包含更多数据，主要被 POST 方法所使用。

1. structure of a server response

当收到用户代理发送的请求后，Web 服务器就会处理它，并最终送回一个响应。与客户端请求很类似，服务器响应由一系列文本指令组成, 并使用 CRLF 分隔，它们被划分为三个不同的块：

第一行是 状态行，包括使用的 HTTP 协议版本，状态码和一个状态描述（可读描述文本）。
接下来每一行都表示一个 HTTP 首部，为客户端提供关于所发送数据的一些信息（如数据大小，使用的压缩算法，缓存指示）。与客户端请求的头部块类似，这些 HTTP 首部组成一个块，并以一个空行结束。
最后一块是数据块，包含了响应的数据 （如果有的话）。
