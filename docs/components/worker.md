# Cloudflare Worker

## Overview

The Cloudflare Worker serves as the backend for the Mutsumi image gallery. It handles API requests, serves the frontend, and manages image storage in Workers KV.

## API Endpoints

- `POST /api/upload` - Upload an image (used by Telegram bot)
- `GET /api/images` - Get list of images
- `GET /api/images/:id` - Get a specific image
- `DELETE /api/images/:id` - Delete an image

## Environment Variables

The worker uses a KV namespace binding called `IMAGES` for storing images and metadata.

## Features

- Serverless platform for deploying backend logic
- Edge computing for low-latency responses
- Serves the web interface
- Manages authentication and authorization
- Interfaces with Workers KV for data storage