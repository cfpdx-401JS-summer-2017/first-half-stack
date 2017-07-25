const db = require('../db');
const ObjectID = require('mongodb').ObjectID;
const notFound = require('../utils/not-found');

// grab the parameters and make the db calls here
module.exports = function people(req, res) {
  console.log('6');
  const person = db.db.collection('people');

  if (req.method === 'POST') {
    person.insert(req.body)
      .then(result => result.ops[0])
      .then(saved => {
        res.end(JSON.stringify(saved));
      })
      .catch(console.log);
  } else if (req.method === 'GET') {
    // if (req.body._id) {
    person.find()
      .toArray()
      .then(arr => {
        res.end(JSON.stringify(arr));
      })
      .catch(console.log);
    // } else { }
  }
}
