'use strict';

var mongoose = require('mongoose');
var localDB = 'mongodb://localhost/pr-roulette';
var mLabDB = 'mongodb://admin:thebible@ds049180.mlab.com:49180/matchify-dev';

mongoose.connect(localDB, function(err) {
	if (err) {
		console.log("Failed to connect to mongodb");
	} else {
		console.log("Successfully connected to mongodb");
	}
});