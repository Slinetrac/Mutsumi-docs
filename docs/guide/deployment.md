# Deployment

## Overview

Deploying Mutsumi involves setting up the Telegram Bot, configuring Cloudflare Workers, and initializing Workers KV. The deployment process is designed to be straightforward and leverages Cloudflare's infrastructure. This guide assumes you have already completed the initial setup.

## Prerequisites

Before deployment, ensure you have:
- Completed the setup guide
- All components (bot, worker, frontend) working locally
- A Cloudflare account with Workers enabled
- Wrangler CLI installed and logged in

## Deployment Steps

### 1. Deploy the Telegram Bot

The Telegram bot can run on any server or local machine that's always online. For production, consider using a cloud server.

#### Option 1: Deploy to a VPS or Dedicated Server

1. Copy the `bot/` directory to your server
2. Install dependencies:
   ```bash
   npm install
   ```
3. Ensure your `.env` file is configured with:
   ```
   BOT_TOKEN=your_actual_bot_token
   OWNER_ID=your_telegram_user_id
   ```
4. Run the bot:
   ```bash
   npm start
   ```

#### Option 2: Deploy to a Process Manager (PM2)

1. Install PM2 globally:
   ```bash
   npm install -g pm2
   ```
2. Start the bot with PM2:
   ```bash
   pm2 start index.js --name "mutsumi-bot"
   ```
3. Save the PM2 configuration:
   ```bash
   pm2 save
   ```
4. Set PM2 to start on boot:
   ```bash
   pm2 startup
   ```

#### Option 3: Deploy to a Cloud Platform (e.g., Heroku, Railway)

1. Create a `Procfile` in the `bot/` directory:
   ```
   worker: npm start
   ```
2. Follow your platform's deployment instructions
3. Set environment variables in your platform's dashboard:
   - `BOT_TOKEN`: Your bot token
   - `OWNER_ID`: Your Telegram user ID

### 2. Deploy Cloudflare Worker

1. Ensure your `worker/wrangler.toml` is configured with the KV namespace:
   ```toml
   name = "mutsumi-worker"
   main = "index.js"
   compatibility_date = "2023-10-01"

   [[kv_namespaces]]
   binding = "IMAGES"
   id = "your_kv_namespace_id"
   ```

2. Deploy the worker:
   ```bash
   cd worker
   npm run deploy
   ```

3. Note the deployed URL which will look like:
   ```
   https://mutsumi-worker.YOUR_SUBDOMAIN.workers.dev
   ```

### 3. Configure Environment Variables

1. Set secrets in your Cloudflare Worker:
   ```bash
   wrangler secret put BOT_TOKEN
   # Enter your bot token when prompted
   
   wrangler secret put OWNER_ID
   # Enter your Telegram user ID when prompted
   ```

### 4. Deploy the Web Interface

You have two options for deploying the frontend:

#### Option 1: Serve from Cloudflare Worker (Recommended)

1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```
2. The built files are automatically served by the Worker

#### Option 2: Deploy to a Static Hosting Service

1. Build the frontend:
   ```bash
   cd frontend
   npm run generate
   ```
2. The static files will be in the `dist/` directory
3. Deploy these files to any static hosting service:
   - Cloudflare Pages
   - Vercel
   - Netlify
   - GitHub Pages

### 5. Configure Custom Domain (Optional)

To use a custom domain like `gallery.yourdomain.com`:

1. In the Cloudflare dashboard:
   - Go to Workers
   - Select your deployed worker
   - Go to the "Triggers" tab
   - Add a custom domain
2. Update your DNS:
   - Add a CNAME record pointing to your worker

### 6. Final Configuration

1. Update the frontend configuration:
   - In `frontend/nuxt.config.ts`, ensure `apiBase` points to your deployed worker URL
   - Rebuild and redeploy the frontend if necessary

2. Restart all services:
   - Restart your Telegram bot
   - Redeploy your worker if you made any changes

## Testing Your Deployment

### Test the Complete Flow

1. **Send a test image**:
   - Open Telegram
   - Send a photo to your bot
   - Watch for status updates from the bot

2. **Verify image storage**:
   - Check Cloudflare dashboard > Workers > KV
   - Verify your IMAGES namespace has new entries

3. **View in web interface**:
   - Visit your deployed frontend
   - The new image should appear in the gallery
   - Test clicking the image to view it in an enlarged view

## Monitoring and Maintenance

### Monitoring

1. **Cloudflare Worker Logs**:
   - Use `wrangler tail` to view real-time logs:
     ```bash
     wrangler tail
     ```

2. **Telegram Bot Logs**:
   - Check logs from your deployment platform
   - Add logging to your bot code for debugging

### Maintenance

1. **Updating the Application**:
   - Pull the latest code from your repository
   - Redeploy the worker:
     ```bash
     cd worker
     npm run deploy
     ```
   - Restart the Telegram bot if needed

2. **Managing Storage**:
   - Monitor your Workers KV usage in Cloudflare dashboard
   - Implement cleanup procedures for old images if needed

3. **Security Updates**:
   - Regularly update dependencies:
     ```bash
     npm update
     ```
   - Check for security advisories

## Troubleshooting Deployment Issues

### Common Deployment Problems

1. **Worker deployment fails**:
   - Check that you're logged into Wrangler: `wrangler whoami`
   - Verify your Cloudflare account has Workers enabled
   - Check your `wrangler.toml` configuration

2. **Bot not receiving messages**:
   - Verify the bot is running
   - Check that `BOT_TOKEN` is correct
   - Ensure `OWNER_ID` is set correctly

3. **Images not appearing in gallery**:
   - Check that the worker URL is correct in frontend config
   - Verify the KV namespace is properly bound
   - Check browser console for errors

4. **Frontend not loading**:
   - Verify the build was successful
   - Check that the worker is serving the frontend files
   - Ensure the custom domain (if used) is configured correctly

### Getting Help

- Check the console output for detailed error messages
- Refer to the Cloudflare Workers documentation
- Visit the Mutsumi documentation site for additional guidance
- Check GitHub issues if you're using the open-source version