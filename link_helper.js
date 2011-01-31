var statusHelper = require('./status_helper');

function autolink(obj) {
    var status = ('retweeted_status' in obj) ? obj.retweeted_status : obj;

    if (statusHelper.hasUrls(status)) {
        status.text = linkUrls(status.text, status.entities.urls);
    }
}

exports.autolink = autolink;

function linkUrls(text, urls) {
    var result = text;
    var expandedUrl, originalUrl;

    for (i = 0; i < urls.length; i++) {
        originalUrl = urls[i].url;
        expandedUrl = urls[i].expanded_url;
        result = result.replace(originalUrl, '<a href="' + expandedUrl + '">' + expandedUrl + '</a>');
    }

    return result;
}
