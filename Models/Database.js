class Database {
	constructor(){
		var sqlite3 = require('sqlite3').verbose();
		var fs = require('fs');
		this.db = new sqlite3.Database(fs.readFileSync('Database/Database.config', 'utf-8'));
		this.db.serialize(() => {
			this.db.exec(fs.readFileSync('Database/Schema.sql', 'utf-8'));
		});
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

	updateCommunity(id, name, controllerID){
		this.db.run('update community set name = ? , set controllerId = ? where id = ?', [name, controllerID, id]);
	}

	addUser(userId, userName, password) {	
		this.db.run('INSERT INTO user VALUES (?,?,?)', [userId, userName, password]);
	}

	deleteUser(userId) {
		this.db.run('DELETE FROM user WHERE id=?',[userId]);
	}

	getAllUsers(callback) {
		this.db.all('SELECT * FROM user', [], callback);
	}
	
	addTrack(artist, album, title, picture, duration) {
		this.db.run('INSERT INTO track VALUES (?,?,?)', [artist, album, title, picture, duration]);
	}

	deleteTrack(trackId) {
		this.db.run('DELETE FROM track WHERE id=?',[trackId]);
	}

	getAllTracks(callback) {
		this.db.all('SELECT * FROM track', [], callback);
	}
}
module.exports = Database;