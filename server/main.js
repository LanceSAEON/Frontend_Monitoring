const { MongoClient } = require('mongodb');
const fs = require('fs');
var settings = require("settings");

async function main() {
    const uri = settings.MONGO_URI;
    const client = new MongoClient(uri);

    try {
        await client.connect();
        await LogsPipeline(client);
    } finally { await client.close(); }
}

main().catch(console.error);

// Add functions that make DB calls here
async function RetrieveRecs(client, limit) {
    var cursor = await client.db("catalogue")
                             .collection("logs")
                             .find({ type: "download" })
                             .limit(limit)
                             .toArray()
                             .then((data) => { return JSON.stringify(data)});

    await CreateFile(cursor);
}

async function CreateFile(content) {
    await fs.writeFile(settings.PROJECT_DIR + "/tmp/logs.json", content, function(err) {
        if(err) throw err;
        console.log("The file was saved!");
    }); 
}

// Pipeline functions 
async function LogsPipeline(client) {    

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
    
        await client.db("catalogue")
                    .collection("logs")
                    .aggregate(pipeline)
                    .limit(20) // Remove for full list
                    .toArray()
                    .then((data) => { CreateFile(JSON.stringify(data))});
}