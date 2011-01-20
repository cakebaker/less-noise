var sys = require('sys'),
    events = require('events');

function Parser() {
    if (!(this instanceof Parser)) return new Parser();

    events.EventEmitter.call(this);
}

sys.inherits(Parser, events.EventEmitter)
exports.Parser = Parser;

Parser.prototype.parse = function (chunk) {
    if (chunk != '\r\n') {
        console.log(sys.inspect(chunk));
    }
}
