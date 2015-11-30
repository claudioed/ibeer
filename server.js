/**
 * Module Dependencies
 */
var port = process.env.PORT || 9200;
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.listen(port);

require('./routes/routes')(app);

