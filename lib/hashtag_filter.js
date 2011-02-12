function HashtagFilter(config) {
    if (!(this instanceof HashtagFilter)) return new HashtagFilter(config);

    this.hashtagsToFilter = config.hashtagsToFilter;
}

exports.HashtagFilter = HashtagFilter;

HashtagFilter.prototype.accept = function (tweet) {
    if (tweet.hasHashtags()) {
        var hashtags = tweet.getHashtags();
        var i, j;

        for (i = 0; i < hashtags.length; i++) {
            for (j = 0; j < this.hashtagsToFilter.length; j++) {
                if (this.hashtagsToFilter[j] == hashtags[i]) {
                    return false;
                }
            }
        }
    }

    return true;
}
