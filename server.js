const http = require('http');
const db = require('./lib/db');
const app = require('./lib/app');

const url = 'mongodb://localhost:27017/cheeses';
db.connect(url);

const server = http.createServer(app);
const port = 3000;

server.listen(port, () => {
    console.log('server is running on port', server.address().port);
});