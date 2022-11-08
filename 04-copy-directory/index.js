const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');
const currentFolder = path.join(__dirname, 'files');
const copyFolder = path.join(__dirname, 'files-copy');
let FolderExist = false;

function cleanDir() {
    fs.readdir(copyFolder, (err, files) => {
        if (err) return null;
        files.forEach(file => {
            fs.unlink(path.join(copyFolder, file), (err) => {
                if (err) throw err;
            })
        })
    });
}

function createNewFolder() {
    fs.mkdir(copyFolder, { recursive: true }, (err) => {
        if (err) {
            console.log(err);
        } else
            console.log("Files have been copied to a new folder");
    })
};

function CopyDir() {
    cleanDir();
    createNewFolder();
    fs.readdir(currentFolder, (err, files) => {
        if (err) {
            console.log(err);
        } else {
            files.forEach(file => {
                fs.stat(path.join(currentFolder, file), (err, stats) => {
                    if (err)
                        console.log(err);
                    else
                        fsPromises.copyFile(path.join(currentFolder, file), path.join(copyFolder, file));
                });
            })
        };
    })
};

CopyDir();