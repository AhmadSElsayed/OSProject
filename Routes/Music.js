var express = require('express'),
	router = express.Router(),
	Database = require('../Models/Database');

router.get('/:trackID/stream', function (req, res) {
	var fs = require('fs');
	var rstream = fs.createReadStream('Public/Music/' + req.params.trackID);
	rstream.pipe(res);
});

router.get('/:trackID/meta', function (req, res) {
	var db = new Database();
	db.getTrack(req.params.trackID, (error, row) => {
		res.write(JSON.stringify(row));
		res.end();
	});
});

router.get('/meta', function(req, res) {
	var db = new Database();
	db.getAllTracks((error, rows) => {
		res.write(JSON.stringify(rows));
		res.end();
	});
});


module.exports = router;