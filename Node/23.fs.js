const fs = require('fs');
const path = require('path');

// const size = 5;
// const buffer = Buffer.alloc(size);
// fs.open(path.resolve(__dirname, '23.note.md'), 'r', (err, rfd) => {
//   fs.open(path.resolve(__dirname, '23.note-copy.md'), 'w', (err, wfd) => {
//     let readOffset = 0;
//     let writeOffset = 0;
//     const next = () => {
//       fs.read(rfd, buffer, 0, size, readOffset, (err, bytesRead) => {
//         if (bytesRead === 0) {
//           fs.close(rfd, () => { });
//           fs.close(wfd, () => { });
//           return;
//         }
//         fs.write(wfd, buffer, 0, bytesRead, writeOffset, err => {
//           readOffset += bytesRead;
//           writeOffset += bytesRead;
//           next();
//         });
//       });
//     };
//     next();
//   });
// });

const mkdirDeep = (paths, callback) => {
  paths = paths.split('/');
  let index = 0;
  const next = () => {
    if (index === paths.length) return callback();
    const dirPath = paths.slice(0, ++index).join('/');
    fs.access(dirPath, err => {
      if (err) {
        fs.mkdir(dirPath, next);
      } else {
        next();
      }
    });
  };
  next();
};

const preSeriesDeep = (dir, callback) => {
  fs.stat(dir, (err, stats) => {
    if (stats.isFile()) {
      fs.unlink(dir, callback);
    } else {
      fs.readdir(dir, (err, dirs) => {
        dirs = dirs.map(item => path.join(dir, item));
        let index = 0;
        const next = () => {
          if (index === dirs.length) {
            fs.rmdir(dir, callback);
            return;
          }
          const currentPath = dirs[index++];
          preDeep(currentPath, next);
        };
        next();
      });
    }
  });
};

const preParallelDeep = (dir, callback) => {
  fs.stat(dir, (err, stats) => {
    if (stats.isFile()) {
      fs.unlink(dir, callback);
    } else {
      fs.readdir(dir, (err, dirs) => {
        dirs = dirs.map(item => path.join(dir, item));
        if (dirs.length === 0) {
          fs.rmdir(dir, callback);
          return;
        }
        let index = 0;
        const done = () => {
          if (++index === dirs.length) {
            fs.rmdir(dir, callback);
          }
        };
        dirs.forEach(dir => {
          preParallelDeep(dir, done);
        });
      });
    }
  });
};

const preParallelDeep = dir => {
  return new Promise((resolve, reject) => {
    fs.stat(dir, (err, stats) => {
      if (stats.isFile()) {
        fs.unlink(dir, resolve);
      } else {
        fs.readdir(dir, (err, dirs) => {
          dirs = dirs.map(item => preParallelDeep(path.join(dir, item)));
          Promise.all(dirs).then(() => {
            fs.rmdir(dir, resolve);
          });
        });
      }
    });
  });
};

const { stat, unlink, readdir, rmdir } = require('fs').promises;
const path = require('path');

async function preParallelDeep(dir) {
  const stats = await stat(dir);
  if (stats.isFile()) {
    await unlink(dir);
  } else {
    let dirs = await readdir(dir);
    dirs = dirs.map(item => preParallelDeep(path.join(dir, item)));
    await Promise.all(dirs);
    await rmdir(dir);
  }
}
