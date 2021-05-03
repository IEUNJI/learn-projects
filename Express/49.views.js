const express = require('express');

const app = express();

app.set('views', 'html'); // 模板路径：views 目录 => html 目录
app.set('view engine', '.html'); // 模板扩展名： .html
app.engine('.html', require('ejs').__express); // .html 模板使用的渲染引擎

app.get('/', (req, res) => {
  // res.render 方法使用模板引擎
  res.render('index', { name: 'ieunji' });
});

app.listen(3000);
