#!/bin/bash
set -e

echo "📦 Building stock.chat project..."
npm install
npm run build

echo "🌍 Generating OpenClaw skills..."
npm run generate-openclaw

echo "📁 Creating ZIP archive..."
zip -r stock-chat.zip \
  .env.example \
  .gitignore \
  Dockerfile \
  README.md \
  package.json \
  public/ \
  src/ \
  docs/ \
  scripts/ \
  dist/

echo "✅ Done! stock-chat.zip is ready."