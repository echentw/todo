const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index', {title: 'Todo'});
});

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    (req, res, next) => {
  console.log('at callback endpoint');
  console.log(req.user);
  res.render('index', {title: 'Todo'});
});

module.exports = router;
