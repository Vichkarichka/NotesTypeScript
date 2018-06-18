var ObjectID = require('mongodb').ObjectID;
module.exports = function (app, db) {
    app.get('/notes', function (req, res) {
        db.collection('notes').find({}).toArray(function (err, item) {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            }
            else {
                res.send(item);
            }
        });
    });
    app.get('/notes/:id', function (req, res) {
        var id = req.params.id;
        var query = { '_id': new ObjectID(id) };
        db.collection('notes').findOne(query, function (err, item) {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            }
            else {
                res.send(item);
            }
        });
    });
    app.post('/notes', function (req, res) {
        var note = { text: req.body.name, title: req.body.text };
        db.collection('notes').insert(note, function (err, result) {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            }
            else {
                res.send(result.ops[0]);
            }
        });
    });
    app.post('/notes/:id', function (req, res) {
        var id = req.params.id;
        var details = { '_id': new ObjectID(id) };
        var note = { text: req.body.name, title: req.body.text };
        db.collection('notes').update(details, note, function (err, result) {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            }
            else {
                res.send(note);
            }
        });
    });
    app.delete('/notes/:id', function (req, res) {
        var id = req.params.id;
        var details = { '_id': new ObjectID(id) };
        db.collection('notes').remove(details, function (err, item) {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            }
            else {
                res.send('Note ' + id + ' deleted!');
            }
        });
    });
};
