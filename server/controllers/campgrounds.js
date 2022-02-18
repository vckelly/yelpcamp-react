const Campground = require('../models/campground');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });
const { cloudinary } = require("../cloudinary");


module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.send(campgrounds);
}

module.exports.renderNewForm = (req, res) => {
    res.render('campgrounds/new');
}

module.exports.createCampground = async (req, res, next) => {
    const parsedBody = JSON.parse(req.body.campground);
    const geoData = await geocoder.forwardGeocode({
        query: parsedBody.location,
        limit: 1
    }).send();
    const campground = new Campground(parsedBody);
    campground.geometry = geoData.body.features[0].geometry;
    if (req.file) {
        campground.images.push({
            url: req.file.path,
            filename: req.file.filename
        });
    }
    campground.author = req.user._id;
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`)
}

module.exports.showCampground = async (req, res,) => {
    const campground = await Campground.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!campground) {
        return res.redirect('/campgrounds');
    }
    res.send(campground);

}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id)
    if (!campground) {
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', { campground });
}

module.exports.updateCampground = async (req, res) => {
    const { id } = req.params;
    const parsedBody = JSON.parse(req.body.campground);
    const campground = await Campground.findByIdAndUpdate(id, { ...parsedBody });
    if (req.body.locationChange) {
        const geoData = await geocoder.forwardGeocode({
            query: parsedBody.location,
            limit: 1
        }).send();
        campground.geometry = geoData.body.features[0].geometry;
    }
    
    if (req.file) {
        campground.images.push({
            url: req.file.path,
            filename: req.file.filename
        });
    }
    if (req.body.deleteImages) {
        const parsedFiles = req.body.deleteImages.split(',');
        parsedFiles.forEach(async (filename) => { await cloudinary.uploader.destroy(filename) });
        await campground.updateOne({ $pull: { images: { filename: { $in: parsedFiles } } } })
    }
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`)
}

module.exports.deleteCampground = async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted campground')
    res.redirect('/campgrounds');
}