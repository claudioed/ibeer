'use strict';

var placesControllers = require("../controllers/places-controller");

module.exports = function (app) {

    app.get('/api/places', placesControllers.places);

};