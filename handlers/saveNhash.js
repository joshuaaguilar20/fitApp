const bcrypt = require('bcrypt');
const moongoose = require('mongoose');
const User = moongoose.model('users');


module.exports = function (newUser, callback) {
    bcrypt.hash(newUser.password, 10, function (err, hash) {
        if (err) throw err;
        newUser.password = hash;
        User.save(newUser, callback);
    });
};