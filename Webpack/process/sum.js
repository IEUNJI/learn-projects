let sum = 0;

for (let i = 0; i < 6000000000; i++) {
  sum += i;
}

process.send(sum);
