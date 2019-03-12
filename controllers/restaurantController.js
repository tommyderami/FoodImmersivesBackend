const Restaurants = require('../models/Restaurant');
const mongoose = require('mongoose');

module.exports = {
  allRest: () => {
    return new Promise((resolve, reject) => {
      Restaurants.find({})
        .then(results=>{
          resolve(results)
        })
        .catch(err=>console.log(err))
    })
  },
  upVote: () => {
    return new Promise((resolve, reject) => {

    })
  },
  downVote: () => {
    return new Promise((resolve, reject) => {

    })
  },
  addReview: () => {
    return new Promise((resolve, reject) => {

    })
  },

}