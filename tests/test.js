const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { assert } = chai;

const connection = require('../lib/db');

const url = 'mongodb://localhost:27017/pets';

const app = require('../lib/app');

describe('dogs resource', () => {

    before(() => connection.connect(url));
    before(() => connection.db.dropDatabase());

    const request = chai.request(app);

    let saved = '';

    it('saves', () => {
        const dog = { name: 'tiffany', breed: 'labradoodle' };
        return request.post('/dogs')
            .send(dog)
            .then(res => {
                saved = res.body;
                assert.ok(saved._id);
                assert.equal(saved.name, dog.name);
                assert.equal(saved.breed, dog.breed);
            });
    });
    it('adds child array property to object', ()=>{
        const item = {toys: 'green ball'};
        return request.post(`/dogs/${saved._id}/toys`)
            .send(item)
            .then(res => {
                saved = res.body;
                assert.ok(saved.toys);
                assert.equal(saved.toys, item.toys);
            });

    });
    it('removes child items', () => {
        const item = {toys: 'green ball'};
        return request.delete(`/dogs/${saved._id}/toys`)
            .send(item)
            .then(res => {
                saved = res.body;
                assert.deepEqual(saved.toys, []);
            });
    });
    it('gets by the id', () => {
        return request.get(`/dogs/${saved._id}`)
            .then(res => {
                assert.equal(res.body._id, saved._id);
            });
    });
    it('gets a bad id', () => {
        return request.get('/dogs/597281cc0769012310d72666')
            .then(() => {throw new Error('Expected 404 error instead got 200');},
                err => assert.ok(err.response.notFound)
            );
    });
    it('pulls the collection of dogs', () => {
        return request.get('/dogs')
            .then(res => {
                assert.equal(res.body[0].name, saved.name);
            });
    });
    it('querys for a smaller set of dogs',()=>{
        return request.get('/dogs?breed=labradoodle')
            .then(res => {
                assert.equal(res.body[0].breed, saved.breed);
            });

    });
    it('rewrites dog data by id', () => {
        const dog2 = { name: 'snoopy', breed: 'beagle' };
        return request.put(`/dogs/${saved._id}`)
            .send(dog2)
            .then(res => {
                assert.deepEqual(JSON.parse(res.text), { updated: true });
            });
    });
    it('deletes dog by id', () => {
        return request.delete(`/dogs/${saved._id}`)
            .then(res => {
                assert.deepEqual(JSON.parse(res.text), { removed: true });
            });
    });
    it('returns removed false', () => {
        return request.delete(`/dogs/${saved._id}`)
            .then(res => {
                assert.deepEqual(JSON.parse(res.text), { removed: false });
            });
    });
});