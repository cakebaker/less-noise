var sys = require('sys'),
    events = require('events'),
    testCase = require('nodeunit').testCase,
    Tweet = require('../lib/tweet').Tweet;

exports['Tweet#autolink'] = testCase({
    'links url in status': function (test) {
        var data = { text: 'an url: http://example.com', entities: { urls: [ { url: 'http://example.com', expanded_url: 'http://example.com/expanded' } ], user_mentions: [] } };
        var tweet = new Tweet(data);
        tweet.autolink();
        var status = tweet.getStatus();
        test.strictEqual('an url: <a href="http://example.com/expanded">http://example.com/expanded</a>', status.text);
        test.done();
    },
    'links url in retweet': function (test) {
        var data = { retweeted_status: { text: 'an url: http://example.com', entities: { urls: [ { url: 'http://example.com', expanded_url: 'http://example.com/expanded' } ], user_mentions: [] } } };
        var tweet = new Tweet(data);
        tweet.autolink();
        var status = tweet.getStatus();
        test.strictEqual('an url: <a href="http://example.com/expanded">http://example.com/expanded</a>', status.text);
        test.done();
    },
    'links mentioned user in status': function (test) {
        var data = { text: 'hello @test', entities: { urls: [], user_mentions: [ { screen_name: 'test' } ] } };
        var tweet = new Tweet(data);
        tweet.autolink();
        var status = tweet.getStatus();
        test.strictEqual('hello @<a href="http://twitter.com/test">test</a>', status.text);
        test.done();
    },
    'links mentioned user in retweet': function (test) {
        var data = { retweeted_status: { text: 'hello @test', entities: { urls: [], user_mentions: [ { screen_name: 'test' } ] } } };
        var tweet = new Tweet(data);
        tweet.autolink();
        var status = tweet.getStatus();
        test.strictEqual('hello @<a href="http://twitter.com/test">test</a>', status.text);
        test.done();
    }
});

exports['Tweet#expandUrls'] = testCase({
    'sends expanded event for status without urls': function (test) {
        test.expect(1);
        var data = { text: 'hello world', entities: { urls: [] } };
        var tweet = new Tweet(data);
        var expander = new MockExpander();
        expander.on('expanded', function (tweet) {
            test.ok(true);
        });
        tweet.expandUrls(expander);
        test.done();
    },
    'sends expanded event for retweet without urls': function (test) {
        test.expect(1);
        var data = { retweeted_status: { text: 'hello world', entities: { urls: [] } } };
        var tweet = new Tweet(data);
        var expander = new MockExpander();
        expander.on('expanded', function (tweet) {
            test.ok(true);
        });
        tweet.expandUrls(expander);
        test.done();
    },
    'sets expanded_url of status with url': function (test) {
        test.expect(1);
        var data = { text: 'an url: http://example.com', entities: { urls: [ { url: 'http://example.com' } ] } };
        var tweet = new Tweet(data);
        var expander = new MockExpander(['http://example.com'], ['http://example.com/expanded']);
        expander.on('expanded', function (tweet) {
            var status = tweet.getStatus();
            test.strictEqual('http://example.com/expanded', status.entities.urls[0].expanded_url);
        });
        tweet.expandUrls(expander);
        test.done();
    },
    'sets expanded_url of retweet with url': function (test) {
        test.expect(1);
        var data = { retweeted_status: { text: 'an url: http://example.com', entities: { urls: [ { url: 'http://example.com' } ] } } };
        var tweet = new Tweet(data);
        var expander = new MockExpander(['http://example.com'], ['http://example.com/expanded']);
        expander.on('expanded', function (tweet) {
            var status = tweet.getStatus();
            test.strictEqual('http://example.com/expanded', status.entities.urls[0].expanded_url);
        });
        tweet.expandUrls(expander);
        test.done();
    },
    'sets expanded_url of status with urls': function (test) {
        test.expect(2);
        var data = { text: 'two urls: http://example.com http://example.org', entities: { urls: [ { url: 'http://example.com' }, { url: 'http://example.org' } ] } };
        var tweet = new Tweet(data);
        var expander = new MockExpander(['http://example.org', 'http://example.com'], ['http://example.org/expanded', 'http://example.com/expanded']);
        expander.on('expanded', function (tweet) {
            var status = tweet.getStatus();
            test.strictEqual('http://example.com/expanded', status.entities.urls[0].expanded_url);
            test.strictEqual('http://example.org/expanded', status.entities.urls[1].expanded_url);
        });
        tweet.expandUrls(expander);
        test.done();
    },
    'sets expanded_url of retweet with urls': function (test) {
        test.expect(2);
        var data = { retweeted_status: { text: 'two urls: http://example.com http://example.org', entities: { urls: [ { url: 'http://example.com' }, { url: 'http://example.org' } ] } } };
        var tweet = new Tweet(data);
        var expander = new MockExpander(['http://example.org', 'http://example.com'], ['http://example.org/expanded', 'http://example.com/expanded']);
        expander.on('expanded', function (tweet) {
            var status = tweet.getStatus();
            test.strictEqual('http://example.com/expanded', status.entities.urls[0].expanded_url);
            test.strictEqual('http://example.org/expanded', status.entities.urls[1].expanded_url);
        });
        tweet.expandUrls(expander);
        test.done();
    }
});

