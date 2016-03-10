var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    shortid = require('shortid');

var sourceSchema = new Schema({
    _id: {
        type: String,
        unique: true,
        'default': shortid.generate
    },
    hub: {
        type: String,
        ref: 'Hub'
    },
    pinNumber: Number,
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

module.exports = sourceSchema;