'use strict';

var Q = require('q');
var mongo = require('../conf/mongo-connection');
var placesService = require('../services/places-service');
var logger = require('../services/logger');
var beerService = require('../services/beer-service');


exports.addPrice = function (beerPrice) {
    var deferred = Q.defer();
    placesService.findPlaceById(beerPrice.placeId).then(function (place) {
        beerService.findById(beerPrice.beerId).then(function (beer) {
            var user = getUser();
            var beerJson = {
                beerId: beerPrice.beerId,
                locationId: place.place_id,
                registeredAt: new Date(),
                registeredBy: user
            };
            var priceCollection = mongo.collection('beer-price');
            priceCollection.insert(beerJson, function (err, data) {
                if (err) {
                    logger.error({message: 'Error on insert beer price', eventType: 'add-beer-price', stack: err});
                    deferred.reject(err);
                } else {
                    logger.info({message: 'Success on insert beer price', eventType: 'add-beer-price'});
                    deferred.resolve(data);
                }
            });
        }).fail(function (errBeer) {
            deferred.reject(errBeer);
        });
    }).fail(function (errPlace) {
        deferred.reject(errPlace);
    });
    return deferred.promise;
};

exports.getPricesInLocation = function (x, y, radius) {
    var deferred = Q.defer();
    placesService.findPlacesByCoordinates(x, y, radius).then(function (places) {
        findBeerPrice(places).then(function (beerPrices) {
            deferred.resolve(beerPrices);
        }).fail(function (errBeerPrices) {
            logger.error({
                message: 'Error search beer price by location',
                eventType: 'find-beer-price',
                stack: errBeerPrices
            });
        });

    }).fail(function (errPlaces) {
        deferred.reject(errPlaces);
    });
    return deferred.promise;
};


var findBeerPrice = function (places) {
    var deferred = Q.defer();
    var locationIds = places.map(function (element) {
        return element.place_id;
    });
    return deferred.promise;
};

var getUser = function () {
    return "OL8ljg2JPSopJXkaOyMPn+p2m7I=";
};