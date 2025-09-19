# Cloudflare Worker

## 概述

Cloudflare Worker 作为 Mutsumi 图片画廊的后端服务。它负责处理 API 请求，提供前端界面，并管理 Workers KV 中的图片存储。

## API 端点

- `POST /api/upload` - 上传图片（供 Telegram 机器人使用）
- `GET /api/images` - 获取图片列表
- `GET /api/images/:id` - 获取特定图片
- `DELETE /api/images/:id` - 删除图片

## 环境变量

Worker 使用名为 `IMAGES` 的 KV 命名空间绑定来存储图片和元数据。

## 功能

- 基于无服务器平台部署后端逻辑
- 利用边缘计算实现低延迟响应
- 提供 Web 界面服务
- 管理用户认证和授权
- 与 Workers KV 对接进行数据存储