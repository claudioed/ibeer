/**
 * Created by Claudio E. de Oliveira<claudioed.oliveira@gmail.com> on 30/11/15.
 */

'use strict';

var Q = require('q');
var exchangeService = require('../services/token-http-exchange');

exports.putUserInHeader = function (req, res, next){
    var deferred = Q.defer();
    exchangeService.exchangeToken(req.headers['token'],req.headers['token']).then(function(userId){
        req.headers('user-id',userId);
        next();
    }).fail(function(errExchange){

    });
    return deferred.promise;
};



