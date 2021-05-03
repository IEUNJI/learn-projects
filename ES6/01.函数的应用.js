// 高阶函数的概念：
// 1. 一个函数的参数，是一个函数。（回调函数）
// 2. 一个函数，返回一个函数。（拆分函数）

// 函数的 before （AOP 切片 装饰）
Function.prototype.before = function (beforeFn) {
  return (...args) => {
    beforeFn();
    this(...args);
  };
};

const say = name => {
  console.log(`${name} say`);
};

const newSay = say.before(() => {
  console.log('before');
});

newSay('Tom');

// React 的事务
const perform = (anyMethod, wrappers) => {
  wrappers.forEach(wrapper => {
    wrapper.initialize();
  });
  anyMethod();
  wrappers.forEach(wrapper => {
    wrapper.close();
  });
};

const anyMethod = () => {
  console.log('anyMethod');
};

const wrapper1 = {
  initialize() {
    console.log('initialize 1');
  },
  close() {
    console.log('close 1');
  }
};

const wrapper2 = {
  initialize() {
    console.log('initialize 2');
  },
  close() {
    console.log('close 2');
  }
};

perform(anyMethod, [wrapper1, wrapper2]);

// 柯里化：将一个函数拆分成多个函数
const curring = (fn, arr = []) => {
  const len = fn.length;
  return (...args) => {
    arr = arr.concat(args);
    if (arr.length < len) {
      return curring(fn, arr);
    }
    return fn(...arr);
  };
};

const add = (a, b, c, d, e) => {
  return a + b + c + d + e;
};

add(1, 2, 3, 4, 5); // 15
curring(add)(1, 2)(3)(4, 5); // 15

const checkType = (type, content) => {
  return Object.prototype.toString.call(content) === `[object ${type}]`;
};

const types = ['Number', 'String', 'Boolean'];
const utils = {};

types.forEach(type => {
  utils[`is${type}`] = curring(checkType)(type);
});

utils.isString('abc'); // true
utils.isNumber(123); // true
utils.isBoolean(true); // true

// after 函数
const after = (times, fn) => {
  return () => {
    times -= 1;
    if (times === 0) {
      fn();
    }
  };
};

const newAfter = after(3, () => {
  console.log('执行三次才调用');
});

newAfter();
newAfter();
newAfter(); // '执行三次才调用'
