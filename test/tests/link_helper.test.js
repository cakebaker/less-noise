var testCase = require('nodeunit').testCase,
    linkHelper = require('../../lib/link_helper');

const URL_ONE = 'http://example.com';
const URL_TWO = 'http://example.org';

exports['cleanUrls'] = testCase({
    'returns the same urls if they are clean': function (test) {
        var urls = ['http://example.com', 'http://example.org'];
        var expectedUrls = ['http://example.com', 'http://example.org'];
        test.deepEqual(expectedUrls, linkHelper.cleanUrls(urls));
        test.done();
    },
    'removes feedburner params': function (test) {
        var urls = ['http://x.ch?utm_campaign=test', 'http://x.ch?utm_source=test', 'http://x.ch?utm_medium=test', 'http://x.ch?utm_content=test'];
        var expectedUrls = ['http://x.ch', 'http://x.ch', 'http://x.ch', 'http://x.ch'];
        test.deepEqual(expectedUrls, linkHelper.cleanUrls(urls));
        test.done();
    }
});

exports['linkUrls'] = testCase({
    'text without any urls': function (test) {
        var text = 'hello world';
        test.equals(text, linkHelper.linkUrls(text, [], []));
        test.done();
    },
    'text with a single url': function (test) {
        var text = 'an url: http://example.com';
        test.equals('an url: <a href="http://example.com">http://example.com</a>', linkHelper.linkUrls(text, ['http://example.com'], ['http://example.com']));
        test.done();
    },
    'text with a shortened url': function (test) {
        var text = 'an url: http://ex.am/ple';
        test.equals('an url: <a href="http://example.com">http://example.com</a>', linkHelper.linkUrls(text, ['http://ex.am/ple'], ['http://example.com']));
        test.done();
    },
    'text with two urls': function (test) {
        var text = 'two urls: http://ex.am/ple http://example.org';
        test.equals('two urls: <a href="http://example.com">http://example.com</a> <a href="http://example.org">http://example.org</a>', linkHelper.linkUrls(text, ['http://ex.am/ple', 'http://example.org'], ['http://example.com', 'http://example.org']));
        test.done();
    }
});

exports['linkUserMentions'] = testCase({
    'text without any user mentions': function (test) {
        var text = 'hello world';
        test.equals(text, linkHelper.linkUserMentions(text, []));
        test.done();
    },
    'text mentioning a user': function (test) {
        var text = 'hello @test';
        test.equals('hello @<a href="http://twitter.com/test">test</a>', linkHelper.linkUserMentions(text, ['test']));
        test.done();
    },
    'text mentioning a user (case-insensitive)': function (test) {
        var text = 'hello @Test';
        test.equals('hello @<a href="http://twitter.com/Test">Test</a>', linkHelper.linkUserMentions(text, ['test']));
        test.done();
    }
});
