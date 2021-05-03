const fs = require('fs');

setInterval(() => {
  fs.appendFileSync('1.txt', 'ieunji ');
}, 1000);
