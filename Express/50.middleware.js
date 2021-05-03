const express = require('express');
const multer = require('multer');

const app = express();

// 存放目录
const upload = multer({ dest: 'uploads/' });

app.use(express.static(__dirname));

// 单文件上传
app.post('/profile', upload.single('avatar'), (req, res, next) => {
  console.log(req.file);
  res.send(req.file);
});

// 多文件上传
app.post('/profiles', upload.array('avatar'), (req, res, next) => {
  console.log(req.files);
  res.send(req.files);
});

app.listen(3000);
