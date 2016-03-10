var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    shortid = require('shortid');

var flowSchema = new Schema({
    _id: {
        type: String,
        unique: true,
        'default': shortid.generate
    },
    hub: {
        type: String,
        ref: 'Hub',
        required: 'Flow must be registered by a hub.'
    },
    pinNumber: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    amount:  {
        type: Number,
        required: true
    },
}, {
    timestamps: true
});

module.exports = flowSchema