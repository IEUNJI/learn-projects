const program = require('commander');
const chalk = require('chalk');

program.version('0.0.1');

// 选项
program
  .option('-E, --env <mode>', '指定构建模式')
  .option('-P, --port <id>', '指定端口号');

// 命令
program
  .command('start')
  .description('启动项目')
  .action(() => {
    console.log(`成功启动项目，端口：${program.port}`);
  });

program
  .command('build')
  .description('构建项目')
  .action(() => {
    console.log(`成功构建项目，模式：${program.env}`);
  });

// 监听
program.on('--help', () => {
  console.log('');
  console.log('Examples:');
  console.log(`  This is ${chalk.red('red')}`);
  console.log(`  This is ${chalk.green('green')}`);
  console.log(`  This is ${chalk.yellow('yellow')}`);
});

program.parse(process.argv);
