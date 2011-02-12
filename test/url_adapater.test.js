var testCase = require('nodeunit').testCase,
    Url = require('../lib/url_adapter').UrlAdapter;

exports['UrlAdapter#hasQueryString'] = testCase({
    'returns false for url without query string': function (test) {
        var url = new Url('http://example.com');
        test.strictEqual(false, url.hasQueryString());
        test.done();
    },
    'returns true for url with query string': function (test) {
        var url = new Url('http://example.com?test=value');
        test.strictEqual(true, url.hasQueryString());
        test.done();
    }
});

exports['UrlAdapter#isEmptyQueryString'] = testCase({
    'returns true for url with query string without params': function (test) {
        var url = new Url('http://example.com?');
        test.strictEqual(true, url.isEmptyQueryString());
        test.done();
    },
    'returns false for url without query string': function (test) {
        var url = new Url('http://example.com');
        test.strictEqual(false, url.isEmptyQueryString());
        test.done();
    },
    'returns false for url with query string containing params': function (test) {
        var url = new Url('http://example.com?test=value');
        test.strictEqual(false, url.isEmptyQueryString());
        test.done();
    }
});

exports['UrlAdapter#removeParam'] = testCase({
    'removing param from url without query string': function (test) {
        var url = new Url('http://example.com');
        url.removeParam('test');
        test.equals('http://example.com', url.toString());
        test.done();
    },
    'removing not-existing param from url': function (test) {
        var url = new Url('http://example.com?test=value');
        url.removeParam('notexisting');
        test.equals('http://example.com?test=value', url.toString());
        test.done();
    },
    'removing existing param from url': function (test) {
        var url = new Url('http://example.com?test=value');
        url.removeParam('test');
        test.equals('http://example.com', url.toString());
        test.done();
    },
    'removing existing param from url while leaving other param': function (test) {
        var url = new Url('http://example.com?test=value&anotherTest=anotherValue');
        url.removeParam('test');
        test.equals('http://example.com?anotherTest=anotherValue', url.toString());
        test.done();
    }
});

exports['UrlAdapter#removeParams'] = testCase({
    'removing multiple params from url': function (test) {
        var url = new Url('http://example.com?a=1&b=2&c=3');
        url.removeParams(['a', 'b', 'c']);
        test.equals('http://example.com', url.toString());
        test.done();
    }
});
