const app = require('../lib/app');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const assert = chai.assert;
const ObjectID = require('mongodb').ObjectID;
const db = require('../lib/db');
const url = 'mongodb://localhost:27017/halfStack';

// Database->Collection->Documents

describe('mongo tests', () => {
  before(() => db.connect(url));
  beforeEach(() => {
    db.db.dropDatabase();
  });

  const req = chai.request(app);

  function save(person) {
    return new Promise((resolve, reject) => {
      req.post('/people')
        .send(person)
        .then(res => {
          console.log('7');
          resolve(JSON.parse(res.text));
        });
    });
  }

  it.only('url is POST /people', () => {
    console.log('1');
    const person = { name: 'chuck', feet: 'ginormous' };
    return save(person)
      .then(res => {
        console.log('8');
        assert.equal('chuck', res.name);
      });
  }),
    it('url is GET /people', () => {

    }), it('url is POST /people', () => {

    }), it('url is GET /people/:id', () => {

    }), it('url is DELETE /<people>/:id', () => {
      // return { removed: true } or { removed: false }
    }), it('url is PUT /<people>/:id', () => {

    });
});
