module.exports = function bodyParser(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', data => {
      console.log('data: ', data);
      body += data;
    });

    req.on('end', () => {
      console.log('end');
      const obj = body ? JSON.parse(body) : null;
      resolve(obj);
    });

    req.on('error', reject);
  });
};
