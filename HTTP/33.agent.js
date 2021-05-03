const http = require('http');

http.createServer((req, res) => {
  const userAgent = req.headers['user-agent'];

  if (userAgent.includes('iPhone')) {
    res.statusCode = 302;
    res.setHeader('Location', 'https://www.bilibili.com/');
    res.end();
  } else {
    res.statusCode = 302;
    res.setHeader('Location', 'https://www.hupu.com/');
    res.end();
  }
}).listen(3000);
