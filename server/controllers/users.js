const Campground = require('../models/campground');
const User = require('../models/user');

module.exports.renderRegister = (req, res) => {
  res.render('users/register');
};

module.exports.register = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, err => { 
      if (err) return next(err);
      req.flash('Success', 'Welcome to Yelp Camp!');
      res.redirect('/campgrounds');
    })
  } catch (e){
    req.flash('error', e.message);
    res.redirect('register')
  } 
};

module.exports.renderLogin = (req, res) => {
  res.render('users/login')
};

module.exports.login = async (req, res) => {
  const userName = req.body.username;
  const user = await User.find({ username: userName });
  if (user) { res.append('User', JSON.stringify(user)) };
  const redirectUrl = req.session.returnTo || '/campgrounds';
  delete req.session.returnTo;
  res.render(redirectUrl);
  //res.redirect(redirectUrl);
  
};

module.exports.logout = (req, res) => {
  req.logout();
  req.flash('success', "Goodbye!");
  res.redirect("/campgrounds");
};