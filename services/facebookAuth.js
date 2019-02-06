
const keys = require('../config/keys');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

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

                const existingUser = await User.findOne({ facebookId: profile.id });
                if (existingUser) {
                    return done(null, existingUser);
                }

                const newUser = new User({
                    method: 'facebook',
                    facebook: {
                        facebookId: profile.id
                    }
                });

                await newUser.save();
                done(null, newUser);
            } catch (error) {
                done(error, false, error.message);
            }
        }
    )
);
