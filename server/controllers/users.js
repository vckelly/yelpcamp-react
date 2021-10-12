const Campground = require('../models/campground');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports.register = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    //console.log(req.body);
    const emailCheck = await User.findOne({ email: email });
    if (emailCheck) {
      return res.status(422).json({ error: 'That email is already in use!'})
    } 
    const userCheck = await User.findOne({ username: username });
    if (userCheck) {
      return res.status(422).json({ error: 'That username is already in use!'})
    } 
    const encryptedPW = await bcrypt.hash(password, 10);    
    let user = new User({ 
      email: email.toLowerCase(), 
      username
    });
    //console.log(user);
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: 60 * 5
      }
    );
    //console.log(token);

    const registeredUser = await User.register(user, encryptedPW);
    //console.log(user, registeredUser);
    
    req.login(registeredUser, err => { 
      if (err) return next(err);
      res.status(201).send({ user, token });
    })
  } catch (e){
    res.redirect('register')
  } 
};


module.exports.login = async (req, res) => {
  console.log('login', req.body, req.session);
  const redirectUrl = req.session.returnTo || '/campgrounds';
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};

module.exports.loggedIn = async (req, res) => {
  //console.log('loggedIn', req.body, req.session);
  if (req.session.passport && req.session.passport.user) {
    return res.status(200).json({ user: req.session.passport.user });
  }
  res.status(200).send(null);
};

module.exports.logout = (req, res) => {
  req.logout();
  res.redirect("/campgrounds");
};