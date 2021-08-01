var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var cors = require('cors');
var schema = require('./db/schema');
var root = require('./db/root');
const { PATH, PORT } = require('./config/settings');

var app = express();

app.use(cors());
app.use(`/${PATH}`, graphqlHTTP({
  schema: schema.graphql_schema,
  rootValue: root.graphql_root,
  graphiql: true,
}));
app.listen(PORT);
console.log(`[+] - Running a GraphQL API server at http://localhost:${PORT}/${PATH}`);

