'use strict';

var mongoose = require('mongoose');

var teamSchema = new mongoose.Schema({
    owner: {
    	type: String,
    	unique: false
    },
    name: String,
    schedule: {},
    pageURL: String,
    settings: {},
    members: {
        type: Array
    }
});


var team = mongoose.model('teams', teamSchema);

module.exports = team;
