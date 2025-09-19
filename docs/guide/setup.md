# Setup

## Prerequisites

Before you begin, you'll need to have the following:

1. **Node.js (v14 or higher)**
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify installation: `node --version` and `npm --version`

2. **A Telegram account**
   - Download Telegram app on your phone or use web version
   - Sign up if you don't have an account

3. **A Cloudflare account with Workers KV enabled**
   - Sign up at [cloudflare.com](https://cloudflare.com)
   - Workers KV is included with free and paid plans

4. **Wrangler CLI installed**
   - Install globally: `npm install -g wrangler`
   - Verify installation: `wrangler --version`

## 1. Telegram Bot Setup

This step creates your personal Telegram bot for uploading images.

### Step 1: Create a new bot with BotFather

1. Open Telegram and search for [@BotFather](https://t.me/BotFather)
2. Start a chat with BotFather by clicking "START"
3. Send the command `/newbot`
4. Follow the prompts to:
   - Give your bot a name (e.g., "My Mutsumi Gallery")
   - Choose a username ending in "bot" (e.g., "MyMutsumiGalleryBot")
5. BotFather will provide you with a **bot token** - save this securely

### Step 2: Get your Telegram user ID

1. Search for [@userinfobot](https://t.me/userinfobot) on Telegram
2. Start a chat and send any message
3. The bot will reply with your user information including your **ID**
4. Save this ID as it will be your owner ID

### Step 3: Configure the bot

1. Navigate to the `bot/` directory in your Mutsumi project
2. Create a `.env` file based on `.env.example`:
   ```bash
   # Copy the example file
   cp .env.example .env
   ```
3. Edit the `.env` file with your actual values:
   ```
   BOT_TOKEN=your_actual_bot_token_from_botfather
   OWNER_ID=your_telegram_user_id_from_userinfobot
   ```

### Step 4: Install dependencies and start the bot

1. Install required packages:
   ```bash
   cd bot
   npm install
   ```
2. Start the bot:
   ```bash
   npm start
   ```
3. Test the bot:
   - Open Telegram
   - Search for your bot by username
   - Send the command `/start`
   - You should receive a welcome message

## 2. Cloudflare Worker Setup

This step sets up the backend that handles image storage and web interface.

### Step 1: Login to Cloudflare

1. Login to Wrangler with your Cloudflare account:
   ```bash
   wrangler login
   ```
2. Follow the prompts to authorize Wrangler

### Step 2: Create a Workers KV namespace

1. Create a new KV namespace for storing images:
   ```bash
   wrangler kv:namespace create "IMAGES"
   ```
2. This command will output configuration information like:
   ```
   [[kv_namespaces]]
   binding = "IMAGES"
   id = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
   ```

### Step 3: Configure wrangler.toml

1. Open `worker/wrangler.toml` in a text editor
2. Add the KV namespace configuration from the previous step:
   ```toml
   name = "mutsumi-worker"
   main = "index.js"
   compatibility_date = "2023-10-01"

   [[kv_namespaces]]
   binding = "IMAGES"
   id = "your_actual_kv_namespace_id"
   ```

### Step 4: Deploy the worker

1. Navigate to the worker directory:
   ```bash
   cd worker
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Deploy to Cloudflare:
   ```bash
   npm run deploy
   ```
4. Note the deployed URL - you'll need this for the frontend

## 3. Frontend Setup

This step sets up the web interface for viewing your gallery.

### Step 1: Install dependencies

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install required packages:
   ```bash
   npm install
   ```

### Step 2: Configure API endpoint

1. Open `frontend/nuxt.config.ts`
2. Find the `runtimeConfig` section
3. Update the `apiBase` URL to match your deployed worker URL:
   ```javascript
   runtimeConfig: {
     public: {
       apiBase: 'https://your-worker-url.your-subdomain.workers.dev/api'
     }
   }
   ```

### Step 3: Development and Production

**For development:**
```bash
npm run dev
```
- This starts a local development server
- Access at `http://localhost:3000`
- Changes automatically reload

**For production:**
```bash
npm run build
```
- This creates an optimized production build
- The build output is in the `.nuxt/dist/client` directory

## 4. Testing Your Setup

1. **Test the Telegram bot**:
   - Send a photo to your bot
   - You should receive status updates
   - Photo should be stored in Workers KV

2. **Test the web interface**:
   - Visit your deployed frontend or local development server
   - Uploaded images should appear in the gallery
   - Clicking images should show them in an enlarged view

3. **Verify data in Workers KV**:
   - Go to Cloudflare dashboard
   - Navigate to Workers > KV
   - Check that your IMAGES namespace contains data

## Troubleshooting

### Common Issues

1. **Bot not responding**:
   - Check that `npm start` is running in the bot directory
   - Verify BOT_TOKEN in `.env` file
   - Ensure OWNER_ID is correct

2. **Images not appearing in gallery**:
   - Check that the worker is deployed
   - Verify API_BASE_URL in frontend configuration
   - Check browser console for errors

3. **Worker deployment fails**:
   - Ensure you're logged in with `wrangler login`
   - Check KV namespace configuration in `wrangler.toml`
   - Verify you have Workers enabled in your Cloudflare account

### Getting Help

- Check the console output for error messages
- Refer to the component-specific README files
- Visit the documentation site for detailed information