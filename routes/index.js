const express = require('express');
const router = express.Router();

const restaurantController = require('../controllers/restaurantController');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({response: 'Immerse yourself in food!'});
});

router.get('/allRest', function(req, res, next) {
  restaurantController.allRest()
    .then(results=>{
      res.json(results)
    })
    .catch(err=>res.json({error: err}))
});

router.post('/upVote', function(req, res, next) {
  restaurantController.upVote(req.body.id)
    .then(results=>{
      res.json(results)
    })
    .catch(err=>res.json({error: err}))
});
router.post('/downVote', function(req, res, next) {
  restaurantController.downVote(req.body.id)
    .then(results=>{
      res.json(results)
    })
    .catch(err=>res.json({error: err}))
});

router.post('/addReview', function(req, res, next) {
  restaurantController.addReview(req.body)
    .then(results=>{
      res.json(results)
    })
    .catch(err=>res.json({error: err}))
});
router.get('/restReviews/:id', function(req, res, next) {
  console.log(req.params)
  restaurantController.restReviews(req.params.id)
    .then(results=>{
      res.json(results)
    })
    .catch(err=>res.json({error: err}))
});

module.exports = router;
