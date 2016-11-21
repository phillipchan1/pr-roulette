'use strict';

var mongoose = require('mongoose');
var localDB = 'mongodb://localhost/pr-roulette';
var mLabDB = 'mongodb://admin:prroulette@ds159497.mlab.com:59497/prroulette';

mongoose.connect(mLabDB, function(err) {
	if (err) {
		console.log("Failed to connect to mongodb");
	} else {
		console.log("Successfully connected to mongodb at mLabs");
	}
});