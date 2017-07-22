const ObjectID = require('mongodb').ObjectID;
const connection = require('../db');
const notFound = require('../utils/not-found');

module.exports = function cities(req, res) {
    const cities = connection.db.collection('cities');

    if(req.method === 'POST') {
        cities.insert(req.body)
            .then(result => result.ops[0])
            .then(saved => res.end(JSON.stringify(saved)))
            .catch(console.log);
    } else if(req.method === 'GET' && req.url.params.id) {
        const cityId = new ObjectID(req.url.params.id);
        cities.findOne({ _id: cityId })
            .then(city => city === null ? notFound(req, res) : res.end(JSON.stringify(city)))
            .catch(console.log);
    } else if(req.method === 'GET') {
        cities.find({})
            .toArray()
            .then(cities => res.end(JSON.stringify(cities)))
            .catch(console.log);
    } else if(req.method === 'DELETE' && req.url.params.id) {
        const cityId = new ObjectID(req.url.params.id);
        cities.removeOne({ _id: cityId })
            .then(city => {
                if(city.result.n != 1) res.end(JSON.stringify({ removed: false }));
                else res.end(JSON.stringify({ removed: true }));
            })
            .catch(console.log);
    } else if(req.method === 'PUT' && req.url.params.id) {
        const cityId = new ObjectID(req.url.params.id);
        cities.updateOne({ _id: cityId }, req.body)
            // .then(city => city === null ? notFound(req, res) : res.end(JSON.stringify(city)))
            .then(city => {
                if(city.result.nModified != 1) res.end(JSON.stringify({ updated: false }));
                else res.end(JSON.stringify({ updated: true }));
            })
            .catch(console.log);

    } else {
        notFound(req, res);
    }
};
