const express = require('express');
const passport = require('passport');
const router = express.Router();

function checkAuthentication(req, res, next) {
  next();
  // console.log('currently authenticating user...');
  // if (req.isAuthenticated()) {
  //   console.log('authentication success!');
  //   next();
  // } else {
  //   console.log('authentication failure!');
  //   res.redirect('/');
  // }
}

router.get('/', (req, res, next) => {
  const user = req.user;
  if (user) {
    console.log('user found!');
    res.render('index', {title: 'Todo', name: user.name});
  } else {
    console.log('user NOT found!');
    res.render('index', {title: 'Todo'});
  }
});

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {failureRedirect: '/login'}),
    (req, res, next) => {
  res.redirect('/home');
  // const user = req.user;
  // res.render('index', {title: 'Todo', name: user.name});
});

router.get('/home', checkAuthentication, (req, res, next) => {
  console.log('hi');
  console.log(req.user);
  res.render('home');
});

module.exports = router;
