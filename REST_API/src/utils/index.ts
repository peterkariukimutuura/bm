var fs = require("fs");
var scraper = require("table-scraper");

export const scrapInformation = (file: string) => {
  scraper
    .get("https://www.mcc-mnc.com/")
    .then((tableData: any) => tableData[0])
    .then((response: any) => JSON.stringify(response))
    .then((data: any) => writeData(data, file))
    .catch((error: any) => console.log(error));
};

export const writeData = (data: any, file: string) => {
  fs.writeFile(file, data, "utf8", (err: any) => {
    if (err) throw err;
    console.log("Saved!");
  });
};

export const cleanValidationErrors = (errors: any) => {
  return errors.array().map((i: any) => ({ field: i.param, message: i.msg }));
};

export const validationErrorMessages = (errors: any) => {
  return errors
    .array()
    .map((item: any) => item?.msg)
    .join(" ");
};
