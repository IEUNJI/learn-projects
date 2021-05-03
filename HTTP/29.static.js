const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs').promises;
const { createReadStream } = require('fs');
const mime = require('mime');

class HttpServer {
  async handleRequest(req, res) {
    const { pathname, query } = url.parse(req.url, true);
    const filePath = path.join(__dirname, pathname);
    try {
      const stats = await fs.stat(filePath);
      this.sendFile(stats, filePath, req, res);
    } catch (e) {
      this.sendError(e, res);
      return;
    }
  }

  async sendFile(stats, filePath, req, res) {
    if (stats.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
      try {
        await fs.access(filePath);
      } catch (e) {
        this.sendError(e, res);
        return;
      }
    }
    res.setHeader('Content-Type', `${mime.getType(filePath)};charset=utf-8`);
    createReadStream(filePath).pipe(res);
  }

  sendError(e, res) {
    console.log(e);
    res.statusCode = 404;
    res.end('Not Found');
  }

  start(...args) {
    const server = http.createServer(this.handleRequest.bind(this));
    server.listen(...args);
  }
}

const hs = new HttpServer();

hs.start(3000, () => {
  console.log('server start');
});
