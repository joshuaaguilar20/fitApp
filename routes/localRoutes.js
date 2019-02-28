
const bcrypt = require('bcrypt');
const passport = require('passport');
var user = require('../models/User');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const users = require('../models/User');

module.exports = app => {
    app.post('/auth/login', (req, res, next) => {
        passport.authenticate('local', {
            successRedirect: '/Dashboard',
            failureRedirect: '/',
            failureFlash: true,
            passReqToCallback: true

        },
            (function (err, user) {
                if (err) { return next(err); }
                if (!user) { return res.redirect('/'); }

                // req / res held in closure
                req.logIn(user, err => {
                    if (err) { return next(err); }
                    return res.send(user);
                });
            }))(req, res, next)

    });


    app.post('/auth/register', async function (req, res) {
        try {

            var password = req.body.password;
            var password2 = req.body.password2;
            console.log(req.body);
            const existingUser = await User.findOne({ email: req.body.email });
            if (existingUser) {
                res.send("{erros: \"User Exist\"}").end()
            }

            if (password == password2) {
                var hash = await bcrypt.hash(req.body.password, 10)
                var newUser = await new User({
                    email: req.body.email,
                    password: hash,
                    birthday: req.body.DOB,
                    goal: req.body.goal,
                    provider: 'Local Sign Up'

                }).save()



                req.logIn(newUser, (err) => {
                    if (!err) { res.send(newUser) }
                    res.send(err)(req, res, next)

                });


            }

            else {
                res.status(400).send("{erros: \"Passwords don't match\"}").end()
            }
        } catch (err) {
            throw Error(`Error:${err}`)
        }
    })

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    app.get('/api/current_user', (req, res) => {
        if (req.user) {
            res.send(req.user);
        } else
            res.send(false);
    });

}

