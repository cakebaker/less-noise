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

exports['Tweet#getUrls'] = testCase({
    'returns an empty array from a status without urls': function (test) {
        var data = { text: 'hello world', entities: { urls: [] } };
        var tweet = new Tweet(data);
        test.deepEqual([], tweet.getUrls());
        test.done();
    },
    'returns an empty array from a retweet without urls': function (test) {
        var data = { retweeted_status: { text: 'hello world', entities: { urls: [] } } };
        var tweet = new Tweet(data);
        test.deepEqual([], tweet.getUrls());
        test.done();
    },
    'returns an array with the status\'s urls': function (test) {
        const URL = 'http://example.com';
        var data = { text: 'an url: http://example.com', entities: { urls: [ { url: URL } ] } };
        var tweet = new Tweet(data);
        test.deepEqual([URL], tweet.getUrls());
        test.done();
    },
    'returns an array with the retweet\'s urls': function (test) {
        const URL = 'http://example.com';
        var data = { retweeted_status: { text: 'an url: http://example.com', entities: { urls: [ { url: URL } ] } } };
        var tweet = new Tweet(data);
        test.deepEqual([URL], tweet.getUrls());
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
