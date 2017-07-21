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

    const request = chai.request(app);

    function save(city) {
        return request.post('/cities')
            .send(city)
            .then(res => res.body);
    }

    it.skip('saves', () => {
        const city = { name: 'Chicago', state: 'IL' };
        return save(city)
            .then(saved => {
                assert.ok(saved._id);
                assert.equal(saved.name, city.name);
                assert.equal(saved.state, city.state);
            });
    });

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
                // cities = cities.sort(function (a, b) { return a.name - b.name; });
                assert.deepEqual(saved, cities);
            });
    });
    
});
