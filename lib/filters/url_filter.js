/**
 * Url filter
 *
 * Copyright (c) by Daniel Hofstetter (daniel.hofstetter@42dh.com, http://cakebaker.42dh.com)
 *
 * Licensed under the MIT License: http://opensource.org/licenses/mit-license
 * Redistributions of files must retain the above copyright notice.
 */

function UrlFilter(config) {
    this.unwantedDomains = config.domains;
}

UrlFilter.prototype.accept = function (tweet) {
    if (tweet.hasUrls()) {
        return containsNoURLWithUnwantedDomain(tweet.getUrls(), this.unwantedDomains);
    }

    return true;
}

module.exports = UrlFilter;

function containsNoURLWithUnwantedDomain(urls, unwantedDomains) {
    var HTTP_LENGTH = 'http://'.length, HTTPS_LENGTH = 'https://'.length;

    return urls.every(function (url) {
        return unwantedDomains.every(function (unwantedDomain) {
            var pos = url.indexOf(unwantedDomain);

            return (pos !== HTTP_LENGTH && pos !== HTTPS_LENGTH);
        });
    });
}
