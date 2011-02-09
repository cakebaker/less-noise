var testCase = require('nodeunit').testCase,
    Tweet = require('../lib/tweet').Tweet;

exports['Tweet#getStatus'] = testCase({
    'returns status': function (test) {
        var data = { text: 'hello world' };
        var tweet = new Tweet(data);
        test.strictEqual(data, tweet.getStatus());
        test.done();
    },
    'returns retweeted status': function (test) {
        var status = { text: 'hello world' };
        var data = { retweeted_status: status };
        var tweet = new Tweet(data);
        test.strictEqual(status, tweet.getStatus());
        test.done();
    }
});

exports['Tweet#hasUrls'] = testCase({
    'returns false for status without urls': function (test) {
        var data = { text: 'hello world', entities: { urls: [] } };
        var tweet = new Tweet(data);
        test.strictEqual(false, tweet.hasUrls());
        test.done();
    },
    'returns false for retweet without urls': function (test) {
        var data = { retweeted_status: { text: 'hello world', entities: { urls: [] } } };
        var tweet = new Tweet(data);
        test.strictEqual(false, tweet.hasUrls());
        test.done();
    },
    'returns true for status with url': function (test) {
        var data = { text: 'an url: http://example.com', entities: { urls: [ { url: 'http://example.com' } ] } };
        var tweet = new Tweet(data);
        test.strictEqual(true, tweet.hasUrls());
        test.done();
    },
    'returns true for retweet with url': function (test) {
        var data = { retweeted_status: { text: 'an url: http://example.com', entities: { urls: [ { url: 'http://example.com' } ] } } };
        var tweet = new Tweet(data);
        test.strictEqual(true, tweet.hasUrls());
        test.done();
    }
});

exports['Tweet#isRetweet'] = testCase({
    'returns false for a status': function (test) {
        var data = { text: 'hello world' };
        var tweet = new Tweet(data);
        test.strictEqual(false, tweet.isRetweet());
        test.done();
    },
    'returns true for a retweet': function (test) {
        var data = { retweeted_status: { text: 'hello world' } };
        var tweet = new Tweet(data);
        test.strictEqual(true, tweet.isRetweet());
        test.done();
    }
});
