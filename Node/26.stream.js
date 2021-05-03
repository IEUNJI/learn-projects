const fs = require('fs');

const rs = fs.createReadStream('./package.json');
const ws = fs.createWriteStream('./package-copy.json');

rs.pipe(ws);

// rs.on('data', chunk => {
//   const flag = ws.write(chunk);
//   if (!flag) {
//     rs.pause();
//   }
// });

// ws.on('drain', () => {
//   console.log('缓冲区清空');
//   rs.resume();
// });

const { Readable, Writable } = require('stream');

class MyRead extends Readable {
  _read() {
    this.push('1');
    this.push(null);
  }
}

const mr = new MyRead();

mr.on('data', chunk => {
  console.log(chunk);
});

mr.on('end', () => {
  console.log('end');
});

class MyWrite extends Writable {
  _write(chunk, encoding, clearBuffer) {
    console.log(chunk);
    clearBuffer();
  }
}

const mw = new MyWrite();

mw.write('1');
mw.write('2');
