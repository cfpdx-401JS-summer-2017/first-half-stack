const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const {assert} = chai;


const connection = require('../lib/db');

const url = 'mongodb://localhost:27017/puppies-test';
const app = require('../lib/app');

describe('puppies', () => {
    before(() => connection.connect(url));
    before(() => connection.db.dropDatabase());

    const request = chai.request(app);

    it('saves', () => {
        const puppy = { name: 'cheddar', type: 'red heeler' };
        return request.post('/puppies')
            .send(puppy)
            .then(res => {
                const saved = res.body;
                assert.ok(saved._id);
                assert.equal(saved.name, puppy.name);
                assert.equal(saved.type, puppy.type);

            });

    });
    it('gets all puppies in the db', () => {
        return request.get('/puppies')
            .then(res => {
                const allPuppies = res.body;
                assert.equal(allPuppies[0].name, 'cheddar');
                assert.equal(allPuppies[0].type, 'red heeler');
            });
    });
    it('gets a puppy by its id', () => {
        const puppy = { name: 'clinton', type: 'chihuahua' };
        let savedPuppy = null;
        return request.post('/puppies')
            .send(puppy)
            .then(res => {
                savedPuppy = res.body;
            })
            .then(() => {
                return request.get(`/puppies/${savedPuppy._id}`);
            })
            .then(res => {
                const foundPuppy = res.body;
                assert.deepEqual(foundPuppy, savedPuppy);
            });
    });
    it('returns 404 if no id exists', () => {
        return request.get('/puppies/597138b152ce04392740f087')
            .catch(res => {
                assert.equal(res.status, 404);
            });
    });
    it('deletes a puppy with given id', () => {
        const puppy = { name: 'tater', type: 'tot' };
        let savedPuppy = null;
        return request.post('/puppies')
            .send(puppy)
            .then(res => savedPuppy = res.body)
            .then(() => {
                return request.delete(`/puppies/${savedPuppy._id}`);
            })
            .then(res => {
                assert.deepEqual(res.body, { removed: true });
            });
    });
    it('returns a different response if a bad delete id is given', () => {
        return request.delete('/puppies/597138b152ce04392740f087')
            .then(res => {
                assert.deepEqual(res.body, { removed: false });
            });
    });
    it('updates a puppy', () => {
        const puppy = { name: 'jeffri', type: 'huski' };
        let savedPuppy = null;
        return request.post('/puppies')
            .send(puppy)
            .then(res => savedPuppy = res.body)
            .then( () => {
                return request
                    .post(`/puppies/${savedPuppy._id}/status`)
                    .send({ status: 'good boi'});
            })
            .then(res => {
                assert.equal(res.body.value.status, 'good boi' );
            });
    });

    it('finds puppies specified by query', () =>{
        return request.get('/puppies?name=cheddar')
            .then( res => {
                let gotPuppy = res.body[0];
                assert.equal(gotPuppy.name, 'cheddar');
            });
    });
    
    it('finds puppies by another query', () => {
        return request.get('/puppies?type=chihuahua')
            .then(res => {
                let gotPuppy = res.body[0];
                assert.equal(gotPuppy.type, 'chihuahua');
            });
    });

    it('saves favorite snacks to a given puppy', () => {
        return request.get('/puppies?name=cheddar')
            .then(res => {
                return request.post(`/puppies/${res.body[0]._id}/snacks`)
                    .send({snacks: ['bully sticks', 'meatloaf', 'cheezburgur']})
                    .then(res => assert.deepEqual(res.body.snacks, ['bully sticks', 'meatloaf', 'cheezburgur']));
            });
    });

    it('deletes a favorite snack from a given puppies snack list', () => {
        return request.get('/puppies?name=cheddar')
            .then(res => {
                return request.delete(`/puppies/${res.body[0]._id}/snacks`)
                    .send({snacks: ['bully sticks']})
                    .then(res => assert.deepEqual(res.body.snacks, ['meatloaf', 'cheezburgur']));
            });
    });
});
