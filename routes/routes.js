'use strict';

var placesControllers = require("../controllers/places-controller");
var beerControllers = require("../controllers/beer-controller");
var apiValidatorService = require('../services/api-key-validator-service');

module.exports = function (app) {

    // All Request handler
    
    app.use(apiValidatorService.validate);
    
    app.get('/api/places', placesControllers.places);

    app.get('/api/beers', beerControllers.allBeerBrands);

    // Error Handlers (SSO improvement)
    if (app.get('env') === 'development') {
        app.use(errorHandlerDev);
    } else {
        app.use(errorHandlerProd);
    }

};


/**
 * This functions is responsible to manage development
 * stacktraces of errors
 *
 * @param err
 * @param req
 * @param res
 * @param next
 */
var errorHandlerDev = function (err, req, res, next) {
    res.status(err.status || 500).json({message: err.message, error: err});
};

/**
 * This functions is responsible to manage production
 * stacktraces of errors
 *
 * @param err
 * @param req
 * @param res
 * @param next
 */
var errorHandlerProd = function (err, req, res, next) {
    res.status(err.status || 500).json({message: err.message, error: {}});
};