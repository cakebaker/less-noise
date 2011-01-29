function autolink(obj) {
    var status = ('retweeted_status' in obj) ? obj.retweeted_status : obj;

    if (hasUrls(status)) {
        status.linked_text = linkUrls(status.text, status.entities.urls);
    } else {
        status.linked_text = status.text;
    }
}

exports.autolink = autolink;

function hasUrls(status) {
    if (status.entities.urls.length > 0) {
        return true;
    }

    return false;
}

function linkUrls(text, urls) {
    var result = text;
    var url;
    for (i = 0; i < urls.length; i++) {
        url = urls[i].url;
        result = result.replace(url, '<a href="' + url + '">' + url + '</a>');
    }

    return result;
}
