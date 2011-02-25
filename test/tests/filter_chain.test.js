var testCase = require('nodeunit').testCase,
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
