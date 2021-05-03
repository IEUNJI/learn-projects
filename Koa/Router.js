class Router {
  constructor() {
    this.middlewares = [];
  }

  get(pathname, middleware) {
    this.middlewares.push({
      method: 'get',
      path: pathname,
      middleware
    });
  }

  routes() {
    return async (ctx, next) => {
      const method = ctx.method.toLowerCase();
      const path = ctx.path;
      const arr = this.middlewares.filter(middleware => {
        return middleware.method === method && middleware.path === path;
      });
      this.compose(arr, ctx, next);
    };
  }

  compose(arr, ctx, next) {
    const dispatch = index => {
      if (index === arr.length) return next();
      const middle = arr[index].middleware;
      Promise.resolve(middle(ctx, () => dispatch(index + 1)));
    };
    return dispatch(0);
  }
}

module.exports = Router;
