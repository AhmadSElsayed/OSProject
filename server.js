'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('port', process.env.PORT || 17777);

app.use(bodyParser.json());

app.use(function (req, res, next) { //allow cross origin requests
	res.setHeader('Access-Control-Allow-Methods', 'POST, PUT, OPTIONS, DELETE, GET');
	res.header('Access-Control-Allow-Origin', req.headers.origin);
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept,Authorization');
	res.header('Access-Control-Allow-Credentials', true);
	next();
});
app.get('/music/:trackID/stream', function (req, res) {
	var fs = require('fs');
	var rstream = fs.createReadStream('Public/Music/' + req.params.trackID + '.mp3');
	rstream.pipe(res);
});
app.use('/communities', require('./Routes/Communities'));
var server = app.listen(app.get('port'), function () {
	console.log('Express server listening on port ' + server.address().port);
});