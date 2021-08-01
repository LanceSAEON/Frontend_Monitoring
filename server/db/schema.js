var { buildSchema } = require('graphql');

var schema = buildSchema(`
  type Log {
    _id: ID,
    clientSession: String,
    clientInfo: [ClientInfo],
    type: String,
    createdAt: String,
    info: [Info],
    clientVersion: String,
    commitHash: String
  }

  type ClientInfo {
    ipAddress: String,
    userAgent: String
  }

  type Info {
    pathname: String,
    innerHeight: Int,
    innerWidth: Int,
    x: Int,
    y: Int
  }

  type Query { 
    Log: String, 
    Log_Click: [Log],
    Log_Download: String,
    Log_MouseMove: String,
    Log_Query: String
  }`);

module.exports = { graphql_schema: schema }