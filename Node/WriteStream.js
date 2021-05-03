const fs = require('fs');
const EventEmitter = require('events');

class WriteStream extends EventEmitter {
  constructor(path, options = {}) {
    super();
    this.path = path;
    this.flags = options.flags || 'w';
    this.encoding = options.encoding || 'utf8';
    this.mode = options.mode || 0o666;
    this.start = options.start || 0;
    this.highWaterMark = options.highWaterMark || 16 * 1024;

    this.cache = [];
    this.writing = false;
    this.len = 0;
    this.needDrain = false;
    this.offset = this.start;

    this.open();
  }

  open() {
    fs.open(this.path, this.flags, (err, fd) => {
      this.fd = fd;
      this.emit('open', this.fd);
    });
  }

  write(chunk, encoding = this.encoding, callback) {
    chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    this.len += chunk.length;
    const flag = this.len < this.highWaterMark;
    this.needDrain = !flag;
    if (this.writing) {
      this.cache.push({
        chunk,
        encoding,
        callback
      });
    } else {
      this.writing = true;
      this._write(chunk, encoding, () => {
        callback && callback();
        this.clearBuffer();
      });
    }
    return flag;
  }

  clearBuffer() {
    const obj = this.cache.shift();
    if (obj) {
      this._write(obj.chunk, obj.encoding, () => {
        obj.callback && obj.callback();
        this.clearBuffer();
      });
    } else {
      if (this.needDrain) {
        this.needDrain = false;
        this.writing = false;
        this.emit('drain');
      }
    }
  }

  _write(chunk, encoding, clearBuffer) {
    if (typeof this.fd !== 'number') {
      this.once('open', () => {
        this._write(chunk, encoding, clearBuffer);
      });
      return;
    }
    fs.write(this.fd, chunk, 0, chunk.length, this.offset, (err, written) => {
      this.offset += written;
      this.len -= written;
      clearBuffer();
    });
  }

  close() {
    fs.close(this.fd, () => {
      this.emit('close');
    });
  }

  end(chunk, encoding) {
    if (typeof chunk !== 'undefined') {
      chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
      this.write(chunk, encoding, () => {
        this.close();
      });
      return;
    }
    this.close();
  }
}

module.exports = WriteStream;
