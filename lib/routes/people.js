const db = require('../db');
const ObjectID = require('mongodb').ObjectID;
const notFound = require('../utils/not-found');

module.export = function people(req, res) {
  console.log(req.method);
  const People = db.db.collection('people');

  // routing here
  // if(req.method === 'GET'{

  // })
};
// create db connection to collection for /people calls
