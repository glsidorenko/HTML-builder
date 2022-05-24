const fileStream = require('fs');
const promises = fileStream.promises;
const path = require('path');
const pathToCopy = path.join(__dirname, '/files');
const pathDestination = path.join(__dirname, '/files-copy');

async function startCopy(from, to) {
  await promises.rm(to, {force: true, recursive: true });
  await promises.mkdir(to, { recursive: true });

  fileStream.readdir(from, (err, files) => {
    if (err) {
      console.log(err);
    } else {
      files.forEach(file => {
        const pathToFile = path.join(from, file);
        fileStream.copyFile(pathToFile, path.join(to, file), () => {
          console.log(`${file} was copied to files-copy`);
        });
      });
    }
  });
}

startCopy(pathToCopy, pathDestination);

