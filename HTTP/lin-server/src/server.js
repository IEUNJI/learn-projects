import http from 'http';
import url from 'url';
import path from 'path';
import fs from 'fs';
import zlib from 'zlib';
import crypto from 'crypto';

import chalk from 'chalk';
import mime from 'mime';
import ejs from 'ejs';

const {
  stat,
  readdir
} = fs.promises;

const template = fs.readFileSync(path.resolve(__dirname, '../template.html'), 'utf8');

class Server {
  constructor(config) {
    this.port = config.port;
    this.template = template;
  }

  async handleRequest(req, res) {
    const pathname = decodeURIComponent(url.parse(req.url, true).pathname);
    const filePath = path.join(process.cwd(), pathname);

    try {
      const stats = await stat(filePath);

      if (stats.isDirectory()) {
        const dirs = await readdir(filePath);
        const templateStr = ejs.render(this.template, { dirs, path: pathname === '/' ? '' : pathname });
        res.setHeader('Content-Type', 'text/html;charset=utf-8');
        res.end(templateStr);
      } else {
        this.sendFile(filePath, req, res, stats);
      }
    } catch (e) {
      this.sendError(e, req, res);
    }
  }

  gzip(filePath, req, res, stats) {
    const encoding = req.headers['accept-encoding'];

    if (encoding) {
      if (/gzip/.test(encoding)) {
        res.setHeader('Content-Encoding', 'gzip');
        return zlib.createGzip();
      } else if (/deflate/.test(encoding)) {
        res.setHeader('Content-Encoding', 'deflate');
        return zlib.createDeflate();
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  cache(filePath, req, res, stats) {
    // 文件时间戳
    // const lastModified = stats.ctime.toGMTString();
    // res.setHeader('Last-Modified', lastModified);
    // const ifModifiedSince = req.headers['if-modified-since'];
    // if (ifModifiedSince === lastModified) {
    //   return true;
    // }

    // 文件指纹
    const Etag = crypto.createHash('md5').update(fs.readFileSync(filePath)).digest('base64');
    res.setHeader('Etag', Etag);
    const ifNoneMatch = req.headers['if-none-match'];
    if (ifNoneMatch === Etag) {
      return true;
    }
  }

  sendFile(filePath, req, res, stats) {
    res.setHeader('Cache-Control', 'no-cache');
    const cache = this.cache(filePath, req, res, stats);
    if (cache) {
      res.statusCode = 304;
      res.end();
      return;
    }

    const type = mime.getType(filePath) || 'text/plain';
    res.setHeader('Content-Type', `${type};charset=utf-8`);

    const flag = this.gzip(filePath, req, res, stats);
    if (!flag) {
      fs.createReadStream(filePath).pipe(res);
    } else {
      fs.createReadStream(filePath).pipe(flag).pipe(res);
    }
  }

  sendError(e, req, res) {
    console.log(e);
    res.statusCode = 404;
    res.end('Not Found');
  }

  start() {
    const server = http.createServer(this.handleRequest.bind(this));

    server.listen(this.port, () => {
      console.log(chalk.yellow('Starting up http-server'));
      console.log(`http://localhost:${chalk.green(this.port)}`);
      console.log('Hit CTRL-C to stop the server');
    });
  }
}

export default Server;
