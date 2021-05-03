import './es5-class';
import './es6-class';
import './decorator';
import './reduce';

// a 为模块 export default 的值
// b, c 为模块 export 的接口
import a, { b, c, y } from './x';

// moduleA 为模块对象
import * as moduleA from './x';

console.log(a, b, c, y);

console.log(moduleA);

const btn = document.createElement('button');
btn.innerText = 'btn';

btn.addEventListener('click', async () => {
  const module = await import('./x');
  console.log(module);
});

document.body.append(btn);
