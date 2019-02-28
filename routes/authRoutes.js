const passport = require('passport');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get(
    '/auth/google/callback', (req, res) => {
      passport.authenticate('google', { failureRedirect: '/' }),

        res.redirect('/Dashboard');
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    if (req.user) {
      res.send(req.user.data);
    } else
      res.send(false);
  });

}
