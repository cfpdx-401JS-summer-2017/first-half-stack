const url = require('url');

module.exports = function parseUrl(urlToParse) {
  const parsedUrl = url.parse(urlToParse, true);
  return parsedUrl;
};
