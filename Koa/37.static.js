const fs = require('fs');
const { stat, access } = fs.promises;
const path = require('path');

const Koa = require('koa');
// const static = require('koa-static');
const mime = require('mime');

const app = new Koa();

const static = dirname => async (ctx, next) => {
  let filePath = path.join(dirname, ctx.path);
  try {
    const stats = await stat(filePath);
    if (stats.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
      await access(filePath);
    }
    ctx.set('Content-Type', `${mime.getType(filePath)};charset=utf-8`);
    ctx.body = fs.createReadStream(filePath);
  } catch (e) {
    await next();
  }
};

app.use(static(path.resolve(__dirname, '36.upload')));

app.listen(3000);
