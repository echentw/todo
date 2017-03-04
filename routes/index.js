const express = require('express');
const passport = require('passport');
const router = express.Router();

const isAuthenticated = require('../config/passport').isAuthenticated;

router.get('/', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.render('index', {title: 'Todo', name: req.user.name});
  } else {
    res.render('index', {title: 'Todo'});
  }
});

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', {failureRedirect: '/login'}),
  (req, res, next) => res.redirect('/home'));

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

router.get('/home', isAuthenticated, (req, res, next) => {
  res.render('home', {title: 'Todo', name: req.user.name});
});

module.exports = router;
