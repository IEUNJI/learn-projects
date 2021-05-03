const people = {
  name: 'IEUNJI',
  age: 18,
  fruits: ['apple', 'banana'],
  address: {
    province: 'JiLin',
    city: 'TongHua'
  },
  fn() {},
  reg: /\d+/,
  undef: undefined
};
people.rawObj = people; // 循环引用

const deepClone = (value, hash = new WeakMap()) => {
  if (value == null) return value; // 排除 null, undefined
  if (typeof value !== 'object') return value; // 排除 String, Number, Boolean, Function
  if (value instanceof RegExp) return new RegExp(value); // 拷贝 RegExp
  if (value instanceof Date) return new Date(value); // 拷贝 Date
  if (hash.has(value)) return hash.get(value);
  const instance = new value.constructor;
  hash.set(value, instance);
  for (let key in value) {
    if (value.hasOwnProperty(key)) {
      instance[key] = deepClone(value[key], hash);
    }
  }
  return instance;
};

const res = deepClone(people);

console.log(res.fruits === people.fruits);
console.log(res.address === people.address);
console.log(res.rawObj === res);
console.log(res);
