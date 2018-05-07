class Database {
	constructor(){
		var sqlite3 = require('sqlite3').verbose();
		var fs = require('fs');
		this.db = new sqlite3.Database(fs.readFileSync('Database/Database.config', 'utf-8'));
		this.db.serialize(() => {
			this.db.exec(fs.readFileSync('Database/Schema.sql', 'utf-8'));
		});
	}

	init(){
		const testFolder = 'Public/Music';
		const fs = require('fs');
		const utils = require('../Helpers/Utilities');
		var that = this;
		fs.readdirSync(testFolder).forEach(file => {
			utils.getTrackMetadata(file, (metadata) => {
				that.addTrack(file, metadata.artist[0], metadata.album, metadata.title, metadata.picture.format, metadata.picture.data, metadata.duration);
			});
		});
	}

	addCommunityTrack(trackID, communityId){
		this.db.run('insert into community_track values(?,?)', [trackID, communityId]);
	}

	addUserUser(userId1, userId2) {
		this.db.run('insert into user_user values(?,?)', [userId1, userId2]);
	}

	addUserTrack(userId, trackId){
		this.db.run('insert into user_track values(?,?)', [userId, trackId]);
	}

	addCommunityUser(communityId, userId) {
		this.db.run('insert into community_user values(?,?)', [communityId, userId]);
	}

	getCommunityUsers(id, callback) {
		this.db.all('select * from user where id in (select userId from community_user where communityId =?)', [id], callback);
	}

	getCommunityTracks(id, callback) {
		this.db.all('select * from track where id in (select userId from community_track where communityId =?)', [id], callback);
	}

	addCommunity(name, controllerID, ownerID) {
		this.db.run('INSERT INTO community(title, controllerId, ownerId) VALUES (?,?,?)', [name, controllerID, ownerID]);
	}

	deleteCommunity(id) {
		this.db.run('DELETE FROM community WHERE id=?', [id]);
	}

	getAllCommunities(callback) {
		this.db.all('SELECT * FROM community', [], callback);
	}

	getCommunity(id, callback) {
		this.db.get('select * from community where id = ?', [id], callback);
	}

	addUser(userName, password) {	
		this.db.run('INSERT INTO user(username, password) VALUES (?,?)', [userName, password]);
	}

	deleteUser(userId) {
		this.db.run('DELETE FROM user WHERE id=?',[userId]);
	}

	getAllUsers(callback) {
		this.db.all('SELECT * FROM user', [], callback);
	}

	getUser(userName, callback) {
		this.db.get('select * from user where username = ?', [userName], callback);
	}

	getUserTracks(id, callback) {
		this.db.all('select * from track where id in (select userId from user_track where userId =?)', [id], callback);
	}
	
	getUserFriends(id, callback) {
		this.db.all('select * from user where id in (select userId from user_user where userId =?)', [id], callback);		
	}
	
	addTrack(name, artist, album, title, format, picture, duration) {
		this.db.run('INSERT INTO track(name, artist, album, title, format, picture, duration) VALUES (?,?,?,?,?,?,?)', [name, artist, album, title, format, picture, duration]);
	}

	getTrack(trackID, callback){
		this.db.get('select * from track where id = ?', [trackID], callback);
	}

	getAllTracks(callback) {
		this.db.all('SELECT * FROM track', [], callback);
	}
}
module.exports = Database;