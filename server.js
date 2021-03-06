var express			= require('express'),
	bodyParser		= require('body-parser'),
	config 			= require('./config'),
	eventRoutes		= require('./routes/event'),
    typeRoutes		= require('./routes/type'),
	app 			= express();

//remove powered by and etag
app.disable('x-powered-by');
app.disable('etag');

//middleware
app.use(bodyParser.urlencoded({extended: false}))	
   .use(bodyParser.json());

//basic routing
app.use('/api/event/', eventRoutes);
app.use('/api/type/', typeRoutes);

//rat
app.use('/', express.static(__dirname + '/rat'));

//catch all other request
app.use(function(req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Not Found');
});

//launch server
var server = app.listen(config.port, function () {
  var port = server.address().port;
  console.log('API rocking on port %s', port);
});