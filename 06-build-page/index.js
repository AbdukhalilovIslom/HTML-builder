const fs = require('fs');
const path = require('path');
const {readFile,writeFile } = require('fs/promises');

const pathToAssets = path.join(__dirname, 'assets');
const pathToDir = path.join(__dirname, 'project-dist');
const pathToStyles = path.join(__dirname, 'styles');


// creating directory
fs.mkdir(pathToDir,{recursive:true}, err => {
  if (err) throw err;
});
fs.mkdir(pathToDir+'\\'+'assets',{recursive:true}, err => {
  if (err) throw err;
});

// mergin all css styles
const writeStreamCss = fs.createWriteStream(pathToDir + '\\' + 'style.css');
async function merginStyles(pathToStyles) {
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
          readStream.pipe(writeStreamCss);
        }
        else if (file.isDirectory()) {
          merginStyles(filepath);
        }
      });   
    }
  });
    
}
merginStyles(pathToStyles);

// clonning folder
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
copyDir(pathToAssets, pathToDir + '\\' + 'assets');

// add html to assets
let pathToTemplate = path.join(__dirname, 'template.html');
let pathToComponents = path.join(__dirname, 'components');


async function bundleHtml() {
  let template = await (await readFile(pathToTemplate)).toString();
  const templateTags = template.match(/{{.+}}/gi).map((tag) => tag.slice(2, tag.length - 2));
  const obj = {};
  for (let i = 0; i < templateTags.length; i++) {
    obj[templateTags[i]] = await readFile(pathToComponents + '\\'+`${templateTags[i]}.html`);
    obj[templateTags[i]] = obj[templateTags[i]].toString();
    let page = template.split(`{{${templateTags[i]}}}`);
    template = page[0] + obj[templateTags[i]] + page[1];
  }
  writeFile(pathToDir + '\\'+'index.html', template);
}
bundleHtml();
