const express = require('express');
const mongoose = require('mongoose');
require('./models/User')
const cookieSession = require('cookie-session');
const passport = require('passport');
var path = require('path');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
var flash = require('connect-flash');
require('./services/passport')
require('./services/facebookAuth')
require('./services/localStrategy')




mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

const app = express();

const PORT = process.env.PORT || 5000;
app.use(flash());
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());




require('./routes/authRoutes')(app);
require('./routes/fbRoutes')(app);
require('./routes/localRoutes')(app);


if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static('client/build'));
};
// Express will serve up the index.html file
// if it doesn't recognize the route

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});


app.listen(PORT);