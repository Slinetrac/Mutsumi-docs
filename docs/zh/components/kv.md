# Workers KV 配置

本文档介绍了为 Mutsumi 图片画廊配置 Workers KV 的步骤。

## 先决条件

1. 拥有已启用 Workers 的 Cloudflare 账户
2. 已安装 Wrangler CLI (`npm install -g wrangler`)
3. 已通过 Wrangler 认证 (`wrangler login`)

## 配置 Workers KV 的步骤

1. 创建新的 KV 命名空间：
   ```bash
   wrangler kv:namespace create "IMAGES"
   ```

2. 此命令将输出绑定配置信息。使用这些信息更新您的 `wrangler.toml` 文件：
   ```toml
   [[kv_namespaces]]
   binding = "IMAGES"
   id = "您生成的命名空间 ID"
   ```

3. 重新部署您的 worker 以应用新配置：
   ```bash
   npm run deploy
   ```

## 数据结构

KV 命名空间采用以下结构：

- `image:{fileId}` - 存储包含元数据的图片数据（ArrayBuffer）
- `image:list` - 存储图片元数据的 JSON 数组，便于检索

## 安全考虑

- KV 命名空间只能从您的 Cloudflare Worker 访问
- KV 数据无法直接公开访问
- 所有操作都通过 worker 的 API 端点进行