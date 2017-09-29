const connection = require('../db');
const ObjectID = require('mongodb').ObjectID;

module.exports = function people(req, res) {
  const person = connection.db.collection('people');

  if (req.method === 'POST') {
    person.save(req.body)
      .then(result => result.ops[0])
      .then(saved => {
        return res.end(JSON.stringify(saved));
      })
      .catch(console.log);
  } else if (req.method === 'GET') {
    if (req.url.params.id !== undefined) {
      const {id} = req.url.params
      person.findOne({
        _id: new ObjectID(id)
      })
        .then(foundPerson => {
          return res.end(JSON.stringify(foundPerson))
        })
        .catch(console.log);
    } else if (!req.params) {
      person.find()
        .toArray()
        .then(arr => {
          res.end(JSON.stringify(arr));
        })
        .catch(console.log);
    }
  } else if (req.method === 'DELETE') {
    if (req.url.params.id !== undefined) {
      const {id} = req.url.params
      person.deleteOne({
        _id: new ObjectID(id)
      })
        .then(response => {
          return res.end(JSON.stringify(response.deletedCount ? {
            removed: true
          } : {
            removed: false
          }))
        })
        .catch(console.log);
    }
  } else if (req.method === 'PUT') {
    if (req.url.params.id !== undefined) {
      const {id} = req.url.params
      person.findOneAndUpdate({
        _id: new ObjectID(id)
      },
        {
          $set: {
          name: 'edgar'
        }
      })
        .then(response => {
          return res.end(JSON.stringify(response))
        })
        .catch(console.log);
    }
  }
}