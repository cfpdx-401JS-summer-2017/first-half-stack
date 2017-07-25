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

// app.get('/', (req, res) => {
//     res.send('OMG! it worked!');
// });

app.post('/cities', (req, res) => {
    const Cities = connect.db.collection('cities');
    Cities.insert(req.body)
        .then(res => res.ops[0])
        .then(cities => res.send(cities))
        .catch(console.log);
});

// app.get('/cities', (req, res) => {
//     const Cities = connect.db.collection('cities');
//     Cities.find().toArray()
//         .then(cities => res.send(cities))
//         .catch(console.log);
// });

app.get('/cities', (req, res) => {
    const Cities = connect.db.collection('cities');

    let query = {};
    if(req.query.name) query.name = req.query.name;
    if(req.query.state) query.state = req.query.state;

    Cities.find(query).toArray()
        .then(cities => res.send(cities))
        .catch(console.log);
});

app.get('/cities/:id', (req, res) => {
    const Cities = connect.db.collection('cities');
    Cities.findOne({ _id: new ObjectID(req.params.id) })
        .then(cities => res.send(cities))
        .catch(console.log);
        // .catch(notFound(req, res)); // TODO: this doesn't work
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
        .then(cities => res.send(cities))
        .catch(console.log);
});

module.exports = app;