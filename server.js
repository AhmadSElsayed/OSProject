'use strict';
var Database = require('./Models/Database');
var db = new Database();
db.init();
db.getAllTracks((err, rows)=> {
	console.log(rows);
});
db.db.close();

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

app.use('/communities', require('./Routes/Communities'));
app.use('/users', require('./Routes/Users'));
app.use('/music', require('./Routes/Music'));


var server = app.listen(app.get('port'), function () {
	console.log('Express server listening on port ' + server.address().port);
});

require('./Controllers/MusicModule/Synchronizer').init(server);
var synch = require('./Controllers/MusicModule/Synchronizer').Synchronizer;
var s = new synch('/0', 'song', 'http://localhost:17777/music/?/stream', () =>{

}, () => {

});
s.initialize();