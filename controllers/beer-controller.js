'use strict';

var beerService = require('../services/beer-service');

exports.allBeerBrands = function (req, res,next) {
    beerService.beerBrands().then(function(beers){
        res.status(200).json(beers).end();
    }).fail(function(failBeers){
        res.status(404).json({ error: failBeers}).end();
    });
};