const express = require('express');
const app = express();
const bodyParser = require('body-parser').json();
const errorHandler = require('./utils/error-handler')();
const morgan = require('morgan');


app.use(morgan('dev'));
app.use(bodyParser);

const people = require('./routes/people');

app.use('/people', people);

app.use(errorHandler);

module.exports = app;
