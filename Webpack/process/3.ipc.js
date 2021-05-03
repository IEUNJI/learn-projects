const path = require('path');
const { spawn } = require('child_process');

const cp = spawn('node', ['test.js'], {
  cwd: path.resolve(__dirname),
  stdio: [0, 1, 2, 'ipc'] // 可以通过 message send 通信
});

cp.send('我是主进程');

cp.on('message', chunk => {
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
