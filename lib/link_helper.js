/**
 * Helper for linking stuff within tweets
 *
 * Copyright (c) by Daniel Hofstetter (daniel.hofstetter@42dh.com, http://cakebaker.42dh.com)
 *
 * Licensed under the MIT License: http://opensource.org/licenses/mit-license
 * Redistributions of files must retain the above copyright notice.
 */

var querystringCleaner = require('../lib/querystring_cleaner');

function cleanUrls(urls) {
    var cleanUrls = [];
    var unwantedParams = ['utm_campaign', 'utm_source', 'utm_medium', 'utm_content'];

    urls.forEach(function (url) {
        cleanUrls.push(querystringCleaner.clean(url, unwantedParams));
    });

    return cleanUrls;
}

exports.cleanUrls = cleanUrls;

function linkUrls(text, originalUrls, expandedUrls) {
    var result = text;

    originalUrls.forEach(function (originalUrl, i) {
        result = result.replace(originalUrl, '<a href="' + expandedUrls[i] + '">' + expandedUrls[i] + '</a>');
    });

    return result;
}

exports.linkUrls = linkUrls;

function linkUserMentions(text, userMentions) {
    return userMentions.reduce(linkUserMention, text);
}

exports.linkUserMentions = linkUserMentions;

function linkUserMention(text, userMention) {
    var regexp = new RegExp('@(' + userMention + ')', 'i');

    return text.replace(regexp, '@<a href="http://twitter.com/$1">$1</a>');
}
