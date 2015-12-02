'use strict';

var beerPriceService = require('../services/beer-price-service');

exports.pricesByLocation = function (req, res,next) {
    beerPriceService.getPricesInLocation(req.query.x,req.query.y,req.query.radius).then(function(data){
        res.status(200).json(data).end();
    }).fail(function(failData){
        res.status(404).json({ error: failData}).end();
    });
};

exports.addPrice = function(req, res,next){
    beerPriceService.addPrice(req.body).then(function(beer){
        res.status(201).json(beer).end();
    }).fail(function(failInsertPrice){
        res.status(403).json({ error: failInsertPrice}).end();
    });
};