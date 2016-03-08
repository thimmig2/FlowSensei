var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var flowSchema = new Schema({
    hubId: Number,
    pinId: Number,
    timestamp: {
        type: Date,
        default: Date.now
    },
    duration: Number,
    amount: Number
});

module.exports = mongoose.model('Flow', flowSchema);