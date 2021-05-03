const fs = require('fs');
const path = require('path');
const { promisify, inherits, inspect } = require('util');

// const promisify = fn => (...args) => {
//   return new Promise((resolve, reject) => {
//     fn(...args, (err, data) => {
//       err ? reject(err) : resolve(data);
//     });
//   });
// };

const readFile = promisify(fs.readFile);
const ncp = promisify(require('ncp'));

readFile('./package.json', 'utf8')
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.log(err);
  });

const copyFile = async () => {
  const filePath = path.resolve(__dirname, 'package.json');
  await ncp(filePath, 'package-copy.json');
  console.log('拷贝成功');
};

// copyFile();

function Parent() {

}

function Child() {

}

inherits(Child, Parent);
// 相当于 Object.setPrototypeOf(Child.prototype, Parent.prototype);

// 显示不可枚举的属性
console.log(inspect(Array.prototype, { showHidden: true }));
