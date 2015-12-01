/**
 * Created by Claudio E. de Oliveira<claudioed.oliveira@gmail.com> on 30/11/15.
 */

'use strict';

var API_KEY = process.env.API_KEY;
var logger = require('./logger');

exports.validate = function (req, res, next) {
    if(req.headers['api-key'] != undefined && req.headers['api-key'] === API_KEY){
        next();
    }else{
        logger.error('Invalid Request API-KEY not found in Headers');
        res.status(401).end();
    }
};