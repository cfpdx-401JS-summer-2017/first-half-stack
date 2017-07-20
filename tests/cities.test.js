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

    it('saves', () => {
        const city = { name: 'Chicago', state: 'IL'};
        return request.post('/cities')
            .send(city)
            .then(res => {
                const saved = res.body;
                assert.ok(saved._id);
                assert.equal(saved.name, city.name);
                assert.equal(saved.state, city.state);
            });
    });

    //it('gets all cities', () => {

    // });
});
