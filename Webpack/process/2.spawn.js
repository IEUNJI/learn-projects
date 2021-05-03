const path = require('path');
const { spawn } = require('child_process');

const cp = spawn('node', ['test.js'], {
  cwd: path.resolve(__dirname),
  // stdio: 'ignore', // 默认值 忽略子进程的输入输出

  // stdio: [process.stdin, process.stdout, process.stderr], // 可以简写为数字和 inherit
  // stdio: [0, 1, 2],
  // stdio: 'inherit',

  stdio: 'pipe', // 通过管道的方式通信
});

cp.stdout.on('data', chunk => {
  console.log(chunk);
});

cp.on('error', error => {
  console.log('cp error: ', error);
});

cp.on('close', () => {
  console.log('cp close');
});

cp.on('exit', () => {
  console.log('cp exit');
});
