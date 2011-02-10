function Tweet(data) {
    this.data = data;
}

exports.Tweet = Tweet;

Tweet.prototype.expandUrls = function (expander) {
    if (this.hasUrls()) {
        var urls = this.getUrls();
        var that = this;

        expander.on('allUrlsExpanded', function (originalUrls, expandedUrls) {
            var status = that.getStatus();

            for (var i = 0; i < urls.length; i++) {
                status.entities.urls[i].expanded_url = expandedUrls[originalUrls.indexOf(urls[i])];
            }

            expander.emit('expanded', that);
        });

        expander.expand(urls);
    } else {
        expander.emit('expanded', this);
    }
}

Tweet.prototype.getStatus = function () {
    if (this.isRetweet()) {
        return this.data.retweeted_status;
    }

    return this.data;
}

Tweet.prototype.getUrls = function () {
    var i, result = [];
    var urls = this.getStatus().entities.urls;

    for (i = 0; i < urls.length; i++) {
        result.push(urls[i].url);
    }

    return result;
}

Tweet.prototype.hasUrls = function () {
    return (this.getStatus().entities.urls.length > 0);
}

Tweet.prototype.isRetweet = function () {
    return ('retweeted_status' in this.data);
}
