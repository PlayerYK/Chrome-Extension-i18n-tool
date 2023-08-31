const fs = require("fs");
const csv = require("csv-parser");

function buildOneLanguage(dirPath, lang, languageConfig) {
    // Specify the directory path and folder name
    const folderName = lang;
    // Create the folder
    const folderPath = dirPath + "/" + folderName;
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, {recursive: true});
    }

    // Create a JSON file in the folder
    const jsonData = {};
    for (let [key, value] of Object.entries(languageConfig)) {
        // console.log([key, value]);
        jsonData[key] = {
            message: value,
        };
    }

    const jsonString = JSON.stringify(jsonData);
    fs.writeFileSync(dirPath + "/" + folderName + "/messages.json", jsonString);
}

function buildFromCSV(fileName) {
    // get "sample" from "locale.sample.csv"
    const appName = fileName.split(".")[1];

    // Specify the directory path and folder name
    const folderPath = `./locales_${appName}`;
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, {recursive: true});
    } else {
        // fs.readdir(dirPath, (err, files) => {
        //   if (err) throw err;
        //   for (const file of files) {
        //     fs.unlink(path.join(folder, file), err => {
        //       if (err) throw err;
        //     });
        //   }
        // });
    }

    const results = [];
    fs.createReadStream(fileName)
        .pipe(csv())
        .on("data", (data) => {
            // console.log(data);
            results.push(data);
        })
        .on("end", () => {
            results.forEach((item) => {
                const {LocaleCode, LanguageRegion, ...languageConfig} = item;
                // console.log("LocaleCode", LocaleCode, "LanguageRegion", LanguageRegion);
                buildOneLanguage(folderPath, LocaleCode, languageConfig);
            });
            console.log("succeed", appName, results.length, 'languages');
        });
}

// Script Entrance
// read current dir to find source csv
fs.readdir("./", (err, files) => {
    // console.log(files)
    const arrFiltered = files.filter((f) => {
        return (f !== "locale.sample.csv") && /^locale.\w+.csv/.test(f);
    });
    console.log(arrFiltered)
    const len = arrFiltered.length;
    arrFiltered.forEach((fileName, index) => {
        const appName = fileName.split(".")[1];
        console.log(index + 1, '/', len, "building", appName);
        buildFromCSV(fileName);
    })
});
