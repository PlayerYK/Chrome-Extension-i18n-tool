const fs = require("fs");
const csv = require("csv-parser");
const fileName = "locale.csv";

function buildOne(lang, languageConfig) {
  // Specify the directory path and folder name
  const dirPath = "./_locales";
  const folderName = lang;

  // Create the folder
  const folderPath = dirPath + "/" + folderName;
  if (!fs.existsSync()) {
    fs.mkdirSync(folderPath, { recursive: true });
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

const results = [];
fs.createReadStream(fileName)
  .pipe(csv())
  .on("data", (data) => {
    // console.log(data);
    results.push(data);
  })
  .on("end", () => {
    results.forEach((item) => {
      const { LocaleCode, LanguageRegion, ...languageConfig } = item;
      buildOne(LocaleCode, languageConfig);
    });
    console.log("build finished ", results.length);
  });
