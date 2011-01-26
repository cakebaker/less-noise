var sys = require('sys'),
    events = require('events');

function Parser() {
    if (!(this instanceof Parser)) return new Parser();

    events.EventEmitter.call(this);
}

sys.inherits(Parser, events.EventEmitter)
exports.Parser = Parser;

Parser.prototype.parse = function (chunk) {
    var object;

    if (chunk != '\r\n') {
        console.log(sys.inspect(chunk));
        try {
            object = JSON.parse(chunk);
            this._emit(object);
            return true;
        } catch (e) {
            console.log(e.toString());
        }
    }

    return false;
}

Parser.prototype._emit = function (object) {
    if (object.friends) {
        this.emit('friends', object.friends);
    } else if (object.text) {
        if (object.retweeted_status) {
            this.emit('retweet', object);
        } else {
            this.emit('status', object);
        }
    }
}
