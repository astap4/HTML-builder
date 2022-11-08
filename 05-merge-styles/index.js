const fs = require("fs");
const path = require("path");
const stylesFolder = path.join(__dirname, "styles");
const bundleFile = path.join(__dirname, "project-dist", "bundle.css");
const newData = fs.createWriteStream(bundleFile);

fs.writeFile(bundleFile, "", (err) => {
    if (err)
        console.log(err);
    else
        console.log("File  has created");
});

fs.readdir(stylesFolder, (err, files) => {
    if (err) {
        console.log(err);
    } else {
        files.forEach((file) => {
            const pathToFile = path.join(stylesFolder, `${file}`);
            const extensionName = path.extname(pathToFile);
            if (extensionName === ".css") {
                fs.readFile(pathToFile, "utf8",
                    function (error, data) {
                        if (error) throw error;
                        newData.write(data);
                    });
            }
        });
    };
})
