var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var app = require('../routes/note_routes');

chai.use(chaiHttp);


it('should list ALL notes on /notes GET', (done) => {
    chai.request('http://localhost:8000')
        .get('/notes')
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.body[0].should.have.property('_id');
            res.body[0].should.have.property('text');
            res.body[0].should.have.property('title');
            done();
        });
});

it('should add a SINGLE notes on /notes POST', (done) => {
    chai.request('http://localhost:8000')
        .post('/notes')
        .send({'name': 'Java', 'text': 'Script'})
        .end((err, res) =>{
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('title');
            res.body.should.have.property('text');
            res.body.should.have.property('_id');
            res.body.text.should.equal('Java');
            res.body.title.should.equal('Script');
            done();
        });
});

it('should update a SINGLE notes on /notes/<id> POST', (done) => {
    chai.request('http://localhost:8000')
        .get('/notes')
        .end((err, res) =>{
            chai.request('http://localhost:8000')
                .post('/notes/'+res.body[0]._id)
                .send({'name': 'Spider', 'text': 'Man'})
                .end((err, res) =>{
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('text');
                    res.body.text.should.equal('Spider');
                    res.body.title.should.equal('Man');
                    done();
                });
        });
});

it('should delete a SINGLE notes on /notes/<id>  DELETE', (done) => {
    chai.request('http://localhost:8000')
        .get('/notes')
        .end((err, res) =>{
            chai.request('http://localhost:8000')
                .delete('/notes/'+res.body[0]._id)
                .end((err, res) =>{
                    res.should.have.status(200);
                    done();
                });
        });
});