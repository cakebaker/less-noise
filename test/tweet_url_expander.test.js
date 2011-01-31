var testCase = require('nodeunit').testCase,
    TweetUrlExpander = require('../tweet_url_expander').TweetUrlExpander;

exports['expand'] = testCase({
    setUp: function (callback) {
        this.expander = new TweetUrlExpander();
        callback();
    },
    'status without urls': function (test) {
        test.expect(1);
        var status = { text: 'hello world', entities: { urls: [] } };
        this.expander.on('expanded', function (status) {
            test.equals(0, status.entities.urls.length);
        });
        this.expander.expand(status);
        test.done();
    },
    'retweet without urls': function (test) {
        test.expect(1);
        var retweet = { retweeted_status: { text: 'hello world', entities: { urls: [] } } };
        this.expander.on('expanded', function (retweet) {
            test.equals(0, retweet.retweeted_status.entities.urls.length);
        });
        this.expander.expand(retweet);
        test.done();
    }
});
