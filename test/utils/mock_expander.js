var util = require('util'),
    events = require('events');

function MockExpander(originalUrls, expandedUrls) {
    this.originalUrls = originalUrls;
    this.expandedUrls = expandedUrls;
    events.EventEmitter.call(this);
}

util.inherits(MockExpander, events.EventEmitter);
exports.MockExpander = MockExpander;

MockExpander.prototype.expand = function (urls) {
    this.emit('allUrlsExpanded', this.originalUrls, this.expandedUrls);
}

