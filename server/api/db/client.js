
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	shortid = require('shortid');

mongoose.connect('mongodb://127.0.0.1:27017/test');

var hubSchema = new Schema({
	_id: {
		type: String,
		unique: true,
		'default': shortid.generate
	},
	name: String,
	company: String
}, {
    timestamps: true
});

var flowSchema = new Schema({
	_id: {
		type: String,
		unique: true,
		'default': shortid.generate
	},
	source: {
        type: String,
        ref: 'Source'
    },
    duration: Number,
    amount: Number
}, {
    timestamps: true
});

var sourceSchema = new Schema({
	_id: {
		type: String,
		unique: true,
		'default': shortid.generate
	},
	hub: {
		type: String,
		ref 'Hub'
	},
	pin: Number,
	attached: Date, // when the source was attachd to the pin
	removed: Date, // when the source was removed from the pin
	name: String,
	supplier: String,
	producer: String,
	capactiy: Number,
	dispensed: Number
}, {
    timestamps: true
});

mongoose.model('Hub', hubSchema);
mongoose.model('Flow', flowSchema);
mongoose.model('Source', sourceSchema);

module.exports = mongoose;
