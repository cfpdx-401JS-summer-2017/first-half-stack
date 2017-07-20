const bodyParser = require('./utils/body-parser');
const parseUrl = require('./utils/url-parser');
const notFound = require('./utils/not-found');
const cities = require('./routes/cities');

const routes = {
    cities
};

module.exports = function app(req, res) {
    res.setHeader('Content-Type', 'application/json');
    req.url = parseUrl(req.url);

    bodyParser(req)
        .then(body => req.body = body)
        .then(() => {
            const route = routes[req.url.route] || notFound;
            route(req, res);
        })
        .catch(console.log);
};
