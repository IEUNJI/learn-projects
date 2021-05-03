const http = require('http');

process.on('message', (data, server) => {
  http.createServer((req, res) => {
    res.end(`child: ${process.pid}`);
  }).listen(server);
});
