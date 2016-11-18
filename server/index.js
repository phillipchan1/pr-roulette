var express = require('express');
var morgan = require('morgan');
var path = require('path');
var app = express();
var parser = require('body-parser');
var mongoose    = require('mongoose');

mongoose.connect('mongodb://localhost/pr-roulette', function(err) {
	if (err) {
		console.error("failed to connect to db");
	} else {
		console.log("connected to db");
	}
}); // connect to database

// get method for parsing body
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));


var routes = require('./app.routes.js');
app.use('/api', routes);

// app.use(morgan('combined'));


app.use('/', express.static('client/'));

app.listen(8000, function () {
  console.log('Listening on port 8000');
});
