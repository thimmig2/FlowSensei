var express = require('express'),
    router = express.Router(),
    mongoose = require('./db.js'),
    Hub = mongoose.model('Hub'),
    Flow = mongoose.model('Flow'),
    Source = mongoose.model('Source');

// Requires Admin level user account
router.put('/hub', function(req, res) {
    console.log('Registering new hub', req.body);
    console.log(Hub);
    Hub.create(req.body)
        .then(function(hub) {
            res.send(JSON.stringify(hub));
        })
        .catch(function(err) {
            res.send(err);
        });
})

// Requires authenticated user account
// Can only post to a hub without an existing user field
router.post('/hub', function(req, res) {
    console.log('Updating hub info', req.body);
    Hub.update(req.body._id, req.body)
        .then(function(hub) {
            res.send(JSON.stringify(hub));
        })
        .catch(function(err) {
            res.send(err);
        });
})

router.put('/flow', function(req, res) {
    console.log('Creating flow');
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
    Source.create(req.body)
        .then(function(source) {
            res.send(JSON.stringify(source));
        })
        .catch(function(err) {
            res.send(err);
        });
});

router.get('/flow', function(req, res) {
    Flow.find({hub: "413asAF3e"})
    .populate("hub")
    .exec(function(err, flow) {
      res.json(flow);
    });
});

exports = module.exports = router;