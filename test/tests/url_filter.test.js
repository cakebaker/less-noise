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
        var tweets = [factory.createStatus, factory.createRetweet];
        var i, tweet;

        for (i = 0; i < tweets.length; i++) {
            tweet = tweets[i].call(null);
            test.strictEqual(true, this.urlFilter.accept(tweet));
        }

        test.done();
    },
    'accepts tweet with url not in filter list': function (test) {
        var tweets = [factory.createStatusWithUrls, factory.createRetweetWithUrls];
        var i, tweet;

        for (i = 0; i < tweets.length; i++) {
            tweet = tweets[i].call(null, ['http://example.com']);
            test.strictEqual(true, this.urlFilter.accept(tweet));
        }

        test.done();
    },
    'rejects tweet with url in filter list': function (test) {
        var unwantedUrls = [['http://' + UNWANTED_DOMAIN], ['https://' + UNWANTED_DOMAIN]];
        var tweets = [factory.createStatusWithUrls, factory.createRetweetWithUrls];
        var i, j, tweet;

        for (i = 0; i < tweets.length; i++) {
            for (j = 0; j < unwantedUrls.length; j++) {
                tweet = tweets[i].call(null, unwantedUrls[j]);
                test.strictEqual(false, this.urlFilter.accept(tweet));
            }
        }

        test.done();
    }
});

