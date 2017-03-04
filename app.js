const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const mongoose = require('mongoose');

const index = require('./routes/index');
const keys = require('./keys');

const app = express();

const User = require('./schemas/user');

// database setup
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/test');
var connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));
connection.on('connected', () => console.log('database connected!'));

// Passport setup
passport.use(new FacebookStrategy({
    clientID: keys.facebook.id,
    clientSecret: keys.facebook.secret,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  (accessToken, refreshToken, profile, cb) => {
    User.findOne({'facebookId': profile.id}, (err, user) => {
      if (user) {
        return cb(err, user);
      } else {
        const newUser = new User({
          'facebookId': profile.id,
          'name': profile.displayName,
        });
        newUser.save((err) => {
          if (err) {
            console.log('error: ' + err);
          } else {
            return cb(err, newUser);
          }
        });
      }
    });
  }
));
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', handlebars({
  extname: '.hbs',
  layoutsDir: 'views/layouts/',
  defaultLayout: 'main.hbs',
  partialsDir: 'views/partials/'
}));
app.set('view engine', '.hbs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Publicly served files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.use('/', index);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
