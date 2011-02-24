/**
 * Retweet filter
 *
 * Copyright (c) by Daniel Hofstetter (daniel.hofstetter@42dh.com, http://cakebaker.42dh.com)
 *
 * Licensed under the MIT License: http://opensource.org/licenses/mit-license
 * Redistributions of files must retain the above copyright notice.
 */

function RetweetFilter(config) {
    this.usersToFilter = config.users;
}

RetweetFilter.prototype.accept = function (tweet) {
    if (tweet.isRetweet()) {
        var i;

        for (i = 0; i < this.usersToFilter.length; i++) {
            if (tweet.data.user.screen_name === this.usersToFilter[i]) {
                return false;
            }
        }
    }

    return true;
}

module.exports = RetweetFilter;
