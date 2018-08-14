---
title: 后台和前台的http交互
type: skeleton
order: 4
---

**前后端交互时，http报文作为信息的载体**

## http报文结构
跨域请求拒绝时，可能的method是options，状态码为：404/405等
部分头部字段一览：

- 通用头部
  - Request Url：请求的web服务器地址

  - Request Method：请求方式（GET、POST、OPTIONS、PUT、HEAD、DELETE、CONNECT、TRACE）

  - Status Code：请求返回的状态码，如200成功

  - Remote Address：请求的远程服务器地址（会转为IP）

  - Referrer-Policy：用来监管哪些访问来源信息，no-referrer-when-downgrade （默认值）在没有指定任何策略的情况下用户代理的默认行为。在同等安全级别的情况下，引用页面的地址会被发送(HTTPS->HTTPS)，但是在降级的情况下不会被发送 (HTTPS->HTTP)

- 请求头部
  - Accept: 接收类型，表示浏览器支持的MIME类型（对标服务端返回的Content-Type）

  - Accept-Encoding：浏览器支持的压缩类型,如gzip等,超出类型不能接收

  - Content-Type：客户端发送出去实体内容的类型

  - Cache-Control: 指定请求和响应遵循的缓存机制，如no-cache

  - If-Modified-Since：对应服务端的Last-Modified，用来匹配看文件是否变动，只能精确到1s之内，http1.0中

  - Expires：缓存控制，在这个时间内不会请求，直接使用缓存，http1.0，而且是服务端时间

  - Max-age：代表资源在本地缓存多少秒，有效时间内不会请求，而是使用缓存，http1.1中

  - If-None-Match：对应服务端的ETag，用来匹配文件内容是否改变（非常精确），http1.1中

  - Cookie: 有cookie并且同域访问时会自动带上

  - Connection: 当浏览器与服务器通信时对于长连接如何进行处理,如keep-alive

  - Host：请求的服务器URL

  - Origin：最初的请求是从哪里发起的（只会精确到端口）,Origin比Referer更尊重隐私

  - Referer：该页面的来源URL(适用于所有类型的请求，会精确到详细页面地址，csrf拦截常用到这个字段)

  - User-Agent：用户客户端的一些必要信息，如UA头部等

- 响应头部
  - Access-Control-Allow-Headers: 服务器端允许的请求Headers

  - Access-Control-Allow-Methods: 服务器端允许的请求方法

  - Access-Control-Allow-Origin: 服务器端允许的请求Origin头部（譬如为*）

  - Content-Type：服务端返回的实体内容的类型

  - Date：数据从服务器发送的时间

  - Cache-Control：告诉浏览器或其他客户，什么环境可以安全的缓存文档

  - Last-Modified：请求资源的最后修改时间

  - Expires：应该在什么时候认为文档已经过期,从而不再缓存它

  - Max-age：客户端的本地资源应该缓存多少秒，开启了Cache-Control后有效

  - ETag：请求变量的实体标签的当前值

  - Set-Cookie：设置和页面关联的cookie，服务器通过这个头部把cookie传给客户端

  - Keep-Alive：如果客户端有keep-alive，服务端也会有响应（如timeout=38）

  - Server：服务器的一些相关信息

一般来说，请求头部和响应头部是匹配分析的：

请求头部 | 响应头部
--- | ---
Accept | Content-Type
Origin | Access-Control-Allow-Origin
If-Modified-Since | Last-Modified
If-None-Match | ETag

- 请求/响应实体
  - 除了头部，还有消息实体

  - 请求实体会将一些需要的参数都放入进去（用于POST请求）

  - 可以放参数的序列化形式（a=1&b=2这种），或者直接放表单对象（Form data）

  - 一般响应实体中，就是放服务端需要传给客户端的内容

  - 一般现在的接口请求时，实体中就是对于信息的json格式，而像页面请求这种，里面就是直接放了一个html字符串，然后浏览器自己解析并渲染

- CRLF
  - 回车换行，一般用作分隔符存在

  - 请求头部和实体消息之间有一个CRLF分隔，响应头部和响应实体之间用一个CRLF分隔

