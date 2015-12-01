/**
 * Module Dependencies
 */
var port = process.env.PORT || 9200;
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var logger = require('./services/logger');
var env = require('node-env-file');

// Load env file
env('/opt/ibeer.env');

console.log('GAPI'+ process.env.GPLACES_KEY);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.disable('x-powered-by');

app.listen(port);

logger.info('iBeer listening on ' + port);

require('./routes/routes')(app);

