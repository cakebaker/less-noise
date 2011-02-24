/**
 * User mentions filter
 *
 * Copyright (c) by Daniel Hofstetter (daniel.hofstetter@42dh.com, http://cakebaker.42dh.com)
 *
 * Licensed under the MIT License: http://opensource.org/licenses/mit-license
 * Redistributions of files must retain the above copyright notice.
 */

function UserMentionsFilter(config) {
    this.usersToFilter = config.users;
}

UserMentionsFilter.prototype.accept = function (tweet) {
    if (tweet.hasUserMentions()) {
        var userMentions = tweet.getUserMentions();
        var i, j;

        for (i = 0; i < userMentions.length; i++) {
            for (j = 0; j < this.usersToFilter.length; j++) {
                if (this.usersToFilter[j] == userMentions[i]) {
                    return false;
                }
            }
        }
    }

    return true;
}

module.exports = UserMentionsFilter;
