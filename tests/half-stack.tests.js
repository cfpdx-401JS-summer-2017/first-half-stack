const app = require('../lib/app');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const {
 assert
} = chai.assert;
const ObjectID = require('mongodb').ObjectID;
const db = require('../lib/db');
const url = 'mongodb://localhost:27017/halfStack';

// To pass object ids to mongo:
// const ObjectID = require('mongodb').ObjectID;
// // in your code, assuming you have id with string id:
// const objectId = new ObjectID(id);
// in Robo 3T: ObjectId(id)
// in node using mongodb driver: new ObjectID(id)

// Database->Collection->Documents

describe.skip('mongo tests', () => {
  before(() => db.connect(url));
  beforeEach(() => {
    db.db.dropDatabase();
  });
  const req = chai.request(app);

  // create a new save method here to be shared with all functions

  // drop database, create new one

  it.only('url is GET /people', () => {
    return req.get('/people').then(res => {
      // console.log(res);
    });
  });
  // it('url is POST /people', done => {}), it('url is GET /people/:id', done => {}), it('url is DELETE /<people>/:id', done => {
  //   // return { removed: true } or { removed: false }
  // }), it('url is PUT /<people>/:id', done => {});
});
