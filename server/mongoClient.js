const { MongoClient } = require('mongodb');
var settings = require("./config/settings");
var pipelines = require('./db/pipelines');

async function retrieveRecs(query) {
    client = await new MongoClient(settings.MONGO_URI).connect();

    try {
            
        return await client.db("catalogue")
                            .collection("logs")
                            .aggregate(query, { "allowDiskUse" : true })
                            .limit(30)
                            .toArray()
    }
    finally{ await client.close(); }
}

module.exports = {
    logPipeline: async function () {
        return await retrieveRecs(pipelines.getAllLogs);//.then((d) => { return JSON.stringify(d) });
    },
    logPipelineClick: async function () {
        return await retrieveRecs(pipelines.clickLogs);//.then((d) => { return JSON.stringify(d) });
    },
    logPipelineDownload: async function () {
        return await retrieveRecs(pipelines.downloadLogs);//.then((d) => { return JSON.stringify(d) });
    },
    logPipelineMouseMove: async function () {
        return await retrieveRecs(pipelines.mouseMoveLogs);//.then((d) => { return JSON.stringify(d) });
    },
    logPipelineQuery: async function () {
        return await retrieveRecs(pipelines.queryLogs);//.then((d) => { return JSON.stringify(d) });
    }
  };