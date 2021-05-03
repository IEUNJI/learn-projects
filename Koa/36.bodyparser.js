const fs = require('fs');
const path = require('path');

const Koa = require('koa');
const uuid = require('uuid');

// const bodyparser = require('koa-bodyparser');

const app = new Koa();

Buffer.prototype.split = function (sep) {
  const result = [];
  const len = Buffer.from(sep).length;
  let offset = 0;
  let current;

  while ((current = this.indexOf(sep, offset)) !== -1) {
    result.push(this.slice(offset, current));
    offset = current + len;
  }
  result.push(this.slice(offset));

  return result;
};

const bodyparser = () => async (ctx, next) => {
  await new Promise((resolve, reject) => {
    const chunkArr = [];
    ctx.req.on('data', chunk => {
      chunkArr.push(chunk);
    });
    ctx.req.on('end', () => {
      const type = ctx.get('Content-Type');
      if (type.includes('multipart/form-data')) {
        const buffer = Buffer.concat(chunkArr);
        const boundary = `--${type.split('=')[1]}`;
        const lines = buffer.split(boundary).slice(1, -1);
        const result = {};
        lines.forEach(line => {
          let [head, content] = line.split('\r\n\r\n');
          head = head.toString();
          const key = head.match(/name="(.+?)"/)[1];
          if (head.includes('filename')) {
            const filename = uuid.v4();
            fs.writeFileSync(path.resolve(__dirname, '36.upload', filename), content.slice(0, -2), 'utf8');
            result[key] = filename;
          } else {
            result[key] = content.slice(0, -2).toString();
          }
        });
        ctx.request.body = result;
        resolve();
      } else {
        resolve();
      }
    });
  });
  await next();
};

app.use(bodyparser());

app.use(async (ctx, next) => {
  if (ctx.path === '/form' && ctx.method === 'GET') {
    // 作为文件下载的响应头，可以指定文件名
    // ctx.set('Content-Disposition', 'attachment;filename=xxx.html');
    ctx.set('Content-Type', 'text/html;charset=utf-8');
    ctx.body = fs.createReadStream(path.resolve(__dirname, '36.form.html'));
  } else {
    await next();
  }
});

app.use(async (ctx, next) => {
  if (ctx.path === '/login' && ctx.method === 'POST') {
    ctx.body = ctx.request.body;
  } else {
    await next();
  }
});

app.listen(3000);
