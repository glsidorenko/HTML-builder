const fileStream = require('fs');
const path = require('path');

const pathToStyles = path.join(__dirname, '/styles');
const pathToDistStyles = path.join(__dirname, '/project-dist', 'bundle.css');

fileStream.readdir(pathToStyles, (err, files) => {
  if (err) {
    console.log(err);
  } else {
    const bundle = fileStream.createWriteStream(pathToDistStyles);

    files.forEach(file => {

      const fileExtension = path.extname(file);

      if (fileExtension === '.css') {
        const pathToFile = path.join(pathToStyles, file);

        fileStream.stat(pathToFile, (err, stats) => {
          if (!stats.isDirectory()) {
            const stream = fileStream.createReadStream(pathToFile, 'utf8');

            stream.on('readable', () => {
              let chunk;
                        
              while (null !== (chunk = stream.read())) {
                bundle.write(chunk);
              }
            });
          }
        });
      }
    });
    console.log('The bundle.css file was completely build');
  }
});



