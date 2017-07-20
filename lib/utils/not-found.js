const cowsay = require('cowsay');

module.exports = function notFound(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 404;
    const message = res.statusMessage = `${req.method} ${req.url.path} Not Found`;
    const cowsaid = cowsay.say({
        text: message,
        e: 'oO',
        t: 'U '
    });
    res.end(`<pre>${cowsaid}</pre>`);
};