const fileStream = require('fs');
const path = require('path');
const promises = fileStream.promises;

const pathToComponents = path.join(__dirname, '/components');
const pathToAssets = path.join(__dirname, '/assets');
const pathToStyles = path.join(__dirname, '/styles');
const pathToTemplate = path.join(__dirname, '/template.html');

const pathToProject = path.join(__dirname, '/project-dist');
const pathToProjectStyle = path.join(pathToProject, '/style.css');
const pathToProjectAssets = path.join(pathToProject, '/assets');
const pathToProjectIndex = path.join(pathToProject, '/index.html');

// Create project folder
fileStream.mkdir(pathToProject, { recursive: true }, (err) => {
  if (err) throw err;
});

// Merge .htmls into one .html

async function someHandler() {
  let template = await promises.readFile(pathToTemplate, 'utf-8');
  const filesNames = await promises.readdir(pathToComponents);

  for (let item of filesNames) {
    const elementContent = await promises.readFile(path.join(pathToComponents, item), 'utf-8');
    template = template.replace(`{{${item.slice(0,-5)}}}`, elementContent);
    fileStream.writeFile(pathToProjectIndex, template, function(error){
      if(error) throw error; // ошибка чтения файла, если есть
      // console.log('Данные успешно записаны записать файл');
    });
  }

//   filesNames.forEach(async function(item) {
//     const elementContent = await promises.readFile(path.join(pathToComponents, item), 'utf-8');
//     template = template.replace(`{{${item.slice(0,-5)}}}`, elementContent);
//     fileStream.writeFile(pathToProjectIndex, template, function(error){
//       if(error) throw error; // ошибка чтения файла, если есть
//       // console.log('Данные успешно записаны записать файл');
//     });
//   });
}

someHandler();

// Combine all styles into one file
fileStream.readdir(pathToStyles, (err, files) => {
  if (err) {
    console.log(err);
  } else {
    const styleFile = fileStream.createWriteStream(pathToProjectStyle);

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
                styleFile.write(chunk);
              }
            });
          }
        });
      }
    });
  }
});

// Create assets folder in our project
fileStream.mkdir(pathToProjectAssets, { recursive: true }, (err) => {
  if (err) throw err;
});

// Create assets folder copy
fileStream.readdir(pathToAssets, (err, files) => {
  if (err) {
    console.log(err);
  } else {
    files.forEach(file => {
      const pathToFile = path.join(pathToAssets, file);

      // console.log(pathToFile);
      fileStream.stat(pathToFile, (err, stats) => {
        if (stats.isDirectory()) {

          const pathToProjectAssetFolder = path.join(pathToProjectAssets, file);

          fileStream.mkdir(pathToProjectAssetFolder, { recursive: true }, (err) => {
            if (err) throw err;
          });

          fileStream.readdir(pathToFile, (err, files) => {
            if (err) {
              console.log(err);
            } else {
              files.forEach(file => {
                const pathToFolderFile = path.join(pathToFile, file);
                fileStream.copyFile(pathToFolderFile, path.join(pathToProjectAssetFolder, file), () => {
                  // console.log(`${file} was copied to /assets`);
                });
              });
            }
          });
        }
      });
    });
  }
});
