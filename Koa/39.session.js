const http = require('http');
const qs = require('querystring');
const crypto = require('crypto');
const uuid = require('uuid');

const sign = value => {
  return crypto.createHmac('sha1', 'ieunji').update(value).digest('base64').replace(/\/|\+|\=/g, '');
};

const session = {};
const cardName = 'connect.sid';

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

  if (req.url === '/visit') {
    let cardId = req.getCookie(cardName);

    if (cardId && session[cardId]) {
      session[cardId].money -= 10;
    } else {
      cardId = uuid.v4();
      session[cardId] = { money: 500 };
      res.setCookie(cardName, cardId);
    }

    res.end(`money ${session[cardId].money}`);
  }

  res.end('Not Found');
}).listen(3000);
