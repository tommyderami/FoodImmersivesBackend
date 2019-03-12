const mongoose = require('mongoose');
const { format } = require('date-fns');
const now = Date.now();

const RestaurantSchema = new mongoose.Schema({
  yelpID: String,
  name: {type: String, required:true},
  address: [String],
  price: String,
  distance: Number,
  picture: String,
  category: [String],
  rating: {type: Number, default:0 },
  reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}],
  timestamp: { type: String, default: format(now, 'dddd, MMMM, do YYYY, h:mm:ss a') },
})

module.exports = mongoose.model('Restaurant', RestaurantSchema)