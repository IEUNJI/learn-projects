const obj = {
  _a: '',
  get a() {
    console.log('取值了');
    return this._a;
  },
  set a(value) {
    console.log('赋值了');
    this._a = value;
  }
};

Object.defineProperty(obj, 'b', {
  configurable: true,
  enumerable: true,
  // value: 'b',
  // writable: true,
  get() {
    return 'b';
  },
  set(value) {
    console.log(value);
  }
});

console.log(obj);
