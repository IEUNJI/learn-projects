const path = require('path');
const { spawn } = require('child_process');

const cp = spawn('node', ['test2.js'], {
  cwd: path.resolve(__dirname),
  stdio: 'ignore',
  detached: true
});

console.log(cp.pid);

cp.unref();

cp.on('error', error => {
  console.log('cp error: ', error);
});

cp.on('close', () => {
  console.log('cp close');
});

cp.on('exit', () => {
  console.log('cp exit');
});
