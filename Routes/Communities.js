var express = require('express'),
	router = express.Router(),
	Database = require('../Models/Database'), 
	music = require('../Controllers/MusicModule/Music'),
	synch = require('../Controllers/MusicModule/Synchronizer').Synchronizer;

router.get('/', (req, res) => {
	var db = new Database();
	db.getAllCommunities((err, rows) => {
		res.write(JSON.stringify(rows));
		res.end();
	});
});

router.get('/:id', (req, res) => {
	var db = new Database();
	db.getCommunity(req.params.id, (err, row) => {
		res.write(JSON.stringify(row));
		res.end();
	});
});

router.post('/', (req, res) => {
	var db = new Database();
	db.addCommunity(req.body.title, req.body.controller, req.body.owner);
	db.getCommunity(req.body.title, (err, row) => {
		music.attach(row.id, new synch('c' + row.id, 0, 'http://localhost:17777/music/?/stream', () => {

	}));
	});
	res.end();
});

router.get('/:id/users', (req, res) => {
	var db = new Database();
	db.getCommunityUsers(req.params.id, (err, rows)=> {
		res.write(rows);
		res.end();
	});
});

router.get('/:id/tracks', (req, res) => {
	var db = new Database();
	db.getCommunityTracks(req.params.id, (err, rows)=> {
		res.write(rows);
		res.end();
	});
});

router.post('/:id/track/:track', (req, res) => {
	var db = new Database();
	db.addCommunityTrack(req.params.id, req.params.track);
	res.end();
});

router.post('/:id/user/:user', (req, res) => {
	var db = new Database();
	db.addCommunityUser(req.params.id, req.params.user);
	res.end();
});

module.exports = router;