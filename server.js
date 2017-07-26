const http = require('http');
const db = require('./lib/db.js');
const app = require('./lib/app.js');

const url = 'mongodb://localhost:27017/dogs';
db.connect(url);

const server = http.createServer(app);
const port = 3000;
server.listen(port, () => {
    console.log('server is running on', server.address().port);
});