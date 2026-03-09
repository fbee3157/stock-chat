@echo off
echo 📦 Building stock.chat project...
npm install
npm run build

echo 🌍 Generating OpenClaw skills...
npm run generate-openclaw

echo 📁 Creating ZIP archive...
powershell -Command "Compress-Archive -Path .env.example,.gitignore,Dockerfile,README.md,package.json,public,src,docs,scripts,dist -DestinationPath stock-chat.zip"

echo ✅ Done! stock-chat.zip is ready.