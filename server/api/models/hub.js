var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    shortid = require('shortid');

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