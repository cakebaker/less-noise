var testCase = require('nodeunit').testCase,
    factory = require('../utils/tweet_factory'),
    Tweet = require('../../lib/tweet').Tweet,
    RetweetFilter = require('../../lib/filters/retweet_filter');

const USER_WITH_UNWANTED_RETWEETS = 'testuser';

exports['RetweetFilter#accept'] = testCase({
    setUp: function (callback) {
        var config = { users: [USER_WITH_UNWANTED_RETWEETS] };
        this.retweetFilter = new RetweetFilter(config);
        callback();
    },
    'accepts tweet from user not in filter list': function (test) {
        var tweets = [factory.createStatusFrom, factory.createRetweetFrom];
        var i, tweet;

        for (i = 0; i < tweets.length; i++) {
            tweet = tweets[i].call(null, 'someuser');
            test.strictEqual(true, this.retweetFilter.accept(tweet));
        }

        test.done();
    },
    'accepts status from user in filter list': function (test) {
        var tweet = factory.createStatusFrom(USER_WITH_UNWANTED_RETWEETS);
        test.strictEqual(true, this.retweetFilter.accept(tweet));

        test.done();
    },
    'rejects retweet from user in filter list': function (test) {
        var tweet = factory.createRetweetFrom(USER_WITH_UNWANTED_RETWEETS);
        test.strictEqual(false, this.retweetFilter.accept(tweet));

        test.done();
    }
});
