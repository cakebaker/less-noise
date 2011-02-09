function UrlFilter(config) {
    if (!(this instanceof UrlFilter)) return new UrlFilter(config);

    this.domainsToFilter = config.domainsToFilter;
}

exports.UrlFilter = UrlFilter;

UrlFilter.prototype.accept = function (tweet) {
    var HTTP_LENGTH = 'http://'.length, HTTPS_LENGTH = 'https://'.length; 

    if (tweet.hasUrls()) {
        var urls = tweet.getUrls();
        var i, j, pos;

        for (i = 0; i < urls.length; i++) {
            for (j = 0; j < this.domainsToFilter.length; j++) {
                pos = urls[i].indexOf(this.domainsToFilter[j]);
                if (pos === HTTP_LENGTH || pos === HTTPS_LENGTH) {
                    return false;
                }
            }
        }
    }

    return true;
}
