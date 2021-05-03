const fs = require('fs');

setTimeout(() => {
  console.log('timeout');
}, 0);

setImmediate(() => {
  console.log('immediate');
});

fs.readFile('./package.json', 'utf8', () => {
  setTimeout(() => {
    console.log('fs timeout');
  }, 0);
  
  setImmediate(() => {
    console.log('fs immediate');
  });
});
