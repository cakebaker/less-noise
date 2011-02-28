/**
 * Foreign characters filter. Filters out tweets with Cyrillic, Japanese and Thai characters.
 *
 * Copyright (c) by Daniel Hofstetter (daniel.hofstetter@42dh.com, http://cakebaker.42dh.com)
 *
 * Licensed under the MIT License: http://opensource.org/licenses/mit-license
 * Redistributions of files must retain the above copyright notice.
 */

function ForeignCharactersFilter(config) {
    // empty, filter doesn't expect any config settings
}

ForeignCharactersFilter.prototype.accept = function (tweet) {
    var text = tweet.getStatus().text;

    // 0400 - 04FF: Cyrillic; 
    // 3040 - 309F: Hiragana (Japanese); 
    // 0E00 - 0E7F: Thai
    if (/[\u0400-\u04FF\u3040-\u309F\u0E00-\u0E7F]+/.test(text)) {
        return false;
    }

    return true;
}

module.exports = ForeignCharactersFilter;
