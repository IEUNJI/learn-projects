const http = require('http');
const EventEmitter = require('events');
const Stream = require('stream');

const context = require('./context');
const request = require('./request');
const response = require('./response');

class Application extends EventEmitter {
  constructor() {
    super();
    this.context = context;
    this.request = request;
    this.response = response;
    this.middlewares = [];
  }

  use(fn) {
    this.middlewares.push(fn);
  }

  createContext(req, res) {
    const context = Object.create(this.context);
    context.request = Object.create(this.request);
    context.response = Object.create(this.response);
    context.req = context.request.req = req;
    context.res = context.response.res = res;
    return context;
  }

  compose(ctx) {
    const dispatch = index => {
      if (index === this.middlewares.length) {
        return Promise.resolve();
      }
      const middle = this.middlewares[index];
      return Promise.resolve(middle(ctx, () => dispatch(index + 1)));
    };
    return dispatch(0);
  }

  handleRequest(req, res) {
    const ctx = this.createContext(req, res);
    this.compose(ctx).then(() => {
      const _body = ctx.body;
      if (_body instanceof Stream) {
        _body.pipe(res);
        return;
      }
      if (typeof _body === 'object') {
        res.end(JSON.stringify(_body));
        return;
      }
      res.end(_body);
    }).catch(err => {
      this.emit('error', err);
    });
  }

  listen(...args) {
    const server = http.createServer(this.handleRequest.bind(this));
    server.listen(...args);
  }
}

module.exports = Application;
