const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use('chaiHttp');
const{assert} = chai;
const connection = require('../lib/db');
const url = 'mongodb://localhost:27017/puppies-test';
const app = require('../lib/app');

describe('puppies', () => {
    before(() => connection.connect(url));
    before(() => connection.db.dropDatabase);

    const request = chai.request(app);

    it('saves', () => {
        const puppy = { name: 'cheddar', type: 'red heeler'};
        return request.post('/puppies')
            .send(puppy)
            .then(res => {
                const saved = res.body;
                assert.ok(saved._id);
                assert.equal(saved.name, puppy.name);
                assert.equal(saved.type, puppy.type);

            });

    });
});
