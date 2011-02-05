function getUrlsAsArray(status) {
    var urls = [];

    if (hasUrls(status)) {
        for (var i = 0; i < status.entities.urls.length; i++) {
            urls.push(status.entities.urls[i].url);
        }
    }

    return urls;
}

exports.getUrlsAsArray = getUrlsAsArray;

function hasUrls(status) {
    return hasElements(status.entities.urls);
}

exports.hasUrls = hasUrls;

function hasUserMentions(status) {
    return hasElements(status.entities.user_mentions);
}

exports.hasUserMentions = hasUserMentions;

function hasElements(array) {
    return (array.length > 0);
}
