---
title: 构建高性能web网站
order: 1
type: computer
---

## 分布式缓存

- 使用 `memcached` 进行分布式缓存
- 注意服务器资源的均衡分配，可以通过随机算法散列给各个服务器
- `DNS`负载均衡
- 数据库扩展
- `nginx`反向代理
- 后端服务器权重