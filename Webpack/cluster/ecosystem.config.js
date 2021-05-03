module.exports = {
  apps: [
    {
      name: 'xxx',
      script: 'xxx.js',
      instances: require('os').cpus().length
    }
  ],
  deploy: {
    production: {
      user: 'root',
      host: '47.94.20.226',
      ref: 'origin/master',
      repo: 'https://github.com/IEUNJI/xxx.git',
      path: '/usr/local/src',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
