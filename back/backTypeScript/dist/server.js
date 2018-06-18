"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const port = 8000;
const MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://127.0.0.1:27017/Note', (err, db) => {
    if (err)
        return console.log(err);
    let database = db.db('Notes');
    require('../routes')(app_1.default, database);
    app_1.default.listen(port, () => {
        console.log('We are live on ' + port);
    });
});
//# sourceMappingURL=server.js.map