const Promise = require('./Promise');

const promiseWrapper = p1 => {
  let abortFn = null;
  const p2 = new Promise((resolve, reject) => {
    abortFn = reject;
  });
  const p3 = Promise.race([p1, p2]);
  p3.abort = abortFn;
  return p3;
};

const fn = () => {
  // throw 'sync error';
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('async promise error');
    }, 1000);
  });
};

Promise.try(fn).catch(error => {
  console.log('catch: ' + error);
});
