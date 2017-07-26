const bodyParser = require('body-parser');
const parseUrl = require('./utils/parse-url');
const notFound = require('./utils/not-found');
const connection = require('./db');
const ObjectID = require('mongodb').ObjectID;
const express = require('express');
const path = require('path');
const app = express();

app.use(bodyParser.json());

const publicDir = path.resolve(__dirname, '../public');
app.use(express.static(publicDir));

app.get('/puppies', (req, res) => {
    const Puppies = connection.db.collection('puppies');

    const query = {};
    if (req.query.name) query.name = req.query.name;
    if (req.query.type) query.type = req.query.type;

    Puppies.find(query)
        .toArray()
        .then(puppies => res.send(puppies))
        .catch(console.log);//eslint-disable-line
});

app.get('/puppies/:id', (req, res) => {
    const Puppies = connection.db.collection('puppies');
    Puppies.findOne({ _id: new ObjectID(req.params.id)})
        .then(puppy => {
            res.send(puppy);
        })
        .catch(console.log);

});

app.post('/puppies', (req, res) => {
    const Puppies = connection.db.collection('puppies');
    Puppies.insert(req.body)
        .then(res => res.ops[0])
        .then(puppies => res.send(puppies))
        .catch(console.log); //eslint-disable-line
});

app.post('/puppies/:id/status', (req, res) => {
    const Puppies = connection.db.collection('puppies');
    const status = req.body.status ? req.body.status : null;

    Puppies.findOneAndUpdate(
        { _id: new ObjectID(req.params.id) },
        { $set: { status: status } },
        { returnOriginal: false }
    )
        .then(puppy => res.send(puppy))
        .catch(console.log); //eslint-disable-line
});

app.delete('/puppies/:id', (req, res) => {
    const Puppies = connection.db.collection('puppies');
    Puppies.removeOne({ _id: new ObjectID(req.params.id)})
        .then(({result}) => res.send({ removed: result.n === 1}))
        .catch(console.log);//eslint-disable-line

});
app.post('/puppies/:id/snacks', (req, res) => {
    const Puppies = connection.db.collection('puppies');
    const snacks = req.body.snack ? [req.body.snack] : req.body.snacks;

    Puppies.findOneAndUpdate({ _id: new ObjectID(req.params.id) }, 
        { $addToSet: { snacks: { $each: snacks } }}, 
        { returnOriginal: false})
        .then(({ value } ) => res.send(value))
        .catch(console.log);//eslint-disable-line
});

app.delete('/puppies/:id/snacks', (req, res) => {
    const Puppies = connection.db.collection('puppies');

    Puppies.findOneAndUpdate( { _id: new ObjectID(req.params.id)}, 
        { $pull: { snacks: { $in: req.body.snacks }}}, 
        { returnOriginal: false})
        .then(({value}) => {
            res.send(value);})
        .catch(console.log);//eslint-disable-line
});

module.exports = app;