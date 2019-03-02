
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

                // req / res held in closure  which you know about js* 
                req.logIn(user, err => {
                    if (err) { return next(err); }
                    return res.send(user);
                });
            }))(req, res, next)

    });


    app.post('/auth/register', async function (req, res) {
        let password = req.body.password;
        let password2 = req.body.password2;
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            console.log('sending response to user already exits');
            return res.send("{erros: \"User Exist\"}").end()
        }

        if (password == password2) {
            let hash = await bcrypt.hash(req.body.password, 10)
            let newUser = await new User({
                email: req.body.email,
                password: hash,
                birthday: req.body.DOB,
                goal: req.body.goal,
                provider: 'Local Sign Up'

            }).save()
            req.logIn(newUser, (err) => {
                if (!err) { res.send(newUser) }
                else {
                    res.send(err)(req, res, next)
                }
            });
        }
        else {
            console.log('passwords do not match');
            return res.send("{erros: \"Passwords don't match\"}").end()
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

