const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();

const parentRouter = new Router();
const child1Router = new Router({ prefix: '/a' }); // 路由分层
const child2Router = new Router({ prefix: '/b' });

parentRouter.get('/', async (ctx, next) => {
  ctx.body = 'parent index';
  await next();
});

child1Router.get('/', async (ctx, next) => {
  ctx.body = 'child1 index';
  await next();
});

// 路径参数
child1Router.get('/detail/:id', async (ctx, next) => {
  ctx.body = `child1 detail ${ctx.params.id}`;
  await next();
});

child2Router.get('/', async (ctx, next) => {
  ctx.body = 'child2 index';
  await next();
});

child2Router.get('/list', async (ctx, next) => {
  ctx.body = 'child2 list';
  await next();
});

// 路由挂载
parentRouter.use(child1Router.routes());
parentRouter.use(child2Router.routes());
app.use(parentRouter.routes());

app.listen(3000);
