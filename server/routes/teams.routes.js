var express = require('express');
var router = express.Router();
var Team = require('../models/team');

// create team list
router.post('/teams', function(req, res, next) {
	Team.create({
		owner: req.email,
		settings: {
			name: "New Team"
		}
	}, function(err, request) {
		if (err) {
			res.json(err);
		} else {
			res.json({
				success: true,
				data: request,
				message: "Request created successfully"
			});
		}
	});
});

// delete team list
router.put('/team/:id', function(req, res, next) {
	Team.findById(req.params.id, function(err, team) {
		if (err) {
			res.json(err);
		} else {
			team.remove();
			res.json({
				success: true,
				data: team
			});
		}

	});
});

// get all team lists
router.get('/teams', function(req, res, next) {
	Team.find({
		owner: req.email
	}, function(err, request) {
		if (err) {
			res.json({
				success: false,
				message: err
			});
		} else {
			res.json({
				success: true,
				data: request
			});
		}
	});
});

// search teams
router.get('/teams/search/:term', function(req, res, next) {
	Team.textSearch(req.params.term, function(err, output) {
		res.json(out);
	});
	// Team.find({
	// 	owner: req.email
	// }, function(err, request) {
	// 	if (err) {
	// 		res.json({
	// 			success: false,
	// 			message: err
	// 		});
	// 	} else {
	// 		res.json({
	// 			success: true,
	// 			data: request
	// 		});
	// 	}
	// });
});

// get specific request list by list id
router.get('/team/:id', function(req, res, next) {
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

// post list settings by list id
router.post('/team/:id/settings', function(req, res, next) {
	var list_id = req.params.id;

	// if list_id provided, return that one
	Team.findById(list_id, function(err, team) {
		if (err) {
			res.json(err);
		} else {

			team.settings = req.body.settings;

			team.save(function(err, user) {
				if (err) {
					res.json(err);
				}
				else {
					res.json({
						success: true,
						data: team
					});
				}
			});
		}
	});
});

// post list settings by list id
router.post('/team/:id/member', function(req, res, next) {
	var list_id = req.params.id;

	// if list_id provided, return that one
	Team.findById(list_id, function(err, team) {
		if (err) {
			res.json(err);
		} else {

			team.members = req.body.members;

			team.save(function(err, user) {
				if (err) {
					res.json(err);
				}
				else {
					res.json({
						success: true,
						data: team
					});
				}
			});
		}
	});
});


module.exports = router;