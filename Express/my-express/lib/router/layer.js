const { pathToRegexp } = require('path-to-regexp');

class Layer {
  constructor(path, handler) {
    this.path = path;
    this.handler = handler;
    this.keys = [];
    this.regExp = pathToRegexp(this.path, this.keys);
  }

  match(pathname) {
    if (this.route) {
      const matches = pathname.match(this.regExp);
      if (matches) {
        const values = matches.slice(1);
        this.params = this.keys.reduce((acc, key, index) => {
          acc[key.name] = values[index];
          return acc;
        }, {});
        return true;
      } else {
        return false;
      }
    }
    if (this.path === '/') {
      return true;
    }
    return pathname.startsWith(`${this.path}/`);
  }
}

module.exports = Layer;
