const mongoose = require('mongoose');
const { format } = require('date-fns');
const now = Date.now();

const ReviewSchema = new mongoose.Schema({
  author: String,
  title: String,
  body: String,
  recommendation: Boolean,
  timestamp: { type: String, default: format(now, 'dddd, MMMM, do YYYY, h:mm:ss a') },
})

module.exports = mongoose.model('Review', ReviewSchema)