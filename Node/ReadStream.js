const fs = require('fs');
const EventEmitter = require('events');

class ReadStream extends EventEmitter {
  constructor(path, options = {}) {
    super();
    this.path = path;
    this.flags = options.flags || 'r';
    this.encoding = options.encoding || null;
    this.mode = options.mode || 0o666;
    this.autoClose = options.autoClose || true;
    this.start = options.start || 0;
    this.end = options.end;
    this.highWaterMark = options.highWaterMark || 64 * 1024;

    this.flowing = null;
    this.offset = 0;

    this.open();
    this.on('newListener', type => {
      if (type === 'data') {
        this.flowing = true;
        this.read();
      }
    });
  }

  read() {
    if (typeof this.fd !== 'number') {
      this.once('open', this.read);
      return;
    }
    const howMuchToRead = this.end ? Math.min(this.highWaterMark, this.end - this.start + 1 - this.offset) : this.highWaterMark;
    const buffer = Buffer.alloc(howMuchToRead);
    fs.read(this.fd, buffer, 0, howMuchToRead, this.offset, (err, bytesRead) => {
      this.offset += bytesRead;
      if (bytesRead > 0) {
        this.emit('data', buffer.slice(0, bytesRead));
        this.flowing && this.read();
      } else {
        this.emit('end');
        this.close();
      }
    });
  }

  close() {
    if (this.autoClose) {
      fs.close(this.fd, () => {
        this.emit('close');
      });
    }
  }

  open() {
    fs.open(this.path, this.flags, (err, fd) => {
      this.fd = fd;
      this.emit('open', this.fd);
    });
  }

  pause() {
    this.flowing = null;
  }

  resume() {
    this.flowing = true;
    this.read();
  }

  pipe(ws) {
    this.on('data', chunk => {
      const flag = ws.write(chunk);
      if (!flag) {
        this.pause();
      }
    });
    ws.on('drain', () => {
      this.resume();
    });
  }
}

module.exports = ReadStream;
