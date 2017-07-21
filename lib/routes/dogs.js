const connection = require('../db');
const notFound = require('../utils/not-found');
const ObjectID = require('mongodb').ObjectID;


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
        console.log(req.url.params)
        if (req.url.params.id !== undefined) {
            const reqId = new ObjectID(req.url.params.id);
            dogs.findOne({ _id: reqId})
                .then(dogs => res.end(JSON.stringify(dogs)))
                .catch(console.log);
        }
        else {
            dogs.find({})
                .toArray()
                .then(dogs => res.end(JSON.stringify(dogs)))
                .catch(console.log);
        }
    }
    else {
        notFound(req, res);
    }
}