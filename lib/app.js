const bodyParser = require('body-parser');
const parseUrl = require('./utils/parse-url');
const notFound = require('./utils/not-found');
const connection = require('../db');
const ObjectID = require('mongodb').ObjectID;
const express = require('express');
const path = require('path');
const app = express();

app.use(bodyParser.json());

const publicDir = path.resolve(__dirname, '../public');
app.use(express.static(publicDir));

app.get('/puppies/:id', (req, res) => {
    const Puppies = connection.db.collection('puppies');

    const query = {};
    if (req.query.name) query.name = req.query.name;
    if (req.query.type) query.type = req.query.type;

    Puppies.find()
        .toArray()
        .then(puppies => res.send(puppies))
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

    Puppies.updateOne(
        { _id: new ObjectID(req.params.id) },
        { $set: { status: req.body.status } },
        { returnOriginal: false }
    )
        .then(puppies => res.send(puppies))
        .catch(console.log); //eslint-disable-line
});

// function app(req, res){
//     res.setHeader('Content-Type', 'application/json');
//     req.url = parseUrl(req.url);

//     bodyParser(req)
//         .then(body => req.body = body)
//         .then(() => {
//             const route = routes[req.url.route] || notFound;
//             route(req, res);
//         })
//         .catch(console.log); //eslint-disable-line
// }

// module.exports = app;