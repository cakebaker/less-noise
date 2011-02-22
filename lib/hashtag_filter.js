/**
 * Hashtag filter
 *
 * Requires node.js 0.4.0
 *
 * Copyright (c) by Daniel Hofstetter (daniel.hofstetter@42dh.com, http://cakebaker.42dh.com)
 *
 * Licensed under the MIT License: http://opensource.org/licenses/mit-license
 * Redistributions of files must retain the above copyright notice.
 */

function HashtagFilter(config) {
    if (!(this instanceof HashtagFilter)) return new HashtagFilter(config);

    this.hashtagsToFilter = config.hashtagsToFilter;
}

exports.HashtagFilter = HashtagFilter;

HashtagFilter.prototype.accept = function (tweet) {
    if (tweet.hasHashtags()) {
        var hashtags = tweet.getHashtags();
        var i, j;

        for (i = 0; i < hashtags.length; i++) {
            for (j = 0; j < this.hashtagsToFilter.length; j++) {
                if (this.hashtagsToFilter[j] == hashtags[i]) {
                    return false;
                }
            }
        }
    }

    return true;
}
