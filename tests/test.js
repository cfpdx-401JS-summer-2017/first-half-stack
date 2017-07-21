const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const {assert} = chai;

const connection = require('../lib/db');

const url = 'mongodb://localhost:27017/pets';

const app = require('../lib/app');

describe('dogs resource', () => {
    
    before(() => connection.connect(url));
    before(() => connection.db.dropDatabase());

    const request = chai.request(app);

    let saved = '';

    it('saves', ()=> {
        const dog = { name: 'tiffany', breed:'labradoodle'};
        return request.post('/dogs') 
            .send(dog)
            .then(res => {
                saved = res.body;
                assert.ok(saved._id);
                assert.equal(saved.name, dog.name);
                assert.equal(saved.breed, dog.breed);
            });  
    });
    it('gets by the id', () => {
        return request.get(`/dogs/${saved._id}`)
        .then (res => {
            assert.equal(res.body._id, saved._id);
        });    
    });
    it('pulls the collection of dogs', () => {
        console.log('hi how are you?')
        return request.get('/dogs')
        .then (res => {
            assert.equal(res.body, saved);
        });
    });

});