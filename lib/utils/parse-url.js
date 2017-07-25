const parseUrl = require('url').parse;

module.exports = function parsePath(urlPath) {
  const parsed = parseUrl(urlPath, true);
  //true means that the url is parsed as an object instead of a string
  const parts = parsed.pathname.slice(1).split('/');
  return (parsedUrl = {
    path : urlPath,
    route : parts[0],
    query : parsed.query,
    params : {
      id : parts[1]
    }
  });
};
