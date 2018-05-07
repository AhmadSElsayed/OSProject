var mm = require('musicmetadata');
var fs = require('fs');
var crypto = require('crypto');

function getTrackMetadata(trackID, cb) {
	var rstream = fs.createReadStream('Public/Music/' + trackID);
	mm(rstream, { duration : true }, function (err, metadata) {
		if (err) 
			throw err;
		cb(metadata);
	});	
}

function getHash(password) {
	const cipher = crypto.createCipher('aes192', 'sameh');  
	var encrypted = cipher.update(password, 'utf8', 'hex');  
	encrypted += cipher.final('hex');  
	return encrypted;
}

function checkPassword(password, encrypted) {
	const decipher = crypto.createDecipher('aes192', 'sameh');  
	var decrypted = decipher.update(encrypted, 'hex', 'utf8');  
	decrypted += decipher.final('utf8');  
	return decrypted == password;
}

module.exports = {
	getTrackMetadata,
	getHash,
	checkPassword
};
