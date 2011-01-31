var sys = require('sys'),
    events = require('events'),
    statusHelper = require('./status_helper'),
    UrlExpander = require('./url_expander').UrlExpander;

function TweetUrlExpander() {
    events.EventEmitter.call(this);
}

sys.inherits(TweetUrlExpander, events.EventEmitter);
exports.TweetUrlExpander = TweetUrlExpander;

TweetUrlExpander.prototype.expand = function (tweet) {
    var status = ('retweeted_status' in tweet) ? tweet.retweeted_status : tweet;
    var that = this;
    var urlExpander, expectedEvents;

    if (statusHelper.hasUrls(status)) {
        var urlExpander = new UrlExpander(statusHelper.getUrlsAsArray(status));
        urlExpander.expand();
        urlExpander.on('expanded', function (originalUrls, expandedUrls) {
            for (var i = 0; i < status.entities.urls.length; i++) {
                status.entities.urls[i].expanded_url = expandedUrls[originalUrls.indexOf(status.entities.urls[i].url)];
            }
            that.emit('expanded', tweet);
        });
    } else {
        this.emit('expanded', tweet);
    }
}
