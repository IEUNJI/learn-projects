const Promise = require('./Promise');
const fs = require('fs').promises;

Promise.all([
  fs.readFile('./02.files/name.txt', 'utf8'),
  1,
  2,
  3,
  fs.readFile('./02.files/age.txt', 'utf8'),
  5
]).then(data => {
  console.log(data);
});
