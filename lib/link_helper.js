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
    var i, url;
    var cleanUrls = [];
    var unwantedParams = ['utm_campaign', 'utm_source', 'utm_medium', 'utm_content'];

    for (i = 0; i < urls.length; i++) {
        cleanUrls.push(querystringCleaner.clean(urls[i], unwantedParams));
    }

    return cleanUrls;
}

exports.cleanUrls = cleanUrls;

function linkUrls(text, originalUrls, expandedUrls) {
    var i, result = text;

    for (i = 0; i < originalUrls.length; i++) {
        result = result.replace(originalUrls[i], '<a href="' + expandedUrls[i] + '">' + expandedUrls[i] + '</a>');
    }

    return result;
}

exports.linkUrls = linkUrls;

function linkUserMentions(text, userMentions) {
    var i, result = text;

    for (i = 0; i < userMentions.length; i++) {
        result = result.replace('@' + userMentions[i], '@<a href="http://twitter.com/' + userMentions[i] + '">' + userMentions[i] + '</a>');
    }

    return result;
}

exports.linkUserMentions = linkUserMentions;
