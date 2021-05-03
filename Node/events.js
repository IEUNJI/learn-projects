function EventEmitter() {
  this._events = Object.create(null);
}

EventEmitter.prototype.on = function (eventName, callback) {
  if (!this._events) {
    // 继承的实例不存在 _events
    this._events = Object.create(null);
  }

  if (eventName !== 'newListener') {
    // 监听 on 事件
    this.emit('newListener', eventName);
  }


  if (!this._events[eventName]) {
    this._events[eventName] = [callback];
  } else {
    this._events[eventName].push(callback);
  }
};

EventEmitter.prototype.once = function (eventName, callback) {
  // 包装函数
  const one = (...args) => {
    callback(...args);
    this.off(eventName, one); // 执行后移除
  };
  one.l = callback; // 将包装函数与原函数建立关系

  this.on(eventName, one);
};

EventEmitter.prototype.off = function (eventName, callback) {
  if (this._events[eventName]) {
    this._events[eventName] = this._events[eventName].filter(fn => {
      // 包装函数与原函数都要过滤
      return fn !== callback && fn.l !== callback;
    });
  }
};

EventEmitter.prototype.emit = function (eventName, ...args) {
  if (this._events[eventName]) {
    this._events[eventName].forEach(fn => fn(...args));
  }
};

module.exports = EventEmitter;
