import { pipeline } from "stream";
import fs from "fs";
import csv from "csvtojson";

const csvPath = "./task1/task1.2/csv/file.csv";
const txtPath = "./task1/task1.2/csv/file.txt";

pipeline(
  fs.createReadStream(csvPath, "utf-8"),
  csv({
    output: "json",
    delimiter: "\t",
  }),
  fs.createWriteStream(txtPath),
  (err) => {
    if (err) {
      console.error("Pipeline failed.", err);
    } else {
      console.log("Pipeline succeeded.");
    }
  }
);
