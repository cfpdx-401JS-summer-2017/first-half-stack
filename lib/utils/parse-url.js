const parseUrl = require('url').parse;

module.exports = function parsePath(urlPath) {
  const parsed = parseUrl(urlPath, true);
  const parts = parsed.pathname.slice(1).split('/');
  return parsedUrl = {
    path: urlPath,
    route: parts[0],
    query: parsed.query,
    params: {
      id: parts[1]
    }
  };
};