exports['Tweet#getExpandedUrls'] = testCase({
    'returns an empty array from a status without urls': function (test) {
        var data = { text: 'hello world', entities: { urls: [] } };
        var tweet = new Tweet(data);
        test.deepEqual([], tweet.getExpandedUrls());
        test.done();
    },
    'returns an empty array from a retweet without urls': function (test) {
        var data = { retweeted_status: { text: 'hello world', entities: { urls: [] } } };
        var tweet = new Tweet(data);
        test.deepEqual([], tweet.getExpandedUrls());
        test.done();
    },
    'returns an array with the status\'s expanded urls': function (test) {
        const URL = 'http://example.com';
        const EXPANDED_URL = 'http://example.com/expanded';
        var data = { text: 'an url: http://example.com', entities: { urls: [ { url: URL, expanded_url: EXPANDED_URL } ] } };
        var tweet = new Tweet(data);
        test.deepEqual([EXPANDED_URL], tweet.getExpandedUrls());
        test.done();
    },
    'returns an array with the retweet\'s expanded urls': function (test) {
        const URL = 'http://example.com';
        const EXPANDED_URL = 'http://example.com/expanded';
        var data = { retweeted_status: { text: 'an url: http://example.com', entities: { urls: [ { url: URL, expanded_url: EXPANDED_URL } ] } } };
        var tweet = new Tweet(data);
        test.deepEqual([EXPANDED_URL], tweet.getExpandedUrls());
        test.done();
    }
});

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

exports['Tweet#getUserMentions'] = testCase({
    'returns an empty array from a status without user mentions': function (test) {
        var data = { text: 'hello world', entities: { user_mentions: [] } };
        var tweet = new Tweet(data);
        test.deepEqual([], tweet.getUserMentions());
        test.done();
    },
    'returns an empty array from a retweet without user mentions': function (test) {
        var data = { retweeted_status: { text: 'hello world', entities: { user_mentions: [] } } };
        var tweet = new Tweet(data);
        test.deepEqual([], tweet.getUserMentions());
        test.done();
    },
    'returns an array with the users mentioned in the status': function (test) {
        var data = { text: 'hello @test', entities: { user_mentions: [ { screen_name: 'test' } ] } };
        var tweet = new Tweet(data);
        test.deepEqual(['test'], tweet.getUserMentions());
        test.done();
    },
    'returns an array with the users mentioned in the retweet': function (test) {
        var data = { retweeted_status: { text: 'hello @test', entities: { user_mentions: [ { screen_name: 'test' } ] } } };
        var tweet = new Tweet(data);
        test.deepEqual(['test'], tweet.getUserMentions());
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

function MockExpander(originalUrls, expandedUrls) {
    this.originalUrls = originalUrls;
    this.expandedUrls = expandedUrls;
    events.EventEmitter.call(this);
}

sys.inherits(MockExpander, events.EventEmitter);

MockExpander.prototype.expand = function (urls) {
    this.emit('allUrlsExpanded', this.originalUrls, this.expandedUrls);
}
