const express = require('express');

const app = express();

app.param('id', (req, res, next, value, key) => {
  next();
});

app.get('/user/:id', (req, res, next) => {
  const { id } = req.params;
  res.end(`${id}`);
});

app.listen(3000);
