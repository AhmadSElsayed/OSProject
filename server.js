'use strict';
var express = require('express');
var app = express();
app.set('port', process.env.PORT || 17777);
var fs = require('fs');
app.use(function (req, res, next) { //allow cross origin requests
	res.setHeader('Access-Control-Allow-Methods', 'POST, PUT, OPTIONS, DELETE, GET');
	res.header('Access-Control-Allow-Origin', req.headers.origin);
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept,Authorization');
	res.header('Access-Control-Allow-Credentials', true);
	next();
});

var server = app.listen(app.get('port'), function () {
	console.log('Express server listening on port ' + server.address().port);
});

app.get('/music/:trackID/stream', function (req, res) {
	var rstream = fs.createReadStream('Music/' + req.params.trackID + '.mp3');
	rstream.pipe(res);
});

app.get('/music/:trackID/meta', function (req, res) {
	var mm = require('musicmetadata');
	var rstream = fs.createReadStream('Music/' + req.params.trackID + '.mp3');
	mm(rstream, { duration : true }, function (err, metadata) {
		if (err) 
			throw err;
		console.log(metadata);
		res.write(JSON.stringify(metadata));
	});
});

var synch = require('./src/MusicModule/Synchronizer');
var io = require('socket.io').listen(server);
var s = new synch(io.of('/0'), 'song', 'http://localhost:17777/music/?/stream', () =>{

}, () => {

});
s.initialize();