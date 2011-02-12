var linkHelper = require('../lib/link_helper');

function Tweet(data) {
    this.data = data;
}

exports.Tweet = Tweet;

Tweet.prototype.autolink = function () {
    var status = this.getStatus();
    status.text = linkHelper.linkUrls(status.text, this.getUrls(), this.getExpandedUrls());
    status.text = linkHelper.linkUserMentions(status.text, this.getUserMentions());
}

Tweet.prototype.expandUrls = function (expander) {
    if (this.hasUrls()) {
        var urls = this.getUrls();
        var that = this;

        expander.on('allUrlsExpanded', function (originalUrls, expandedUrls) {
            var status = that.getStatus();
            var cleanUrls = linkHelper.cleanUrls(expandedUrls);

            for (var i = 0; i < urls.length; i++) {
                status.entities.urls[i].expanded_url = cleanUrls[originalUrls.indexOf(urls[i])];
            }

            expander.emit('expanded', that);
        });

        expander.expand(urls);
    } else {
        expander.emit('expanded', this);
    }
}

Tweet.prototype.getExpandedUrls = function () {
    var i, result = [];
    var urls = this.getStatus().entities.urls;

    for (i = 0; i < urls.length; i++) {
        result.push(urls[i].expanded_url);
    }

    return result;
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

Tweet.prototype.getUserMentions = function () {
    var i, result = [];
    var userMentions = this.getStatus().entities.user_mentions;

    for (i = 0; i < userMentions.length; i++) {
        result.push(userMentions[i].screen_name);
    }

    return result;
}

Tweet.prototype.hasUrls = function () {
    return (this.getStatus().entities.urls.length > 0);
}

Tweet.prototype.isRetweet = function () {
    return ('retweeted_status' in this.data);
}
