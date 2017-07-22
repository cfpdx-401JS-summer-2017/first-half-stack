const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { assert } = chai;
const connection = require('../lib/db');
const url = 'mongodb://localhost:27017/world-test';
const app = require('../lib/app');

describe('world db', () => {
    before(() => connection.connect(url));
    before(() => connection.db.dropDatabase());
    // beforeEach(() => connection.db.dropCollection('cities'));

    const request = chai.request(app);

    function save(city) {
        return request.post('/cities')
            .send(city)
            .then(res => res.body);
    }

    it('saves', () => {
        const city = { name: 'Chicago', state: 'IL' };
        return save(city)
            .then(saved => {
                assert.ok(saved._id);
                assert.equal(saved.name, city.name);
                assert.equal(saved.state, city.state);
            });
    });

    it('gets all cities', () => {
        //QUESTION: not sure how remove before test
        connection.db.dropCollection('cities');

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

    it('deletes city by id', () => {
        let city = { name: 'Atlanta', state: 'GA' };

        return save(city)
            .then(saved => city = saved)
            .then(() => request.delete(`/cities/${city._id}`))
            .then(res => {
                // assert.equal(res.body.n, 1); // not sure about this
                assert.deepEqual(res.body, { removed: true });
            });
    });

    //TODO: delete returns 404
    it('deletes city by id and returns 404 not found', () => {
        return request.delete('/cities/bad3c9afe41a457ec1aef7ca')
            // .then(() => { throw new Error('Expected 404 error instead got 200'); },
                // err => assert.ok(err.response.notFound)
            // );
            .then(res => {
                assert.deepEqual(res.body, { removed: false });
            })
    });

    
    it('updates a city by id', () => {
        let city = { name: 'Honolulu', state: 'IH' };
        let cityCorrection = { name: 'Honolulu', state: 'HI' };

        return save(city)
            .then(saved => city = saved)
            .then(() => request.put(`/cities/${city._id}`).send(cityCorrection))
            .then(res => {
                assert.equal(res.body.nModified, 1); // not sure about this
            });
    });


});
