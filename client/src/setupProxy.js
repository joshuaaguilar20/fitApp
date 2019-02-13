
const proxy = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(proxy('/api/*', { target: `thawing-ridge-14441.herokuapp.com` }))
  app.use(proxy('/auth/*', { target: `thawing-ridge-14441.herokuapp.com` }))
};



