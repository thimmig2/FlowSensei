
var express = require('express'),
	bodyParser = require('body-parser'),
	morgan = require('morgan'),
	api = require('./api/app.js');

var app = express();
app.use(express.static('public'));
app.use(api);

app.use(function(req, res, next){
   res.status(404);
   res.json({ error: 'Invalid URL' });
});

app.use(morgan('dev'));

var port = process.env.PORT || 8080;
app.listen(port);

exports = module.exports = app
