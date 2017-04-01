const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

const auth = require('./auth');
const User = require('../schemas/user');

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

passport.use(new FacebookStrategy({
  clientID: auth.facebook.clientID,
  clientSecret: auth.facebook.clientSecret,
  callbackURL: 'http://localhost:3000/auth/facebook/callback',
  passReqToCallback: true,
}, (req, accessToken, refreshToken, profile, done) => {
  User.findOne({'facebookId': profile.id}, (err, user) => {
    if (err) {
      return done(err);
    }
    if (user) {
      return done(err, user);
    } else {
      const newUser = new User({
        'facebookId': profile.id,
        'name': profile.displayName,
      });
      newUser.save((err) => done(err, newUser));
    }
  });
}));

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

module.exports = {
  isAuthenticated: isAuthenticated
};
