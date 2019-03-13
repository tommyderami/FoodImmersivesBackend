const axios = require('axios');
const mongoose = require('mongoose');
const fs = require('fs');
const Restaurant = require('../models/Restaurant');
const _ = require('lodash');
require('dotenv').config();
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => {
    console.log(err);
  });

axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.yelpAPI}`;
const yelpURL = `https://api.yelp.com/v3/businesses/search?limit=50&latitude=40.760151&longitude=-73.990870&radius=500&categories=restaurants`;
const downloadRestaurants = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(yelpURL)
      .then(res => {
        let results = res.data.businesses;
        fs.writeFile('./data/restaurants.json', JSON.stringify(res.data), err => {
          if (err) reject(err);

          console.log(res.data.total);
          const promiseArr = [];
          const getMore = offset => {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                console.log('Fire orbital proton cannon at endpoint: ', `${yelpURL}&offset=${offset}`);
                axios
                  .get(`${yelpURL}&offset=${offset}`)
                  .then(res => resolve(res.data.businesses))
                  .catch(err => console.log(err));
              }, offset * 5);
            });
          };
          if (res.data.total > 50) {
            // promiseArr.push(getMore(50))
            for (let i = 50; i < res.data.total; i = i + 50) {
              promiseArr.push(getMore(i));
            }
            Promise.all(promiseArr)
              .then(busVals => {
                results = [...results, ..._.flatten(busVals)];
                resolve(results);
              })
              .catch(err => reject(err));
          } else {
            resolve(results);
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
  });
};

downloadRestaurants()
  .then(res => {
    console.log('Updating the database...');
    console.log('How many businesses:', res.length);
  
      res.map((rest, i) => {
        Restaurant.findOne({ yelpID: rest.id })
        .then(foundRes => {
          if (!foundRes) {
            const newRest = new Restaurant({
              yelpID: rest.id,
              name: rest.name,
              address: rest.location.display_address,
              price: rest.price,
              lat: rest.coordinates.latitude,
              long: rest.coordinates.longitude,
              searchString: rest.name+rest.categories.reduce((acc, cat)=>{return (acc+cat.title)},"")+rest.location.address1,
              picture: rest.image_url,
              distance: rest.distance,
              category: rest.categories.map(cat => cat.title),
            });
              newRest.save();
          }
          if (i === res.length - 1) {
            
            setTimeout(()=>{
              console.log('All Done--bye!')
              mongoose.disconnect()
            }, 2000);
          }
        })
        .catch(err => console.log(err));
      });
  })
  .catch(err => console.log(err));


