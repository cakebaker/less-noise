/**
 * Hashtag filter
 *
 * Copyright (c) by Daniel Hofstetter (daniel.hofstetter@42dh.com, http://cakebaker.42dh.com)
 *
 * Licensed under the MIT License: http://opensource.org/licenses/mit-license
 * Redistributions of files must retain the above copyright notice.
 */

function HashtagFilter(config) {
    this.unwantedHashtags = config.hashtags;
}

HashtagFilter.prototype.accept = function (tweet) {
    if (tweet.hasHashtags()) {
        return containsNoUnwantedHashtag(tweet.getHashtags(), this.unwantedHashtags);
    }

    return true;
}

module.exports = HashtagFilter;

function containsNoUnwantedHashtag(hashtags, unwantedHashtags) {
    return hashtags.every(function (hashtag) {
        return unwantedHashtags.every(function (unwantedHashtag) {
            return (hashtag.toLowerCase() != unwantedHashtag.toLowerCase());
        });
    });
}
