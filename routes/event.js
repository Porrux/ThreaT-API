var express 	= require('express'),
    events		= require('../services/events'),
	router 		= express.Router();

router.get('/', function(req, res) {
    events.all();
	res.status(200).send('OK');
});

module.exports = router;