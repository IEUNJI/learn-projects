const fs = require('fs');
const WriteStream = require('./WriteStream');

// const ws = fs.createWriteStream('./num.txt', {
const ws = new WriteStream('./num.txt', {
  highWaterMark: 3
});

let index = 0;

const write = () => {
  let flag = true;
  while (index < 10 && flag) {
    flag = ws.write(String(index));
    console.log(flag);
    index++;
  }
  if (index === 10) {
    ws.end();
  }
};

write();

ws.on('drain', () => {
  console.log('缓冲区清空');
  write();
});

ws.on('close', () => {
  console.log('文件关闭');
});
