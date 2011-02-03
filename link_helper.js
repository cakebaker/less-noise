var statusHelper = require('./status_helper');

function autolink(obj) {
    var status = ('retweeted_status' in obj) ? obj.retweeted_status : obj;

    if (statusHelper.hasUrls(status)) {
        status.text = linkUrls(status.text, status.entities.urls);
    }

    if (statusHelper.hasUserMentions(status)) {
        status.text = linkUserMentions(status.text, status.entities.user_mentions);
    }
}

exports.autolink = autolink;

function linkUrls(text, urls) {
    var result = text;
    var expandedUrl, originalUrl;

    for (var i = 0; i < urls.length; i++) {
        originalUrl = urls[i].url;
        expandedUrl = urls[i].expanded_url;
        result = result.replace(originalUrl, '<a href="' + expandedUrl + '">' + expandedUrl + '</a>');
    }

    return result;
}

function linkUserMentions(text, userMentions) {
    var result = text;
    var screenName;

    for (var i = 0; i < userMentions.length; i++) {
        screenName = userMentions[i].screen_name;
        result = result.replace('@' + screenName, '@<a href="http://twitter.com/' + screenName + '">' + screenName + '</a>');
    }

    return result;
}
