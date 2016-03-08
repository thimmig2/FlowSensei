
var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/test');

var flowSchema = new mongoose.Schema({
    hubId: Number,
    pinId: Number,
    timestamp: {
        type: Date,
        default: Date.now
    },
    duration: Number,
    amount: Number
});
mongoose.model('Flow', flowSchema);

module.exports = mongoose;
