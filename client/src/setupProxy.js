const proxy = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(proxy('/api/*', { target: 'localhost:5000' }))
  app.use(proxy('/auth/google', { target: 'localhost:5000' }))
}



