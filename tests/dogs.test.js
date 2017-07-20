const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const {assert} = chai;

const connection = require('../lib/db');
const url = 'mongodb://localhost:27017/dogs-test';

const app = require('../lib/app');

describe('dogs resource', () => {
    before(() => connection.connect(url));
    before(() => connection.db.dropDatabase());

    const request = chai.request(app);

    function saveDog(dog) {
        return request.post('/dogs')
            .send(dog)
            .then(res => res.body);
    }

    let dog = {name:'steve',breed:'yellow lab'};
    let dog2 = {name:'jake',breed:'golden retriever'};

    it('saves', () => {
        return saveDog(dog)
            .then(saved => {
                assert.ok(saved._id);
                assert.equal(saved.name, dog.name);
                assert.equal(saved.breed, dog.breed);

                dog = saved;
            });
    });

    it('gets all saved objects', () => {
        return saveDog(dog2)
            .then(saved => dog2 = saved)
            .then(() => request.get('/dogs'))
            .then(res => {
                const saved = res.body;
                assert.deepEqual(saved, [dog,dog2]);
            });
    });
});