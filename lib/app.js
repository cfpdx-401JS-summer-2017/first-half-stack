const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const ObjectID = require('mongodb').ObjectID;

const connect = require('./db');
const notFound = require('./utils/not-found');

const path = require('path');
const public = path.resolve(__dirname, '../public');

app.use(bodyParser.json());
app.use(express.static(public));

app.post('/cities', (req, res) => {
    const Cities = connect.db.collection('cities');
    Cities.insert(req.body)
        .then(res => res.ops[0])
        .then(cities => res.send(cities))
        .catch(console.log);
});

app.get('/cities', (req, res) => {
    const Cities = connect.db.collection('cities');

    let query = {};
    if(req.query.name) query.name = req.query.name;
    if(req.query.state) query.state = req.query.state;

    Cities.find(query).toArray()
        .then(cities => (cities.length === 0) ? notFound(req, res) : res.send(cities))
        .catch(console.log);
});

app.get('/cities/:id', (req, res) => {
    const Cities = connect.db.collection('cities');
    Cities.findOne({ _id: new ObjectID(req.params.id) })
        .then(cities => (cities === null) ? notFound(req, res) : res.send(cities))
        .catch(console.log);
});

app.delete('/cities/:id', (req, res) => {
    const Cities = connect.db.collection('cities');
    Cities.removeOne({ _id: new ObjectID(req.params.id) })
        .then(({ result }) => res.send({ removed: result.n === 1 }))
        .catch(console.log);
});

app.put('/cities/:id', (req, res) => {
    const Cities = connect.db.collection('cities');
    Cities.updateOne({ _id: new ObjectID(req.params.id) }, req.body)
        .then(({ result }) => res.send({ updated: result.n === 1 }))
        .catch(console.log);
});

app.post('/cities/:id/attractions', (req, res) => {
    const Cities = connect.db.collection('cities');
    const attractions = req.body.attraction ? [req.body.attractions] : req.body.attractions;

    Cities.findOneAndUpdate({
        _id: new ObjectID(req.params.id)
    },{
        $addToSet: { attractions: { $each: attractions }}
    },{
        returnOriginal: false
    })
    .then(({ value }) => res.send(value))
    .catch(console.log);
});

app.delete('/cities/:id/attractions', (req, res) => {
    const Cities = connect.db.collection('cities');

    Cities.findOneAndUpdate({
        _id: new ObjectID(req.params.id)
    },{
        $pull: { attractions: req.body.attractions }
    },{
        returnOriginal: false
    })
    .then(({ value }) => res.send(value))
    .catch(console.log);
});

module.exports = app;
