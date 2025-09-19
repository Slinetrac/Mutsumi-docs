# Architecture

## Overview

Mutsumi is built on a serverless architecture using Cloudflare Workers and Workers KV. The system consists of three main components that work together to provide a seamless image gallery experience.

## Main Components

### 1. Telegram Bot
- **Technology**: Node.js + Telegraf framework
- **Purpose**: Handles image uploads from the owner
- **Location**: Runs on your local machine or server
- **Function**: 
  - Receives images sent by the owner via Telegram
  - Validates that the sender is the authorized owner
  - Processes and forwards images to Cloudflare Worker
  - Provides feedback to the owner about upload status

### 2. Cloudflare Workers (Backend)
- **Technology**: Cloudflare Workers (serverless functions)
- **Purpose**: Processes requests and manages data
- **Location**: Cloudflare's global edge network
- **Functions**:
  - Receives images from the Telegram bot
  - Stores images in Workers KV database
  - Serves the web interface to users
  - Handles API requests for image retrieval
  - Manages authentication and authorization

### 3. Workers KV (Database)
- **Technology**: Cloudflare Workers KV (key-value store)
- **Purpose**: Stores images and metadata
- **Location**: Cloudflare's global network
- **Features**:
  - Global, low-latency data storage
  - Automatically replicated across Cloudflare's network
  - High read performance for serving images
  - No database management required

## Component Interaction Flow

```
1. Owner sends an image to the Telegram Bot
   ↓
2. Telegram Bot validates the sender is the owner
   ↓
3. Telegram Bot forwards the image to a Cloudflare Worker
   ↓
4. Cloudflare Worker stores the image in Workers KV
   ↓
5. Owner accesses the web interface hosted by Cloudflare Worker
   ↓
6. Cloudflare Worker retrieves images from Workers KV
   ↓
7. Cloudflare Worker serves the gallery to the owner
```

## Detailed Workflow

1. **Image Upload**:
   - Owner sends a photo to the Telegram bot
   - Bot checks if the sender's ID matches the owner ID
   - If authorized, bot downloads the image from Telegram's servers
   - Bot sends the image to the Cloudflare Worker via HTTP POST request

2. **Image Processing**:
   - Cloudflare Worker receives the image data
   - Worker generates a unique ID for the image
   - Worker stores the image data in Workers KV
   - Worker updates the image list metadata

3. **Web Interface**:
   - When owner visits the gallery URL, Cloudflare Worker serves the frontend
   - Frontend makes API requests to get the list of images
   - Worker retrieves image list from Workers KV
   - Frontend displays thumbnails in a responsive grid
   - When user clicks an image, it's loaded from Workers KV

## Technology Stack

- **Frontend**: Nuxt.js + Vue 3 + Tailwind CSS
  - Nuxt.js for server-side rendering and static site generation
  - Vue 3 for reactive components
  - Tailwind CSS for responsive styling

- **Telegram Bot**: Node.js + Telegraf
  - Node.js for JavaScript runtime
  - Telegraf for Telegram Bot API framework

- **Backend**: Cloudflare Workers
  - Serverless functions running on Cloudflare's edge network
  - Low latency and high availability

- **Database**: Cloudflare Workers KV
  - Global key-value store
  - No database management overhead
  - Automatically scaled

## Benefits of This Architecture

1. **No Server Management**: Everything runs on Cloudflare's infrastructure
2. **Global Performance**: Cloudflare's CDN ensures fast loading worldwide
3. **Cost-Effective**: Pay only for what you use
4. **Scalable**: Automatically handles traffic increases
5. **Reliable**: Built on Cloudflare's robust infrastructure
6. **Secure**: Multiple layers of security and validation

## Security Considerations

- Only the owner can upload images via Telegram (validated by user ID)
- Web interface is publicly accessible but only shows owner's images
- No user authentication required for browsing (private by design)
- All data is stored securely in Cloudflare's infrastructure
- Communication between components uses HTTPS