const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
require('./server/models/user');
require('./services/passport');

mongoose.connect(keys.mongoURI);
mongoose.connection
  .once('open',()=>console.log('Good to go!'))
  .on('error',(error)=>console.log('warning ',error));
const app = express();

app.use(
  cookieSession({
    maxAge : 30*24*60*60*1000,
    keys : [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
const PORT = process.env.PORT || 5000;
app.listen(PORT);



/*
const app = express();
require('./routes/authRoutes')(app);
const PORT = process.env.PORT || 5000;
app.listen(PORT);
*/
