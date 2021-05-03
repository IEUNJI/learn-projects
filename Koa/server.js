// const Koa = require('koa');
const Koa = require('./my-koa');

const app = new Koa();

app.use(async (ctx, next) => {
  ctx.body = 'hello koa';
});

app.listen(3000);
