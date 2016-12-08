var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');

var should = chai.should();
var app = server.app; //alias
var storage = server.storage; //alias
chai.use(chaiHttp);


//the following piece of code simulates visiting a URL.

describe('Shopping List', function() {
    it('should list items on GET', function(done) {//must have a done call inside each 'it' block or test will fail.
        chai.request(app) //chai HTTP makes a request to your app (server.app).
            .get('/items') //makes get request to this endpoint.
            .end(function(err, res) { //when the get request is complete, the end() function will run.
                res.should.have.status(200); //<-- an example of 'should' style assertion.
                should.equal(err, null);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.have.length(3);
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('id');
                res.body[0].should.have.property('name');
                res.body[0].id.should.be.a('number');
                res.body[0].name.should.be.a('string');
                res.body[0].name.should.equal('Broad beans');
                res.body[1].name.should.equal('Tomatoes');
                res.body[2].name.should.equal('Peppers');    
                res.body[0].should.be.a('object');
                //console.log(res.body[0].name);
                res.body[0].should.have.property('id');
                res.body[0].should.have.property('name');
                res.body[0].id.should.be.a('number');
                res.body[0].name.should.be.a('string');
                res.body[0].name.should.equal('Broad beans');
                res.body[1].name.should.equal('Tomatoes');
                res.body[2].name.should.equal('Peppers');
                done();
            });
    });


    it('should add an item on post', function(done) {
        chai.request(app)
            .post('/items')
            .send({'name': 'Kale'}) //just dummy data as test. doesn't actually create new item.
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('id');
                res.body.name.should.be.a('string');
                res.body.id.should.be.a('number');
                res.body.name.should.equal('Kale');
                storage.items.should.be.a('array');
                storage.items.should.have.length(4);
                storage.items[3].should.be.a('object');
                storage.items[3].should.have.property('id');
                storage.items[3].should.have.property('name');
                storage.items[3].id.should.be.a('number');
                storage.items[3].name.should.be.a('string');
                storage.items[3].name.should.equal('Kale');
                done();
            });
    });
    
    it('should edit an item on put', function(done) { 
        chai.request(app) 
            .put('/items/1') 
            .send({'name': 'Eggs'}) 
            .end(function(err, res) { 
                should.equal(err, null); 
                
                console.log('test:',res.body,'body')
                res.should.have.status(200); 
                // res.should.be.json; 
                // res.body.should.be.a('object'); 
                // res.body.should.have.property('name'); 
                // res.body.should.have.property('id'); 
                // res.body.name.should.be.a('string'); 
                // res.body.id.should.be.a('number'); 
                // res.body.name.should.equal('Spork'); 
                res.body.should.equal('1'); 
                done(); 
            });       
    });
    it('should delete an item on delete', function(done) { 
        chai.request(app) 
            .delete('/items/1') 
            .end(function(err, res) { 
                should.equal(err, null);
                res.should.have.status(200); 
                res.should.be.json; 
                res.body.should.be.a('object'); 
                res.body.should.have.property('name'); 
                res.body.should.have.property('id'); 
                res.body.name.should.be.a('string'); 
                res.body.id.should.be.a('number'); 
                res.body.name.should.equal('Broad beans'); 
                res.body.id.should.equal(1); 
                done(); 
            }); 
    }); 
});

