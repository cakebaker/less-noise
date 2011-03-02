/**
 * Retweet filter. Filters out the retweets of the specified users.
 *
 * Copyright (c) by Daniel Hofstetter (daniel.hofstetter@42dh.com, http://cakebaker.42dh.com)
 *
 * Licensed under the MIT License: http://opensource.org/licenses/mit-license
 * Redistributions of files must retain the above copyright notice.
 */

function RetweetFilter(config) {
    this.unwantedRetweeters = config.users;
}

RetweetFilter.prototype.accept = function (tweet) {
    if (tweet.isRetweet()) {
        return isNotFromUnwantedRetweeter(tweet, this.unwantedRetweeters);
    }

    return true;
}

module.exports = RetweetFilter;

function isNotFromUnwantedRetweeter(tweet, unwantedRetweeters) {
    return unwantedRetweeters.every(function (unwantedRetweeter) {
        return (tweet.data.user.screen_name !== unwantedRetweeter);
    });
}
