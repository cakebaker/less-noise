var testCase = require('nodeunit').testCase,
    Tweet = require('../lib/tweet').Tweet;

exports['Tweet#getStatus'] = testCase({
    'return status': function (test) {
        var data = { text: 'hello world' };
        var tweet = new Tweet(data);
        test.strictEqual(data, tweet.getStatus());
        test.done();
    },
    'return retweeted status': function (test) {
        var status = { text: 'hello world' };
        var data = { retweeted_status: status };
        var tweet = new Tweet(data);
        test.strictEqual(status, tweet.getStatus());
        test.done();
    }
});

exports['Tweet#isRetweet'] = testCase({
    'return false for a status': function (test) {
        var data = { text: 'hello world' };
        var tweet = new Tweet(data);
        test.strictEqual(false, tweet.isRetweet());
        test.done();
    },
    'return true for a retweet': function (test) {
        var data = { retweeted_status: { text: 'hello world' } };
        var tweet = new Tweet(data);
        test.strictEqual(true, tweet.isRetweet());
        test.done();
    }
});
