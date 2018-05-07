var Database = require('../../Models/Database');
var utils = require('../../Helpers/Utilities');

function Authorize(username, password) {
	var db = new Database();
	db.getUser(username, (err,row) => {
		if(err) 
			return err;
		if(!row) {
			return { message: 'Incorrect Username'};
		}
		if(!utils.checkPassword(password, row.password)) {
			return {message: 'Incorrect Password'};
		}
		return {message: row.id};
	});
}
module.exports = Authorize;