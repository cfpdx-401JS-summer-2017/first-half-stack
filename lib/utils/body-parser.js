module.exports = function bodyParser(req) {
  return new Promise((resolve, reject) => {
    console.log('3')

    let body = '';

    req.on('data', data => {
      body += data;
    });

    req.on('end', () => {
      const obj = body ? JSON.parse(body) : null;
      console.log('4: ', obj)
      resolve(obj);
    });

    req.on('error', reject);
  });
};
