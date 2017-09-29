const connection = require('../db');


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
    console.log(44, req.url.params.id)

    if (req.url.params.id !== undefined) {
      const {id} = req.url.params
      person.findOne({
        _id: id
      })
        .then(foundPerson => console.log(89, foundPerson))
    } else if (!req.params) {
      person.find()
        .toArray()
        .then(arr => {

          res.end(JSON.stringify(arr));
        })
        .catch(console.log);
    }
  }
}
