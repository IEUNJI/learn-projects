const http = require('http');
const path = require('path');
const { fork, execFile, exec } = require('child_process');

// spawn 基于 pipe 可以读取大文件
// fork 可以使用 ipc 通信
// execFile 基于 node 执行命令
// exec 基于 shell 执行命令

execFile('node', ['--version'], (err, stdout, stderr) => {
  console.log(stdout); // v10.18.1
});

exec('start https://www.baidu.com/', (err, stdout, stderr) => {
  console.log(stdout);
});

http.createServer((req, res) => {
  if (req.url === '/sum') {
    const cp = fork('sum.js', {
      cwd: path.resolve(__dirname)
    });

    cp.on('message', chunk => {
      res.end(`sum: ${chunk.toString()}`);
    });
  } else {
    res.end('end ok');
  }
}).listen(3000);
