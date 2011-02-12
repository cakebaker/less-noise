var testCase = require('nodeunit').testCase,
    Tweet = require('../lib/tweet').Tweet,
    filter = require('../lib/hashtag_filter');

const UNWANTED_HASHTAG = 'unwanted';

exports['HashtagFilter#accept'] = testCase({
    setUp: function (callback) {
        var config = { hashtagsToFilter: [UNWANTED_HASHTAG] };
        this.hashtagFilter = new filter.HashtagFilter(config);
        callback();
    },
    'accepts tweet without hashtags': function (test) {
        var tweet = new Tweet({ text: 'hello world', entities: { hashtags: [] } });
        test.strictEqual(true, this.hashtagFilter.accept(tweet));
        test.done();
    },
    'accepts tweet with hashtag not in filter list': function (test) {
        var tweet = new Tweet({ text: 'hello #world', entities: { hashtags: [ { text: 'world' } ] } });
        test.strictEqual(true, this.hashtagFilter.accept(tweet));
        test.done();
    },
    'doesn\'t accept tweet with hashtag in filter list': function (test) {
        var tweet = new Tweet({ text: 'an #unwanted hastag', entities: { hashtags: [ { text: 'unwanted' } ] } });
        test.strictEqual(false, this.hashtagFilter.accept(tweet));
        test.done();
    },
});
