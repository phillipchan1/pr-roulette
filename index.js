var express = require('express');
var morgan = require('morgan');
var path = require('path');
var app = express();
var mongoose    = require('mongoose');

mongoose.connect('mongodb://localhost/pr-roulette', function(err) {
	if (err) {
		console.error("failed to connect to db");
	} else {
		console.log("connected to db")
	}
}); // connect to database

var routes = require('./app.routes.js');
app.use('/api', routes);

// app.use(morgan('combined'));



app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname + '/public/index.html'));
});



app.listen(80, function () {
  console.log('Listening on port 80');
});
