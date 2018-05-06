var express = require('express'),
	router = express.Router(),
	Database = require('../Models/Database');

router.get('/', (req, res) => {
	var db = new Database();
	db.getAllCommunities((err, rows) => {
		res.write(JSON.stringify(rows));
		res.end();
	});
});

router.post('/', (req, res) => {
	var db = new Database();
	db.addCommunity(req.body.name, req.body.controller, req.body.owner);
	res.end();
});

module.exports = router;