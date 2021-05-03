const http = require('http');
const url = require('url');
const querystring = require('querystring');

let port = 3000;

const server = http.createServer();

server.on('request', (req, res) => {
  // 请求行
  console.log(req.method); // 请求方法
  const { pathname, query } = url.parse(req.url, true);
  console.log(pathname); // 资源路径
  console.log(query); // 查询参数
  console.log(req.httpVersion); // 协议版本

  // 请求头
  console.log(req.headers);

  // 请求体（可读流）
  const reqArr = [];
  req.on('data', chunk => {
    reqArr.push(chunk);
  });
  req.on('end', () => {
    console.log(Buffer.concat(reqArr).toString());

    // 响应行
    res.statusCode = 200; // 响应状态码

    // 响应头
    res.setHeader('Content-Type', 'text/plain;charset=utf-8');

    // 响应体（可写流）
    const content = Buffer.concat(reqArr).toString();
    const contentType = req.headers['content-type'];
    if (contentType === 'application/json') {
      console.log(JSON.parse(content));
    } else if (contentType === 'application/x-www-form-urlencoded') {
      console.log(querystring.parse(content));
    }
    res.end(`${contentType} ${content}`);
  });
});

server.listen(port, () => {
  console.log(`server start ${port}`);
});

server.on('error', err => {
  if (err.errno === 'EADDRINUSE') {
    server.listen(++port);
  }
});
