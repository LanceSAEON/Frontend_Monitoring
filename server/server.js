var express = require('express');
var client = require('./mongoClient');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
var cors = require('cors');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`type Query 
{ 
  Log: String, 
  Log_Click: String,
  Log_Download: String,
  Log_MouseMove: String,
  Log_Query: String
}`);


// The root provides a resolver function for each API endpoint
var root = { 
    Log: async () => { return await client.logPipeline(); },
    Log_Click: async () => { return await client.logPipelineClick(); },
    Log_Download: async () => { return await client.logPipelineDownload(); },
    Log_MouseMove: async () => { return await client.logPipelineMouseMove(); },
    Log_Query: async () => { return await client.logPipelineQuery(); }
   };
 
var app = express();

app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('[+] - Running a GraphQL API server at http://localhost:4000/graphql');

