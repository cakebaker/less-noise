var testCase = require('nodeunit').testCase,
    factory = require('../utils/tweet_factory'),
    UrlFilter = require('../../lib/filters/url_filter');

const UNWANTED_DOMAIN = 'example.org';

exports['UrlFilter#accept'] = testCase({
    setUp: function (callback) {
        var config = { domains: [UNWANTED_DOMAIN] };
        this.urlFilter = new UrlFilter(config);
        callback();
    },
    'accepts tweet without urls': function (test) {
        var that = this;

        [factory.createStatus, factory.createRetweet].forEach(function (createTweet) {
            var tweet = createTweet();
            test.strictEqual(true, that.urlFilter.accept(tweet));
        });

        test.done();
    },
    'accepts tweet with url not in filter list': function (test) {
        var that = this;

        getTweetCreationFunctions().forEach(function (createTweet) {
            var tweet = createTweet(['http://example.com']);
            test.strictEqual(true, that.urlFilter.accept(tweet));
        });

        test.done();
    },
    'rejects tweet with url in filter list': function (test) {
        var unwantedUrls = [['http://' + UNWANTED_DOMAIN], ['https://' + UNWANTED_DOMAIN]];
        var that = this;

        getTweetCreationFunctions().forEach(function (createTweet) {
            unwantedUrls.forEach(function (unwantedUrl) {
                var tweet = createTweet(unwantedUrl);
                test.strictEqual(false, that.urlFilter.accept(tweet));
            });
        });

        test.done();
    }
});

function getTweetCreationFunctions() {
    return [factory.createStatusWithUrls, factory.createRetweetWithUrls];
}
