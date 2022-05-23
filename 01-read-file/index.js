const fileStream = require('fs');
const path = require('path');
const dirPath = path.join(__dirname, '/text.txt');

const stream = fileStream.createReadStream(dirPath, 'utf8');

const data = [];

stream.on('readable', () => {
  let chunk;

  while (null !== (chunk = stream.read())) {
    data.push(chunk);
  }
});
  
stream.on('end', () => {
  console.log(data.join(''));
});
