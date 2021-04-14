const Campground = require('../models/campground');
const User = require('../models/user');


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


module.exports.login = async (req, res) => {
  console.log('login', req.body, req.session);
  const redirectUrl = req.session.returnTo || '/campgrounds';
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};

module.exports.getCurrentUser = async (req, res) => {
  console.log('From getCurrentUser', req.body, req.session);
  const user = await User.find({ username: req.body.username});
  if (user) {
    return res.status(200).json(user)
  }

  res.status(404).send({ error: 'Could not find user'});
}

module.exports.logout = (req, res) => {
  req.logout();
  req.flash('success', "Goodbye!");
  res.redirect("/campgrounds");
};