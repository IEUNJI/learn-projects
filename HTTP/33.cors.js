const http = require('http');

http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin); // 允许所有的域
  res.setHeader('Access-Control-Allow-Headers', 'token'); // 允许的自定义请求头
  res.setHeader('Access-Control-Allow-Methods', 'DELETE'); // 允许的复杂请求类型
  res.setHeader('Access-Control-Allow-Credentials', true); // 允许携带 cookie
  res.setHeader('Access-Control-Max-Age', '10'); // OPTIONS 预请求的间隔，单位 s

  if (req.method === 'OPTIONS') {
    return res.end();
  }

  if (req.url === '/api') {
    res.setHeader('Set-Cookie', 'name=ieunji');
    res.end(JSON.stringify({
      name: 'ieunji'
    }));
  }
}).listen(3000);
