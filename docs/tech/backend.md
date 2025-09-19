# Backend Technology Stack

## Overview

The backend of Mutsumi consists of a Telegram Bot and Cloudflare Workers, providing a serverless architecture for image management and web serving.

## Technologies

### Node.js + Telegraf (Telegram Bot)
- Node.js runtime for building scalable applications
- Telegraf framework for building Telegram bots
- Simplifies bot development with middleware and context
- Handles image uploads from the owner

### Cloudflare Workers
- Serverless platform for deploying backend logic
- Edge computing for low-latency responses
- Serves the web interface
- Manages authentication and authorization
- Interfaces with Workers KV for data storage

### Cloudflare Workers KV
- Global, low-latency key-value data store
- Designed for high-read applications
- Stores images and metadata
- Integrated with Cloudflare Workers

## Features

- Serverless architecture with automatic scaling
- Global distribution through Cloudflare's network
- Low-latency responses
- Secure handling of images and metadata
- Owner-only image upload validation