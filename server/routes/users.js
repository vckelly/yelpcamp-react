const express = require('express');
const users = require('../controllers/users');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const User = require('../models/user');

router.route('/register')
      .post(catchAsync(users.register));


router.route('/login')
      .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login'}), users.login);
      
router.route('/users/current')
      //.get(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login'}), users.getCurrentUser);
      .post(users.getCurrentUser);

router.get('/logout', users.logout);

module.exports = router;