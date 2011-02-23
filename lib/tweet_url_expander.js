/**
 * A wrapper for the UrlExpander
 *
 * Copyright (c) by Daniel Hofstetter (daniel.hofstetter@42dh.com, http://cakebaker.42dh.com)
 *
 * Licensed under the MIT License: http://opensource.org/licenses/mit-license
 * Redistributions of files must retain the above copyright notice.
 */

var util = require('util'),
    events = require('events'),
    UrlExpander = require('url-expander');

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
