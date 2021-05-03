const url = require('url');
const Layer = require('./layer');

class Route {
  constructor() {
    this.stack = [];
    this.methods = {};
  }

  dispatch(req, res, out) {
    let idx = 0;
    const next = err => {
      if (typeof err !== 'undefined') {
        res.end(`Cannot ${req.method} ${url.parse(req.url).pathname}, Error: ${err}`);
        return;
      }
      if (idx === this.stack.length) {
        out();
        return;
      }
      const layer = this.stack[idx++];
      const method = req.method.toLowerCase();
      if (layer.method === method) {
        layer.handler(req, res, next);
      } else {
        next();
      }
    };
    next();
  }
}

['get', 'post', 'delete', 'put'].forEach(method => {
  Route.prototype[method] = function (handlers) {
    handlers.forEach(handler => {
      const layer = new Layer('', handler);
      layer.method = method;
      this.methods[method] = true;
      this.stack.push(layer);
    });
  };
});

module.exports = Route;
