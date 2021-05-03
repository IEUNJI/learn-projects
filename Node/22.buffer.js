// 声明方式

// const buf = Buffer.alloc(5);
// console.log(buf); // <Buffer 00 00 00 00 00>

// const buf = Buffer.allocUnsafe(5);
// console.log(buf); // <Buffer 80 32 19 5c 44>

// buf.fill(0);
// console.log(buf); // <Buffer 00 00 00 00 00>

// const buf = Buffer.from([1, 2, 3, 4, 5]);
// console.log(buf); // <Buffer 01 02 03 04 05>

// const buf = Buffer.from('hello');
// console.log(buf); // <Buffer 68 65 6c 6c 6f>

// 常见方法

// slice

// Buffer.isBuffer

// copy

// Buffer.prototype.copy = function (targetBuffer, targetStart, sourceStart = 0, sourceEnd = this.length) {
//   for (let i = 0; i < sourceEnd - sourceStart; i++) {
//     targetBuffer[targetStart + i] = this[sourceStart + i];
//   }
// };

// const buf1 = Buffer.from('he');
// const buf2 = Buffer.from('llo');
// const buf3 = Buffer.alloc(5);

// buf1.copy(buf3, 0, 0, 2);
// buf2.copy(buf3, 2, 0, 3);

// console.log(buf3.toString()); // 'hello'

// Buffer.concat

// Buffer.concat = function (list, length = list.reduce((a, b) => a + b.length, 0)) {
//   const buffer = Buffer.alloc(length);
//   let offset = 0;
//   list.forEach(b => {
//     b.copy(buffer, offset);
//     offset += b.length;
//   });
//   return buffer;
// };

// const buf1 = Buffer.from('he');
// const buf2 = Buffer.from('llo');

// const buf3 = Buffer.concat([buf1, buf2]);
// console.log(buf3.toString()); // 'hello'

// 扩展方法

// Buffer.prototype.split = function (sep) {
//   const result = [];
//   const len = Buffer.from(sep).length;
//   let offset = 0;
//   let current;

//   while ((current = this.indexOf(sep, offset)) !== -1) {
//     result.push(this.slice(offset, current));
//     offset = current + len;
//   }
//   result.push(this.slice(offset));

//   return result;
// };
