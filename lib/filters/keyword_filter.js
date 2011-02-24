/**
 * Keyword filter
 *
 * Copyright (c) by Daniel Hofstetter (daniel.hofstetter@42dh.com, http://cakebaker.42dh.com)
 *
 * Licensed under the MIT License: http://opensource.org/licenses/mit-license
 * Redistributions of files must retain the above copyright notice.
 */

function KeywordFilter(config) {
    this.keywords = config.keywords;
}

KeywordFilter.prototype.accept = function (tweet) {
    var text = tweet.getStatus().text;
    var i, regex, result;

    for (i = 0; i < this.keywords.length; i++) {
        regex = new RegExp(this.keywords[i], 'i');
        result = regex.exec(text);
        if (result != null) {
            return false;
        }
    }

    return true;
}

module.exports = KeywordFilter;
