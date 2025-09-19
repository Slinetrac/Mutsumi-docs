# Introduction

Mutsumi is a personal, serverless image gallery that allows you to upload images via Telegram and view them in a beautiful web interface. The system is built on Cloudflare's infrastructure, making it highly scalable and cost-effective.

## What is Mutsumi?

Mutsumi is a private image gallery solution that combines the convenience of Telegram with the power of Cloudflare's serverless infrastructure. It's designed for individuals who want a simple, private way to store and view their images without the complexity of traditional web hosting.

## Key Features

- **Serverless Architecture**: Powered by Cloudflare Workers and Workers KV - no servers to manage
- **Telegram-Based Uploads**: Upload images directly from Telegram using a dedicated bot
- **Private Gallery**: Only the owner can upload images, ensuring your gallery remains private
- **Modern Web Interface**: Responsive gallery built with Nuxt.js and Tailwind CSS
- **Global CDN**: Images served through Cloudflare's global network for fast loading
- **Easy Deployment**: Simple setup with clear documentation
- **Multi-language Docs**: Documentation available in English and Chinese

## How It Works

1. **Upload**: The owner sends images to a Telegram bot
2. **Validation**: The bot validates the sender is the authorized owner
3. **Processing**: The bot forwards images to a Cloudflare Worker
4. **Storage**: The Worker stores images in Workers KV (Cloudflare's database)
5. **Retrieval**: The web interface retrieves images from Workers KV
6. **Display**: Images are displayed in a beautiful, responsive gallery with click-to-enlarge functionality

## Technology Stack

- **Frontend**: Nuxt.js + Vue 3 + Tailwind CSS
- **Telegram Bot**: Node.js + Telegraf
- **Backend**: Cloudflare Workers
- **Database**: Cloudflare Workers KV

## Who is this for?

Mutsumi is perfect for:
- Individuals who want a private image gallery
- People who frequently share images via Telegram
- Users who prefer serverless, low-maintenance solutions
- Anyone interested in modern web technologies like Cloudflare Workers