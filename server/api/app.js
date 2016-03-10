
var express = require('express'),
	config = require('./config.js'),
	bodyParser = require('body-parser'),
	routes = require('./routes.js');

var app = express();
app.use(bodyParser.json());
app.use('/api/v1', routes);

console.log('API included succesfully...');

exports = module.exports = app