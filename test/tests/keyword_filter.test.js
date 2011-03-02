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
        var that = this;

        getTweetCreationFunctions().forEach(function (createTweet) {
            var tweet = createTweet();
            test.strictEqual(true, that.keywordFilter.accept(tweet));
        });

        test.done();
    },
    'rejects tweet containing keyword': function (test) {
        var messages = ['a test status', 'a TeSt status', 'test status', 'status test', 'a #test status'];
        var that = this;

        getTweetCreationFunctions().forEach(function (createTweet) {
            messages.forEach(function (message) {
                var tweet = createTweet(message);
                test.strictEqual(false, that.keywordFilter.accept(tweet));
            });
        });

        test.done();
    },
});

function getTweetCreationFunctions() {
    return [factory.createStatus, factory.createRetweet];
}
