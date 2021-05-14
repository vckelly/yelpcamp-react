const express = require('express');
const reviews = require('../controllers/reviews');
const ExpressError = require('../utils/ExpressError')
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync')
const Campground = require('../models/campground');
const Review = require('../models/review');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');
const { reviewSchema } = require('../schemas/review');

router.post("/", isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete("/:reviewId", isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;