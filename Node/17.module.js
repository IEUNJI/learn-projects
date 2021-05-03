const path = require('path');
const fs = require('fs');
const vm = require('vm');

function Module(id) {
  this.id = id;
  this.exports = {};
}

Module._cache = {};

Module.extensions = {
  '.js'(module) {
    const script = fs.readFileSync(module.id);
    const fnStr = '(function (exports, require, module, __filename, __dirname) {\r\n' + script + '});\r\n';
    const fn = vm.runInThisContext(fnStr);
    fn.call(module.exports, module.exports, myRequire, module, module.id, path.dirname(module.id));
  },
  '.json'(module) {
    const json = fs.readFileSync(module.id);
    module.exports = JSON.parse(json);
  }
};

Module.resolvePath = function (relPath) {
  const absPath = path.resolve(__dirname, relPath);
  let id = null;

  if (!fs.existsSync(absPath)) {
    const keys = Object.keys(Module.extensions);
    for (let i = 0; i < keys.length; i++) {
      const tryPath = absPath + keys[i];
      if (fs.existsSync(tryPath)) {
        id = tryPath;
        break;
      }
    }
  } else {
    id = absPath;
  }

  if (!id) {
    throw new Error('模块不存在');
  } else {
    return id;
  }
};

Module.prototype.load = function () {
  const extname = path.extname(this.id);
  Module.extensions[extname](this);
};

function myRequire(relPath) {
  const id = Module.resolvePath(relPath);

  if (Module._cache[id]) {
    return Module._cache[id].exports;
  }

  const module = new Module(id);
  Module._cache[id] = module;
  module.load();
  return module.exports;
}
