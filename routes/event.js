var express 	= require('express'),
    events		= require('../services/events'),
	router 		= express.Router();

///
/// Events
///

router.get('/', function(req, res) {
    events.all();
	res.status(200).send('OK');
});

router.get('/:id', function(req, res) {
	return events.fetch(req.params.id, function (err, body) {
		if(err){
			return res.status(500).send(err);
		}
		return res.status(200).send(body);
	});
});

router.post('/', function(req, res) {
	return events.add(req.body, function(err, body) {
		if(err){
			return res.status(500).send(err);
		}
		return res.status(200).send(body);
	});
});

router.put('/:id', function(req, res) {

	if(!req.body.uuid){
		req.body.uuid = req.params.id;
	}

	return events.update(req.body, function(err, body) {
		if(err){
			return res.status(500).send(err);
		}
		return res.status(200).send(body);
	});
});

///
/// Vote
///



module.exports = router;