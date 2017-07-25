const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { assert } = chai;

const connection = require('../lib/db');
const url = 'mongodb://localhost:27017/cheeses-test';

const app = require('../lib/app');

describe('cheese resource', () => {

    before(() => connection.connect(url));
    before(() => connection.db.dropDatabase());

    const request = chai.request(app);

    const cheese = [
        { name: 'cheddar', origin: 'England' },
        { name: 'brie', origin: 'France' },
        { name: 'havarti', origin: 'Denmark' }
    ];
    let testCheese = {};
    let otherCheese = {};

    it('saves', () => {
        return request.post('/cheeses')
            .send(cheese)
            .then(res => {
                const saved = res.body;
                assert.ok(saved._id);
                assert.equal(saved.name, cheese[0].name);
                assert.equal(saved.origin, cheese[0].origin);
            });

    });
    it('gets all', () => {
        return request.get('/cheeses')
            .then(res => {
                let got = res.body;
                testCheese = got[0];
                otherCheese = got[1];
                assert.equal(got.length, cheese.length);
                assert.ok(got[0]._id);
            });
    });

    it('get by id', () => {
        const gouda = { name: 'gouda', origin: 'Holland' };
        return request.post('/cheeses')
            .send(gouda)
            .then(res => res.body)
            .then(cheese => request.get(`/cheeses/${cheese._id}`))
            .then(res => {
                const got = res.body;
                assert.equal(got.origin, gouda.origin);
            });
    });

    it('returns code 404 if resource not found', () => {
        return request.get('/cheeses/123456789012345678901234')
            .then(
                () => {
                    throw new Error('Expected 404 error instead got 200');
                },
                err => assert.ok(err.response.notFound)
            );
    });

    it('removes object by id', () => {
        return request.delete(`/cheeses/${testCheese._id}`)
            .then(res => {
                const message = JSON.parse(res.text);
                assert.deepEqual(message, { removed: true });
            });
    });

    it('returns false if trying to remove id not there', () => {
        return request.delete('/cheeses/123456789012345678901234')
            .then(res => {
                const message = JSON.parse(res.text);
                assert.deepEqual(message, { removed: false });
            });

    });

    it('update item by id', () => {
        return request.put(`/cheeses/${otherCheese._id}`)
            .then(() => request.get(`/cheeses/${otherCheese._id}`))
            .then(res => {
                const got = res.body;
                assert.equal(got.name, 'camembert');
            });
    });
});