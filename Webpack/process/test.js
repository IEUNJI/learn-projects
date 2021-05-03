let sum = 0;

for (let i = 0; i < 1000000000; i++) {
  sum += i;
}

console.log(sum);
process.stdout.write(String(sum));
process.send(sum);

process.on('message', chunk => {
  console.log('收到', chunk, process.pid);
  process.exit();
});
