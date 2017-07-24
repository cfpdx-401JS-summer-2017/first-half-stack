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
        
        if (!req.url.params.id) {
            dogs.find({})
                .toArray()
                .then(dogs => res.end(JSON.stringify(dogs)))
                .catch(console.log);  
        }
        else {
            const reqId = new ObjectID(req.url.params.id);
            dogs.findOne({ _id: reqId })
                .then(dogs => {
                    if(dogs===null) {
                        notFound(req, res);
                    }else{
                        res.end(JSON.stringify(dogs));
                    }
                })
                .catch(console.log);
        }
    } 
    else if (req.method === 'PUT') {
        const reqId = new ObjectID(req.url.params.id);
        dogs.update({ _id: reqId }, req.body)
            .then(dogs => {
                dogs = JSON.parse(dogs);
                if (dogs.nModified === 0) {
                    notFound(req, res);
                } else {
                    res.end(JSON.stringify({updated: true}));
                }
            })
            .catch(console.log);
    }
    else if (req.method === 'PATCH') {
        const reqId = new ObjectID(req.url.params.id);
        dogs.update({ _id: reqId }, {$set: req.body})
            .then(() => res.end(JSON.stringify({updated: true})))
            .catch(console.log);
    }
    else if (req.method === 'DELETE') {
        const reqId = new ObjectID(req.url.params.id);
        dogs.deleteOne({ _id: reqId })
            .then((data) => {
                if (data.deletedCount === 1) {
                    res.end(JSON.stringify({ removed: true }));
                }
                else {
                    res.end(JSON.stringify({ removed: false }));
                }
            })
            .catch(console.log);

    }
    else {
        notFound(req, res);
    }
};