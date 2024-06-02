const fs = require("fs");
let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
let db;

let reports = [];

//connect to mongodb
MongoClient.connect("mongodb://127.0.0.1:27017/", { useNewUrlParser: true }, function(err, client) {
    if(err) throw err;

    db = client.db('marineDatabase');
});