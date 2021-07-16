var json2csv = require('json-2-csv');
const fs = require('fs');
var settings = require("settings");

module.exports = {
    converter: async function (jsonData) {
        json2csv.json2csv(jsonData, (err, csv) => {
            if (err) { throw err; }
            return csv;
        });
    },
    createFile: async function (dataString, fileName) {
        await fs.writeFile(settings.PROJECT_DIR + `/tmp/${fileName}.csv`, dataString, function(err) {
            if(err) throw err;
            console.log("The file was saved!");
        }); 
    }
  };