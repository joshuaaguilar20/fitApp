const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser(function (user, done) {
  done(null, user._id);
  // if you use Model.id as your idAttribute maybe you'd want
  // done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});


passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (profile, done) => {
      try {

        const existingUser = await User.findOne({ email: profile.emails[0].value });
        if (existingUser) {
          return done(null, existingUser);
        }

        const user = await new User({
          email: profile.emails[0].value,
          provider: "google",
          lastName: profile.name.familyName,
          firstName: profile.name.givenName,
          fullName: profile.displayName,
          picture: profile.photos[0].value,
          gender: profile.gender,
          id: profile.id
        }).save();

        done(null, user);


      } catch (error) {
        done(error, false, error.message);
      }
    }
  )
);

//Visual Flow*
// passport.serializeUser(function(user, done) {
//     done(null, user.id);
// });              │
//                  │ 
//                  │
//                  └─────────────────┬──→ saved to session
//                                    │    req.session.passport.user = {id: '..'}
//                                    │
//                                    ↓           
// passport.deserializeUser(function(id, done) {
//                    ┌───────────────┘
//                    │
//                    ↓ 
//     User.findById(id, function(err, user) {
//         done(err, user);
//     });            └──────────────→ user object attaches to the request as req.user   
// });