> [详细的状态码](../../backend/http/http.html#状态码)


## cookie及优化
是一种浏览器本地存储方式，一般用来帮助客户端和服务端通信，常用来进行身份校验，结合服务端的session使用。

场景：
- 在登录页面，用户登录了

- 此时，服务端会生成一个session，session中有对于用户的信息（用户名，密码等）

- 然后会有一个sessionid（相当于服务端这个session对应的key）

- 服务端在登录页面写入cookie，值就是：jsessionid=xxx

- 浏览器本地就有这个cookie了，以后访问相同域名下的页面时，自动带上cookie，自动校验，在有效时间内无需二次登陆

一般来说，cookie是不允许存放敏感信息的（禁止明文储存用户名、密码），因为非常不安全，如果一定要储存，设置cookie为httponly，考虑rsa等非对称加密

- 针对同域名下大量不需要携带cookie请求（如对静态资源的访问）的优化
  - 将静态资源分组，分别放到不同的域名下

- 在移动端，如果请求的域名数过多，会降低请求速度（因为域名整套解析流程是很耗费时间的，而且移动端一般带宽都比不上pc）
  - 此时就需要用到一种优化方案：dns-prefetch（让浏览器空闲时提前解析dns域名，不过也请合理使用，勿滥用）

![cookie交互](../../images/http_cookie_session.png)

## gzip压缩

> [gzip探秘](https://segmentfault.com/a/1190000012800222)

- 首先，明确gzip是一种压缩格式，需要浏览器支持才有效（不过一般现在浏览器都支持）， 而且gzip压缩效率很好（高达70%左右）

- 然后gzip一般是由apache、tomcat等web服务器开启

- 当然服务器除了gzip外，也还会有其它压缩格式（如deflate，没有gzip高效，且不流行）

- 所以一般只需要在服务器上开启了gzip压缩，然后之后的请求就都是基于gzip压缩格式的， 非常方便。

- 解压的角色一般是浏览器，这样就可以减短请求时间了

## 长连接和短连接

tcp/ip层面：
- 长连接：一个tcp/ip连接上可以连续发送多个数据包，在tcp连接保持期间，如果没有数据包发送，需要双方发检测包以维持此连接，一般需要自己做在线维持（类似于心态包）

- 短连接：通信双方有数据交互时，就建立一个tcp连接，数据发送完成后，则断开此tcp连接

http层面：
- http1.0：默认使用的是短连接，浏览器每进行一次http操作，就建立一次连接，任务结束就中断连接，譬如每一个静态资源请求时都是一个单独的连接

- http1.1：默认使用长连接，使用长连接会有：connection：keep-alive，当一个网页打开完成后，客户端和服务端之间用于传输http的tcp连接不会关闭，如果客户端再次访问这个服务器的页面，会继续使用这一条已经建立的连接

注意：keep-alive不会永远保持，它有一个持续时间，一般在服务器中配置，另外长连接需要客户端和服务器都支持才有效

## http2.0
http2.0不是https，相当于下一代规范，https的请求可以是http2.0规范的，http2.0和http1.1显著不同点：

- 1.1中，每请求一个资源，都需要开启一个tcp/ip连接，每一个资源对应一个tcp/ip请求，由于tcp/ip本身有并发数限制，所以当资源一多，速度就显著慢了下来

- 2.0中，一个tcp/ip请求可以请求多个资源，只要一次tcp/ip请求，就可以请求若干个资源，分割成更小的帧请求，速度明显提升

- 2.0特性
  - 多路复用：一个tcp/ip连接可以请求多个资源

  - 首部压缩：http头部压缩，减少体积

  - 二进制分帧：在应用层和传输层之间增加了一个二进制分帧层，改进传输性能，实现低延迟和高吞吐量

  - 服务器推送：服务端可以对客户端的一个请求发出多个响应，可以主动通知客户端

  - 请求优先级：如果流被赋予了优先级，它就会基于这个优先级来处理，由服务器决定需要多少资源来处理该请求

## https
- 安全版本的http

- 和http区别：在请求前，会建立ssl链接，确保接下来的通信都是加密的，无法被轻易截取分析

- https升级：后端需要申请证书等，开销比http大（需要额外建立安全链接以及加密等），所以一般来说http2.0配合https体验更佳（http2.0更快了）

- SSL/TLS握手流程，按顺序：

  - 浏览器请求建立SSL链接，并向服务端发送一个随机数（Client random）和客户端支持的加密算法，此时是明文传输
  
  - 服务端从中选出一组加密算法和hash算法，回复一个随机数（Server random），并将自己的身份信息以证书的形式返回给浏览器（证书里包含了网站地址，非对称加密的公钥，以及证书颁发机构等信息）

  - 浏览器收到服务端的证书后
    - 验证证书的合法性：颁发机构是否合法，证书中包含的网址是否和正在访问的一样，如果证书信任，则浏览器会显示一个小锁头，否则会有提示

    - 用户接受证书后（不管信不信任），浏览会生产新的随机数（Premaster secret），然后证书中的公钥以及指定的加密方法加密Premaster secret，发送给服务器。

    - 利用Client random、Server random、Premaster secret通过一定的算法生成HTTP链接数据传输的对称加密key-session key

    - 使用约定好的HASH算法计算握手信息，并使用生成的`session key`对消息进行加密，最后将之前生成的所有信息发送给服务端。

  - 服务端收到浏览器的回复
    - 利用已知的加解密方式与自己的私钥进行解密，获取Premaster secret

    - 和浏览器相同规则生成`session key`

    - 使用`session key`解密浏览器发来的握手信息，并验证hash是否和浏览器发来的一致

    - 使用`session key`加密一段握手信息，发送给浏览器
  
  - 浏览器解密并计算握手消息的hash，如果与服务端发来的hash一致，此时握手过程结束
  
  - 之后的所有https通信数据将由之前浏览器生成的session key并利用对称加密算法进行加密