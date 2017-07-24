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

    let dog = {name:'steve', breed:'yellow lab'};
    let dog2 = {name:'jake', breed:'golden retriever'};
    let dog3 = {name:'kasha', breed:'border collie'};

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
            .then(savedDog => dog2 = savedDog)
            .then(() => request.get('/dogs'))
            .then(res => {
                const dogsList = res.body;
                assert.equal(dogsList[0].name, 'steve');
                assert.equal(dogsList[1].name, 'jake');
            });
    });

    it('gets a saved object by id', () => {
        return saveDog(dog3)
            .then(savedDog => dog3 = savedDog)
            .then(() => request.get(`/dogs/${dog3._id}`))
            .then(res => {
                const gotDog = res.body;
                assert.deepEqual(gotDog, dog3);
            });
    });

    it('returns a 404 if faulty id on get request', () => {
        return request.get('/dogs/59711a9fe09b842aa8bca961')
            .then( () => {throw new Error('Expected 404 error instead got 200');},
                err => assert.ok(err.response.notFound)
            );
    });

    it('deletes a dog by id', () => {
        return request.delete(`/dogs/${dog2._id}`)
            .then(res => {
                const confirmation = res.body;
                assert.deepEqual(confirmation, {removed:true});
            });
    });

    it('returns "false" if faulty id on delete request', () => {
        return request.delete('/dogs/59711a9fe09b842aa8bca961')
            .then( res => {
                const confirmation = res.body;
                assert.deepEqual(confirmation, {removed:false});
            });
    });

    it('updates info of a dog', () => {
        const newData = {name:'louis', breed:'cavalier king charles spaniel'};
        return request.put(`/dogs/${dog._id}`).send(newData)
            .then(res => {
                const data = res.body;
                assert.equal(data.nModified, 1);
            });
    });

});