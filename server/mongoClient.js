const { MongoClient } = require('mongodb');
const fs = require('fs');
var settings = require("./settings");

async function init(){
    const uri = settings.MONGO_URI;
    return new MongoClient(uri);
}

module.exports = {
    logPipeline: async function () {
        var client = await init();
        await client.connect();

        try {
            const pipeline = [
                {
                    '$project': { 
                        'clientSession': 1,
                        'clientInfo': 1,
                        'type': 1,
                        'createdAt': 1,
                        'info':1
                    }
                }, {
                    '$sort': { 'clientSession': 1 }
                }];
                
            return await client.db("catalogue")
                               .collection("logs")
                               .aggregate(pipeline, { "allowDiskUse" : true })
                               .limit(30)
                               .toArray()
                               .then((data) => { return JSON.stringify(data) });
        }
        finally{ await client.close(); }
    },
    logPipelineClick: async function () {
        var client = await init();
        await client.connect();

        try {
            const pipeline = [
                {
                    '$project': { 
                        'clientSession': 1,
                        'clientInfo': 1,
                        'type': 1,
                        'createdAt': 1,
                        'info':1
                    }
                }, {
                    '$sort': { 'clientSession': 1 }
                }, { 
                    '$match': { 'type': 'click' } 
                }];
                
            // See https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#aggregate for the aggregate() docs
            return await client.db("catalogue")
                               .collection("logs")
                               .aggregate(pipeline, { "allowDiskUse" : true })
                               .limit(30)
                               .toArray()
                               .then((data) => { return JSON.stringify(data) });
        }
        finally{ await client.close(); }
    },
    logPipelineDownload: async function () {
        var client = await init();
        await client.connect();

        try {
            const pipeline = [
                {
                    '$project': { 
                        'clientSession': 1,
                        'clientInfo': 1,
                        'type': 1,
                        'createdAt': 1,
                        'info':1
                    }
                }, {
                    '$sort': { 'clientSession': 1 }
                }, { 
                    '$match': { 'type': 'download' } 
                }];
                
            // See https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#aggregate for the aggregate() docs
            return await client.db("catalogue")
                               .collection("logs")
                               .aggregate(pipeline, { "allowDiskUse" : true })
                               .limit(30)
                               .toArray()
                               .then((data) => { return JSON.stringify(data) });
        }
        finally{ await client.close(); }
    },
    logPipelineMouseMove: async function () {
        var client = await init();
        await client.connect();

        try {
            const pipeline = [
                {
                    '$project': { 
                        'clientSession': 1,
                        'clientInfo': 1,
                        'type': 1,
                        'createdAt': 1,
                        'info':1
                    }
                }, {
                    '$sort': { 'clientSession': 1 }
                }, { 
                    '$match': { 'type': 'mousemove' } 
                }];
                
            // See https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#aggregate for the aggregate() docs
            return await client.db("catalogue")
                               .collection("logs")
                               .aggregate(pipeline, { "allowDiskUse" : true })
                               .limit(30)
                               .toArray()
                               .then((data) => { return JSON.stringify(data) });
        }
        finally{ await client.close(); }
    },
    logPipelineQuery: async function () {
        var client = await init();
        await client.connect();

        try {
            const pipeline = [
                {
                    '$project': { 
                        'clientSession': 1,
                        'clientInfo': 1,
                        'type': 1,
                        'createdAt': 1,
                        'info':1
                    }
                }, {
                    '$sort': { 'clientSession': 1 }
                }, { 
                    '$match': { 'type': 'query' } 
                }];
                
            // See https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#aggregate for the aggregate() docs
            return await client.db("catalogue")
                               .collection("logs")
                               .aggregate(pipeline, { "allowDiskUse" : true })
                               .limit(30)
                               .toArray()
                               .then((data) => { return JSON.stringify(data) });
        }
        finally{ await client.close(); }
    }
  };