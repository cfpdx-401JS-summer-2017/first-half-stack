const express = require('express');
const app = express();
const connect = require('./db');
const bodyParser = require('body-parser');
const ObjectID = require('mongodb').ObjectID;
const notFound = require('./utils/not-found');

app.use(bodyParser.json());

app.post('/dogs', (req, res) => {
    const Dogs = connect.db.collection('dogs');
    Dogs.insert(req.body)
        .then(result => result.ops[0])
        .then(saved => {
            res.send(saved);
        })
        .catch(console.log);
});
app.get('/dogs', (req, res) => {
    const Dogs = connect.db.collection('dogs');
    Dogs.find().toArray()
        .then(dogs => res.send(dogs))
        .catch(console.log);
});
app.get('/dogs/:id', (req, res) => {
    const Dogs = connect.db.collection('dogs');
    Dogs.findOne({_id: new ObjectID(req.params.id)})
        .then(dogs => {
            if (dogs === null) {
                notFound(req, res);
            } else {
                res.send(dogs);
            }
        })
        .catch(console.log);
});
app.put('/dogs/:id', (req, res) => {
    const Dogs = connect.db.collection('dogs');
    Dogs.findOneAndUpdate({_id: new ObjectID(req.params.id)}, req.body)
        .then(() => res.send({updated: true}))
        .catch(console.log);
});

module.exports = app;