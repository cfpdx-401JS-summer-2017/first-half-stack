const connection = require('../db');
const notFound = require('../utils/not-found');

module.exports = function cities(req, res) {
    const cities = connection.db.collection('cities');

    if(req.method === 'POST') {
        cities.insert(req.body)
            .then(result => result.ops[0])
            .then(saved => {
                res.end(JSON.stringify(saved));
            })
            .catch(console.log);
    } else if(req.method === 'GET') {
        cities.find({})
            .toArray()
            .then(cities => res.end(JSON.stringify(cities)))
            .catch(console.log);
    }
    else {
        notFound(req, res);
    }
};
