'use strict';

var Q = require('q');
var request = require('request');
var interpolate = require('interpolate');
var KEY = process.env.GPLACES_KEY;
var PLACES_BY_RADIUS = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={x},{y}&radius={radius}&types={types}&key={key}';

exports.findPlacesByCoordinates = function(x,y,radius){
    var deferred = Q.defer();
    var types = "restaurant";
    var placesUrl = interpolate(PLACES_BY_RADIUS,{x:x,y:y,radius : radius,types: types,key : KEY });
    var options = {url: placesUrl};
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            deferred.resolve(JSON.parse(body).results);
        }else{
           deferred.reject('Error on reach google');
        }
    });
    return deferred.promise;
};

