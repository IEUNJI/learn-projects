const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const statuses = require('statuses');
const Router = require('./router');

class Application {
  constructor() {
    this.settings = {
      'views': 'views',
      'view engine': 'ejs'
    };
    this.engines = {};
  }

  lazyRouter() {
    if (!this.router) {
      this.router = new Router();
      this._init();
    }
  }

  listen(...args) {
    const server = http.createServer((req, res) => {
      this.lazyRouter();
      const done = () => {
        res.end(`Cannot ${req.method} ${url.parse(req.url).pathname}`);
      };
      this.router.handleRequest(req, res, done);
    });
    server.listen(...args);
  }

  use(path, handler) {
    this.lazyRouter();
    if (typeof handler !== 'function') {
      handler = path;
      path = '/';
    }
    this.router.use(path, handler);
  }

  param(key, handler) {
    this.lazyRouter();
    this.router.param(key, handler);
  }

  set(key, value) {
    if (arguments.length === 1) {
      return this.settings[key];
    }
    this.settings[key] = value;
  }

  engine(extname, render) {
    this.engines[extname] = render;
  }

  _init() {
    this.use((req, res, next) => {
      res.render = (filename, options) => {
        const views = this.get('views');
        const viewEngine = this.get('view engine');
        const render = this.engines[viewEngine];
        const filepath = `${path.join(views, filename)}${viewEngine}`;
        render(filepath, options, (err, html) => {
          res.end(html);
        });
      };

      res.send = value => {
        if (typeof value === 'object' && value) {
          res.end(JSON.stringify(value));
        } else if (typeof value === 'number') {
          const msg = statuses(value);
          res.statusCode = value;
          res.end(msg);
        } else {
          res.end(value);
        }
      };

      res.json = value => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(value));
      };

      res.sendFile = filepath => {
        fs.createReadStream(filepath).pipe(res);
      };

      next();
    });
  }
}

['get', 'post', 'delete', 'put'].forEach(method => {
  Application.prototype[method] = function (path, ...handlers) {
    if (method === 'get' && arguments.length === 1) {
      return this.set(path);
    }
    this.lazyRouter();
    this.router[method](path, handlers);
  };
});

module.exports = Application;
