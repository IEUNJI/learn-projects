const crypto = require('crypto');

// md5 摘要算法
// const r = crypto.createHash('md5').update('123456').digest('base64');
// console.log(r); // 4QrcOUm6Wau+VuBX8g+IPg==

// sha1 sha256 加盐算法
const r = crypto.createHmac('sha1', 'ieunji').update('123456').digest('base64');
console.log(r); // pwKufEQcfLFxW/T+cL386wD617Q=
