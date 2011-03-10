/**
 * Foreign characters filter. Filters out tweets with Cyrillic, Japanese, Thai and Indian characters.
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

    // 0400 - 04FF: Cyrillic
    // 3040 - 309F: Hiragana (Japanese)
    // 0E00 - 0E7F: Thai
    // 0A00 - 0A7F: Gurmukhi (Indian)
    return !(/[\u0400-\u04FF\u3040-\u309F\u0E00-\u0E7F\u0A00-\u0A7F]+/.test(text));
}

module.exports = ForeignCharactersFilter;
