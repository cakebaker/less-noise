function Tweet(data) {
    this.data = data;
}

exports.Tweet = Tweet;

Tweet.prototype.getStatus = function () {
    if (this.isRetweet()) {
        return this.data.retweeted_status;
    }

    return this.data;
}

Tweet.prototype.getUrls = function () {
    var i, result = [];
    var urls = this.getStatus().entities.urls;

    for (i = 0; i < urls.length; i++) {
        result.push(urls[i].url);
    }

    return result;
}

Tweet.prototype.hasUrls = function () {
    return (this.getStatus().entities.urls.length > 0);
}

Tweet.prototype.isRetweet = function () {
    return ('retweeted_status' in this.data);
}
