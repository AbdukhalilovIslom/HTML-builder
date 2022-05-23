const fs = require('fs');
const path = require('path');
const { exit } = require('process');
const { stdin, stdout } = process;
const txtPath = path.join(__dirname, 'text.txt');
const writeStream = fs.createWriteStream(txtPath);

stdout.write('enter your text\nif you want to leave press CTRl+C or just type:exit: ');
stdin.on('data', data => {
  if (data.toString().trim() === 'exit') {
    process.exit();
  }
  writeStream.write(data.toString());
});
process.on('exit', () => stdout.write('\nGood bye'));
process.on('SIGINT', exit);
