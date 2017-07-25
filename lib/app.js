const express = require('express');
const app = express();
const ObjectID = require('mongodb').ObjectID;
const bodyParser = require('body-parser');
const connection = require('./db');

app.use(bodyParser.json());

app.post('/cheeses', (req, res) => {
    const cheeses = connection.db.collection('cheeses');
    cheeses.insert(req.body)
        .then(res => res.ops[0])
        .then(cheese => res.send(cheese))
        .catch(console.log);
});

app.get('/cheeses', (req, res) => {
    const cheeses = connection.db.collection('cheeses');
    const query = {};
    if (req.query.name) query.name = req.query.name;
    if (req.query.origin) query.origin = req.query.origin;

    cheeses.find(query).toArray()
        .then(cheeseArray => res.send(cheeseArray))
        .catch(console.log);
});

app.get('/cheeses/:id', (req, res) => {
    const cheeses = connection.db.collection('cheeses');
    const id = req.params.id;
    cheeses.findOne({ _id: new ObjectID(id) })
        .then(cheese => cheese ? res.send(cheese) : res.status(404).send('Not Found'))
        .catch(console.log);

});

app.delete('/cheeses/:id', (req, res) => {
    const cheeses = connection.db.collection('cheeses');
    const id = req.params.id;
    cheeses.removeOne({ _id: new ObjectID(id) })
        .then(({ result }) => res.send({ removed: result.n === 1 }))
        .catch(console.log);

});

app.put('/cheeses/:id', (req, res) => {
    const cheeses = connection.db.collection('cheeses');
    const id = req.params.id;
    const propToUpdate = req.body;
    cheeses.findOneAndUpdate(
        { _id: new ObjectID(id) },
        { $set: propToUpdate },
        { returnOriginal: false })
        .then(({ updated }) => res.send(updated))
        .catch(console.log);
});

app.post('/cheeses/:id/wine-pairings', (req, res) => {
    const cheeses = connection.db.collection('cheeses');
    const id = req.params.id;
    const winePairings = req.body.winePairing ? [req.body.winePairing] : req.body.winePairings;
    cheeses.findOneAndUpdate(
        { _id: new ObjectID(id) },
        { $addToSet: { winePairings: { $each: winePairings } } },
        { returnOriginal: false }
    )
        .then(({ value }) => res.send(value))
        .catch(console.log);
});

app.delete('/cheeses/:id/wine-pairings', (req, res) => {
    const cheeses = connection.db.collection('cheeses');
    const id = req.params.id;
    cheeses.findOneAndUpdate(
        { _id: new ObjectID(id) },
        { $pull: { winePairings: req.body.winePairing } },
        { returnOriginal: false }
    )
        .then(({ value }) => res.send(value))
        .catch(console.log);
});

app.get('*', (req, res) => {
    res.status(404).send('Not Found');
});

module.exports = app;