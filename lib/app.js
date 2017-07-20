const bodyParser = require('./utils/body-parser');
const parseUrl = require('./utils/parse-url');
const cheeses = require('./routes/cheeses');


const routes = {
    cheeses
};

module.exports = function app(req, res){
    res.setHeader('Content-Type', 'application/json');
    req.url = parseUrl(req.url);

    bodyParser(req)
        .then(body => req.body = body)
        .then(() => {
            const route = routes[req.url.route] || null;
            route(req,res);
        })
        .catch(console.log);
};