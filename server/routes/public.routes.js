var express = require('express');
var router = express.Router();
var Team = require('../models/team');
var stringUtils = require('../utils/stringUtils');

// get specific request list by list id
router.get('/team/view/:id', function(req, res, next) {
	var list_id = req.params.id;

	// if list_id provided, return that one
	Team.findById(list_id, function(err, team) {
		if (err) {
			res.json(err);
		} else {
			res.json({
				success: true,
				data: team
			});
		}
	});
});

// get list of teams based on fuzzy search term
router.get('/teams/search/', function(req, res, next) {

	if (req.headers.teamname) {
		let regex = new RegExp(stringUtils.escapeRegex(req.headers.teamname), 'gi');

		Team
		.find({'settings.name': regex})
		.limit(20)
		.exec(function(err, teams) {
			if (err) {
				console.log(err);
			} else {
				res.json(teams);
			}
		});
	}

});

module.exports = router;