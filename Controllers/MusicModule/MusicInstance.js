class MusicInstance {
	constructor(duration, onFinishCallback) {
		this._duration;
		this._onFinish = onFinishCallback;
		this._state = '0';
	}

	play() {
		this._eventTime = Date.now();
		this._position = 0;
		this._state = 'play';
		this._timer = setTimeout(this._onFinish, this._duration + 100);
	}

	getPosition() {
		if(this._state == 'play')
			return Date.now() - this._eventTime; 
		else 
			return this._position;
	}

	pause() {
		this._state = 'pause';
		this._position = Date.now() - this._eventTime;
		this._eventTime = Date.now();
		clearTimeout(this._timer);
	}

	seek(position) {
		if(position > this._duration)
			throw new Error('Position Overflow');
		this._state = 'play';
		this._position = position;
		this._eventTime = Date.now();
		clearTimeout(this._timer);
		this._timer = setTimeout(this._onFinish, this._duration - this._position + 100);
		return this._position;
	}

	resume() {
		this._state = 'play';
		this._eventTime = Date.now();
		this._timer = setTimeout(this._onFinish, this._duration - this._position + 100);
		return this._position;
	}
}
module.exports = MusicInstance;