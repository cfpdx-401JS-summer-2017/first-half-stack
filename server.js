const http = require('http');
const app = require('./lib/app');
const db = require('./lib/db');
const server = http.createServer(app);
const port = 3000;
const url = 'mongodb://localhost:27017/puppies';
db.connect(url);


server.listen(port, () => {
    console.log('http server running on', port);
});
