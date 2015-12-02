/**
 * Created by Claudio E. de Oliveira<claudioed.oliveira@gmail.com> on 30/11/15.
 */

'use strict';

var API_KEY = process.env.API_KEY;
var API_MANAGER_KEY = process.env.API_MANAGER_KEY;
var logger = require('./logger');

exports.validate = function (req, res, next) {
    if(req.headers['api-key'] != undefined && req.headers['api-key'] === API_KEY){
        next();
    }else{
        logger.error({message :'Error on validate api key', eventType : 'validate-api-key' ,stack : 'API Key does not match or not find'});
        res.status(401).end();
    }
};

exports.validateManager = function (req, res, next) {
    if(req.headers['api-key'] != undefined && req.headers['api-key'] === API_MANAGER_KEY){
        next();
    }else{
        logger.error({message :'Error on validate api manager key', eventType : 'validate-manager-api-key' ,stack : 'Manager API Key does not match or not find'});
        res.status(401).end();
    }
};