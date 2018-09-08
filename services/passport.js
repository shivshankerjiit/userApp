const passport = require('passport');
const mongoose = require('mongoose');
const keys = require('../config/keys');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = mongoose.model('user');

passport.serializeUser((user, done) => {
  console.log("serialize user called");
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log("Deserialize user called");
  User.findById(id)
    .then(user => {
      console.log("in Deserialize user , -> user found");
      done(null, user);
    });
});

passport.use(new GoogleStrategy({
  clientID : keys.googleClientID,
  clientSecret :keys.googleClientSecret,
  callbackURL : '/auth/google/callback'
}, async (accessToken,refreshToken,profile,done) => {
  console.log(accessToken);
  console.log(refreshToken);

  const existingUser = await User.findOne({ googleId : profile.id});
  if(existingUser){
    console.log('found user');
    return done(null, existingUser);
  }

  const user = new User({googleId : profile.id});
  await user.save();
  console.log('user created');
  done(null,user);
}));
