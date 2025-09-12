# PM2 Configuration for Sukari App

This document explains how to run the Sukari Next.js application using PM2 process manager.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PM2 (will be installed automatically by the startup script)

## Quick Start

### Option 1: Using the startup script (Recommended)
```bash
./start.sh
```

This script will:
- Install PM2 if not already installed
- Install dependencies
- Build the application
- Start the app with PM2
- Configure PM2 to start on system boot

### Option 2: Manual PM2 commands

1. **Install PM2 globally:**
   ```bash
   npm install -g pm2
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build the application:**
   ```bash
   npm run build
   ```

4. **Start with PM2:**
   ```bash
   pm2 start ecosystem.config.js --env production
   ```

## PM2 Management Commands

### Basic Commands
```bash
# Check status of all processes
pm2 status

# View logs
pm2 logs sukari-app

# View real-time logs
pm2 logs sukari-app --lines 100

# Restart the application
pm2 restart sukari-app

# Stop the application
pm2 stop sukari-app

# Delete the application from PM2
pm2 delete sukari-app

# Reload the application (zero-downtime restart)
pm2 reload sukari-app
```

### Monitoring
```bash
# Open PM2 monitoring dashboard
pm2 monit

# Show detailed information
pm2 show sukari-app

# Show PM2 startup configuration
pm2 startup
```

### Logs
```bash
# View all logs
pm2 logs

# View only error logs
pm2 logs --err

# View only output logs
pm2 logs --out

# Clear logs
pm2 flush
```

## Configuration Details

The `ecosystem.config.js` file includes:

- **Application Name**: `sukari-app`
- **Port**: 3000
- **Environment**: Production
- **Memory Limit**: 1GB (auto-restart if exceeded)
- **Auto-restart**: Enabled
- **Daily Restart**: 2 AM (to clear memory)
- **Logging**: Separate files for combined, output, and error logs
- **Health Checks**: Enabled with 3-second grace period

## Environment Variables

The configuration uses these environment variables:
- `NODE_ENV=production`
- `PORT=3000`

You can add more environment variables in the `env` section of the ecosystem config.

## Log Files

Logs are stored in the `logs/` directory:
- `combined.log` - All logs combined
- `out.log` - Standard output
- `error.log` - Error logs only

## Troubleshooting

### Application won't start
1. Check if port 3000 is available:
   ```bash
   lsof -i :3000
   ```

2. Check PM2 logs:
   ```bash
   pm2 logs sukari-app --lines 50
   ```

3. Check if the build was successful:
   ```bash
   ls -la .next/
   ```

### High memory usage
1. Check memory usage:
   ```bash
   pm2 monit
   ```

2. Restart the application:
   ```bash
   pm2 restart sukari-app
   ```

### Application crashes frequently
1. Check error logs:
   ```bash
   pm2 logs sukari-app --err
   ```

2. Increase memory limit in `ecosystem.config.js`:
   ```javascript
   max_memory_restart: '2G'
   ```

## Deployment

For production deployment, you can use PM2's deployment feature:

1. Update the repository URL in `ecosystem.config.js`
2. Run deployment:
   ```bash
   pm2 deploy production setup
   pm2 deploy production
   ```

## Useful PM2 Commands

```bash
# Save current PM2 configuration
pm2 save

# Setup PM2 to start on system boot
pm2 startup

# Kill PM2 daemon
pm2 kill

# Resurrect previously saved processes
pm2 resurrect

# Update PM2
pm2 update
```

## Performance Monitoring

PM2 provides built-in monitoring:
```bash
# Real-time monitoring
pm2 monit

# JSON format status
pm2 jlist

# Process list
pm2 list
```

## Security Notes

- The application runs on port 3000 by default
- Consider using a reverse proxy (nginx) for production
- Ensure proper firewall rules are in place
- Keep PM2 and Node.js updated regularly 