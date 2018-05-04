var MusicInstance = require('./MusicInstance');
class Synchronizer {
	constructor (nsp, trackID, baseUrl, onReady, onFinish) {
		this._nsp = nsp;
		this._trackID = trackID;
		this._baseUrl = baseUrl;
		this._musicInstance = new MusicInstance(trackID, onReady, onFinish);
	}
	initialize() {
		var that = this;
		that._nsp.on('connection', function(client) {
			console.log('Connected');
			client.on('play', function (data) {
				if (that._musicInstance._state == '0')
					that._musicInstance.play();
				client.emit('play', { url: that._baseUrl.replace('?', data.trackID) , position: that._musicInstance.getPosition() });
				console.log('Song Playing Position', that._musicInstance.getPosition());
			});
			client.on('seek', function(data){
				if(that._musicInstance != undefined) {
					that._nsp.emit('seek', { position: that._musicInstance.seek(data.position) });
				}
			});
		});
	}
}
module.exports = Synchronizer;