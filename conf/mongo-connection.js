/**
 * Created by Claudio E. de Oliveira<claudioed.oliveira@gmail.com> on 30/11/15.
 */

'use strict';

var mongojs = require('mongojs');
var interpolate = require('interpolate');

// Database Configuration
var MONGO_URL_TEMPLATE = 'mongodb://{host}:{port}/ibeer';
var MONGO_HOST = process.env.MONGO_PORT_27017_TCP_ADDR || 'localhost';
var MONGO_PORT = process.env.MONGO_PORT_27017_TCP_POR || '27017';

var MONGO_URL = interpolate(MONGO_URL_TEMPLATE, {host: MONGO_HOST, port: MONGO_PORT});

var mongo = mongojs(MONGO_URL);

mongo.on('error', function (err) {
    logger.error('Database error', err);
});

mongo.on('ready', function () {
    logger.info('Database connected');
});

module.exports = mongo;