const app = require('../lib/app');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const assert = chai.assert;
const mongodb = require('../lib/db');

// To pass object ids to mongo:
// const ObjectID = require('mongodb').ObjectID;
// // in your code, assuming you have id with string id:
// const objectId = new ObjectID(id);
// in Robo 3T: ObjectId(id)
// in node using mongodb driver: new ObjectID(id)

describe.skip('mongo tests', () => {
  const req = chai.request(app);
  // drop database, create new one

  it('url is GET /people', () => {
    return req.get('/people').then(res => {
      // console.log(res);
    });
  }), it('url is POST /people', done => {}), it('url is GET /people/:id', done => {}), it('url is DELETE /<people>/:id', done => {
    // return { removed: true } or { removed: false }
  }), it('url is PUT /<people>/:id', done => {});
});
