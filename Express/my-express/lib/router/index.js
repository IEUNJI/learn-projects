const url = require('url');
const Layer = require('./layer');
const Route = require('./route');

function Router() {
  const router = function (req, res, next) {
    router.handleRequest(req, res, next);
  };
  router.stack = [];
  router.paramsCallbacks = {};
  Reflect.setPrototypeOf(router, proto);
  return router;
}

const proto = {};

proto.route = function (path) {
  const route = new Route();
  const layer = new Layer(path, route.dispatch.bind(route));
  layer.route = route;
  this.stack.push(layer);
  return route;
};

proto.handleRequest = function (req, res, out) {
  let removed = '';
  let idx = 0;
  const next = err => {
    if (removed.length > 0) {
      req.url = removed + req.url;
      removed = '';
    }
    if (idx === this.stack.length) {
      out();
      return;
    }
    const layer = this.stack[idx++];
    const { pathname } = url.parse(req.url);
    const method = req.method.toLowerCase();
    if (typeof err !== 'undefined') {
      if (!layer.route) {
        if (layer.handler.length === 4) {
          layer.handler(err, req, res, next);
        } else {
          next(err);
        }
      } else {
        next(err);
      }
    } else {
      if (layer.match(pathname)) {
        if (layer.route) {
          if (layer.route.methods[method]) {
            req.params = layer.params || {};
            this.handleParams(req, res, layer, () => {
              layer.handler(req, res, next);
            });
          } else {
            next();
          }
        } else {
          if (layer.handler.length !== 4) {
            if (layer.path !== '/') {
              removed = layer.path;
              req.url = req.url.slice(removed.length);
            }
            layer.handler(req, res, next);
          } else {
            next();
          }
        }
      } else {
        next();
      }
    }
  };
  next();
};

proto.handleParams = function (req, res, layer, done) {
  const keys = layer.keys.map(item => item.name);
  if (keys.length > 0) {
    let key;
    let value;
    let callbacks;
    let idx = 0;
    const next = () => {
      if (idx === keys.length) {
        done();
        return;
      }
      key = keys[idx++];
      if (key) {
        value = layer.params[key];
        callbacks = this.paramsCallbacks[key];
        handleCallbacks(next);
      } else {
        next();
      }
    };
    next();
    function handleCallbacks(out) {
      let idx = 0;
      const next = () => {
        const callback = callbacks[idx++];
        if (callback) {
          callback(req, res, next, value, key);
        } else {
          out();
        }
      };
      next();
    };
  } else {
    done();
  }
};

proto.use = function (path, handler) {
  const layer = new Layer(path, handler);
  this.stack.push(layer);
};

proto.param = function (key, handler) {
  if (this.paramsCallbacks[key]) {
    this.paramsCallbacks[key].push(handler);
  } else {
    this.paramsCallbacks[key] = [handler];
  }
};

['get', 'post', 'delete', 'put'].forEach(method => {
  proto[method] = function (path, handlers) {
    if (!Array.isArray(handlers)) {
      handlers = [handlers];
    }
    const route = this.route(path);
    route[method](handlers);
  };
});

module.exports = Router;
