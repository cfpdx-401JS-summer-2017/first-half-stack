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

module.exports = app;