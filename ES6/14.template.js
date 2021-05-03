const fs = require('fs');

const render = (template, data) => {
  let head = 'let str = ``;\r\n';
  head += 'with(data) {\r\n';
  let content = 'str += `';
  template = template.replace(/\{\{(.+?)\}\}/g, (...args) => {
    return '${' + args[1] + '}';
  });
  content += template.replace(/\{\%(.+?)\%\}/g, (...args) => {
    return '`;\r\n' + args[1] + '\r\nstr += `';
  });
  let foot = '`;\r\n}\r\n';
  foot += 'return str;';
  const fn = new Function('data', head + content + foot);
  return fn(data);
};

const template = fs.readFileSync('./14.template.html', 'utf8');

const data = {
  arr: [1, 2, 3],
  name: 'IEUNJI',
  age: 18
};

const r = render(template, data);

console.log(r);
