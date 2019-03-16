const express = require('express');
const mongoose = require('mongoose');
require('./models/User');
require('./models/Blog');
const cookieSession = require('cookie-session');
const passport = require('passport');
var path = require('path');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
var flash = require('connect-flash');
require('./services/passport');
require('./services/facebookAuth');
require('./services/localStrategy');




mongoose.Promise = global.Promise;



mongoose.connection.close();
mongoose.connect(keys.mongoURI, { useNewUrlParser: true }).catch((reason) => {
  console.log('Unable to connect to the mongodb instance. Error: ', reason);
});


const app = express();


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


require('./routes/localRoutes')(app);
require('./routes/authRoutes')(app);
require('./routes/blogRoutes')(app);
require('./routes/fbRoutes')(app);




if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static('client/build'));

  // Express will serve up the index.html file
  // if it doesn't recognize the route

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT);

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at:', p, 'reason:', reason);
  // Application specific logging, throwing an error, or other logic here
});
function handleExit() {
  mongoose.connection.close()
  console.log('DB Connection Closed')

  process.exit(0)
};
// exit process
// this may close kept alive sockets
// eslint-disable-next-line no-process-exit



process.on('SIGINT', handleExit);
process.on('exit', handleExit);



console.log(`App Listening on Port ${PORT}`);