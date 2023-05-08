const fs = require('fs');
const path = require('path');
const newFolder = path.join(__dirname, 'project-dist');

const stylesFolder = path.join(__dirname, 'styles');
const bundleFile = path.join(__dirname, 'project-dist', 'style.css');
const newData = fs.createWriteStream(bundleFile);

const imgFolder = path.join(__dirname, 'assets');
const imgFolderCopy = path.join(__dirname, 'project-dist','assets');

// function cleanDir() {
//   fs.readdir(copyFolder, (err, files) => {
//     if (err) return null;
//     files.forEach(file => {
//       fs.unlink(path.join(copyFolder, file), (err) => {
//         if (err) throw err;
//       });
//     });
//   });
// }

function createNewFolder() {
  fs.mkdir(newFolder, { recursive: true }, (err) => {
    if (err) {
      console.log(err);
    } else
      console.log('New folder created');
  });
}

createNewFolder();

//merge styles
fs.writeFile(bundleFile, '', (err) => {
  if (err)
    console.log(err);
  else
    console.log('File  has created');
});
  
fs.readdir(stylesFolder, (err, files) => {
  if (err) {
    console.log(err);
  } else {
    files.forEach((file) => {
      const pathToFile = path.join(stylesFolder, `${file}`);
      const extensionName = path.extname(pathToFile);
      if (extensionName === '.css') {
        fs.readFile(pathToFile, 'utf8',
          function (error, data) {
            if (error) throw error;
            newData.write(data);
          });
      } 
    });
  }
});


//add html

const componentsFolder = path.join(__dirname, 'components');
const templateHtmlPath = path.join(__dirname, 'template.html');
const outputHtmlPath = path.join(__dirname, 'project-dist', 'index.html');

fs.readdir(componentsFolder, (err, files) => {
  if (err) {
    console.log(err);
  } else {
    fs.readFile(templateHtmlPath, 'utf8', (err, template) => {   // Read file template.html
      if (err) {
        console.error(err);
        return;
      }
      files.forEach(file => {
        fs.stat(path.join(componentsFolder, file), (err) => {
          if (err)
            console.log(err);
          else {
            const fileName = path.parse(file).name;
            const filePath = path.join(componentsFolder, file);
            fs.readFile(filePath, 'utf8', (err, data) => {
              if (err) {
                console.error(err);
                return;
              }
              const output = template.replace(`{{${fileName}}}`, data);  // Replace  {{fileName}} with fileName.html
              template = output;
              fs.writeFile(outputHtmlPath, output, (err) => {   // Write result in file index.html
                if (err) {
                  console.error(err);
                  return;
                }
              });
            });
          }
        });
      });
    });
  }
});
