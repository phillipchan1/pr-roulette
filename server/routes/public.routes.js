var express = require('express');
var router = express.Router();
var Team = require('../models/team');

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

module.exports = router;