var urlLib = require('url');

function clean(url, paramsToRemove) {
    var urlObj = urlLib.parse(url, true);

    for (var i = 0; i < paramsToRemove.length; i++) {
        delete urlObj.query[paramsToRemove[i]];
    }

    return toString(urlObj);
}

exports.clean = clean;

function toString(urlObj) {
    // XXX remove the search property to force format() to use the query object
    delete urlObj.search;

    var urlStr = urlLib.format(urlObj);

    if (urlStr.indexOf('?') === (urlStr.length - 1)) {
        urlStr = urlStr.substr(0, urlStr.length - 1);
    }

    return urlStr;
}