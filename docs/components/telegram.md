# Telegram Bot

## Overview

The Telegram Bot is the primary method for owners to upload and manage images in Mutsumi. Only owners can interact with the bot to add or remove images.

## Configuration

- The bot must be configured with the owner's Telegram user ID
- Only messages from the owner will be processed

## Commands

- `/start`: Introduction and instructions for the owner
- `/help`: Show help message

## Functionality

- Receives photos sent by the owner
- Validates that the sender is the authorized owner
- Processes and stores images in Workers KV via Cloudflare Worker
- Provides feedback to the owner about upload status