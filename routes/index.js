const express = require('express');
const passport = require('passport');
const router = express.Router();

const isAuthenticated = require('../config/passport').isAuthenticated;
const User = require('../schemas/user');

router.get('/', (req, res, next) => {
  res.render('index');
});

// router.get('/', (req, res, next) => {
//   if (req.isAuthenticated()) {
//     res.render('index', {title: 'Todo', name: req.user.name});
//   } else {
//     res.render('index', {title: 'Todo'});
//   }
// });

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

router.get('/tasklist/get', isAuthenticated, (req, res, next) => {
  User.findOne({_id: req.user._id}, (err, user) => {
    if (err) {
      res.send('oops error');
    } else {
      res.send({'tasks': user.tasks});
    }
  });
});

router.post('/tasklist/save', isAuthenticated, (req, res, next) => {
  User.update({_id: req.user._id}, {$set: {tasks: req.params.tasks}});
});

module.exports = router;
