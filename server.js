'use strict';
var express = require('express');
var app = express();
var fs = require('fs');


app.get('/', function (req, res) {
    var rstream = fs.createReadStream('Music/song.mp3');
    rstream.pipe(res);
});

app.get('/data', function (req, res) {
    var mm = require('musicmetadata');
    var rstream = fs.createReadStream('Music/song.mp3');
    var parser = mm(rstream, { duration : true }, function (err, metadata) {
        if (err) throw err;
        console.log(metadata);
    });
    rstream.pipe(res);
});

app.set('port', process.env.PORT || 1337);

var server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + server.address().port);
});