# Workers KV Configuration

This document outlines the configuration steps for setting up Workers KV for the Mutsumi image gallery.

## Prerequisites

1. Cloudflare account with Workers enabled
2. Wrangler CLI installed (`npm install -g wrangler`)
3. Authenticated with Wrangler (`wrangler login`)

## Steps to Configure Workers KV

1. Create a new KV namespace:
   ```bash
   wrangler kv:namespace create "IMAGES"
   ```

2. This command will output a binding configuration. Update your `wrangler.toml` file with this information:
   ```toml
   [[kv_namespaces]]
   binding = "IMAGES"
   id = "your_generated_namespace_id"
   ```

3. Redeploy your worker to apply the new configuration:
   ```bash
   npm run deploy
   ```

## Data Structure

The KV namespace uses the following structure:

- `image:{fileId}` - Stores the image data (ArrayBuffer) with metadata
- `image:list` - Stores a JSON array of image metadata for easy retrieval

## Security Considerations

- The KV namespace is only accessible from your Cloudflare Worker
- No direct public access to KV data
- All operations go through the worker's API endpoints