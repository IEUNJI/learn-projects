class MyArray {
  static [Symbol.hasInstance](instance) {
    return Array.isArray(instance);
  }
}

console.log([] instanceof MyArray); // true

const obj = {
  [Symbol.toPrimitive](hint) {
    switch (hint) {
      case 'default':
        return 'default';
      case 'string':
        return 'obj';
      case 'number':
        return 100;
    }
  }
};

console.log(obj + ''); // 'default'
console.log(`${obj}`); // 'obj'
console.log(obj - 10); // 90

const ieunji = {
  name: 'ieunji',
  age: 18,
  get [Symbol.toStringTag]() {
    return 'IEUNJI';
  }
};

const type = Object.prototype.toString.call(ieunji);
console.log(type); // '[object IEUNJI]'

class MyArray extends Array {
  constructor(...args) {
    super(...args);
    this.flag = 'MyArray';
  }
  static get [Symbol.species]() {
    return Array;
  }
}

const arr1 = new MyArray(1, 2, 3);
console.log(arr1); // MyArray [1, 2, 3, flag: 'MyArray']
const arr2 = arr1.map(i => i);
console.log(arr2); // Array [1, 2, 3]

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// concat 展开
const newArr1 = arr1.concat(arr2);
console.log(newArr1); // [1, 2, 3, 4, 5, 6]

// concat 不展开
arr2[Symbol.isConcatSpreadable] = false;
const newArr2 = arr1.concat(arr2);
console.log(newArr2); // [1, 2, 3, [4, 5, 6]]
