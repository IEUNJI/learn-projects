const url = require('url');

const request = {
  get url() {
    return this.req.url;
  },
  get method() {
    return this.req.method;
  },
  get path() {
    return url.parse(this.req.url).pathname;
  }
};

module.exports = request;
