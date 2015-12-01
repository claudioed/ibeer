/**
 * Created by Claudio E. de Oliveira<claudioed.oliveira@gmail.com> on 30/11/15.
 */

'use strict';

var port = process.env.REDIS_PORT || 'localhost';
var host = process.env.REDIS_HOST || 6379;

var redis = require('redis');
var client = redis.createClient(port, host);

module.exports = client;