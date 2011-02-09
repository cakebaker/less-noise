function Tweet(data) {
    this.data = data;
}

exports.Tweet = Tweet;

Tweet.prototype.isRetweet = function () {
    return ('retweeted_status' in this.data);
}
