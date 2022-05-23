const fileStream = require('fs');
const path = require('path');

const pathToCopy = path.join(__dirname, '/files');
const pathDestination = path.join(__dirname, '/files-copy');


fileStream.mkdir(pathDestination, { recursive: true }, (err) => {
  if (err) throw err;
});

fileStream.readdir(pathToCopy, (err, files) => {
  if (err) {
    console.log(err);
  } else {
    files.forEach(file => {
      const pathToFile = path.join(pathToCopy, file);
      fileStream.copyFile(pathToFile, path.join(pathDestination, file), () => {
        console.log(`${file} was copied to files-copy`);
      });
    });
  }
});
