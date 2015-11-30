'use strict';

var placesService = require('../services/places-service');

exports.places = function (req, res,next) {
    placesService.findPlacesByCoordinates(req.query.x,req.query.y,req.query.radius).then(function(successPlaces){
        res.status(200).json(successPlaces).end();
    }).fail(function(failPlaces){
        res.status(404).json({ error: failPlaces}).end();
    });
};