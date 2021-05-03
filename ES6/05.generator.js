const fs = require('fs').promises;
// const co = require('co');

const iterableObject = {
  0: '0',
  1: '1',
  2: '2',
  length: 3,
  [Symbol.iterator]: function () {
    const length = this.length;
    let index = 0;
    return {
      next: () => {
        return { value: this[index], done: ++index === length + 1 };
      }
    };
  }
};

console.log([...iterableObject]); // ['0', '1', '2']

function* say(num) {
  const a = yield ++num;
  console.log(a); // 'for a'
  const b = yield ++num;
  console.log(b); // 'for b'
  const c = yield ++num;
  console.log(c); // 'for c'
  return num;
}

// it 为迭代器对象
const it = say(0); // 0 传给生成器函数

it.next('ignore'); // { value: 1, done: false } // 首次调用 next 的参数被忽略
it.next('for a'); // { value: 2, done: false }
it.next('for b'); // { value: 3, done: false }
it.next('for c'); // { value: 3, done: true } 产出函数的 return 值

function* read() {
  const nextPath = yield fs.readFile('./02.files/file-1.txt', 'utf8');
  const name = yield fs.readFile(`./02.files/${nextPath}`, 'utf8');
  const res = yield { name };
  return res;
}

// 未使用 co
const readIt = read();
readIt.next().value.then(data => {
  readIt.next(data).value.then(data => {
    const res = readIt.next(data);
    console.log(res.value); // { name: 'IEUNJI' }
  });
});

function co(it) {
  return new Promise((resolve, reject) => {
    function next(data) {
      const { value, done } = it.next(data);
      if (!done) {
        Promise.resolve(value).then(data => {
          next(data);
        }, reject);
      } else {
        resolve(value);
      }
    }
    next();
  });
}

// 使用 co
co(read()).then(data => {
  console.log(data); // { name: 'IEUNJI' }
});

// 使用 async await
async function readName() {
  const nextPath = await fs.readFile('./02.files/file-1.txt', 'utf8');
  const name = await fs.readFile(`./02.files/${nextPath}`, 'utf8');
  const res = await { name };
  return res;
}

readName().then(data => {
  console.log(data); // { name: 'IEUNJI' }
});
