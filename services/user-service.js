'use strict';

var Q = require('q');
var mongo = require('../conf/mongo-connection');
var logger = require('../services/logger');

exports.addUser = function (user) {
    var deferred = Q.defer();
    var users = mongo.collection('users');
    users.insert({
        name: user.name,
        email: user.email,
        social_id: user.social_id,
        social_type: user.social_type
    }, function (err, data) {
        if (err) {
            logger.error({message: 'Error on insert user', eventType: 'add-user', stack: err});
            deferred.reject(err);
        } else {
            logger.info({message: 'Success on insert user', eventType: 'add-user'});
            deferred.resolve(data);
        }
    });
    return deferred.promise;
};