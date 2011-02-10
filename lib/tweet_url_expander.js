var sys = require('sys'),
    events = require('events'),
    statusHelper = require('./status_helper'),
    UrlExpander = require('./url_expander').UrlExpander;

function TweetUrlExpander() {
    events.EventEmitter.call(this);
}

sys.inherits(TweetUrlExpander, events.EventEmitter);
exports.TweetUrlExpander = TweetUrlExpander;

TweetUrlExpander.prototype.expand = function (urls) {
    var that = this;
    var urlExpander = new UrlExpander(urls);
    urlExpander.expand();
    urlExpander.on('expanded', function (originalUrls, expandedUrls) {
        that.emit('allUrlsExpanded', originalUrls, expandedUrls);
    });
}
