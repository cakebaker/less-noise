var testCase = require('nodeunit').testCase,
    Tweet = require('../lib/tweet').Tweet;

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
