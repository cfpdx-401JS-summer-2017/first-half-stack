const app = require('../lib/app');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const assert = chai.assert;
const ObjectID = require('mongodb').ObjectID;
const db = require('../lib/db');
const url = 'mongodb://localhost:27017/halfStackWithExpress';

// Database->Collection->Documents
// new branch
describe('mongo express tests', () => {
  before(() => db.connect(url));
  beforeEach(() => {
    db.db.dropDatabase();
  });

  const req = chai.request(app);

  const seedPeople = [
    { name: 'elizabeth', nose: 'tiny' },
    { name: 'joann', job: 'web dev' },
    { name: 'elton', talent: 'piano' },
    {
      name: 'oliver', quirks: [
        { annoying: "clips toenails on transit" },
        { admirable: "always buys rounds" }
      ]
    },
    { name: "james", hobby: "collects subway tokens from around the world" }
  ]

  function save(person) {
    return req.post('/people')
      .send(person)
      .then(res => {
        console.log('7');
        return JSON.parse(res.text);
      });
  }

  it.only('url is POST /people', () => {
    console.log('1');
    const person = { feet: 'ginormous', name: 'chuck' };
    return save(person)
      .then(res => {
        console.log('8');
        assert.equal('chuck', res.name);
        assert.ok(res._id);
      });
  });
  it('url is GET /people', () => {
    return Promise.all(seedPeople.map((person) => {
      return save(person)
    }))
      .then(res => {
        return req.get('/people')
          .then(data => {
            assert.equal(data.body.length, 5);
          })
      });
  });
  it('url is GET /people/:id', () => {

  }), it('url is DELETE /<people>/:id', () => {
    // return { removed: true } or { removed: false }
  }), it('url is PUT /<people>/:id', () => {

  });
});
