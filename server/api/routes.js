

var express = require('express'),
    router = express.Router(),
    mongoose = require('./db.js'),
    Hub = mongoose.model('Hub'),
    Flow = mongoose.model('Flow'),
    Source = mongoose.model('Source');

router.put('/hub', function(req, res) {
    console.log('Registering new hub');
    Hub.create({req.body})
        .then(function(hub) {
            res.send(JSON.stringify(hub));
        })
        .catch(function(err) {
            res.send(err);
        });
})

router.put('/flow', function(req, res) {
    console.log('Serving flow');
    Flow.create(req.body)
        .then(function(flow) {
            res.send(JSON.stringify(flow));
        })
        .catch(function(err) {
            res.send(err);
        });
});

router.put('/source', function(req, res) {
    console.log('Registering new hub');
    Source.create({req.body})
        .then(function(source) {
            res.send(JSON.stringify(source));
        })
        .catch(function(err) {
            res.send(err);
        });
});

router.get('/flow', function(req, res) {
    if(req.body.hub._id) {
        console.log('Fetching flows for');
        
    }
});

exports = module.exports = router;