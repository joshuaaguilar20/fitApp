
const passport = require('passport');

module.exports = app => {
    app.get(
        '/auth/facebook',
        passport.authenticate('facebook', {
            scope: ['public_profile', 'email']
        })
    );

    app.get(
        '/auth/facebook/callback',
        passport.authenticate('facebook'),
        (req, res) => {
            res.redirect('/Dashboard');
        }
    );

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);

    });
};