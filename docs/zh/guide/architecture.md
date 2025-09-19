# 架构

## 概述

Mutsumi 基于无服务器架构构建，使用 Cloudflare Workers 和 Workers KV。系统由三个主要组件构成，它们协同工作以提供无缝的图片画廊体验。

## 主要组件

### 1. Telegram 机器人
- **技术**：Node.js + Telegraf 框架
- **用途**：处理所有者的图片上传
- **运行环境**：在您的本地机器或服务器上运行
- **功能**：
  - 接收所有者通过 Telegram 发送的图片
  - 验证发送者是否为授权所有者
  - 处理并将图片转发到 Cloudflare Worker
  - 向所有者反馈上传状态

### 2. Cloudflare Workers（后端）
- **技术**：Cloudflare Workers（无服务器函数）
- **用途**：处理请求和管理数据
- **运行环境**：Cloudflare 的全球边缘网络
- **功能**：
  - 接收来自 Telegram 机器人的图片
  - 将图片存储在 Workers KV 数据库中
  - 为用户提供 Web 界面
  - 处理图片检索的 API 请求
  - 管理认证和授权

### 3. Workers KV（数据库）
- **技术**：Cloudflare Workers KV（键值存储）
- **用途**：存储图片和元数据
- **运行环境**：Cloudflare 的全球网络
- **特点**：
  - 全球、低延迟的数据存储
  - 在 Cloudflare 网络中自动复制
  - 高读取性能，确保图片快速加载
  - 无需数据库管理

## 组件交互流程

```
1. 所有者向 Telegram 机器人发送图片
   ↓
2. Telegram 机器人验证发送者是否为所有者
   ↓
3. Telegram 机器人将图片转发到 Cloudflare Worker
   ↓
4. Cloudflare Worker 将图片存储在 Workers KV 中
   ↓
5. 所有者访问由 Cloudflare Worker 托管的 Web 界面
   ↓
6. Cloudflare Worker 从 Workers KV 中检索图片
   ↓
7. Cloudflare Worker 向所有者展示图库
```

## 详细工作流程

1. **图片上传**：
   - 所有者向 Telegram 机器人发送照片
   - 机器人检查发送者的 ID 是否与所有者 ID 匹配
   - 如果已授权，机器人从 Telegram 服务器下载图片
   - 机器人通过 HTTP POST 请求将图片发送到 Cloudflare Worker

2. **图片处理**：
   - Cloudflare Worker 接收图片数据
   - Worker 为图片生成唯一 ID
   - Worker 将图片数据存储在 Workers KV 中
   - Worker 更新图片列表元数据

3. **Web 界面**：
   - 当所有者访问画廊 URL 时，Cloudflare Worker 提供前端界面
   - 前端发出 API 请求获取图片列表
   - Worker 从 Workers KV 中检索图片列表
   - 前端在响应式网格中显示缩略图
   - 当用户点击图片时，从 Workers KV 加载图片

## 技术栈

- **前端**：Nuxt.js + Vue 3 + Tailwind CSS
  - Nuxt.js 用于服务器端渲染和静态站点生成
  - Vue 3 用于响应式组件
  - Tailwind CSS 用于响应式样式设计

- **Telegram 机器人**：Node.js + Telegraf
  - Node.js 作为 JavaScript 运行时
  - Telegraf 作为 Telegram 机器人 API 框架

- **后端**：Cloudflare Workers
  - 在 Cloudflare 边缘网络上运行的无服务器函数
  - 具有低延迟和高可用性

- **数据库**：Cloudflare Workers KV
  - 全局键值存储
  - 无需数据库管理开销
  - 自动扩展

## 此架构的优势

1. **无需服务器管理**：一切都在 Cloudflare 的基础设施上运行
2. **全球性能**：Cloudflare 的 CDN 确保全球快速加载
3. **成本效益**：只为实际使用的资源付费
4. **可扩展性**：自动处理流量增长
5. **可靠性**：基于 Cloudflare 稳健的基础设施构建
6. **安全性**：具备多层安全性和验证机制

## 安全考虑

- 只有所有者可以通过 Telegram 上传图片（通过用户 ID 验证）
- Web 界面可公开访问但只显示所有者的图片
- 浏览无需用户认证（按设计为私有）
- 所有数据都安全地存储在 Cloudflare 的基础设施中
- 组件间的通信使用 HTTPS