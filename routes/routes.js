'use strict';

var beerControllers = require("../controllers/beer-controller");
var beerPriceControllers = require("../controllers/beer-price-controller");
var apiValidatorService = require('../services/api-key-validator-service');

module.exports = function (app) {

    app.get('/api/places', apiValidatorService.validate, beerPriceControllers.pricesByLocation);

    app.get('/api/beers', apiValidatorService.validate, beerControllers.allBeerBrands);

    app.post('/api/beers', apiValidatorService.validateManager, beerControllers.addBeer);

    // Error Handlers
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