/**
 * Keyword filter
 *
 * Copyright (c) by Daniel Hofstetter (daniel.hofstetter@42dh.com, http://cakebaker.42dh.com)
 *
 * Licensed under the MIT License: http://opensource.org/licenses/mit-license
 * Redistributions of files must retain the above copyright notice.
 */

function KeywordFilter(config) {
    this.unwantedKeywords = config.keywords;
}

KeywordFilter.prototype.accept = function (tweet) {
    return containsNoKeyword(tweet.getStatus().text, this.unwantedKeywords);
}

module.exports = KeywordFilter;

function containsNoKeyword(text, keywords) {
    return keywords.every(function (keyword) {
        var regex = new RegExp(keyword, 'i');

        return !regex.test(text);
    });
}
