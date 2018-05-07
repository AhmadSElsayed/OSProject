var express = require('express'),
	router = express.Router(),
	auth = require('../Middlewares/Authorization'),
	utils = require('../Helpers/Utilities'),
	Database = require('../Models/Database');

router.post('/login', (req, res) => {
	res.write(auth(req.body.username, req.body.password));
	res.end();
});

router.post('/register', (req, res) => {
	var u = req.body.username;
	var p = req.body.password;
	var db = new Database();
	try{
		db.addUser(u, utils.getHash(p));
	} catch(error) {
		res.write(error);
	}
	res.end();
});

router.get('/:id/friends', (req, res) => {
	var db = new Database();
	db.getUserFriends(req.params.id, (err, rows) => {
		res.write(rows);
		res.end();
	});
});

router.get('/:id/tracks', (req, res) => {
	var db = new Database();
	db.getUserTracks(req.params.id, (err, rows) => {
		res.write(rows);
		res.end();
	});
});

router.post('/:id/user/:user', (req, res) => {
	var db = new Database();
	db.addUserUser(req.params.id, req.params.user);
	res.end();
});

router.post('/:id/track/:track', (req, res) => {
	var db = new Database();
	db.addUserTrack(req.params.id, req.params.user);
	res.end();
});

module.exports = router;