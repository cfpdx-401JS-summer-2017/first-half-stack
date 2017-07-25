const parseUrl = require('./utils/parse-url');
const bodyParser = require('./utils/body-parser');
const notFound = require('./utils/not-found');
const people = require('./routes/people');

const routes = {
  people
};

function app(req, res) {
  res.setHeader('Content-Type', 'application/json');
  req.url = parseUrl(req.url);

  bodyParser(req)
    .then(body => (req.body = body))
    .then(() => {
      console.log('back from the body parser! ');
      const route = routes[req.url.route] || notFound;
      route(req, res);
    })
    .catch(console.log);
}

module.exports = app;

// include body-parser (converts body to json), parse-url (splits url into parts), not-found (writes error headers) - I write these as utils
