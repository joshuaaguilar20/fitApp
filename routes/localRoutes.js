

const passport = require('passport');
var user = require('../models/User');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const createUser = require('../handlers/saveNhash');
module.exports = app => {


    app.post('/auth/login',

        passport.authenticate('local', {
            successRedirect: '/worked',
            failureRedirect: '/loggedIn',
            failureFlash: true
        })
    );

    app.post('/auth/register', async (req, res) => {
        var password = req.body.password;
        var password2 = req.body.password2;
        console.log(req.body);


        const existingUser = await User.findOne({ email: req.body.email });




        if (existingUser) {
            res.send("{erros: \"User Exist\"}").end()
        }

        else if (password == password2) {
            var newUser = new User({
                email: req.body.email,
                password: req.body.password,
                birthday: req.body.birthday
            });

            createUser(newUser, function (err, user) {
                if (err) throw err;
                res.send(user).end()
            });
        } else {
            res.status(500).send("{erros: \"Passwords don't match\"}").end()
        }
    })
}

