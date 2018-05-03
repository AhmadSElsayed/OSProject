var mm = require('musicmetadata');
var fs = require('fs');
function getTrackMetadata(trackID, cb) {
	var rstream = fs.createReadStream('Music/' + trackID + '.mp3');
	mm(rstream, { duration : true }, function (err, metadata) {
		if (err) 
			throw err;
		cb(metadata);
	});	
}
module.exports = {
	getTrackMetadata
};