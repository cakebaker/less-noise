var testCase = require('nodeunit').testCase,
    factory = require('../utils/tweet_factory'),
    Tweet = require('../../lib/tweet').Tweet,
    UserMentionsFilter = require('../../lib/user_mentions_filter');

const UNWANTED_USER_MENTION = 'testuser';

exports['UserMentionsFilter#accept'] = testCase({
    setUp: function (callback) {
        var config = { users: [UNWANTED_USER_MENTION] };
        this.userMentionsFilter = new UserMentionsFilter(config);
        callback();
    },
    'accepts tweet without user mentions': function (test) {
        var tweets = [factory.createStatus, factory.createRetweet];
        var i, tweet;

        for (i = 0; i < tweets.length; i++) {
            tweet = tweets[i].call(null);
            test.strictEqual(true, this.userMentionsFilter.accept(tweet));
        }

        test.done();
    },
    'accepts tweet with user mention not in filter list': function (test) {
        var tweets = [factory.createStatusWithUserMentions, factory.createRetweetWithUserMentions];
        var i, tweet;

        for (i = 0; i < tweets.length; i++) {
            tweet = tweets[i].call(null, ['username']);
            test.strictEqual(true, this.userMentionsFilter.accept(tweet));
        }

        test.done();
    },
    'rejects tweet with user mention in filter list': function (test) {
        var tweets = [factory.createStatusWithUserMentions, factory.createRetweetWithUserMentions];
        var i, tweet;

        for (i = 0; i < tweets.length; i++) {
            tweet = tweets[i].call(null, [UNWANTED_USER_MENTION]);
            test.strictEqual(false, this.userMentionsFilter.accept(tweet));
        }

        test.done();
    }
});
