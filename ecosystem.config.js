module.exports = {
  apps: [
    {
      name: 'judiciary-portal',
      script: 'npm',
      args: 'start',
      cwd: '/home/quinto/judiciaryportal',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3047
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3047
      },
      // Logging configuration
      log_file: './logs/combined.log',
      out_file: './logs/out.log',
      error_file: './logs/error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      
      // Restart configuration
      max_memory_restart: '1G',
      min_uptime: '10s',
      max_restarts: 10,
      
      // Watch configuration (optional - uncomment if you want auto-restart on file changes)
      // watch: false,
      // ignore_watch: ['node_modules', 'logs', '.next'],
      
      // PM2 specific settings
      autorestart: true,
      cron_restart: '0 2 * * *', // Restart daily at 2 AM
      
      // Health check
      health_check_grace_period: 3000,
      health_check_fatal_exceptions: true,
      
      // Kill timeout
      kill_timeout: 5000,
      
      // Wait ready
      wait_ready: true,
      listen_timeout: 10000,
      
      // Merge logs
      merge_logs: true,
      
      // Source map support
      source_map_support: true,
      
      // Node options
      node_args: '--max-old-space-size=1024'
    }
  ],
  
  deploy: {
    production: {
      user: 'quinto',
      host: 'localhost',
      ref: 'origin/main',
      repo: 'git@github.com:yourusername/judiciaryportal.git', // Update with your actual repo
      path: '/home/quinto/judiciaryportal',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
}; 