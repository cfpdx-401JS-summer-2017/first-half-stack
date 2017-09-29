const app = require('../lib/app');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const assert = chai.assert;
const req = chai.request(app);
const connection = require('../lib/db');
const url = 'mongodb://localhost:27017/halfStack';

describe('mongo tests', () => {

  before(() => connection.connect(url));
  before(() => connection.db.dropDatabase());
  before(() => {
    const seedPeople = [
      {
        name: 'elizabeth',
        nose: 'tiny'
      },
      {
        name: 'joann',
        job: 'web dev'
      },
      {
        name: 'elton',
        talent: 'piano'
      },
      {
        name: 'oliver',
        home: 'madrid'
      },
      {
        name: "james",
        hobby: "collects subway tokens from around the world"
      }
    ]
    seedPeople.map(person => {
      return req.post('/people').send(person)
        .then(res => {
          return
        })
    })
  });



  it('url is POST /people', async () => {
    const person = {
      feet: 'ginormous',
      name: 'chuck'
    };
    const savedPerson = await req.post('/people').send(person)
    assert.equal('chuck', savedPerson.body.name);
    assert.ok(savedPerson.body._id);
  });
  it('url is GET /people', async () => {
    const getPeople = await req.get('/people')
    assert.equal(getPeople.body.length, 6);
  });

  it('url is GET /people/:id', async () => {

    const getPeople = await req.get('/people')
    console.log(88, getPeople.body[0]._id)
    const id = getPeople.body[0]._id
    // const getById = await req.get(`/people/${id}`)
    // console.log(67, getById.body)
  }), it('url is DELETE /<people>/:id', () => {
    // return { removed: true } or { removed: false }
  }), it('url is PUT /<people>/:id', () => {

  });
});
