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
    } else if(req.method === 'DELETE') {
        const cityId = new ObjectID(req.url.params.id);
        cities.removeOne({ _id: cityId })
            .then(city => city === null ? notFound(req, res) : res.end(JSON.stringify(city)))//res.end(`Removed city with id: ${cityId}`))
            .catch(console.log);
    } else {
        notFound(req, res);
    }
};
