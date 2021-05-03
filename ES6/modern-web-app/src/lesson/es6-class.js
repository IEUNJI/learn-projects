// https://v8.dev/features/class-fields

class Animal {
  insProp = 'insProp' // 实例属性
  insPropThis = this.insProp + 'This' // this 为实例
  insFunc = () => { // 实例方法
    console.log('insFunc', this); // this 为实例
  }

  #privInsProp = 'privInsProp' // 私有实例属性
  #privInsFunc = () => { // 私有实例方法
    console.log('privInsFunc');
  }
  getPrivInsPropFunc = () => {
    console.log(this.#privInsProp); // 仅可在内部使用
    this.#privInsFunc();
  }

  get protoProp() { // 原型属性
    return 'protoProp';
  }
  protoFunc() { // 原型方法
    console.log('protoFunc');
  }

  static clsProp = 'clsProp' // 类属性
  static get clsPropGetter() { // 类属性
    return 'clsPropGetter';
  }
  static clsFunc() { // 类方法
    console.log('clsFunc');
  }
  static clsArrowFunc = () => { // 类方法
    console.log('claArrowFunc', this); // this 为类
  }

  static #privClsProp = 'privClsProp' // 私有类属性
  static #privClsArrowFunc = () => { // 私有类方法
    console.log('privClsArrowFunc');
  }
  static getPrivClsPropFunc = () => {
    console.log(this.#privClsProp); // 仅可在内部使用
    this.#privClsArrowFunc();
  }
}

const animal = new Animal();
console.log(animal);
console.dir(Animal);
animal.getPrivInsPropFunc();
Animal.getPrivClsPropFunc();
