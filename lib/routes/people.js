const db = require('../db');
module.export = function(req) {
  db.connect('people', err => {
    return (req.url.route = '/people');
    // console.log('in people.js: ', req.method);
  });
  db.close();
};
// create db connection to collection for /people calls
