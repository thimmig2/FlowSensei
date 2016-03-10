
var mongoose = require('mongoose'),
	hubSchema = require('./models/hub.js'),
	flowSchema = require('./models/flow.js'),
	sourceSchema = require('./models/source.js'),

mongoose.connect(config.db);

mongoose.model('Hub', hubSchema);
mongoose.model('Flow', flowSchema);
mongoose.model('Source', sourceSchema);

module.exports = mongoose