// 按顺序运行 Promise
const runPromiseInSequence = (arr, input) => {
  return arr.reduce((promiseChain, currentFunction) => {
    return promiseChain.then(currentFunction);
  }, Promise.resolve(input));
};

const p1 = x => new Promise(r => setTimeout(r, 500, x * 5));
const p2 = x => new Promise(r => setTimeout(r, 1000, x * 2));
const f3 = x => x * 3;
const p4 = x => new Promise(r => setTimeout(r, 2000, x * 4));

const promiseArr = [p1, p2, f3, p4];
runPromiseInSequence(promiseArr, 10).then(console.log); // 1200

// compose 函数
const compose = (...funcs) => {
  return (...args) => {
    return funcs.reduceRight((returnVal, func) => {
      return func(returnVal);
    }, funcs.pop()(...args));
  };
};

const sum = (x, y) => x + y;
const fixed = x => x.toFixed(2);
const currency = x => `￥ ${x}`;

const res = compose(currency, fixed, sum)(5, 10);
console.log(res); // '￥ 15.00'
