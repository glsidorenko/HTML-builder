const fileStream = require('fs');
const path = require('path');

const pathToFolder = path.join(__dirname, '/secret-folder');

fileStream.readdir(pathToFolder, (err, files) => {
  if (err) {
    console.log(err);
  } else {
    console.log('\nCurrent folder files:');
    files.forEach(file => {

      const fileExtension = path.extname(file);

      if (fileExtension !== '') {
        const pathToFile = path.join(pathToFolder, file);

        fileStream.stat(pathToFile, (err, stats) => {
          if (!stats.isDirectory()) {
            console.log(
              file.substring(0, file.indexOf('.')),
              `- ${ fileExtension.slice(1) }`, 
              `- ${ (stats.size / 1024).toFixed(3) }kb`
            );
          }
        });
      }
    });
  }
});



