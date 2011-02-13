var urlLib = require('url');

function UrlAdapter(urlString) {
    this.urlObj = urlLib.parse(urlString, true);
    // XXX remove the search property to force format() to use the query object when transforming the url object to a string 
    delete this.urlObj.search;
}

exports.UrlAdapter = UrlAdapter;

UrlAdapter.prototype.hasQueryString = function () {
    for (var prop in this.urlObj.query) {
        if (this.urlObj.query.hasOwnProperty(prop)) {
            return true;
        }
    }

    return false;
}

UrlAdapter.prototype.removeParam = function (param) {
    if (this.hasQueryString()) {
        delete this.urlObj.query[param];
    }
}

UrlAdapter.prototype.removeParams = function (params) {
    for (var i = 0; i < params.length; i++) {
        this.removeParam(params[i]);
    }
}

UrlAdapter.prototype.toString = function () {
    var str = urlLib.format(this.urlObj);

    if (!this.hasQueryString()) {
        str = str.substr(0, str.length - 1);
    }

    return str;
}
