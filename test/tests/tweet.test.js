var testCase = require('nodeunit').testCase,
    MockExpander = require('../utils/mock_expander').MockExpander,
    factory = require('../utils/tweet_factory'),
    Tweet = require('../../lib/tweet').Tweet;

exports['Tweet#autolink'] = testCase({
    'links urls in tweet': function (test) {
        [factory.createStatusWithUrls, factory.createRetweetWithUrls].forEach(function (createTweet) {
            var tweet = createTweet(['http://example.com'], ['http://example.com/expanded'], 'an url: http://example.com');
            tweet.autolink();

            var status = tweet.getStatus();
            test.strictEqual('an url: <a href="http://example.com/expanded">http://example.com/expanded</a>', status.text);
        });

        test.done();
    },
    'links users mentioned in tweet': function (test) {
        [factory.createStatusWithUserMentions, factory.createRetweetWithUserMentions].forEach(function (createTweet) {
            var tweet = createTweet(['test'], 'hello @test');
            tweet.autolink();

            var status = tweet.getStatus();
            test.strictEqual('hello @<a href="http://twitter.com/test">test</a>', status.text);
        });

        test.done();
    },
});

exports['Tweet#expandUrls'] = testCase({
    'sends "expanded" event for tweet without urls': function (test) {
        test.expect(2);

        [factory.createStatus, factory.createRetweet].forEach(function (createTweet) {
            var tweet = createTweet();
            var expander = new MockExpander();

            expander.on('expanded', function (tweet) {
                test.ok(true);
            });
            tweet.expandUrls(expander);
        });

        test.done();
    },
    'sets expanded urls of tweet with urls': function (test) {
        var urls = ['http://example.com', 'http://example.org'];
        var expandedUrls = ['http://example.com/expanded', 'http://example.org/expanded'];
        test.expect(4);

        [factory.createStatusWithUrls, factory.createRetweetWithUrls].forEach(function (createTweet) {
            var tweet = createTweet(urls);
            var expander = new MockExpander(urls, expandedUrls);

            expander.on('expanded', function (tweet) {
                var status = tweet.getStatus();
                test.strictEqual('http://example.com/expanded', status.entities.urls[0].expanded_url);
                test.strictEqual('http://example.org/expanded', status.entities.urls[1].expanded_url);
            });
            tweet.expandUrls(expander);
        });

        test.done();
    },
    'cleans expanded urls of tweet': function (test) {
        var urls = ['http://example.com', 'http://example.org'];
        var expandedUrls = ['http://example.com?test=testvalue&utm_medium=medium', 'http://example.org?utm_source=source'];
        test.expect(4);

        [factory.createStatusWithUrls, factory.createRetweetWithUrls].forEach(function (createTweet) {
            var tweet = createTweet(urls);
            var expander = new MockExpander(urls, expandedUrls);

            expander.on('expanded', function (tweet) {
                var status = tweet.getStatus();
                test.strictEqual('http://example.com/?test=testvalue', status.entities.urls[0].expanded_url);
                test.strictEqual('http://example.org/', status.entities.urls[1].expanded_url);
            });
            tweet.expandUrls(expander);
        });

        test.done();
    }
});

exports['Tweet#getExpandedUrls'] = testCase({
    'returns an empty array for a tweet without urls': function (test) {
        [factory.createStatus, factory.createRetweet].forEach(function (createTweet) {
            var tweet = createTweet();
            test.deepEqual([], tweet.getExpandedUrls());
        });

        test.done();
    },
    'returns an array with the expanded url of the tweet': function (test) {
        [factory.createStatusWithUrls, factory.createRetweetWithUrls].forEach(function (createTweet) {
            var tweet = createTweet(['http://example.com'], ['http://example.com/expanded']);
            test.deepEqual(['http://example.com/expanded'], tweet.getExpandedUrls());
        });

        test.done();
    }
});

exports['Tweet#getHashtags'] = testCase({
    'returns an empty array for tweet without hashtags': function (test) {
        [factory.createStatus, factory.createRetweet].forEach(function (createTweet) {
            var tweet = createTweet();
            test.deepEqual([], tweet.getHashtags());
        });

        test.done();
    },
    'returns an array with the hashtags used in the tweet': function (test) {
        [factory.createStatusWithHashtags, factory.createRetweetWithHashtags].forEach(function (createTweet) {
            var tweet = createTweet(['test']);
            test.deepEqual(['test'], tweet.getHashtags());
        });

        test.done();
    }
});

