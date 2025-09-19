# 部署

## 概述

部署 Mutsumi 需要设置 Telegram 机器人、配置 Cloudflare Workers 和初始化 Workers KV。整个部署过程设计得简单直接，充分利用了 Cloudflare 的基础设施优势。

## 部署步骤

### 1. 部署 Telegram 机器人

Telegram 机器人可以运行在任何始终在线的服务器或本地机器上。在生产环境中，建议使用云服务器。

#### 方案一：部署到 VPS 或独立服务器

1. 将 `bot/` 目录复制到您的服务器
2. 安装依赖：
   ```bash
   npm install
   ```
3. 确保您的 `.env` 文件已正确配置：
   ```
   BOT_TOKEN=您的实际机器人令牌
   OWNER_ID=您的 Telegram 用户 ID
   ```
4. 运行机器人：
   ```bash
   npm start
   ```

#### 方案二：使用进程管理器 (PM2) 部署

1. 全局安装 PM2：
   ```bash
   npm install -g pm2
   ```
2. 使用 PM2 启动机器人：
   ```bash
   pm2 start index.js --name "mutsumi-bot"
   ```
3. 保存 PM2 配置：
   ```bash
   pm2 save
   ```
4. 设置 PM2 开机自启：
   ```bash
   pm2 startup
   ```

#### 方案三：部署到云平台（如 Heroku、Railway）

1. 在 `bot/` 目录中创建 `Procfile` 文件：
   ```
   worker: npm start
   ```
2. 按照您选择平台的部署说明操作
3. 在平台仪表板中设置环境变量：
   - `BOT_TOKEN`：您的机器人令牌
   - `OWNER_ID`：您的 Telegram 用户 ID

### 2. 部署 Cloudflare Worker

1. 确保您的 `worker/wrangler.toml` 已配置 KV 命名空间：
   ```toml
   name = "mutsumi-worker"
   main = "index.js"
   compatibility_date = "2023-10-01"

   [[kv_namespaces]]
   binding = "IMAGES"
   id = "您的 KV 命名空间 ID"
   ```

2. 部署 Worker：
   ```bash
   cd worker
   npm run deploy
   ```

3. 记录部署后的 URL，格式类似：
   ```
   https://mutsumi-worker.您的子域名.workers.dev
   ```

### 3. 配置环境变量

1. 在 Cloudflare Worker 中设置密钥：
   ```bash
   wrangler secret put BOT_TOKEN
   # 在提示时输入您的机器人令牌
   
   wrangler secret put OWNER_ID
   # 在提示时输入您的 Telegram 用户 ID
   ```

### 4. 部署 Web 界面

您可以选择两种方式部署前端：

#### 方案一：由 Cloudflare Worker 提供服务（推荐）

1. 构建前端：
   ```bash
   cd frontend
   npm run build
   ```
2. 构建文件将自动由 Worker 提供服务

#### 方案二：部署到静态托管服务

1. 构建前端：
   ```bash
   cd frontend
   npm run generate
   ```
2. 静态文件将位于 `dist/` 目录中
3. 将这些文件部署到任何静态托管服务：
   - Cloudflare Pages
   - Vercel
   - Netlify
   - GitHub Pages

### 5. 配置自定义域名（可选）

要使用自定义域名如 `gallery.yourdomain.com`：

1. 在 Cloudflare 仪表板中：
   - 进入 Workers
   - 选择您部署的 Worker
   - 进入"Triggers"选项卡
   - 添加自定义域名
2. 更新您的 DNS：
   - 添加指向您 Worker 的 CNAME 记录

### 6. 最终配置

1. 更新前端配置：
   - 在 `frontend/nuxt.config.ts` 中，确保 `apiBase` 指向您部署的 Worker URL
   - 如有需要，重新构建并部署前端

2. 重启所有服务：
   - 重启您的 Telegram 机器人
   - 如有更改，重新部署 Worker

## 测试您的部署

### 测试完整流程

1. **发送测试图片**：
   - 打开 Telegram
   - 向您的机器人发送照片
   - 观察机器人发送的状态更新

2. **验证图片存储**：
   - 进入 Cloudflare 仪表板 > Workers > KV
   - 确认您的 IMAGES 命名空间中有新条目

3. **在 Web 界面查看**：
   - 访问您部署的前端
   - 新图片应出现在画廊中
   - 测试点击图片放大查看功能

## 监控和维护

### 监控

1. **Cloudflare Worker 日志**：
   - 使用 `wrangler tail` 查看实时日志：
     ```bash
     wrangler tail
     ```

2. **Telegram 机器人日志**：
   - 检查您部署平台的日志
   - 在机器人代码中添加日志记录以便调试

### 维护

1. **更新应用程序**：
   - 从您的代码仓库拉取最新代码
   - 重新部署 Worker：
     ```bash
     cd worker
     npm run deploy
     ```
   - 如需要，重启 Telegram 机器人

2. **管理存储**：
   - 在 Cloudflare 仪表板中监控 Workers KV 使用情况
   - 如需要，为旧图片实现清理机制

3. **安全更新**：
   - 定期更新依赖：
     ```bash
     npm update
     ```
   - 关注安全公告

## 部署问题故障排除

### 常见部署问题

1. **Worker 部署失败**：
   - 检查是否已登录 Wrangler：`wrangler whoami`
   - 确认您的 Cloudflare 账户已启用 Workers
   - 检查 `wrangler.toml` 配置

2. **机器人未收到消息**：
   - 确认机器人正在运行
   - 检查 `BOT_TOKEN` 是否正确
   - 确保 `OWNER_ID` 配置正确

3. **图片未出现在画廊中**：
   - 检查前端配置中的 Worker URL 是否正确
   - 确认 KV 命名空间已正确绑定
   - 查看浏览器控制台错误

4. **前端无法加载**：
   - 确认构建是否成功
   - 检查 Worker 是否正在提供前端文件
   - 确认自定义域名（如使用）配置正确

### 获取帮助

- 查看控制台输出的详细错误信息
- 参考 Cloudflare Workers 官方文档
- 访问 Mutsumi 文档站点获取更多指导
- 如使用开源版本，查看 GitHub issues