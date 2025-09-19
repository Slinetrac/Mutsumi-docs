# 后端技术栈

## 概述

Mutsumi 的后端由 Telegram 机器人和 Cloudflare Workers 组成，为图片管理和 Web 服务提供无服务器架构。

## 技术组成

### Node.js + Telegraf (Telegram 机器人)
- 基于 Node.js 运行时构建可扩展的应用程序
- 使用 Telegraf 框架构建 Telegram 机器人
- 通过中间件和上下文简化机器人开发流程
- 处理所有者的图片上传请求

### Cloudflare Workers
- 无服务器平台，用于部署后端逻辑
- 借助边缘计算实现低延迟响应
- 提供 Web 界面服务
- 管理用户认证和授权
- 与 Workers KV 对接进行数据存储

### Cloudflare Workers KV
- 全球分布、低延迟的键值数据存储
- 专为高读取频率的应用场景设计
- 用于存储图片和元数据
- 与 Cloudflare Workers 无缝集成

## 功能特性

- 无服务器架构，支持自动扩展
- 通过 Cloudflare 网络实现全球分发
- 提供低延迟响应体验
- 安全处理图片和元数据
- 仅允许所有者上传图片的验证机制