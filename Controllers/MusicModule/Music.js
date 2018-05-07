var synch = require('./Synchronizer');
var m = new Map(String, synch);

function attach(id, s) {
	m.set(id, s);
}

function remove(id) {
	m.delete(id);
}


module.exports = {
	attach,
	remove
};