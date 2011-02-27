var testCase = require('nodeunit').testCase,
    factory = require('../utils/tweet_factory'),
    HashtagFilter = require('../../lib/filters/hashtag_filter');
    FilterChain = require('../../lib/filter_chain').FilterChain;

exports['FilterChain()'] = testCase({
    'it should not load any filters if there are none specified': function (test) {
        var config = { beforeUrlExpansionFilters: {}, afterUrlExpansionFilters: {} };
        var chain = new FilterChain(config);

        test.deepEqual([], chain.beforeFilters);
        test.deepEqual([], chain.afterFilters);

        test.done();
    },
    'it should not load any disabled filters': function (test) {
        var config = { beforeUrlExpansionFilters: { hashtag_filter: { enabled: false } }, afterUrlExpansionFilters: { hashtag_filter: { enabled: false } } };
        var chain = new FilterChain(config);

        test.deepEqual([], chain.beforeFilters);
        test.deepEqual([], chain.afterFilters);

        test.done();
    },
    'it should instantiate the specified before filter': function (test) {
        var config = { beforeUrlExpansionFilters: { hashtag_filter: { hashtags: [] } }, afterUrlExpansionFilters: {} };
        var chain = new FilterChain(config);

        test.equals(true, chain.beforeFilters[0] instanceof HashtagFilter);
        test.deepEqual([], chain.afterFilters);

        test.done();
    },
    'it should instantiate the specified after filter': function (test) {
        var config = { beforeUrlExpansionFilters: {}, afterUrlExpansionFilters: { hashtag_filter: { hashtags: [] } } };
        var chain = new FilterChain(config);

        test.deepEqual([], chain.beforeFilters);
        test.equals(true, chain.afterFilters[0] instanceof HashtagFilter);

        test.done();
    }
});

exports['FilterChain#_filterTweet'] = testCase({
    setUp: function (callback) {
        var config = { beforeUrlExpansionFilters: {}, afterUrlExpansionFilters: {} };
        this.chain = new FilterChain(config);

        callback();
    },
    'it calls acceptanceCallback if tweet is accepted': function (test) {
        test.expect(1);
        this.chain._filterTweet([new DummyFilter(true)], factory.createStatus(), function () {
            test.ok(true);
        });
        test.done();
    },
    'it does not call acceptanceCallback if tweet is rejected': function (test) {
        test.expect(0);
        this.chain._filterTweet([new DummyFilter(false)], factory.createStatus(), function () {
            test.ok(false);
        });
        test.done();
    }
});

function DummyFilter(acceptTweet) {
    this.acceptTweet = acceptTweet;
}

DummyFilter.prototype.accept = function (tweet) {
    return this.acceptTweet;
}
