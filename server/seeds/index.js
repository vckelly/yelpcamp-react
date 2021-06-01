const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelpcamp', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, 'connection error:'));
db.once("open", () => {
  console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '6066307f12b346e164225d6e',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam fugiat obcaecati veniam...',
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude      
        ]
      },
      images: [{
        url: 'https://res.cloudinary.com/vckelly/image/upload/v1612895967/YelpCamp/zjfpiogw9xo4vw3aulqk.jpg',
        filename: 'YelpCamp/zjfpiogw9xo4vw3aulqk'
      },
      {
        url: 'https://res.cloudinary.com/vckelly/image/upload/v1612895967/YelpCamp/aua3sqvowaswau1ay6sn.jpg',
        filename: 'YelpCamp/aua3sqvowaswau1ay6sn'
      }]
    })
    await camp.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close();
})