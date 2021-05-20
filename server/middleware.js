const Campground = require('./models/campground');
const Review = require('./models/review');
const { campgroundSchema } = require('./schemas/campground');
const { reviewSchema } = require('./schemas/review');
const ExpressError = require('./utils/ExpressError');

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()){
    req.session.returnTo = req.originalUrl;
    req.flash('error', 'You must be signed in');
    console.log("Middleware: You must be signed in")
    return res.redirect('/login');
  }
  next();
}

module.exports.isAuthor = async(req, res, next) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  if (!campground.author.equals(req.user._id)) {
    req.flash('error', 'You do not have permission to do that!');
    console.log('Middleware: You do not have permission to do that!');
    return res.redirect(`/campgrounds/${campground._id}`);
  }
  next();
}


module.exports.isReviewAuthor = async(req, res, next) => {
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (!review.author.equals(req.user._id)) {
    req.flash('error', 'You do not have permission to do that!');
    console.log("Middleware: You do not have permission to do that!")
    return res.redirect(`/campgrounds/${id}`);
  }
  next();
}

module.exports.validateCampground = (req, res, next) => {
  const { error } = campgroundSchema.validate(req.body);
  console.log(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(',');
    console.log("Middleware: " + msg);
    throw new ExpressError(msg, 400)
  } else {
    next();
  }
}


module.exports.validateReview = (req, res, next) => {
  const {error} = reviewSchema.validate(req.body);
  console.log("Req body from validate review:", req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(',');
    console.log("Middleware: " + msg);
    throw new ExpressError(msg, 400)
  } else {
    next();
  }
}