
const bcrypt = require('bcrypt');
const passport = require('passport');
var user = require('../models/User');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const users = require('../models/User');

module.exports = app => {


    app.post('/auth/login', (req, res, next) => {
        passport.authenticate('local', {
            successRedirect: '/worked',
            failureRedirect: '/Failed',
            failureFlash: true,
            passReqToCallback: true

        },
            function (err, user, info) {
                if (err) { return next(err); }
                if (!user) { return res.redirect('/'); }

                // req / res held in closure
                req.logIn(user, function (err) {
                    if (err) { return next(err); }
                    return res.send(user);
                });
            })(req, res, next)

    });





    app.post('/auth/register', async (req, res) => {
        var password = req.body.password;
        var password2 = req.body.password2;
        console.log(req.body);
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            res.send("{erros: \"User Exist\"}").end()
        }

        else if (password == password2) {
            var hash = await bcrypt.hash(req.body.password, 10)
            var newUser = await new User({
                email: req.body.email,
                password: hash,
                birthday: req.body.birthday
            }).save()

            res.send(newUser)

        }

        else {
            res.status(500).send("{erros: \"Passwords don't match\"}").end()
        }
    })
}

