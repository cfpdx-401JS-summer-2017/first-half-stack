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
app.post('/dogs/:id/toys', (req, res) => {
    const Dogs = connect.db.collection('dogs');
    const toys = req.body.toys ? [req.body.toys] : req.body.toys;
    Dogs.findOneAndUpdate({
        _id: new ObjectID(req.params.id)
    },{
        $addToSet:{toys: {$each: toys}}
    },{
        returnOriginal: false
    })
        .then(({value})=>res.send(value))
        .catch(console.log);
});
app.get('/dogs', (req, res) => {
    const Dogs = connect.db.collection('dogs');
    const query = {};
    if(req.query.breed) query.breed = req.query.breed;
    if(req.query.name) query.name = req.query.name;

    Dogs.find(query).toArray()
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
app.delete('/dogs/:id/toys', (req, res) => {
    const Dogs = connect.db.collection('dogs');
    Dogs.findOneAndUpdate({
        _id: new ObjectID(req.params.id)
    },{
        $pull:{ toys: req.body.toys}
    },{
        returnOriginal: false
    })
        .then(({value}) => res.send(value))
        .catch(console.log);
});
app.delete('/dogs/:id', (req, res) => {
    const Dogs = connect.db.collection('dogs');
    Dogs.removeOne({_id: new ObjectID(req.params.id)})
        .then(({ result }) => res.send( { removed: result.n === 1 }))
        .catch(console.log);
});

module.exports = app;