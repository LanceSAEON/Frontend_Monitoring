var client = require('../mongoClient');

var rootConfiguration = { 
    Log: async () => { return await client.logPipeline(); },
    Log_Click: async () => { return await client.logPipelineClick(); },
    Log_Download: async () => { return await client.logPipelineDownload(); },
    Log_MouseMove: async () => { return await client.logPipelineMouseMove(); },
    Log_Query: async () => { return await client.logPipelineQuery(); }
   };

module.exports = { graphql_root: rootConfiguration }