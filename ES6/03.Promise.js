const Promise = require('./Promise');

const p = new Promise((resolve, reject) => {
  resolve('IEUNJI - 01');
});

const promise2 = p.then(data => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('IEUNJI - 02');
    }, 1000);
  });
});

promise2.then(data => {
  console.log(data);
}, error => {
  console.log(error);
});
