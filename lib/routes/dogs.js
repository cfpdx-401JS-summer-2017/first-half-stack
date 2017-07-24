const connection = require('../db');
const notFound = require('../utils/not-found');
const ObjectID = require('mongodb').ObjectID;

module.exports = function dogs(req,res) {
    const dogs = connection.db.collection('dogs');

    if(req.method === 'POST') {
        dogs.insert(req.body)
            .then(result => result.ops[0])
            .then(saved => {
                res.end(JSON.stringify(saved));
            })
            .catch(console.log);

    } else if(req.method === 'GET' && !req.url.params.id) {
        dogs.find({})
            .toArray()
            .then(dogs => res.end(JSON.stringify(dogs)))
            .catch(console.log);

    } else if(req.method === 'GET' && req.url.params.id) {
        let id = new ObjectID(req.url.params.id);

        dogs.findOne({_id : id})
            .then(dog => {
                if(!dog) {
                    return notFound(req, res);
                } else {
                    res.end(JSON.stringify(dog));
                }
            })
            .catch(console.log);

    } else if(req.method === 'DELETE') {
        let id = new ObjectID(req.url.params.id);

        dogs.findOne({_id : id})
            .then(dog => {
                if(!dog) {
                    res.end (JSON.stringify({removed:false}));
                } else {
                    res.end (JSON.stringify({removed:true}));
                }
            });

    } else {
        notFound(req,res);
    }
};