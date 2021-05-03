// const express = require('express');
const express = require('./my-express');

const app = express();

app.use('/', (req, res, next) => {
  console.log('middle /');
  // 将错误信息传给 next
  next('middle / error');
});

app.use('/u', (req, res, next) => {
  console.log('middle /u');
  next();
});

app.use('/user', (req, res, next) => {
  console.log('middle /user');
  next();
});

app.get('/user/add', (req, res, next) => {
  res.end('/user/add');
});

// 错误处理中间件
app.use((err, req, res, next) => {
  res.end(`Catch Error: ${err}`);
});

app.listen(3000);
