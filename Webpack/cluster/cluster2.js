const http = require('http');

const cluster = require('cluster');
const cpus = require('os').cpus().length;

if (cluster.isMaster) {
  cluster.on('exit', worker => {
    console.log(`Server ${worker.process.pid} is down`);
    cluster.fork();
  });

  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }
} else {
  http.createServer((req, res) => {
    res.end(`process: ${process.pid}`);
  }).listen(3000);
}
