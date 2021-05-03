const http = require('http');
const path = require('path');
const { spawn } = require('child_process');

http.createServer((req, res) => {
  if (req.url === '/sum') {
    const cp = spawn('node', ['sum.js'], {
      cwd: path.resolve(__dirname),
      stdio: [0, 1, 2, 'ipc']
    });

    cp.on('message', chunk => {
      res.end(`sum: ${chunk.toString()}`)
    })
  } else {
    res.end('end ok');
  }
}).listen(3000);
