/**
 * Represents a tweet/retweet
 *
 * Copyright (c) by Daniel Hofstetter (daniel.hofstetter@42dh.com, http://cakebaker.42dh.com)
 *
 * Licensed under the MIT License: http://opensource.org/licenses/mit-license
 * Redistributions of files must retain the above copyright notice.
 */

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

        expander.once('allUrlsExpanded', function (originalUrls, expandedUrls) {
            var status = that.getStatus();
            var cleanUrls = linkHelper.cleanUrls(expandedUrls);

            urls.forEach(function (url, i) {
                status.entities.urls[i].expanded_url = cleanUrls[originalUrls.indexOf(url)];
            });

            expander.emit('expanded', that);
        });

        expander.expand(urls);
    } else {
        expander.emit('expanded', this);
    }
}

Tweet.prototype.getExpandedUrls = function () {
    var result = [];
    var urls = this.getStatus().entities.urls;

    urls.forEach(function (url) {
        result.push(url.expanded_url);
    });

    return result;
}

Tweet.prototype.getHashtags = function () {
    var result = [];
    var hashtags = this.getStatus().entities.hashtags;

    hashtags.forEach(function (hashtag) {
        result.push(hashtag.text);
    });

    return result;
}

Tweet.prototype.getStatus = function () {
    if (this.isRetweet()) {
        return this.data.retweeted_status;
    }

    return this.data;
}

Tweet.prototype.getUrls = function () {
    var result = [];
    var urls = this.getStatus().entities.urls;

    urls.forEach(function (url) {
        result.push(url.url);
    });

    return result;
}

Tweet.prototype.getUserMentions = function () {
    var result = [];
    var userMentions = this.getStatus().entities.user_mentions;

    userMentions.forEach(function (userMention) {
        result.push(userMention.screen_name);
    });

    return result;
}

Tweet.prototype.hasHashtags = function () {
    return (this.getStatus().entities.hashtags.length > 0);
}

Tweet.prototype.hasUrls = function () {
    return (this.getStatus().entities.urls.length > 0);
}

Tweet.prototype.hasUserMentions = function () {
    return (this.getStatus().entities.user_mentions.length > 0);
}

Tweet.prototype.isRetweet = function () {
    return ('retweeted_status' in this.data);
}
