const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
const fs = require('fs');

chai.use(chaiHttp);

const server = require('./index.js');
const app = server.app;
const User = require('./user-model.js');

describe('Passport', () => {
  before((done) => {
    done();
  });
  
  it('should create a new user', (done) => {
    chai.request(app)
      .post('/users')
      .send({'username': 'testUser0', 'password': 'testUser0'})
      .end(function(err, res) {
        should.equal(err, null);
        res.should.have.status(201);
        done();
      });
  });
  
  it('should authenticate a hidden url', (done) => {
    chai.request(app)
      .get('/hidden')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify({'username': 'testUser0', 'password': 'testUser0'}))
      .end(function(err, res) {
        // console.log(err, 37);
        should.equal(err, null);
        res.should.have.status(200);
        done();
      });
  });
  
  after((done) => {
    User.findOneAndRemove({username: 'testUser0'}).exec();
    done();
  });
});