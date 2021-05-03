const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer();

const targetMap = {
  'a.linzijun.com': 'http://localhost:3001',
  'b.linzijun.com': 'http://localhost:3002'
};

http.createServer((req, res) => {
  const key = req.headers.host.split(':')[0];
  proxy.web(req, res, {
    target: targetMap[key]
  });
}).listen(3000);
