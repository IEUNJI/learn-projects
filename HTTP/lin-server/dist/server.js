"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _http = _interopRequireDefault(require("http"));

var _url = _interopRequireDefault(require("url"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _zlib = _interopRequireDefault(require("zlib"));

var _crypto = _interopRequireDefault(require("crypto"));

var _chalk = _interopRequireDefault(require("chalk"));

var _mime = _interopRequireDefault(require("mime"));

var _ejs = _interopRequireDefault(require("ejs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  stat,
  readdir
} = _fs.default.promises;

const template = _fs.default.readFileSync(_path.default.resolve(__dirname, '../template.html'), 'utf8');

class Server {
  constructor(config) {
    this.port = config.port;
    this.template = template;
  }

  async handleRequest(req, res) {
    const pathname = decodeURIComponent(_url.default.parse(req.url, true).pathname);

    const filePath = _path.default.join(process.cwd(), pathname);

    try {
      const stats = await stat(filePath);

      if (stats.isDirectory()) {
        const dirs = await readdir(filePath);

        const templateStr = _ejs.default.render(this.template, {
          dirs,
          path: pathname === '/' ? '' : pathname
        });

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
        return _zlib.default.createGzip();
      } else if (/deflate/.test(encoding)) {
        res.setHeader('Content-Encoding', 'deflate');
        return _zlib.default.createDeflate();
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
    const Etag = _crypto.default.createHash('md5').update(_fs.default.readFileSync(filePath)).digest('base64');

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

    const type = _mime.default.getType(filePath) || 'text/plain';
    res.setHeader('Content-Type', `${type};charset=utf-8`);
    const flag = this.gzip(filePath, req, res, stats);

    if (!flag) {
      _fs.default.createReadStream(filePath).pipe(res);
    } else {
      _fs.default.createReadStream(filePath).pipe(flag).pipe(res);
    }
  }

  sendError(e, req, res) {
    console.log(e);
    res.statusCode = 404;
    res.end('Not Found');
  }

  start() {
    const server = _http.default.createServer(this.handleRequest.bind(this));

    server.listen(this.port, () => {
      console.log(_chalk.default.yellow('Starting up http-server'));
      console.log(`http://localhost:${_chalk.default.green(this.port)}`);
      console.log('Hit CTRL-C to stop the server');
    });
  }

}

var _default = Server;
exports.default = _default;