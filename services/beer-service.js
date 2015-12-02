'use strict';

var Q = require('q');
var mongo = require('../conf/mongo-connection');
var mongojs = require('mongojs');
var logger = require('../services/logger');

exports.beerBrands = function () {
    var deferred = Q.defer();
    var beers = mongo.collection('beers');
    beers.find({},function(err,beers){
        if(err){
            logger.error({message: 'Error on search all beers', eventType: 'all-beers', stack: err});
            deferred.reject(err);
        }else{
            logger.info({message: 'Success on search all beers', eventType: 'all-beers'});
            deferred.resolve(beers);
        }
    });
    return deferred.promise;
};

exports.findById = function(beerId){
    var deferred = Q.defer();
    var beers = mongo.collection('beers');
    beers.findOne({_id : mongojs.ObjectId(beerId) },function(err,beer){
        if(err){
            logger.error({message: 'Error on search beer by Id', eventType: 'beer-by-id', stack: err});
            deferred.reject(err);
        }else{
            if(beer){
                logger.info({message: 'Success on search beer by Id', eventType: 'beer-by-id'});
                deferred.resolve(beer);
            }else{
                logger.error({message: 'Beer not found', eventType: 'beer-by-id'});
                deferred.reject('Beer not found');
            }
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