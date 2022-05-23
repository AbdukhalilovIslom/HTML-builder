
const fs = require('fs');
const path = require('path');
const copiedPath = path.join(__dirname, 'files-copy');
const filesPath= path.join(__dirname,'files');

fs.mkdir(copiedPath,{recursive:true}, err => {
  if (err) console.log(err);
  console.log('folder created successfuly');
});

function copyDir(filesPath,copiedPath) {
  fs.readdir(filesPath, { withFileTypes: true }, (err,files)=> {
    if (err) {
      throw err;
    }
    else {
      files.forEach(file=> {
        if (file.isFile()) {
          fs.copyFile(path.join(filesPath, file.name), path.join(copiedPath, file.name), err => {
            if (err) throw err;
          }); 
        }
        else if (file.isDirectory()) {
          fs.mkdir(copiedPath+'\\'+file.name,{recursive:true}, err => {
            if (err) throw err;
          });
          copyDir(path.join(filesPath, file.name),path.join(copiedPath, file.name));
        }
      });
    } 
  });
}
copyDir(filesPath, copiedPath);
