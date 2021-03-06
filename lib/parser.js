/**
 * Parser for the twitter stream
 *
 * Copyright (c) by Daniel Hofstetter (daniel.hofstetter@42dh.com, http://cakebaker.42dh.com)
 *
 * Licensed under the MIT License: http://opensource.org/licenses/mit-license
 * Redistributions of files must retain the above copyright notice.
 */

var util = require('util'),
    events = require('events');

function Parser() {
    if (!(this instanceof Parser)) return new Parser();

    events.EventEmitter.call(this);
    this.failedChunk = '';
}

util.inherits(Parser, events.EventEmitter)
exports.Parser = Parser;

Parser.prototype.parse = function (chunk) {
    var object;

    if (chunk != '\r\n') {
        console.log(util.inspect(chunk));
        try {
            object = JSON.parse(chunk);
            this._emit(object);
            return true;
        } catch (e) {
            if (this.failedChunk != '') {
                try {
                    object = JSON.parse(this.failedChunk + chunk);
                    this._emit(object);
                    return true;
                } catch (e) {}
            }
            this.failedChunk = chunk;
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
        this.emit('tweet', object);
    }
}
