var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    shortid = require('shortid');

var hubSchema = new Schema({
    _id: {
        type: String,
        unique: true,
        'default': shortid.generate
    },
    user: {
        type: String,
        ref: 'User'
    },
    name: String,
    company: String
}, {
    timestamps: true
});

module.exports = hubSchema;