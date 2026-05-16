module.exports = {
  apps: [
    {
      name: 'recall',
      script: 'backend/server.js',
      cwd: '/home/eric/recall/current',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_restarts: 10,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],

  deploy: {
    production: {
      user: 'eric',
      host: '45.56.94.188',
      ref: 'origin/main',
      repo: 'https://github.com/ericman314/recall.git',
      path: '/home/eric/recall',
      'post-deploy': [
        'npm ci',
        'npm run build',
        'pm2 startOrReload ecosystem.config.cjs --only recall',
      ].join(' && '),
    },
  },
}
