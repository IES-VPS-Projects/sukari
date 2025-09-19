#!/bin/bash

# Sukari App PM2 Startup Script

echo "🚀 Starting Sukari App with PM2..."

# Check if PM2 is installed
if ! command -v pm2 &> /dev/null; then
    echo "❌ PM2 is not installed. Installing PM2..."
    npm install -g pm2
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build the application
echo "🔨 Building the application..."
npm run build

# Start with PM2
echo "▶️  Starting application with PM2..."
pm2 start ecosystem.config.js --env production

# Save PM2 configuration
pm2 save

# Setup PM2 to start on system boot
pm2 startup

echo "✅ Sukari App is now running with PM2!"
echo "📊 Check status with: pm2 status"
echo "📋 View logs with: pm2 logs sukari-app"
echo "🛑 Stop with: pm2 stop sukari-app"
echo "🔄 Restart with: pm2 restart sukari-app" 