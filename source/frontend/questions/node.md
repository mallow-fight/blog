---
title: node
type: questions
order: 6
---

## 登录授权的完整流程
- 登录流程
    - 无账号，去注册
    - 有账号，去登录
- 授权
    - 前端视觉限制（仅限于对内平台）
    - cookie（可以对外）
    - 携带token的请求头（可以对外）
    - 如果是单页应用可以放在state中
