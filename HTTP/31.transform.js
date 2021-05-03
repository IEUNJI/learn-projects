const fs = require('fs');
const zlib = require('zlib');

fs.createReadStream('./1.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('./1.txt.gz'));
