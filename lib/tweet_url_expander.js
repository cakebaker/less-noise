var util = require('util'),
    events = require('events'),
    UrlExpander = require('./url_expander').UrlExpander;

function TweetUrlExpander() {
    events.EventEmitter.call(this);
}

util.inherits(TweetUrlExpander, events.EventEmitter);
exports.TweetUrlExpander = TweetUrlExpander;

TweetUrlExpander.prototype.expand = function (urls) {
    var that = this;
    var urlExpander = new UrlExpander(urls);
    urlExpander.expand();
    urlExpander.on('expanded', function (originalUrls, expandedUrls) {
        that.emit('allUrlsExpanded', originalUrls, expandedUrls);
    });
}
