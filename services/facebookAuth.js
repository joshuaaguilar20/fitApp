
const keys = require('../config/keys');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.serializeUser(function (user, done) {
    done(null, user._id);

});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});



passport.use(
    new FacebookStrategy(
        {
            clientID: keys.FACEBOOK_APP_ID,
            clientSecret: keys.FACEBOOK_APP_SECRET,
            callbackURL: 'https://thawing-ridge-14441.herokuapp.com/auth/facebook/callback',
            proxy: true,
            profileFields: ['id', 'name', 'gender', 'displayName', 'photos', 'profileUrl', 'email']
        },

        async (accessToken, refreshToken, profile, done) => {
            try {

                // console.log('profile', profile);
                // console.log(profile._json);

                const existingUser = await User.findOne({ email: profile.emails[0].value });
                if (existingUser) {
                    return done(null, existingUser);
                }

                const user = await new User({
                    email: profile.emails[0].value,
                    provider: "facebook",
                    id: profile.id,
                    lastName: profile._json.last_name,
                    firstName: profile._json.first_name,
                    picture: "https://graph.facebook.com/" + profile.username + "/picture" + "?width=200&height=200" + "&access_token=" + accessToken
                }).save();

                done(null, user);


            } catch (error) {
                done(error, null);
            }
        }
    )
);

