const fs = require('fs');
const path = require('path');
const pathToBundle = path.join(__dirname, 'project-dist', 'bundle.css');
const pathToStyles = path.join(__dirname, 'styles');
const writeStream = fs.createWriteStream(pathToBundle);



fs.readdir(pathToStyles, { withFileTypes: true }, (err, files) => {
  if (err) {
    throw err;
  }
  else {
    files.forEach(file => {
      const filepath = path.join(pathToStyles, file.name);
      const parsedFilepath = path.parse(filepath);
      if (file.isFile() && parsedFilepath.ext === '.css') {
        const readStream = fs.createReadStream(filepath);
        readStream.pipe(writeStream);
      }
    }); 
  }
});
