const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { assert } = chai;
const connection = require('../lib/db');
const url = 'mongodb://localhost:27017/world-test';
const app = require('../lib/app');

describe('world database', () => {
    before(() => connection.connect(url));
    before(() => connection.db.dropDatabase());
    // beforeEach(() => connection.db.dropCollection('cities'));

    const request = chai.request(app);

    function save(city) {
        return request.post('/cities')
            .send(city)
            .then(res => res.body);
    }

    describe('POST', () => {
        it('saves a new city', () => {
            const city = { name: 'Chicago', state: 'IL' };
            return save(city)
                .then(saved => {
                    assert.ok(saved._id);
                    assert.equal(saved.name, city.name);
                    assert.equal(saved.state, city.state);
                });
        });
    });

    describe('GET', () => {
        //QUESTION: not sure how remove before test
        before(() => connection.db.dropCollection('cities'));
        
        it('gets all cities', () => {
            let cities = [
                { name: 'San Francisco', state: 'CA' },
                { name: 'Seattle', state: 'WA' },
                { name: 'Phoenix', state: 'AZ' }
            ];
            
            return Promise.all(cities.map(save))
                .then(saved => cities = saved)
                .then(() => request.get('/cities'))
                .then(res => {
                    const saved = res.body.sort((a, b) => a._id > b._id ? 1 : -1 );
                    assert.deepEqual(saved, cities);
                });
        });

        it('gets city by id', () => {
            let city = { name: 'Minneapolis', state: 'MN' };

            return save(city)
                .then(saved => city = saved)
                .then(() => request.get(`/cities/${city._id}`)) // don't need :
                .then(res => {
                    assert.equal(res.body._id, city._id);
                });
        });

        it('gets city by id and returns 404 not found', () => {
            return request.get('/cities/bad3c9afe41a457ec1aef7cb') //must test 24 char
                .then(() => { throw new Error('Expected 404 error instead got 200'); },
                    err => assert.ok(err.response.notFound)
                );
        });

        it('gets the cities for a state', () => {
            const state = 'MI';
            let cities = [
                { name: 'Detroit', state: 'MI' },
                { name: 'Ann Arbor', state: 'MI' },
                { name: 'Grand Rapids', state: 'MI' },
                { name: 'Flint', state: 'MI' },
                { name: 'Kalamazoo', state: 'MI'}
            ];
            
            return Promise.all(cities.map(save))
                .then(saved => cities = saved)
                .then(() => request.get(`/cities/?state=${state}`))
                .then(res => {
                    assert.deepEqual(res.body, cities);
                });
        });
        
        it('gets the cities for a state and returns 404 not found', () => {
            const state = 'AL';

            return request.get(`/cities/?state=${state}`)
                .then(() => { throw new Error('Expected 404 error instead got 200'); },
                    err => assert.ok(err.response.notFound)
                );
        });  
    });

    describe('DELETE', () => {
        it('removes city by id', () => {
            let city = { name: 'Atlanta', state: 'GA' };

            return save(city)
                .then(saved => city = saved)
                .then(() => request.delete(`/cities/${city._id}`))
                .then(res => {
                    assert.deepEqual(res.body, { removed: true });
                });
        });

        it('removes city by id and returns false', () => {
            return request.delete('/cities/bad3c9afe41a457ec1aef7ca')
                .then(res => {
                    assert.deepEqual(res.body, { removed: false });
                });
        });
    });

    describe('PUT', () => {
        it('updates a city by id', () => {
            let city = { name: 'Honolulu', state: 'IH' };
            let cityCorrection = { name: 'Honolulu', state: 'HI' };

            return save(city)
                .then(saved => city = saved)
                .then(() => request.put(`/cities/${city._id}`).send(cityCorrection))
                .then(res => {
                    assert.deepEqual(res.body, { updated: true });
                });
        });

        it('updates a city by id and returns false', () => {
            let cityCorrection = { name: 'Columbus', state: 'OH' };

            return request.put('/cities/bad3dc4ad8313582364cdd21').send(cityCorrection)
                .then(res => {
                    assert.deepEqual(res.body, { updated: false });
                });
        });
    });

});
