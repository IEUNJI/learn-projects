const http = require('http');
const path = require('path');

const { fork } = require('child_process');
const cpus = require('os').cpus().length;

const server = http.createServer((req, res) => {
  res.end(`parent: ${process.pid}`);
}).listen(3000);

for (let i = 0; i < cpus - 1; i++) {
  const child = fork('server.js', {
    cwd: path.resolve(__dirname)
  });
  child.send('server', server);
}
