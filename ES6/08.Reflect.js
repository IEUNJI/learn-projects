// Reflect.set(obj, 'key', 'value') // obj.key = value
// Reflect.get(obj, 'key') // obj.key
// Reflect.has(obj, 'key') // 'key' in obj
// Reflect.deleteProperty(obj, 'key') // delete obj.key

// Reflect.setPrototypeOf(obj, proto) // obj.__proto__ = proto
// Reflect.getPrototypeOf(obj) // obj.__proto__

// Reflect.defineProperty() // 定义属性
// Reflect.getOwnPropertyDescriptor(obj, 'key') // 获取属性描述符

// Object.preventExtensions() // 不可扩展（不能增）
// Object.isExtensible() // 扩展检测
// Reflect.preventExtensions()
// Reflect.isExtensible()
// Object.seal() // 密封（不能增删）
// Object.isSealed() // 密封检测
// Object.freeze() // 冻结（不能增删改）
// Object.isFrozen() // 冻结检测

// Object.keys() // 可枚举
// Object.getOwnPropertyNames() // 可枚举 + 不可枚举
// Reflect.ownKeys() // 可枚举 + 不可枚举 + Symbol

// Reflect.apply(target, thisArgument, argumentsList) // 函数调用
// Reflect.construct(target, argumentsList) // 类调用
