'use strict';

var Q = require('q');
var mongo = require('../conf/mongo-connection');
var placesService = require('../services/places-service');
var logger = require('../services/logger');

exports.addPrice = function (beerPrice) {
    var deferred = Q.defer();


    return deferred.promise;
};

exports.getPricesInLocation = function (x, y, radius) {
    var deferred = Q.defer();
    placesService.findPlacesByCoordinates(x, y, radius).then(function (places) {
        findBeerPrice(places).then(function(beerPrices){
            deferred.resolve(beerPrices);
        }).fail(function(errBeerPrices){
            logger.error({message :'Error search beer price by location', eventType : 'find-beer-price' ,stack : errBeerPrices});
        });

    }).fail(function (errPlaces) {
        deferred.reject(errPlaces);
    });
    return deferred.promise;
};


var findBeerPrice = function(places){
    var deferred = Q.defer();
    var locationIds = places.map(function(element){
        return element.place_id;
    });
    return deferred.promise;
};