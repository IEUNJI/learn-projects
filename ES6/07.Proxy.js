const obj = {
  a: 'a',
  b: 'b',
  c: {
    raw: {
      val: 'c'
    }
  }
};

const handler = {
  get(target, property, receiver) {
    console.log('get', property);
    const value = Reflect.get(...arguments);
    if (typeof value === 'object' && value !== null) {
      return new Proxy(value, handler);
    }
    return value;
  },
  set(target, property, value, receiver) {
    console.log('set', property, value);
    return Reflect.set(...arguments);
  }
};

const p = new Proxy(obj, handler);

p.c.raw.val = 'd';

/**
 * get c
 * get raw
 * set val d
 */
