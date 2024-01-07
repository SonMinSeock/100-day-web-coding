const mongodb = require("mongodb");

const MongoClient = new mongodb.MongoClient("mongodb://127.0.0.1:27017");

let database;

async function connect() {
  const client = await MongoClient.connect();
  database = client.db("blog");
}

function getDb() {
  if (!database) {
    throw { message: "Database connection not established!" };
  }
  return database;
}

module.exports = {
  connectToDatabase: connect,
  getDb,
};
