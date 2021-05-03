const http = require('http');

const config = {
  method: 'POST',
  hostname: 'localhost',
  port: 3000,
  headers: {
    'Content-Type': 'application/json',
    // 'Content-Type': 'application/x-www-form-urlencoded'
  }
};

const client = http.request(config, res => {
  res.on('data', chunk => {
    console.log(chunk.toString());
  });
});

const jsonStr = '{"a": "json"}';
const queryStr = 'a=query';

client.end(jsonStr);
// client.end(queryStr);
