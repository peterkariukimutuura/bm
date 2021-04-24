var fs = require("fs");
var scraper = require("table-scraper");

const scrapInformation = () => {
  scraper
    .get("https://www.mcc-mnc.com/")
    .then((tableData) => tableData[0])
    .then((response) => JSON.stringify(response))
    .then((data) => writeData(data))
    .catch((error) => console.log(error));
};

const writeData =  (data) => {
   fs.writeFile("json-data.json", data, "utf8", (err) => {
    if (err) throw err;
    console.log("Saved!");
  });
};

scrapInformation();
