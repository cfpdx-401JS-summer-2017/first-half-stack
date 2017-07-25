const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//const notFound = require('./utils/not-found');

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('OMG! it worked!');
});

module.exports = app;