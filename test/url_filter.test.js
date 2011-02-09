var testCase = require('nodeunit').testCase,
    Tweet = require('../lib/tweet').Tweet,
    filter = require('../lib/url_filter');

const UNWANTED_DOMAIN = 'example.org';

exports['UrlFilter#accept'] = testCase({
    setUp: function (callback) {
        var config = { domainsToFilter: [UNWANTED_DOMAIN] };
        this.urlFilter = new filter.UrlFilter(config);
        callback();
    },
    'accepts tweet without urls': function (test) {
        var tweet = new Tweet({ text: 'hello world', entities: { urls: [] } });
        test.strictEqual(true, this.urlFilter.accept(tweet));
        test.done();
    },
    'accepts tweet with url not in filter list': function (test) {
        var tweet = new Tweet({ text: 'an url: http://example.com', entities: { urls: [ { url: 'http://example.com' } ] } });
        test.strictEqual(true, this.urlFilter.accept(tweet));
        test.done();
    },
    'doesn\'t accept tweet with http url in filter list': function (test) {
        var tweet = new Tweet({ text: 'an url: http://' + UNWANTED_DOMAIN, entities: { urls: [ { url: 'http://' + UNWANTED_DOMAIN } ] } });
        test.strictEqual(false, this.urlFilter.accept(tweet));
        test.done();
    },
    'doesn\'t accept tweet with https url in filter list': function (test) {
        var tweet = new Tweet({ text: 'an url: https://' + UNWANTED_DOMAIN, entities: { urls: [ { url: 'https://' + UNWANTED_DOMAIN } ] } });
        test.strictEqual(false, this.urlFilter.accept(tweet));
        test.done();
    }
});

