const express = require('express');
const users = require('../controllers/users');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const User = require('../models/user');

router.route('/register')
      .post(catchAsync(users.register));


router.route('/login')
      .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login'}), catchAsync(users.login));
      
router.route('/users/logged_in')
      .get(catchAsync(users.loggedIn))

router.get('/logout', users.logout);

module.exports = router;