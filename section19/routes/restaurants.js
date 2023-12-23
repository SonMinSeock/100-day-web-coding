const express = require("express");
const router = express.Router();
const resData = require("../util/restaurant-data");
const uuid = require("uuid");

router.get("/restaurants", function (req, res) {
  const storedRestaurants = resData.getStoredRestaurants();

  res.render("restaurants", { numberOfRestaurants: storedRestaurants.length, restaurants: storedRestaurants });
});

router.get("/restaurants:id", function (req, res) {
  const restaurantId = req.params.id;

  const storedRestaurants = resData.getStoredRestaurants();

  for (const restaurant of storedRestaurants) {
    if (restaurant.id === restaurantId) {
      res.render("restaurant-detail", { restaurant });
    }
  }

  res.render("404");
});

router.get("/confirm", function (req, res) {
  res.render("confirm");
});

router.get("/recommend", function (req, res) {
  res.render("recommend");
});

router.post("/recommend", function (req, res) {
  const restaurant = req.body;
  restaurant.id = uuid.v4();

  const restaurants = resData.getStoredRestaurants();

  restaurants.push(restaurant);

  res.storeRestaurants(restaurants);

  res.redirect("/confirm");
});

module.exports = router;
