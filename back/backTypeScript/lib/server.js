"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var port = 8000;
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://127.0.0.1:27017/Note', function (err, db) {
    if (err)
        return console.log(err);
    var database = db.db('Notes');
    require('../routes')(app_1.default, database);
    app_1.default.listen(port, function () {
        console.log('We are live on ' + port);
    });
});
