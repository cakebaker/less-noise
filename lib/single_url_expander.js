var util = require('util'),
    url = require('url'),
    http = require('http'),
    events = require('events');

function SingleUrlExpander(url) {
    this.MAX_REDIRECTS = 10;
    this.redirectCount = 0;
    this.startUrl = url;
    this.url = url;
    events.EventEmitter.call(this);
}

util.inherits(SingleUrlExpander, events.EventEmitter);
exports.SingleUrlExpander = SingleUrlExpander;

SingleUrlExpander.prototype.expand = function () {
    var that = this;
    var urlObj = url.parse(this.url);
    var queryString = ('search' in urlObj) ? urlObj.search : '';
    var client = http.createClient(80, urlObj.hostname);
    var request = client.request('GET', urlObj.pathname + queryString, { 'host': urlObj.hostname, 'user-agent': 'Mozilla/5.0' } );
    request.end();
    request.on('response', function (response) {
        that._handleResponse(response);
    });
}

SingleUrlExpander.prototype._handleResponse = function (response) {
    var header = JSON.parse(JSON.stringify(response.headers));
    var location;

    if (header.location) {
        location = header.location;

        if (this._isRelativeUrl(location)) {
            location = this._createAbsoluteUrl(location);
        }

        if (location != this.url && this.redirectCount < this.MAX_REDIRECTS) {
            this._redirectTo(location);
        } else {
            this._emitExpanded(location);
        }
    } else {
        this._emitExpanded(this.url);
    }
}

SingleUrlExpander.prototype._createAbsoluteUrl = function (relativeUrl) {
    var urlObj = url.parse(this.url);
    return urlObj.protocol + '//' + urlObj.hostname + relativeUrl;
}

SingleUrlExpander.prototype._isRelativeUrl = function (url) {
    return (url.indexOf('/') === 0);
}

SingleUrlExpander.prototype._emitExpanded = function (expandedUrl) {
    this.emit('expanded', this.startUrl, expandedUrl);
}

SingleUrlExpander.prototype._redirectTo = function (targetUrl) {
    this.url = targetUrl;
    this.redirectCount++;
    this.expand();
}
