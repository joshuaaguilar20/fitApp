
const keys = require('../config/keys');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('users');




passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});





passport.use(
    new FacebookStrategy(
        {
            clientID: keys.FACEBOOK_APP_ID,
            clientSecret: keys.FACEBOOK_APP_SECRET,
            callbackURL: '/auth/facebook/callback'
        },

        async (accessToken, refreshToken, profile, done) => {
            try {
                console.log('profile', profile);
                console.log('accessToken', accessToken);
                console.log('refreshToken', refreshToken);

                const existingUser = await User.findOne({ email: profile.id });
                if (existingUser) {
                    return done(null, existingUser);
                }

                const user = await new User({ email: profile.id }).save();
                done(null, user);


            } catch (error) {
                done(error, false, error.message);
            }
        }
    )
);
