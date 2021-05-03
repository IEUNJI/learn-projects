const fs = require('fs');

const ReadStream = require('./ReadStream');

// const rs = new ReadStream('./package.json', {
//   highWaterMark: 10
// });
const rs = fs.createReadStream('./package.json', {
  highWaterMark: 10
});

const bufferArr = [];

rs.on('open', fd => {
  console.log('open', fd);
});

rs.on('data', data => {
  console.log('data', data);
  bufferArr.push(data);
});

rs.on('end', () => {
  console.log('end');
  console.log(Buffer.concat(bufferArr).toString());
});

rs.on('close', () => {
  console.log('close');
});
