var Url = require('../lib/url_adapter').UrlAdapter;
var sys = require('sys');

function cleanUrls(urls) {
    var i, url;
    var cleanUrls = [];

    for (i = 0; i < urls.length; i++) {
        var url = new Url(urls[i]);
        url.removeParams(['utm_campaign', 'utm_source', 'utm_medium', 'utm_content']);
        cleanUrls.push(url.toString());
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
