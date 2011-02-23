var testCase = require('nodeunit').testCase,
    factory = require('../utils/tweet_factory'),
    Tweet = require('../../lib/tweet').Tweet,
    HashtagFilter = require('../../lib/hashtag_filter');

const UNWANTED_HASHTAG = 'unwanted';

exports['HashtagFilter#accept'] = testCase({
    setUp: function (callback) {
        var config = { hashtags: [UNWANTED_HASHTAG] };
        this.hashtagFilter = new HashtagFilter(config);
        callback();
    },
    'accepts tweet without hashtags': function (test) {
        var tweets = [factory.createStatus, factory.createRetweet];
        var i, tweet;

        for (i = 0; i < tweets.length; i++) {
            tweet = tweets[i].call(null);
            test.strictEqual(true, this.hashtagFilter.accept(tweet));
        }

        test.done();
    },
    'accepts tweet with hashtag not in filter list': function (test) {
        var tweets = [factory.createStatusWithHashtags, factory.createRetweetWithHashtags];
        var i, tweet;

        for (i = 0; i < tweets.length; i++) {
            tweet = tweets[i].call(null, ['test']);
            test.strictEqual(true, this.hashtagFilter.accept(tweet));
        }

        test.done();
    },
    'rejects tweet with hashtag in filter list': function (test) {
        var tweets = [factory.createStatusWithHashtags, factory.createRetweetWithHashtags];
        var i, tweet;

        for (i = 0; i < tweets.length; i++) {
            tweet = tweets[i].call(null, [UNWANTED_HASHTAG]);
            test.strictEqual(false, this.hashtagFilter.accept(tweet));
        }

        test.done();
    }
});
