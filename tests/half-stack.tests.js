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
    const chuck = {
      feet: 'ginormous',
      name: 'chuck'
    };
    const savedPerson = await req.post('/people').send(chuck)
    assert.equal('chuck', savedPerson.body.name);
    assert.ok(savedPerson.body._id);
  });
  it('url is GET /people', async () => {
    const getPeople = await req.get('/people')
    assert.equal(getPeople.body.length, 6);
  });
  it('url is GET /people/:id', async () => {
    const getPeople = await req.get('/people')
    const id = getPeople.body[0]._id
    const getById = await req.get(`/people/${id}`)
    assert.equal(getPeople.body[0].name, getById.body.name)
  }), it('url is DELETE /<people>/:id', async () => {
    const getPeople = await req.get('/people')
    const id = getPeople.body[2]._id
    const deleteById = await req.delete(`/people/${id}`)
    assert.deepEqual(deleteById.body, { removed: true })
  }), it('url is PUT /<people>/:id', async () => {
    const getPeople = await req.get('/people')
    const id = getPeople.body[1]._id
    const putById = await req.put(`/people/${id}`)
    assert.deepEqual(putById.body.lastErrorObject, { updatedExisting: true, n: 1 })

  });
});
