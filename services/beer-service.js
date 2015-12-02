'use strict';

var Q = require('q');
var mongo = require('../conf/mongo-connection');
var logger = require('../services/logger');

exports.beerBrands = function () {
    var deferred = Q.defer();
    var beers = mongo.collection('beers');
    beers.find({},function(err,beers){
        if(err){
            logger.error({message: 'Error on search all beers', eventType: 'all-beers', stack: err});
            deferred.reject(err);
        }else{
            logger.error({message: 'Success on search all beers', eventType: 'all-beers'});
            deferred.resolve(beers);
        }
    });
    return deferred.promise;
};

exports.addBeer = function (beer) {
    var deferred = Q.defer();
    var beers = mongo.collection('beers');
    beers.insert({
        name: beer.name,
        factory: beer.factory,
        country: beer.country,
        type: beer.type,
        description: beer.description
    }, function (err, data) {
        if (err) {
            logger.error({message: 'Error on insert beer', eventType: 'add-beer', stack: err});
            deferred.reject(err);
        } else {
            logger.info({message: 'Success on insert beer', eventType: 'add-beer'});
            deferred.resolve(data);
        }
    });
    return deferred.promise;
};