/**
 * @author Claudio Eduardo de Oliveira
 */

'use strict';

var APP_NAME = 'ibeer';
var LOG_PATH = '/var/log/ibeer-app.log';

var bunyan = require('bunyan');

var log = bunyan.createLogger({
    name: APP_NAME, streams: [{
        type: 'rotating-file',
        path: LOG_PATH,
        period: '1d',   // daily rotation
        count: 10       // keep 10 back copies
    }]
});

var logger = {};

logger.info = function (json) {
    log.info(json);
};

logger.debug = function (json) {
    log.debug(json);
};

logger.warn = function (json) {
    log.warn(json);
};

logger.error = function (json) {
    log.error(json);
};

module.exports = logger;
