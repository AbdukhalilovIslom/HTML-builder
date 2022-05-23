const fs = require('fs');
const path = require('path');
const dest = path.join(__dirname, 'secret-folder');

fs.readdir(dest, 
  { withFileTypes: true },
  (err, files) => {
    if (err)
      console.log(err);
    else {
      files.forEach(file => {
        if (file.isFile()) {
          const filePath = path.join(dest, file.name);
          const parsedFilePath = path.parse(filePath);
          fs.stat(filePath, (err, stats) => {
            if (err) throw err;
            console.log(parsedFilePath.name + ' - ' + parsedFilePath.ext.slice(1) + ' - ' + stats.size + 'bytes');
          });
        }
      });
    }
  });
