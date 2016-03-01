var config	= require('../config'),
	db 		= require('nano')(config.db.url);

module.exports = db;