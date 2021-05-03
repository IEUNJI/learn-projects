const EventEmitter = require('./events');
const util = require('util');

function Girl() {

}

util.inherits(Girl, EventEmitter);

const girl = new Girl();

// girl.on('newListener', type => {
//   if (type === '女生失恋') {
//     process.nextTick(() => {
//       girl.emit(type, '我');
//     });
//   }
// });

const listener1 = who => {
  console.log(who + '哭');
};
const listener2 = who => {
  console.log(who + '逛街');
};

girl.once('女生失恋', listener1);
girl.off('女生失恋', listener1);
girl.once('女生失恋', listener2);

girl.emit('女生失恋', '我');
