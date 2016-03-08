
var express = require('express'),
	router = express.Router(),
	mongoose = require('./db/client.js'),
	Flow = mongoose.model('Flow');

router.put('/flow', function(req, res) { 
	console.log('Serving flow');	
	var flow = new Flow(req.body);
  	flow.save(function(err, save) {
  		if(err) {
  			res.send(err);
  		} else {
  			res.send('Success')
  		}
  	});
});

exports = module.exports = router;
