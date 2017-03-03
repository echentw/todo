const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook');

const index = require('./routes/index');
const keys = require('./keys');

const app = express();

// Passport setup
passport.use(new FacebookStrategy({
    clientID: keys.facebook.id,
    clientSecret: keys.facebook.secret,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  (accessToken, refreshToken, profile, cb) => {
    console.log('hi');
    const user = {
      name: 'Eric',
      age: 22
    };
    return cb(null, user);
    // User.findOrCreate({ facebookId: profile.id }, function(err, user) {
    //   return cb(err, user);
    // });
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
