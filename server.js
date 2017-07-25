const http = require('http');
const db = require('./lib/db');
const app = require('./lib/app');

const url = 'mongodb://localhost:27017/pets';

db.connect(url);

const server = http.createServer(app);
const port = 3000;
server.listen(port, ()=>{
    console.log('server running on', server.address().port);
});