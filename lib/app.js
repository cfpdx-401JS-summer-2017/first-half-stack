const parseUrl = require('./utils/parse-url');
const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const db = require('./db');

app.use(bodyParser.json());


console.log('2')
// res.setHeader('Content-Type', 'application/json');
// req.url = parseUrl(req.url);

// url is POST /people

app.post('/people', (req, res) => {
  const Person = db.db.collection('people');

  Person.insert(req.body)
    .then(result => result.ops[0])
    .then(saved => {
      res.end(JSON.stringify(saved));
    })
    .catch(console.log);
})
// url is GET /people
// url is GET /people/:id
// url is DELETE /<people>/:id
// url is PUT /<people>/:id


module.exports = app;
