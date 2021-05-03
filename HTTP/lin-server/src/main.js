import program from 'commander';
import Server from './server';

program
  .option('-p, --port <val>', 'set http server port')
  .parse(process.argv);

const config = {
  port: 8080
};

Object.assign(config, program);

const server = new Server(config);
server.start();
