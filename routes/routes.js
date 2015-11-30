'use strict';

var placesControllers = require("../controllers/places-controller");
var beerControllers = require("../controllers/beer-controller");

module.exports = function (app) {

    app.get('/api/places', placesControllers.places);

    app.get('/api/beers', beerControllers.allBeerBrands);

};