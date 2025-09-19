# 介绍

Mutsumi 是一个个人专属的无服务器图片画廊，您可以直接通过 Telegram 上传图片，然后在美观的 Web 界面中查看。这个系统基于 Cloudflare 的基础设施构建，具有高度的可扩展性和成本效益。

## 什么是 Mutsumi？

Mutsumi 是一个将 Telegram 的便利性与 Cloudflare 无服务器基础设施相结合的私人图片画廊解决方案。它专为那些希望以简单、私密的方式存储和查看图片，而又不想 dealing with 传统网页托管复杂性的个人用户而设计。

## 主要特性

- **无服务器架构**：基于 Cloudflare Workers 和 Workers KV 构建，无需管理服务器
- **基于 Telegram 的上传**：通过专用机器人直接从 Telegram 上传图片
- **私人画廊**：只有所有者可以上传图片，确保您的画廊始终保持私密
- **现代化 Web 界面**：采用 Nuxt.js 和 Tailwind CSS 构建的响应式画廊
- **全球 CDN**：通过 Cloudflare 的全球网络快速加载图片
- **简单部署**：配有清晰文档，设置流程简单易懂
- **多语言文档**：提供英语和中文两种语言的文档

## 工作原理

1. **上传**：所有者向 Telegram 机器人发送图片
2. **验证**：机器人验证发送者是否为授权所有者
3. **处理**：机器人将图片转发到 Cloudflare Worker
4. **存储**：Worker 将图片存储在 Workers KV 中（Cloudflare 的数据库）
5. **检索**：Web 界面从 Workers KV 中检索图片
6. **显示**：图片在美观、响应式的画廊中显示，点击即可放大查看

## 技术栈

- **前端**：Nuxt.js + Vue 3 + Tailwind CSS
- **Telegram 机器人**：Node.js + Telegraf
- **后端**：Cloudflare Workers
- **数据库**：Cloudflare Workers KV

## 适用人群

Mutsumi 特别适合：

- 希望拥有私人图片画廊的个人用户
- 经常通过 Telegram 分享图片的用户
- 偏爱无服务器、低维护解决方案的用户
- 对 Cloudflare Workers 等现代 Web 技术感兴趣的任何人