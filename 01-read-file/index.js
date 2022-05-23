const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'text.txt');

let readingFile = fs.createReadStream(filePath);
readingFile.on('data', (data) => {
    console.log(data.toString());
});