/**
 * Url filter
 *
 * Copyright (c) by Daniel Hofstetter (daniel.hofstetter@42dh.com, http://cakebaker.42dh.com)
 *
 * Licensed under the MIT License: http://opensource.org/licenses/mit-license
 * Redistributions of files must retain the above copyright notice.
 */

function UrlFilter(config) {
    this.domainsToFilter = config.domains;
}

UrlFilter.prototype.accept = function (tweet) {
    var HTTP_LENGTH = 'http://'.length, HTTPS_LENGTH = 'https://'.length; 

    if (tweet.hasUrls()) {
        var urls = tweet.getUrls();
        var i, j, pos;

        for (i = 0; i < urls.length; i++) {
            for (j = 0; j < this.domainsToFilter.length; j++) {
                pos = urls[i].indexOf(this.domainsToFilter[j]);
                if (pos === HTTP_LENGTH || pos === HTTPS_LENGTH) {
                    return false;
                }
            }
        }
    }

    return true;
}

module.exports = UrlFilter;
