const express = require('express');
const passport = require('passport');
const router = express.Router();

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
  const user = req.user;
  res.render('index', {title: 'Todo', name: user.name});
});

module.exports = router;
