// const Promise = require('./Promise');

// 观察者模式
class Subject {
  constructor(name) {
    this.name = name;
    this.arr = [];
    this.state = '开心'
  }
  attach(o) {
    this.arr.push(o);
  }
  setState(newState) {
    this.state = newState;
    this.arr.forEach(o => o.update(newState));
  }
}

class Observer {
  constructor(name) {
    this.name = name;
  }
  update(newState) {
    console.log(this.name, newState);
  }
}

const o1 = new Observer('John');
const o2 = new Observer('Tom');
const s = new Subject('Mary');

s.attach(o1);
s.attach(o2);
s.setState('伤心');

// Promise 的链式调用
// 1. 返回一个普通值（不是 Promise，也不是错误），走下一个 then 的成功回调。
// 2. 返回一个成功的 Promise，走下一个 then 的成功回调。
// 3. 返回一个失败的 Promise，走下一个 then 的失败回调。
// 4. 抛出一个错误，走下一个 then 的失败回调。
// 5. 返回一个 pending 的 Promise，则 Promise 链中止。
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('ok');
    // reject('no');
  }, 1000);
});

p.then(data => {
  console.log(data);
}, err => {
  console.log(err);
});
