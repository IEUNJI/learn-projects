function Animal5() {
  this.type = '动物';
}

Animal5.prototype.say = function () {
  console.log('我是动物');
};

Animal5.sleep = function () {
  console.log('动物睡觉');
};

function Tiger5() {
  // 继承实例属性
  Animal5.call(this);
  this.name = '老虎';
}

// 继承原型方法
Tiger5.prototype = Object.create(Animal5.prototype, {
  constructor: {
    configurable: true,
    enumerable: false,
    value: Tiger5,
    writable: true
  }
});

Tiger5.prototype.eat = function () {
  console.log('老虎吃饭');
};

Tiger5.drink = function () {
  console.log('老虎喝水');
};

// 继承类静态方法
Reflect.setPrototypeOf(Tiger5, Animal5);

const newTiger5 = new Tiger5();
console.log(newTiger5);
console.dir(Tiger5);

class Animal {
  constructor() {
    this.type = '动物';
  }

  say() {
    console.log('我是动物');
  }

  static sleep() {
    console.log('动物睡觉');
  }
}

class Tiger extends Animal {
  constructor() {
    super();
    this.name = '老虎';
  }

  eat() {
    console.log('老虎吃饭');
  }

  static drink() {
    console.log('老虎喝水');
  }
}

const newTiger = new Tiger();
console.log(newTiger);
console.dir(Tiger);
