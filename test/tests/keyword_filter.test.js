var testCase = require('nodeunit').testCase,
    factory = require('../utils/tweet_factory'),
    KeywordFilter = require('../../lib/filters/keyword_filter');

const UNWANTED_KEYWORD = 'test';

exports['KeywordFilter#accept'] = testCase({
    setUp: function (callback) {
        var config = { keywords: [UNWANTED_KEYWORD] };
        this.keywordFilter = new KeywordFilter(config);
        callback();
    },
    'accepts tweet without keyword': function (test) {
        var tweets = [factory.createStatus, factory.createRetweet];
        var i, tweet;

        for (i = 0; i < tweets.length; i++) {
            tweet = tweets[i].call(null);
            test.strictEqual(true, this.keywordFilter.accept(tweet));
        }

        test.done();
    },
    'rejects tweet containing keyword': function (test) {
        var tweets = [factory.createStatus, factory.createRetweet];
        var messages = ['a test status', 'a TeSt status', 'test status', 'status test', 'a #test status'];
        var i, j, tweet;

        for (i = 0; i < tweets.length; i++) {
            for (j = 0; j < messages.length; j++) {
                tweet = tweets[i].call(null, messages[j]);
                test.strictEqual(false, this.keywordFilter.accept(tweet));
            }
        }

        test.done();
    },
});
