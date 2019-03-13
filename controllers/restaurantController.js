const Restaurant = require('../models/Restaurant');
const Review = require('../models/Review');

module.exports = {
  allRest: () => {
    return new Promise((resolve, reject) => {
      Restaurant.find({}, null, {sort:{rating: -1}})
        .then(results=>{
          resolve(results)
        })
        .catch(err=>console.log(err))
    })
  },
  upVote: (id) => {
    return new Promise((resolve, reject) => {
      Restaurant.findOne({yelpID: id})
        .then(restaurant=>{
          restaurant.rating++
          restaurant.save()
            .then(resolve(restaurant.rating))
        })
    })
  },
  downVote: (id) => {
    return new Promise((resolve, reject) => {
      Restaurant.findOne({yelpID: id})
      .then(restaurant=>{
        restaurant.rating--
        restaurant.save()
          .then(resolve(restaurant.rating))
      })
    })
  },
  addReview: (review) => {
    return new Promise((resolve, reject) => {
      const {author, title, body, recommendation, id} = review
      console.log(review)
      Restaurant.findOne({yelpID: id})
        .then(restaurant=>{
          console.log('found rest:' , restaurant)
          const newReview = new Review({
            author,
            title,
            body,
            recommendation
          })
          newReview.save()
          restaurant.reviews.push(newReview)
          restaurant.save()
            .then(resolve(restaurant))
          
        })
        .catch(err=>{reject(err)})
    })
  },
  restReviews: (id) => {
    return new Promise((resolve, reject) => {
      Restaurant.findOne({yelpID: id}).populate('reviews')
        .then(restaurant=>{
          resolve(restaurant)
        })
        .catch(err=>reject(err))
    })
  },
}