'use strict';

var mongoose = require('mongoose');
var textSearch = require('mongoose-text-search');

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

teamSchema.plugin(textSearch);
teamSchema.index({
    settings: {
        name: 'text'
    }
});

var team = mongoose.model('teams', teamSchema);

module.exports = team;
