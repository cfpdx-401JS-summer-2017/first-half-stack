const bodyParser = require('./utils/body-parser');
const parseUrl = require('./utils/parse-url');
const notFound = require('./utils/not-found');
const puppies = require('./routes/puppies');

const routes = {
    puppies
};

function app(req, res){
    res.setHeader('Content-Type', 'application/json');
    req.url = parseUrl(req.url);

    bodyParser(req)
        .then(body => req.body = body)
        .then(() => {
            const route = routes[req.url.route] || notFound;
            route(req, res);
        })
        .catch(console.log);
}

module.exports = app;