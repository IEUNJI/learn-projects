const http = require('http');
const qs = require('querystring');
const crypto = require('crypto');

const sign = value => {
  return crypto.createHmac('sha1', 'ieunji').update(value).digest('base64').replace(/\/|\+|\=/g, '');
};

http.createServer((req, res) => {
  const cookies = [];
  res.setCookie = (key, value, options = {}) => {
    const opts = [];
    if (options.domain) {
      opts.push(`domain=${options.domain}`);
    }
    if (options.path) {
      opts.push(`path=${options.path}`);
    }
    if (options.maxAge) {
      opts.push(`max-age=${options.maxAge}`);
    }
    if (options.httpOnly) {
      opts.push(`httpOnly=${options.httpOnly}`);
    }
    if (options.signed) {
      value = `${value}.${sign(value)}`;
    }
    cookies.push(`${key}=${value}; ${opts.join('; ')}`);
    res.setHeader('Set-Cookie', cookies);
  };
  req.getCookie = (key, options = {}) => {
    const cookieObj = qs.parse(req.headers.cookie, '; ');
    if (options.signed) {
      const [value, signStr] = cookieObj[key].split('.');
      if (signStr === sign(value)) {
        return value;
      }
      return;
    }
    return cookieObj[key];
  };

  if (req.url === '/write') {
    res.setCookie('username', 'ieunji', { httpOnly: true, signed: true });
    res.setCookie('uid', '123456', { httpOnly: true });
    res.end('write ok');
    return;
  }

  if (req.url === '/read') {
    res.end(req.getCookie('username', { signed: true }));
    return;
  }
}).listen(3000);
