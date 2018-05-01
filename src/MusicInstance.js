export default class MusicInstance {
    constructor(trackID) {
        this._trackID = trackID;
        this._eventTime = Date.now();
        this._position = 0;
        this._state = 'play';
    }

    pause() {
        this._state = 'pause';
        this._position = Date.now() - this._eventTime;
        this._eventTime = Date.now();
    }

    seek(position) {
        this._state = 'play';
        this._position = position;
        this._eventTime = Date.now();
    }

    resume() {
        this._state = 'play';
        this._eventTime = Date.now();
    }
}
