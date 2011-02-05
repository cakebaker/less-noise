var testCase = require('nodeunit').testCase,
    SingleUrlExpander = require('../lib/single_url_expander').SingleUrlExpander;

const START_URL = 'http://example.com';
const REDIRECT_URL = 'http://example.org';

exports['_handleResponse'] = testCase({
    setUp: function (callback) {
        this.expander = new SingleUrlExpander(START_URL);
        this.okResponse = { headers: {}, statusCode: 200 };
        this.redirectResponse = { headers: { location: REDIRECT_URL }, statusCode: 302 };
        callback();
    },
    '200 response': function (test) {
        test.expect(2);
        this.expander.on('expanded', function (originalUrl, expandedUrl) {
            test.equals(START_URL, originalUrl);
            test.equals(START_URL, expandedUrl);
        });
        this.expander._handleResponse(this.okResponse);
        test.done();
    },
    '302 response': function (test) {
        test.expect(6);
        var that = this;
        test.equals(START_URL, this.expander.startUrl);
        test.equals(START_URL, this.expander.url);
        test.equals(0, this.expander.redirectCount);
        this.expander.expand = function () {
            test.equals(START_URL, that.expander.startUrl);
            test.equals(REDIRECT_URL, that.expander.url);
            test.equals(1, that.expander.redirectCount);
        }
        this.expander.on('expanded', function (originalUrl, expandedUrl) {
            test.ok(false, 'No event expected when there is a redirect');
        });
        this.expander._handleResponse(this.redirectResponse);
        test.done();
    },
    '302 response with redirect limit reached': function (test) {
        test.expect(2);
        this.expander.redirectCount = this.expander.MAX_REDIRECTS;
        this.expander.on('expanded', function (originalUrl, expandedUrl) {
            test.equals(START_URL, originalUrl);
            test.equals(REDIRECT_URL, expandedUrl);
        });
        this.expander._handleResponse(this.redirectResponse);
        test.done();
    }
});
