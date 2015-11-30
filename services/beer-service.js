'use strict';

var Q = require('q');
var skol = { name : "Skol", factory: "Ambev",country : "Brazil", type : "Pilsen", description : "Pilsen mais vendida no Brasil" };
var original = { name : "Original", factory: "Ambev",country : "Brazil", type : "Pilsen", description : "Melhor Pilsen do Brasil" };

exports.beerBrands = function () {
    var deferred = Q.defer();
    deferred.resolve([skol,original]);
    return deferred.promise;
};