exports['Tweet#getStatus'] = testCase({
    'returns status': function (test) {
        var data = { text: '' };
        var tweet = new Tweet(data);
        test.strictEqual(data, tweet.getStatus());
        test.done();
    },
    'returns retweeted status': function (test) {
        var status = { text: '' };
        var data = { retweeted_status: status };
        var tweet = new Tweet(data);
        test.strictEqual(status, tweet.getStatus());
        test.done();
    }
});

exports['Tweet#getUrls'] = testCase({
    'returns an empty array for tweet without urls': function (test) {
        [factory.createStatus, factory.createRetweet].forEach(function (createTweet) {
            var tweet = createTweet();
            test.deepEqual([], tweet.getUrls());
        });

        test.done();
    },
    'returns an array with the urls used in the tweet': function (test) {
        [factory.createStatusWithUrls, factory.createRetweetWithUrls].forEach(function (createTweet) {
            var tweet = createTweet(['http://example.com']);
            test.deepEqual(['http://example.com'], tweet.getUrls());
        });

        test.done();
    }
});

exports['Tweet#getUserMentions'] = testCase({
    'returns an empty array for tweet without user mentions': function (test) {
        [factory.createStatus, factory.createRetweet].forEach(function (createTweet) {
            var tweet = createTweet();
            test.deepEqual([], tweet.getUserMentions());
        });

        test.done();
    },
    'returns an array with the user mentioned in the tweet': function (test) {
        [factory.createStatusWithUserMentions, factory.createRetweetWithUserMentions].forEach(function (createTweet) {
            var tweet = createTweet(['testuser']);
            test.deepEqual(['testuser'], tweet.getUserMentions());
        });

        test.done();
    }
});

exports['Tweet#hasHashtags'] = testCase({
    'returns false for tweet without hashtags': function (test) {
        [factory.createStatus, factory.createRetweet].forEach(function (createTweet) {
            var tweet = createTweet();
            test.strictEqual(false, tweet.hasHashtags());
        });

        test.done();
    },
    'returns true for tweet with hashtags': function (test) {
        [factory.createStatusWithHashtags, factory.createRetweetWithHashtags].forEach(function (createTweet) {
            var tweet = createTweet(['test']);
            test.strictEqual(true, tweet.hasHashtags());
        });

        test.done();
    }
});

exports['Tweet#hasUrls'] = testCase({
    'returns false for tweet without urls': function (test) {
        [factory.createStatus, factory.createRetweet].forEach(function (createTweet) {
            var tweet = createTweet();
            test.strictEqual(false, tweet.hasUrls());
        });

        test.done();
    },
    'returns true for tweet with urls': function (test) {
        [factory.createStatusWithUrls, factory.createRetweetWithUrls].forEach(function (createTweet) {
            var tweet = createTweet(['http://example.com']);
            test.strictEqual(true, tweet.hasUrls());
        });

        test.done();
    }
});

exports['Tweet#hasUserMentions'] = testCase({
    'returns false for tweet without user mentions': function (test) {
        [factory.createStatus, factory.createRetweet].forEach(function (createTweet) {
            var tweet = createTweet();
            test.strictEqual(false, tweet.hasUserMentions());
        });

        test.done();
    },
    'returns true for tweet with user mentions': function (test) {
        [factory.createStatusWithUserMentions, factory.createRetweetWithUserMentions].forEach(function (createTweet) {
            var tweet = createTweet(['testuser']);
            test.strictEqual(true, tweet.hasUserMentions());
        });

        test.done();
    }
});

exports['Tweet#isRetweet'] = testCase({
    'returns false for a status': function (test) {
        var tweet = factory.createStatus();
        test.strictEqual(false, tweet.isRetweet());
        test.done();
    },
    'returns true for a retweet': function (test) {
        var tweet = factory.createRetweet();
        test.strictEqual(true, tweet.isRetweet());
        test.done();
    }
});
