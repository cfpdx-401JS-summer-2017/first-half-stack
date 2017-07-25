const app = require('../lib/app');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { assert } = chai.assert;
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

  const people = [
    { name: 'lucinda', eyes: 'blue' },
    { name: 'finn', eyes: 'brown' },
    { name: 'gus', nose: 'large' }
  ];

  // create a new save method here to be shared with all functions
  it.only('url is POST /people', () => {
    console.log('1')
    return Promise.all(people.map((person) => {
      return req.post('/people')
        .send(person)
        .then(res => {
          console.log('7');
          console.log(res.body);
        });
    }));
  }),
    it('url is GET /people', () => {
      return req.get('/people')
        .then(res => {
          console.log(res);
        });
    }), it('url is POST /people', () => {

    }), it('url is GET /people/:id', () => {

    }), it('url is DELETE /<people>/:id', () => {
      // return { removed: true } or { removed: false }
    }), it('url is PUT /<people>/:id', () => {

    })
});
