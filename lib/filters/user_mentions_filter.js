/**
 * User mentions filter
 *
 * Copyright (c) by Daniel Hofstetter (daniel.hofstetter@42dh.com, http://cakebaker.42dh.com)
 *
 * Licensed under the MIT License: http://opensource.org/licenses/mit-license
 * Redistributions of files must retain the above copyright notice.
 */

function UserMentionsFilter(config) {
    this.unwantedUsers = config.users;
}

UserMentionsFilter.prototype.accept = function (tweet) {
    if (tweet.hasUserMentions()) {
        return isNoUnwantedUserMentioned(tweet.getUserMentions(), this.unwantedUsers);
    }

    return true;
}

module.exports = UserMentionsFilter;

function isNoUnwantedUserMentioned(userMentions, unwantedUsers) {
    return userMentions.every(function (userMention) {
        return unwantedUsers.every(function (unwantedUser) {
            return (userMention != unwantedUser);
        });
    });
}
