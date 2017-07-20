const connection = require('../db');
const notFound = require('../utils/not-found');

module.exports = function dogs(req, res) {
    const dogs = connection.db.collection('dogs');

    if (req.method === 'POST') {
        dogs.insert(req.body)
            .then(result => result.ops[0])
            .then(saved => {
                res.end(JSON.stringify(saved));
            })
            .catch(console.log);
    }
    else if (req.method === 'GET') {
        dogs.find({})
            .toArray()
            .then(dogs => res.end(JSON.stringify(dogs)))
            .catch(console.log);

    }
    else {
        notFound(req, res);
    }
}