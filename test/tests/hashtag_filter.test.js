var testCase = require('nodeunit').testCase,
    factory = require('../utils/tweet_factory'),
    HashtagFilter = require('../../lib/filters/hashtag_filter');

const UNWANTED_HASHTAG = 'unwanted';

exports['HashtagFilter#accept'] = testCase({
    setUp: function (callback) {
        var config = { hashtags: [UNWANTED_HASHTAG] };
        this.hashtagFilter = new HashtagFilter(config);
        callback();
    },
    'accepts tweet without hashtags': function (test) {
        var that = this;

        [factory.createStatus, factory.createRetweet].forEach(function (createTweet) {
            var tweet = createTweet();
            test.strictEqual(true, that.hashtagFilter.accept(tweet));
        });

        test.done();
    },
    'accepts tweet with hashtag not in filter list': function (test) {
        var that = this;

        getTweetCreationFunctions().forEach(function (createTweet) {
            var tweet = createTweet(['test']);
            test.strictEqual(true, that.hashtagFilter.accept(tweet));
        });

        test.done();
    },
    'rejects tweet with hashtag in filter list': function (test) {
        var that = this;

        getTweetCreationFunctions().forEach(function (createTweet) {
            var tweet = createTweet([UNWANTED_HASHTAG]);
            test.strictEqual(false, that.hashtagFilter.accept(tweet));
        });

        test.done();
    },
    'rejects tweet with hashtag in filter list (case-insensitive)': function (test) {
        var that = this;

        getTweetCreationFunctions().forEach(function (createTweet) {
            var tweet = createTweet([UNWANTED_HASHTAG.toUpperCase()]);
            test.strictEqual(false, that.hashtagFilter.accept(tweet));
        });

        test.done();
    }
});

function getTweetCreationFunctions() {
    return [factory.createStatusWithHashtags, factory.createRetweetWithHashtags];
}
