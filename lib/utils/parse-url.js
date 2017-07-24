const url = require('url');

module.exports = function parseUrl(urlToParse, cb) {
  return url.parse(urlToParse, (parsedUrl, err) => {
    cb(parsedUrl, err);
  });
};
