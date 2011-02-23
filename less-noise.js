/**
 * Main file of less-noise
 *
 * Copyright (c) by Daniel Hofstetter (daniel.hofstetter@42dh.com, http://cakebaker.42dh.com)
 *
 * Licensed under the MIT License: http://opensource.org/licenses/mit-license
 * Redistributions of files must retain the above copyright notice.
 */

var webserver = require('./lib/webserver'),
    io = require('socket.io'),
    config = require('./config').config(),
    Expander = require('./lib/tweet_url_expander').TweetUrlExpander,
    Tweet = require('./lib/tweet').Tweet,
    linkHelper = require('./lib/link_helper'),
    parser = require('./lib/parser').Parser(),
    urlFilter = require('./lib/url_filter').UrlFilter(config),
    hashtagFilter = require('./lib/hashtag_filter').HashtagFilter(config),
    twitter = require('./lib/twitter').Twitter(config);

var expander = new Expander();
var socket = io.listen(webserver.start(config.port, twitter));

parser.on('tweet', function (data) {
    var tweet = new Tweet(data);

    if (hashtagFilter.accept(tweet)) {
        if (urlFilter.accept(tweet)) {
            tweet.expandUrls(expander);
        }
    }
});

expander.on('expanded', function (tweet) {
    tweet.autolink();
    socket.broadcast(tweet);
});

twitter.stream(parser);
