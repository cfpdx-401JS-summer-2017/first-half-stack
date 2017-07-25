module.exports = function notFound(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 404;
    res.statusMessage = `${res.statusCode} not found`;
    res.end(res.statusMessage);
};