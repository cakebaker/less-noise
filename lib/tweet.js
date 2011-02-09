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

Tweet.prototype.hasUrls = function () {
    return (this.getStatus().entities.urls.length > 0);
}

Tweet.prototype.isRetweet = function () {
    return ('retweeted_status' in this.data);
}
