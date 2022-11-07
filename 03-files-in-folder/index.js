const fs = require('fs');
const path = require('path');
const newFolder = path.join(__dirname, '\secret-folder');
fs.readdir(newFolder,
    { withFileTypes: true },
    (err, files) => {
        if (err)
            console.log(err);
        else {
            console.log("Directory files are:");
            files.forEach(file => {
                const newPath = path.join(__dirname, '\secret-folder', `${file.name}`);
                fs.stat(newPath, (error, stats) => {
                    if (error) {
                        console.log(error);
                    }
                    else if(stats.isFile()===true) {
                        // console.log(path.extname(file.name));
                        const name = file.name.split('.')[0];
                        const extension = file.name.split('.')[1]; 
                        const size = (stats.size/1024).toFixed(3); 
                        console.log(`${name} - ${extension} - ${size}kb`);
                    }
                });
            })
        }
    })
