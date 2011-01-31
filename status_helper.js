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
    if (status.entities.urls.length > 0) {
        return true;
    }

    return false;
}

exports.hasUrls = hasUrls;
