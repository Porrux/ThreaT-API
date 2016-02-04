var express			= require('express'),
	bodyParser		= require('body-parser'),
	config 			= require('./config'),
	app 			= express();

//remove powered by and etag
app.disable('x-powered-by');
app.disable('etag');

//middleware
app.use(bodyParser.urlencoded({extended: false}))	
   .use(bodyParser.json());

//catch all other request
app.use(function(req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Not Found');
});

//launch server
var server = app.listen(config.server.port, function () {
  var port = server.address().port;
  console.log('API rocking on port %s', port);
});