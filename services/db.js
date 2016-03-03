var config		= require('../config'),
	db 			= require('nano')(config.db.url),
	threatDb	= db.use('threat');

module.exports = threatDb;