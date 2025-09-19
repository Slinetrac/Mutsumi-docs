# 设置

## 先决条件

在开始之前，请确保您已准备好以下环境：

1. **Node.js (v14 或更高版本)**
   - 从 [nodejs.org](https://nodejs.org/) 下载安装
   - 验证安装：运行 `node --version` 和 `npm --version`

2. **Telegram 账户**
   - 在手机上下载 Telegram 应用或使用网页版
   - 如果还没有账户，请先注册

3. **启用 Workers KV 的 Cloudflare 账户**
   - 在 [cloudflare.com](https://cloudflare.com) 注册账户
   - Workers KV 包含在免费和付费计划中

4. **已安装 Wrangler CLI**
   - 全局安装：`npm install -g wrangler`
   - 验证安装：运行 `wrangler --version`

## 1. Telegram 机器人设置

这一步我们将创建您用于上传图片的个人 Telegram 机器人。

### 步骤 1：使用 BotFather 创建新机器人

1. 打开 Telegram 并搜索 [@BotFather](https://t.me/BotFather)
2. 点击"START"与 BotFather 开始聊天
3. 发送命令 `/newbot`
4. 按照提示操作：
   - 为您的机器人起个名字（例如，"我的 Mutsumi 画廊"）
   - 选择以 "bot" 结尾的用户名（例如，"MyMutsumiGalleryBot"）
5. BotFather 将为您提供**机器人令牌** - 请妥善保存此令牌

### 步骤 2：获取您的 Telegram 用户 ID

1. 在 Telegram 上搜索 [@userinfobot](https://t.me/userinfobot)
2. 开始聊天并发送任意消息
3. 机器人会回复您的用户信息，包括您的**ID**
4. 保存此 ID，它将作为您的所有者 ID

### 步骤 3：配置机器人

1. 进入 Mutsumi 项目中的 `bot/` 目录
2. 根据 `.env.example` 创建 `.env` 文件：
   ```bash
   # 复制示例文件
   cp .env.example .env
   ```
3. 编辑 `.env` 文件，填入您的实际信息：
   ```
   BOT_TOKEN=来自 BotFather 的实际机器人令牌
   OWNER_ID=来自 userinfobot 的 Telegram 用户 ID
   ```

### 步骤 4：安装依赖并启动机器人

1. 安装所需依赖包：
   ```bash
   cd bot
   npm install
   ```
2. 启动机器人：
   ```bash
   npm start
   ```
3. 测试机器人：
   - 打开 Telegram
   - 搜索您的机器人用户名
   - 发送命令 `/start`
   - 您应该会收到欢迎消息

## 2. Cloudflare Worker 设置

这一步我们将设置处理图片存储和 Web 界面的后端服务。

### 步骤 1：登录 Cloudflare

1. 使用您的 Cloudflare 账户登录 Wrangler：
   ```bash
   wrangler login
   ```
2. 按照提示完成授权

### 步骤 2：创建 Workers KV 命名空间

1. 为存储图片创建新的 KV 命名空间：
   ```bash
   wrangler kv:namespace create "IMAGES"
   ```
2. 此命令将输出配置信息，类似：
   ```
   [[kv_namespaces]]
   binding = "IMAGES"
   id = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
   ```

### 步骤 3：配置 wrangler.toml

1. 在文本编辑器中打开 `worker/wrangler.toml`
2. 添加来自上一步的 KV 命名空间配置：
   ```toml
   name = "mutsumi-worker"
   main = "index.js"
   compatibility_date = "2023-10-01"

   [[kv_namespaces]]
   binding = "IMAGES"
   id = "您的实际 KV 命名空间 ID"
   ```

### 步骤 4：部署 Worker

1. 进入 Worker 目录：
   ```bash
   cd worker
   ```
2. 安装依赖：
   ```bash
   npm install
   ```
3. 部署到 Cloudflare：
   ```bash
   npm run deploy
   ```
4. 记录部署后的 URL - 您将在前端配置中用到它

## 3. 前端设置

这一步我们将设置用于查看画廊的 Web 界面。

### 步骤 1：安装依赖

1. 进入前端目录：
   ```bash
   cd frontend
   ```
2. 安装所需依赖包：
   ```bash
   npm install
   ```

### 步骤 2：配置 API 端点

1. 打开 `frontend/nuxt.config.ts`
2. 找到 `runtimeConfig` 部分
3. 更新 `apiBase` URL，使其匹配您部署的 Worker URL：
   ```javascript
   runtimeConfig: {
     public: {
       apiBase: 'https://您的-worker-url.您的子域名.workers.dev/api'
     }
   }
   ```

### 步骤 3：开发和生产环境

**开发环境：**
```bash
npm run dev
```
- 启动本地开发服务器
- 在 `http://localhost:3000` 访问
- 代码更改将自动重新加载

**生产环境：**
```bash
npm run build
```
- 创建优化的生产构建
- 构建输出位于 `.nuxt/dist/client` 目录中

## 4. 测试您的设置

1. **测试 Telegram 机器人**：
   - 向您的机器人发送照片
   - 您应该会收到状态更新消息
   - 照片应存储在 Workers KV 中

2. **测试 Web 界面**：
   - 访问您部署的前端或本地开发服务器
   - 上传的图片应出现在画廊中
   - 点击图片可放大查看

3. **验证 Workers KV 中的数据**：
   - 进入 Cloudflare 仪表板
   - 导航到 Workers > KV
   - 检查您的 IMAGES 命名空间是否包含数据

## 故障排除

### 常见问题

1. **机器人无响应**：
   - 检查 `bot` 目录中是否正在运行 `npm start`
   - 验证 `.env` 文件中的 BOT_TOKEN 是否正确
   - 确保 OWNER_ID 配置正确

2. **图片未出现在画廊中**：
   - 检查 Worker 是否已成功部署
   - 验证前端配置中的 API_BASE_URL
   - 查看浏览器控制台是否有错误信息

3. **Worker 部署失败**：
   - 确保您已使用 `wrangler login` 登录
   - 检查 `wrangler.toml` 中的 KV 命名空间配置
   - 验证您的 Cloudflare 账户已启用 Workers

### 获取帮助

- 查看控制台输出的错误消息
- 参考各组件的 README 文件
- 访问文档站点获取详细信息