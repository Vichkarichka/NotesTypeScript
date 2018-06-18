import app from "./app";
const port = 8000;
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://127.0.0.1:27017/Note', (err: any, db: any) => {
    if (err) return console.log(err);
    let database = db.db('Notes');
    require('../routes')(app, database);
    app.listen(port, () => {
        console.log('We are live on ' + port);
    });
});

