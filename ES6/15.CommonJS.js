const fs = require('fs');
const path = require('path');
const vm = require('vm');

function Module(absPath) {
  this.id = absPath;
  this.exports = {};
}

Module.prototype.load = function () {
  const script = fs.readFileSync(this.id, 'utf8');
  const fnStr = '(function (exports, require, module) {\r\n' + script + '});\r\n';
  const fn = vm.runInThisContext(fnStr);
  fn.call(this.exports, this.exports, myRequire, this);
};

function myRequire(relPath) {
  const absPath = path.resolve(__dirname, relPath);
  const module = new Module(absPath);
  module.load();
  return module.exports;
}

const a = myRequire('./15.aModule.js');
console.log(a);
